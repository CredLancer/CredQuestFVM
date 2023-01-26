import { OrganizationDetailUpdateType, PrismaClient } from "@prisma/client";
import { ethers } from "ethers";
import ORGANIZATION_CONTROLLER_ABI from "../abi/OrganizationController.json";
import QUEST_CONTROLLER_ABI from "../abi/QuestController.json";
import {
  ORGANIZATION_CONTROLLER_ADDRESS,
  QUEST_CONTROLLER_ADDRESS,
  WEB3_RPC_URI,
} from "../config";
import { OrganizationController, QuestController } from "../typechain-types";
import organizationAdminChangeHandler from "./eventHandlers/organizationAdminChangeHandler";
import organizationCreatedHandler from "./eventHandlers/organizationCreatedHandler";
import organizationImageCIDChangeHandler from "./eventHandlers/organizationImageCIDChangeHandler";
import organizationNameChangeHandler from "./eventHandlers/organizationNameChangeHandler";

const provider = new ethers.providers.JsonRpcProvider(WEB3_RPC_URI);

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

const prisma = new PrismaClient();

const approxBlockTime = 30;
const blocksInADay = ((24 * 60 * 60) / approxBlockTime) | 0;

async function main(currBlockNumber: number) {
  const LOWEST_BLOCK = currBlockNumber - blocksInADay - 1;
  console.log(currBlockNumber);
  console.log(LOWEST_BLOCK);

  const organizationCreatedFilter =
    organizationController.filters.OrganizationCreated();
  const adminChangedFilter = organizationController.filters.AdminChanged();
  const organizationNameChangedFilter =
    organizationController.filters.OrganizationNameChanged();
  const organizationImageCIDChangedFilter =
    organizationController.filters.OrganizationImageCIDChanged();

  {
    const lastCreatedOrganization = await prisma.organization.findFirst({
      orderBy: { blockNumber: "desc" },
    });
    const lastBlock =
      lastCreatedOrganization && lastCreatedOrganization.blockNumber
        ? lastCreatedOrganization.blockNumber
        : LOWEST_BLOCK;
    const eventsEmitted = await organizationController.queryFilter(
      organizationCreatedFilter,
      lastBlock
    );

    for (const eventEmitted of eventsEmitted) {
      await organizationCreatedHandler(eventEmitted);
    }
  }

  {
    const lastAdminChanged = await prisma.organizationDetailUpdate.findFirst({
      where: { type: OrganizationDetailUpdateType.AdminChange },
      orderBy: { blockNumber: "desc" },
    });
    const lastBlock = lastAdminChanged
      ? lastAdminChanged.blockNumber
      : LOWEST_BLOCK;
    const eventsEmitted = await organizationController.queryFilter(
      adminChangedFilter,
      lastBlock
    );

    for (const eventEmitted of eventsEmitted) {
      await organizationAdminChangeHandler(eventEmitted);
    }
  }

  {
    const lastNameChanged = await prisma.organizationDetailUpdate.findFirst({
      where: { type: OrganizationDetailUpdateType.NameChange },
      orderBy: { blockNumber: "desc" },
    });
    const lastBlock = lastNameChanged
      ? lastNameChanged.blockNumber
      : LOWEST_BLOCK;
    const eventsEmitted = await organizationController.queryFilter(
      organizationNameChangedFilter,
      lastBlock
    );

    for (const eventEmitted of eventsEmitted) {
      await organizationNameChangeHandler(eventEmitted);
    }
  }

  {
    const lastImageCIDChanged = await prisma.organizationDetailUpdate.findFirst(
      {
        where: { type: OrganizationDetailUpdateType.ImageCIDChange },
        orderBy: { blockNumber: "desc" },
      }
    );
    const lastBlock = lastImageCIDChanged
      ? lastImageCIDChanged.blockNumber
      : LOWEST_BLOCK;
    const eventsEmitted = await organizationController.queryFilter(
      organizationImageCIDChangedFilter,
      lastBlock
    );

    for (const eventEmitted of eventsEmitted) {
      await organizationImageCIDChangeHandler(eventEmitted);
    }
  }
}

export default async function web3EventListeners() {
  provider.on("block", main);
}
