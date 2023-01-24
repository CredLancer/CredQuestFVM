import dotenv from "dotenv";
dotenv.config();

export const PORT = parseInt(process.env.PORT || "8000");
export const ORGANIZATION_CONTROLLER_ADDRESS =
  process.env.ORGANIZATION_CONTROLLER_ADDRESS || "";
export const QUEST_CONTROLLER_ADDRESS =
  process.env.QUEST_CONTROLLER_ADDRESS || "";
export const WEB3_RPC_URI = process.env.WEB3_RPC_URI || "";
