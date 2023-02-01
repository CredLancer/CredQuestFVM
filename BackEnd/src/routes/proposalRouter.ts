import { PrismaClient, SignatureType } from "@prisma/client";
import CID from "cids";
import { Router } from "express";
import { body } from "express-validator";
import { getNonce, uploadJSONtoIPFS } from "../helpers";
import { validate } from "../middlewares";
import { signForProposalCreation } from "../signatures";

const proposalRouter = Router();
const prisma = new PrismaClient();

proposalRouter.get(
  "/:questId",
  body("description").isLength({ min: 100 }),
  body("approxCompletionTime").isISO8601().toDate(),
  body("proposer").isEthereumAddress(),
  validate,
  async (req, res) => {
    const { questId } = req.params;
    const { description, approxCompletionTime, proposer } = req.body;

    const quest = await prisma.quest.findUnique({ where: { id: questId } });
    if (!quest) return res.status(404).json({ message: "quest not found" });

    const jsonObj = {
      description,
      approxCompletionTime,
    };

    const response = await uploadJSONtoIPFS(jsonObj);
    const proposalCID = `0x${new CID(response.Hash)
      .toV1()
      .toString("base16")
      .substring(1)}`;
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

export default proposalRouter;
