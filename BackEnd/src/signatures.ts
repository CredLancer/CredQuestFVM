import { ethers } from "ethers";
import { getOrganizationContractDomain, SIGNER_PRIVATE_KEY } from "./config";

const signer = new ethers.Wallet(SIGNER_PRIVATE_KEY);

export async function signForOrganizationCreation(data: {
  admin: string;
  name: string;
  imageCID: string;
  nonce: string;
}) {
  const types = {
    CreateOrganization: [
      { name: "admin", type: "address" },
      { name: "name", type: "string" },
      { name: "imageCID", type: "bytes" },
      { name: "nonce", type: "uint256" },
    ],
  };
  return await signer._signTypedData(
    await getOrganizationContractDomain(),
    types,
    data
  );
}

export async function signForOrganizationImageCIDUpdate(data: {
  orgId: string;
  imageCID: string;
  nonce: string;
}) {
  const types = {
    UpdateImageCID: [
      { name: "orgId", type: "uint256" },
      { name: "imageCID", type: "bytes" },
      { name: "nonce", type: "uint256" },
    ],
  };
  return await signer._signTypedData(
    await getOrganizationContractDomain(),
    types,
    data
  );
}
