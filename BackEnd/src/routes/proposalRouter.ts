import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { body } from "express-validator";
import { validate } from "../middlewares";

const proposalRouter = Router();
const prisma = new PrismaClient();

proposalRouter.get(
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
  }
);

export default proposalRouter;
