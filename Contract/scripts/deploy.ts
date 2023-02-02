import { ethers } from "hardhat";

async function main() {
  // get provider
  const { provider } = ethers;

  // deploy the organizations contract
  console.log("Deploying the organization contract");
  const OrganizationController = await ethers.getContractFactory(
    "OrganizationController"
  );
  const organizationController = await OrganizationController.deploy({
    maxPriorityFeePerGas: await provider.send("eth_maxPriorityFeePerGas", []),
  });
  console.log(
    `The organization contract is deployed to address: ${organizationController.address}`
  );

  // deploy the credentials contract
  console.log("Deploying the organization contract");
  const Credential = await ethers.getContractFactory("Credential");
  const credential = await Credential.deploy({
    maxPriorityFeePerGas: await provider.send("eth_maxPriorityFeePerGas", []),
  });
  console.log(
    `The credential contract is deployed to address: ${credential.address}`
  );

  // deploy the quests contract
  console.log("Deploying the quest contract");
  const QuestController = await ethers.getContractFactory("QuestController");
  const questController = await QuestController.deploy(
    organizationController.address,
    credential.address,
    {
      maxPriorityFeePerGas: await provider.send("eth_maxPriorityFeePerGas", []),
    }
  );
  console.log(
    `The quest contract is deployed to address: ${questController.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
