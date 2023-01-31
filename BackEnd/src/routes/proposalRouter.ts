import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { body } from "express-validator";
import { validate } from "../middlewares";

const proposalRouter = Router();
const prisma = new PrismaClient();

proposalRouter.post(
  "/:questId",
  body("description").isLength({ min: 100 }),
  body("approxCompletionTime").isISO8601().toDate(),
  validate,
  async (req, res) => {
    const { questId } = req.params;
    const { description, approxCompletionTime } = req.body;

    const quest = await prisma.quest.findUnique({ where: { id: questId } });
    if (!quest) return res.status(404).json({ message: "quest not found" });

    const jsonObj = {
      description,
    };
    const file = await prisma.proposalFile.findFirst({ where: jsonObj });
    let proposalCID;
    if (file) proposalCID = file.cid;
    else {
      const response = await uploadJSONtoIPFS(jsonObj);
      proposalCID = `0x${new CID(response.Hash)
        .toV1()
        .toString("base16")
        .substring(1)}`;
      await prisma.proposalFile.create({
        data: { cid: proposalCID, ...jsonObj },
      });
    }

    // create a signature for the proposal
    const nonce = await getNonce();
    const signature = await signForProposalCreation({
      questId,
      proposer,
      proposalCID,
      nonce,
    });
    await prisma.signature.create({
      data: {
        nonce: Number(nonce),
        signature,
        user: proposer,
        type: SignatureType.ProposalCreation,
      },
    });
    res.json({ nonce, signature, proposalCID });
  }
);

proposalRouter.get(
  "/address/:address",
  param("address").isEthereumAddress(),
  validate,
  async (req, res) => {
    const { address } = req.params;

    // get the lancer
    let lancer = await prisma.lancer.findUnique({
      where: { address: address as string },
    });
    if (!lancer || !lancer.registered)
      return res.status(400).json({ message: "lancer not registered" });

    let proposals = await prisma.proposal.findMany({
      where: { proposer: address },
    });
    proposals = await Promise.all(
      proposals.map(async (proposal) => {
        const file = await prisma.proposalFile.findUnique({
          where: { cid: proposal.fileCID },
        });
        return { ...file, ...proposal };
      })
    );
    res.json({ proposals });
  }
);

proposalRouter.get(
  "/questId/:questId",
  param("questId").isNumeric(),
  validate,
  async (req, res) => {
    const { questId } = req.params;

    // get the lancer
    let quest = await prisma.quest.findUnique({
      where: { id: questId },
    });
    if (!quest) return res.status(404).json({ message: "quest not found" });

    let proposals = await prisma.proposal.findMany({
      where: { questId },
    });
    proposals = await Promise.all(
      proposals.map(async (proposal) => {
        const file = await prisma.proposalFile.findUnique({
          where: { cid: proposal.fileCID },
        });
        return { ...file, ...proposal };
      })
    );
    res.json({ proposals });
  }
);

export default proposalRouter;
