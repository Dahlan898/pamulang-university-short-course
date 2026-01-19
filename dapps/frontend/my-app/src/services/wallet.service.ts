import { createWalletClient, custom } from "viem";
import { avalancheFuji } from "viem/chains";
import { SIMPLE_STORAGE_ABI } from "@/abi/simple-storage";

const CONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`;

export async function connectWallet() {
  if (!window.ethereum) {
    throw new Error("Wallet not found");
  }

  const client = createWalletClient({
    chain: avalancheFuji,
    transport: custom(window.ethereum),
  });

  const [account] = await client.requestAddresses();

  return { client, account };
}

export async function setValueOnChain(value: number) {
  const { client, account } = await connectWallet();

  const hash = await client.writeContract({
    account,
    address: CONTRACT_ADDRESS,
    abi: SIMPLE_STORAGE_ABI,
    functionName: "setValue",
    args: [BigInt(value)],
  });

  return hash;
}
