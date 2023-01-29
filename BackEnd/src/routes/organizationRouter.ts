import { PrismaClient, SignatureType } from "@prisma/client";
import CID from "cids";
import { ethers } from "ethers";
import { Router } from "express";
import { body } from "express-validator";
import {
  getNonce,
  multerUploader,
  signMessage,
  uploadToIPFS,
} from "../helpers";
import { signForOrganizationCreation } from "../signatures";

const prisma = new PrismaClient();

const organizationRouter = Router();

organizationRouter.post(
  "/",
  body("name").isLength({ min: 3 }),
  body("admin").isEthereumAddress(),
  multerUploader.single("image"),
  async (req, res) => {
    console.log({ body: req.body });
    const { admin, name } = req.body;
    const image = req.file;
    console.log({ image, file: req.file });
    if (!image) return res.status(400).json({ message: "file not found" });
    if (!image.mimetype.toLowerCase().includes("image"))
      return res.status(400).json({ message: "file not a image" });
    const organization = await prisma.organization.findFirst({
      where: { admin },
    });
    console.log("Organization exists?", organization);
    if (organization)
      return res
        .status(400)
        .json({ message: "one admin can create only one organization" });

    const response = await uploadToIPFS(image.buffer);
    const imageCID = `0x${new CID(response.Hash)
      .toV1()
      .toString("base16")
      .substring(1)}`;
    const nonce = await getNonce();
    const signature = await signForOrganizationCreation({
      admin,
      name,
      imageCID,
      nonce,
    });
    await prisma.signature.create({
      data: {
        nonce: Number(nonce),
        signature,
        user: admin,
        type: SignatureType.OrganizationCreation,
      },
    });
    res.json({ nonce, signature, imageCID, name });
  }
);

organizationRouter.get("/", async (req, res) => {
  const organizations = await prisma.organization.findMany();

  res.json({ organizations });
});

export default organizationRouter;
