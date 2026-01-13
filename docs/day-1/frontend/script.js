document.addEventListener("DOMContentLoaded", () => {
  const connectBtn = document.getElementById("connectBtn");

  connectBtn.addEventListener("click", connectWallet);

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

      document.getElementById("status").innerText = "Connected ✅";
      document.getElementById("address").innerText = accounts[0];

      if (chainId === "0xa869") {
        document.getElementById("network").innerText =
          "Avalanche Fuji Testnet";
      } else {
        document.getElementById("network").innerText =
          "Wrong Network ❌";
      }

      const balanceHex = await ethereum.request({
        method: "eth_getBalance",
        params: [accounts[0], "latest"],
      });

      const balance = parseInt(balanceHex, 16) / 1e18;
      document.getElementById("balance").innerText =
        balance.toFixed(4);

      connectBtn.disabled = true;
      connectBtn.innerText = "Wallet Connected";
    } catch (err) {
      console.error(err);
    }
  }
});