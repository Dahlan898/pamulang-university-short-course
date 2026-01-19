import Image from "next/image";
import {
  getBlockchainValue,
  getBlockchainEvents,
} from "@/services/blockchain.service";

export default async function Home() {
  const value = await getBlockchainValue();
  const events = await getBlockchainEvents();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />

        {/* UI BAWAAN */}
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            To get started, edit the page.tsx file.
          </h1>
        </div>

        {/* 🔥 DATA BLOCKCHAIN */}
        <section className="w-full mt-10 space-y-4">
          <h2 className="text-xl font-bold">Blockchain Data</h2>

          <div>
            <h3 className="font-semibold">Latest Value</h3>
            <pre className="bg-zinc-100 dark:bg-zinc-900 p-4 rounded">
              {JSON.stringify(value, null, 2)}
            </pre>
          </div>

          <div>
            <h3 className="font-semibold">Events</h3>
            <pre className="bg-zinc-100 dark:bg-zinc-900 p-4 rounded">
              {JSON.stringify(events, null, 2)}
            </pre>
          </div>
        </section>
      </main>
    </div>
  );
}