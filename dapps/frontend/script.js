let isConnected = false;
let currentAccount = null;

const connectBtn = document.getElementById("connectBtn");
const statusEl = document.getElementById("status");
const addressEl = document.getElementById("address");
const networkEl = document.getElementById("network");
const balanceEl = document.getElementById("balance");

connectBtn.addEventListener("click", handleButton);

async function handleButton() {
  if (!isConnected) {
    await connectWallet();
  } else {
    disconnectWallet();
  }
}

async function connectWallet() {
  if (!window.ethereum) {
    alert("Core Wallet tidak terdeteksi");
    return;
  }

  try {
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });

    const chainId = await ethereum.request({
      method: "eth_chainId",
    });

    currentAccount = accounts[0];
    isConnected = true;

    statusEl.innerText = "Connected ✅";
    addressEl.innerText = currentAccount;

    if (chainId === "0xa869") {
      networkEl.innerText = "Avalanche Fuji Testnet";
    } else {
      networkEl.innerText = "Wrong Network ❌";
    }

    const balanceHex = await ethereum.request({
      method: "eth_getBalance",
      params: [currentAccount, "latest"],
    });

    const balance = parseInt(balanceHex, 16) / 1e18;
    balanceEl.innerText = balance.toFixed(4);

    connectBtn.innerText = "Disconnect Wallet";
    connectBtn.style.background = "#64748b";
  } catch (err) {
    console.error("Connect error:", err);
  }
}

function disconnectWallet() {
  isConnected = false;
  currentAccount = null;

  statusEl.innerText = "Not Connected";
  addressEl.innerText = "-";
  networkEl.innerText = "-";
  balanceEl.innerText = "-";

  connectBtn.innerText = "Connect Wallet";
  connectBtn.style.background = "#ef4444";
}