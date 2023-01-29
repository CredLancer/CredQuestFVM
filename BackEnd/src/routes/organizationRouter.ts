import { PrismaClient, SignatureType } from "@prisma/client";
import CID from "cids";
import { Router } from "express";
import { body, check, validationResult } from "express-validator";
import { getNonce, multerUploader, uploadToIPFS } from "../helpers";
import { file, validate } from "../middlewares";
import {
  signForOrganizationCreation,
  signForOrganizationImageCIDUpdate,
} from "../signatures";

const prisma = new PrismaClient();

const organizationRouter = Router();

organizationRouter.post(
  "/",
  multerUploader.single("image"),
  body("name").isLength({ min: 3 }),
  body("admin").isEthereumAddress(),
  validate,
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
    res.json({ nonce, signature, imageCID });
  }
);

organizationRouter.get("/", async (req, res) => {
  const organizations = await prisma.organization.findMany();

  res.json({ organizations });
});

organizationRouter.put(
  "/imageCID/:orgId",
  file("image", "image"),
  body("signature").isEthereumAddress(),
  body("signer").isEthereumAddress(),
  validate,
  async (req, res) => {
    const { orgId } = req.params;
    const image = req.file;
    const { signature: userSignature, signer } = req.body;
    if (!image) return res.status(400).json({ message: "file not found" });
    if (!image.mimetype.toLowerCase().includes("image"))
      return res.status(400).json({ message: "file not a image" });
    const organization = await prisma.organization.findUnique({
      where: { id: orgId },
    });
    if (!organization)
      return res.status(404).json({ message: "Organization not found" });
    if (organization.admin != signer)
      return res.status(401).json({ message: "only admins are allowed" });
    const response = await uploadToIPFS(image.buffer);
    const imageCID = `0x${new CID(response.Hash)
      .toV1()
      .toString("base16")
      .substring(1)}`;
    if (organization.imageCID == imageCID)
      return res.status(400).json({ message: "image not changed" });
    const nonce = await getNonce();

    // check the signature

    const signature = await signForOrganizationImageCIDUpdate({
      orgId,
      imageCID,
      nonce,
    });
    await prisma.signature.create({
      data: {
        nonce: Number(nonce),
        signature,
        user: signer,
        type: SignatureType.OrganizationImageCIDChange,
      },
    });
    res.json({ nonce, signature, imageCID });
  }
);

export default organizationRouter;
