import { ethers } from "hardhat";

async function main() {
  // deploy the organizations contract
  const OrganizationController = await ethers.getContractFactory(
    "OrganizationController"
  );
  const organizationController = await OrganizationController.deploy();
  await organizationController.deployed();

  // deploy the quests contract
  const QuestController = await ethers.getContractFactory("QuestController");
  const questController = await QuestController.deploy(
    organizationController.address
  );
  await questController.deployed();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
