'use client';

import { useState } from 'react';
import {
  useAccount,
  useConnect,
  useDisconnect,
  useReadContract,
  useWriteContract,
} from 'wagmi';
import { injected } from 'wagmi/connectors';

const CONTRACT_ADDRESS = '0x15C6c3ce81978DC021D286e094a0e878B59F5465'; // ganti sesuai deploy Day 2
const SIMPLE_STORAGE_ABI = [
  {
    inputs: [],
    name: 'getValue',
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: '_value', type: 'uint256' }],
    name: 'setValue',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

export default function Page() {
  const { address, isConnected } = useAccount();
  const { connect, isPending: isConnecting } = useConnect();
  const { disconnect } = useDisconnect();

  const [inputValue, setInputValue] = useState('');

  const { data: value, isLoading, refetch } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: SIMPLE_STORAGE_ABI,
    functionName: 'getValue',
  });

  const { writeContract, isPending: isWriting } = useWriteContract();

  const handleSetValue = () => {
    if (!inputValue || isWriting) return;
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: SIMPLE_STORAGE_ABI,
      functionName: 'setValue',
      args: [BigInt(inputValue)],
    });
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-6">
      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-lg p-8 space-y-8 border border-red-600">
        <h1 className="text-4xl font-extrabold text-red-500 text-center tracking-wide">
          Avalanche Simple dApp
        </h1>

        {!isConnected ? (
          <button
            onClick={() => connect({ connector: injected() })}
            disabled={isConnecting}
            className="w-full py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition"
          >
            {isConnecting ? 'Connecting...' : 'Connect Wallet'}
          </button>
        ) : (
          <div className="space-y-3 text-center">
            <p className="text-sm text-gray-400">Connected address:</p>
            <p className="break-all bg-gray-700 p-3 rounded-lg font-mono text-red-400">{address}</p>
            <button
              onClick={() => disconnect()}
              className="text-red-500 hover:text-red-600 underline text-sm mt-1"
            >
              Disconnect
            </button>
          </div>
        )}

        <div className="border-t border-red-600 pt-5 space-y-4">
          <p className="font-semibold text-gray-300">Contract Value (read)</p>
          <p className="text-5xl font-bold text-red-400">{isLoading ? 'Loading...' : value?.toString()}</p>
          <button
            onClick={() => refetch()}
            className="text-sm underline text-red-500 hover:text-red-600 transition"
          >
            Refresh
          </button>
        </div>

        <div className="border-t border-red-600 pt-5 space-y-4">
          <input
            type="number"
            placeholder="New value"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-700 border border-red-500 placeholder-red-400 text-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
          />
          <button
            onClick={handleSetValue}
            disabled={isWriting || !inputValue}
            className={`w-full py-3 rounded-lg font-semibold transition ${
              isWriting || !inputValue
                ? 'bg-red-300 cursor-not-allowed text-gray-700'
                : 'bg-red-600 hover:bg-red-700 text-white'
            }`}
          >
            {isWriting ? 'Updating...' : 'Set Value'}
          </button>
        </div>

        <p className="text-xs text-gray-500 text-center italic mt-6">
          Smart contract = single source of truth
        </p>
      </div>
    </main>
  );
}