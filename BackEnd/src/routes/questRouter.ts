import { PrismaClient, SignatureType } from "@prisma/client";
import CID from "cids";
import { ethers } from "ethers";
import { Router } from "express";
import { body } from "express-validator";
import { getNonce, uploadJSONtoIPFS } from "../helpers";
import { paginate, validate } from "../middlewares";
import { signForQuestCreation } from "../signatures";

const questRouter = Router();
const prisma = new PrismaClient();

questRouter.get("/", paginate(12), async (req, res) => {
  const { limit, offset } = req.query;
  const quests = await prisma.quest.findMany({
    take: Number(limit),
    skip: Number(offset),
  });
  const totalQuests = await prisma.quest.count();
  res.json({ quests, pages: Math.ceil(totalQuests / Number(limit)) });
});

questRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const quest = await prisma.quest.findUnique({ where: { id } });
  if (!quest) return res.status(404).json({ message: "Quest not found" });
  res.json({ quest });
});

questRouter.post(
  "/",
  body("orgId").isNumeric(),
  body("title").isLength({ min: 3 }),
  body("description").isString(),
  body("reward").isNumeric(),
  body("deadline").isNumeric(),
  validate,
  async (req, res) => {
    const { orgId, title, description, reward, deadline } = req.body;

    if (new Date(parseInt(deadline) * 1000) <= new Date())
      return res
        .status(400)
        .json({ message: "Deadline cannot be in the past" });

    const organization = await prisma.organization.findUnique({
      where: { id: orgId },
    });
    if (!organization)
      return res.status(404).json({ message: "organization not found" });

    const rewardInWei = ethers.BigNumber.from(reward);
    const jsonFile = { title, description };
    const response = await uploadJSONtoIPFS(jsonFile);
    const questCID = `0x${new CID(response.Hash)
      .toV1()
      .toString("base16")
      .substring(1)}`;
    const nonce = await getNonce();
    const signature = await signForQuestCreation({
      orgId,
      questCID,
      reward: rewardInWei.toString(),
      deadline,
      nonce,
    });
    await prisma.signature.create({
      data: {
        nonce: Number(nonce),
        signature,
        user: organization.admin,
        type: SignatureType.QuestCreation,
      },
    });
    res.json({ nonce, signature, questCID });
  }
);

export default questRouter;
