import { Lancer, PrismaClient } from "@prisma/client";
import CID from "cids";
import { Router } from "express";
import { body, param } from "express-validator";
import {
  generateNonce,
  getNonceMessage,
  uploadToIPFS,
  verifySignature,
} from "../helpers";
import { file, validate } from "../middlewares";

const lancerRouter = Router();
const prisma = new PrismaClient();

lancerRouter.get(
  "/:address",
  param("address").isEthereumAddress(),
  validate,
  async (req, res) => {
    const { address } = req.params;

    const lancer = (await prisma.lancer.findUnique({
      where: { address: address as string },
    })) as Lancer;
    if (lancer) {
      if (lancer.registered) return res.json({ lancer, registered: true });
      return res.json({
        registered: false,
        message: getNonceMessage(lancer.nonce),
      });
    }

    const nonce = generateNonce();
    await prisma.lancer.create({ data: { address, nonce } });
    return res.json({ registered: false, message: getNonceMessage(nonce) });
  }
);

lancerRouter.post(
  "/register",
  file("image", "image"),
  body("address").isEthereumAddress(),
  body("signature").isString(),
  body("name").isLength({ min: 3 }),
  body("email").isEmail(),
  body("description").isString(),
  validate,
  async (req, res) => {
    const { address, signature, name, email, description } = req.body;
    const image = req.file as Express.Multer.File;

    // get the lancer
    let lancer = await prisma.lancer.findUnique({
      where: { address: address as string },
    });
    if (!lancer)
      return res.status(400).json({ message: "nonce not generated yet" });
    if (lancer.registered)
      return res.status(400).json({ message: "user already registered" });

    // Verify Signature
    const nonceMessage = getNonceMessage(lancer.nonce);
    const isSignValid = verifySignature(nonceMessage, signature, address);
    if (!isSignValid)
      return res.status(401).json({ message: "invalid signature" });

    // upload image
    const response = await uploadToIPFS(image.buffer);
    const imageCID = `0x${new CID(response.Hash)
      .toV1()
      .toString("base16")
      .substring(1)}`;

    // update the details of the lancer
    await prisma.lancer.update({
      where: { address },
      data: { description, email, imageCID, name, nonce: generateNonce() },
    });

    // return the lancer
    lancer = await prisma.lancer.findUnique({ where: { address } });
    res.json({ lancer });
  }
);

lancerRouter.put(
  "/:address",
  param("address").isEthereumAddress(),
  body("signature").isString(),
  body("name").isLength({ min: 3 }).optional({ nullable: true }),
  body("email").isEmail().optional({ nullable: true }),
  body("description").isString().optional({ nullable: true }),
  validate,
  async (req, res) => {
    const { address, signature, name, email, description } = req.body;

    // get the lancer
    let lancer = await prisma.lancer.findUnique({
      where: { address: address as string },
    });
    if (!lancer || !lancer.registered)
      return res.status(400).json({ message: "lancer not registered" });

    if (!name && !email && !description)
      return res.status(400).json({ message: "nothing parsed to update" });

    // Verify Signature
    const nonceMessage = getNonceMessage(lancer.nonce);
    const isSignValid = verifySignature(nonceMessage, signature, address);
    if (!isSignValid)
      return res.status(401).json({ message: "invalid signature" });

    // update the details of the lancer
    await prisma.lancer.update({
      where: { address },
      data: { description, email, name, nonce: generateNonce() },
    });

    // return the lancer
    lancer = await prisma.lancer.findUnique({ where: { address } });
    res.json({ lancer });
  }
);

lancerRouter.put(
  "/image/:address",
  file("image", "image"),
  param("address").isEthereumAddress(),
  body("signature").isString(),
  validate,
  async (req, res) => {
    const { address, signature } = req.body;
    const image = req.file as Express.Multer.File;

    // get the lancer
    let lancer = await prisma.lancer.findUnique({
      where: { address: address as string },
    });
    if (!lancer || !lancer.registered)
      return res.status(400).json({ message: "lancer not registered" });

    // Verify Signature
    const nonceMessage = getNonceMessage(lancer.nonce);
    const isSignValid = verifySignature(nonceMessage, signature, address);
    if (!isSignValid)
      return res.status(401).json({ message: "invalid signature" });

    // upload image
    const response = await uploadToIPFS(image.buffer);
    const imageCID = `0x${new CID(response.Hash)
      .toV1()
      .toString("base16")
      .substring(1)}`;

    // update the details of the lancer
    await prisma.lancer.update({
      where: { address },
      data: { imageCID, nonce: generateNonce() },
    });

    // return the lancer
    lancer = await prisma.lancer.findUnique({ where: { address } });
    res.json({ lancer });
  }
);

export default lancerRouter;
