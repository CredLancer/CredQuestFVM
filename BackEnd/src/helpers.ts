import { ethers } from "ethers";
import { LIGHTHOUSE_API_KEY, SIGNER_PRIVATE_KEY } from "./config";
import multer from "multer";
import lighthouse from "@lighthouse-web3/sdk";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const storage = multer.memoryStorage();
export const multerUploader = multer({ storage: storage });

export async function getNonce() {
  const lastSignature = await prisma.signature.findFirst({
    orderBy: { nonce: "desc" },
  });
  const nonce = lastSignature ? lastSignature.nonce + BigInt(1) : BigInt(1);
  return nonce.toString();
}

export async function signMessage(hash: any) {
  const signer = new ethers.Wallet(SIGNER_PRIVATE_KEY);
  const hashBytes = ethers.utils.arrayify(hash);
  const signature = await signer.signMessage(hashBytes);
  return signature;
}

export async function uploadToIPFS(file: Buffer) {
  const res = await lighthouse.uploadBuffer(file, LIGHTHOUSE_API_KEY);
  return res.data;
}

export async function uploadJSONtoIPFS(obj: any) {
  const res = await lighthouse.uploadBuffer(
    Buffer.from(JSON.stringify(obj), "utf-8"),
    LIGHTHOUSE_API_KEY,
    "application/json"
  );
  return res.data;
}
