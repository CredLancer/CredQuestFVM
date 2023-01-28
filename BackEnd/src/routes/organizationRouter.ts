import { PrismaClient, SignatureType } from "@prisma/client";
import { ethers } from "ethers";
import { Router } from "express";
import { body } from "express-validator";
import {
  getNonce,
  multerUploader,
  signMessage,
  uploadToIPFS,
} from "../helpers";

const prisma = new PrismaClient();

const organizationRouter = Router();

organizationRouter.post(
  "/",
  body("name").isLength({ min: 3 }),
  body("admin").isEthereumAddress(),
  multerUploader.single("image"),
  async (req, res) => {
    const { admin, name } = req.body;
    const image = req.file;
    if (!image) return res.status(400).json({ message: "file not found" });
    if (!image.mimetype.toLowerCase().includes("image"))
      return res.status(400).json({ message: "file not a image" });
    const organization = await prisma.organization.findFirst({
      where: { admin },
    });
    if (organization)
      return res
        .status(400)
        .json({ message: "one admin can create only one organization" });
    const response = await uploadToIPFS(image.buffer);
    const imageCID = response.Hash;
    const nonce = await getNonce();
    const data = ethers.utils.solidityPack(
      ["address", "string", "string", "uint256"],
      [admin, name, imageCID, nonce]
    );
    const hash = ethers.utils.hashMessage(data);
    console.log(hash);
    const signature = await signMessage(hash);
    await prisma.signature.create({
      data: {
        nonce,
        signature,
        hash,
        user: admin,
        type: SignatureType.OrganizationCreation,
      },
    });
    res.json({ nonce, signature });
  }
);

organizationRouter.get("/", async (req, res) => {
  const organizations = await prisma.organization.findMany();

  res.json({ organizations });
});

export default organizationRouter;
