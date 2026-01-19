const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

function getBackendUrl() {
  if (!BACKEND_URL) {
    throw new Error("NEXT_PUBLIC_BACKEND_URL is not defined");
  }
  return BACKEND_URL;
}

export async function getBlockchainValue() {
  const res = await fetch(`${getBackendUrl()}/blockchain/value`, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch blockchain value");
  }

  return res.json();
}

/**
 * fromBlock & toBlock wajib karena backend pakai Query DTO
 */
export async function getBlockchainEvents(
  fromBlock: number,
  toBlock: number
) {
  const res = await fetch(
    `${getBackendUrl()}/blockchain/events?fromBlock=${fromBlock}&toBlock=${toBlock}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch blockchain events");
  }

  return res.json();
}