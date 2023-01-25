import { ethers } from "ethers";
import ORGANIZATION_CONTROLLER_ABI from "../abi/OrganizationController.json";
import QUEST_CONTROLLER_ABI from "../abi/QuestController.json";
import {
  ORGANIZATION_CONTROLLER_ADDRESS,
  QUEST_CONTROLLER_ADDRESS,
  WEB3_RPC_URI,
} from "../config";
import { OrganizationController, QuestController } from "../typechain-types";

const provider = new ethers.providers.WebSocketProvider(WEB3_RPC_URI);

const organizationController = new ethers.Contract(
  ORGANIZATION_CONTROLLER_ADDRESS,
  ORGANIZATION_CONTROLLER_ABI,
  provider
) as OrganizationController;

const questController = new ethers.Contract(
  QUEST_CONTROLLER_ADDRESS,
  QUEST_CONTROLLER_ABI,
  provider
) as QuestController;

export default async function web3EventListeners() {}
