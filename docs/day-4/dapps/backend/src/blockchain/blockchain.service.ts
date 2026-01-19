import { Injectable } from "@nestjs/common";
import { createPublicClient, http, createWalletClient } from "viem";
import { avalancheFuji } from "viem/chains";
import { SIMPLE_STORAGE_ABI } from "./simple-storage.abi";
import { GetEventsDto } from "./dto/get-events.dto";

@Injectable()
export class BlockchainService {
  private client;
  private walletClient;
  private contractAddress: `0x${string}`;

  constructor() {
    this.client = createPublicClient({
      chain: avalancheFuji,
      transport: http("https://avalanche-fuji-c-chain.publicnode.com"),
    });

    // **PENTING**
    // Ganti private key ini sesuai wallet kamu (ini contoh saja)
    const PRIVATE_KEY = "0xYOUR_PRIVATE_KEY_HERE";

    this.walletClient = createWalletClient({
      chain: avalancheFuji,
      transport: http("https://avalanche-fuji-c-chain.publicnode.com"),
      account: `0x${PRIVATE_KEY.slice(-40)}`,
      key: PRIVATE_KEY,
    });

    this.contractAddress =
      "0x15C6c3ce81978DC021D286e094a0e878B59F5465";
  }

  async getValue() {
    const value = await this.client.readContract({
      address: this.contractAddress,
      abi: SIMPLE_STORAGE_ABI,
      functionName: "getValue",
    });

    return {
      value: value.toString(),
    };
  }

  async getEvents(dto: GetEventsDto) {
    const fromBlock = BigInt(dto.fromBlock);
    const toBlock = BigInt(dto.toBlock);

    const events = await this.client.getLogs({
      address: this.contractAddress,
      event: {
        type: "event",
        name: "ValueUpdated",
        inputs: [{ name: "newValue", type: "uint256", indexed: false }],
      },
      fromBlock,
      toBlock,
    });

    return events.map((e) => ({
      blockNumber: e.blockNumber?.toString(),
      value: e.args.newValue.toString(),
      txHash: e.transactionHash,
    }));
  }

  async setValue(dto: SetValueDto) {
    const txHash = await this.walletClient.writeContract({
      address: this.contractAddress,
      abi: SIMPLE_STORAGE_ABI,
      functionName: "setValue",
      args: [BigInt(dto.value)],
    });

    return {
      txHash,
    };
  }
}