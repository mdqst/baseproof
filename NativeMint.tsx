import React, { useState } from "react";
import { ethers } from "ethers";

const CONTRACT_ADDRESS = "0x113f1db516794c687A5b79d5b8Fd3399c79DB4c5";
const BASE_SEPOLIA = { chainIdHex: "0x14A74", chainIdDec: 84532, rpc: "https://sepolia.base.org" };

// Common ERC721 mint function candidates
const ABI_CANDIDATES = [
  ["mint(address)", ["address"]],
  ["safeMint(address)", ["address"]],
  ["mintTo(address,string)", ["address","string"]],
  ["safeMint(address,string)", ["address","string"]],
  ["mint(address,uint256)", ["address","uint256"]]
].map(([sig]) => `function ${sig}`);

export default function NativeMint() {
  const [status, setStatus] = useState<string>("");
  const [txHash, setTxHash] = useState<string | null>(null);

  async function ensureBaseSepolia(provider: any) {
    const chainId = await provider.request({ method: "eth_chainId" });
    if (chainId?.toLowerCase() === BASE_SEPOLIA.chainIdHex.toLowerCase()) return;
    try {
      await provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: BASE_SEPOLIA.chainIdHex }],
      });
    } catch (err: any) {
      if (err?.code === 4902) {
        await provider.request({
          method: "wallet_addEthereumChain",
          params: [{
            chainId: BASE_SEPOLIA.chainIdHex,
            chainName: "Base Sepolia",
            nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
            rpcUrls: [BASE_SEPOLIA.rpc],
            blockExplorerUrls: ["https://sepolia.basescan.org"]
          }],
        });
      } else {
        throw err;
      }
    }
  }

  async function onMint() {
    try {
      setStatus("Preparing wallet...");
      setTxHash(null);

      const eth = (window as any).ethereum;
      if (!eth) {
        alert("No EIP-1193 provider found. Please install MetaMask or open via a wallet.");
        return;
      }

      await ensureBaseSepolia(eth);

      const provider = new ethers.BrowserProvider(eth);
      const signer = await provider.getSigner();
      const user = await signer.getAddress();

      setStatus("Probing contract mint functions...");
      let lastError: any = null;

      for (const fragment of ABI_CANDIDATES) {
        try {
          const abi = [fragment as string];
          const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

          let tx;
          if (fragment.includes("(address,string)")) {
            const placeholder = `${window.location.origin}/placeholder.png`;
            tx = await contract[fragment.split(" ")[1].split("(")[0]](user, placeholder);
          } else if (fragment.includes("(address,uint256)")) {
            tx = await contract[fragment.split(" ")[1].split("(")[0]](user, 1);
          } else {
            tx = await contract[fragment.split(" ")[1].split("(")[0]](user);
          }

          setStatus("Waiting for confirmation...");
          const receipt = await tx.wait();
          setTxHash(receipt.hash || tx.hash);
          setStatus("Minted successfully!");
          return;
        } catch (e: any) {
          lastError = e;
          // try next signature
        }
      }

      console.error("All mint candidates failed. Last error:", lastError);
      setStatus("Mint failed. Please provide the contract ABI or exact mint function.");
      alert("Mint failed. Please provide ABI or exact mint() signature for this contract.");
    } catch (e: any) {
      console.error(e);
      setStatus("Mint failed.");
      alert(e?.message || "Mint failed.");
    }
  }

  return (
    <div>
      <button
        onClick={onMint}
        style={{ marginTop: 12, background: "#2563eb", color: "#fff", padding: "10px 14px", borderRadius: 8 }}
      >
        Mint NFT
      </button>
      {status && <p style={{ marginTop: 8, fontSize: 13, color: "#475569" }}>{status}</p>}
      {txHash && (
        <p style={{ marginTop: 8 }}>
          Tx: <a href={`https://sepolia.basescan.org/tx/${txHash}`} target="_blank" rel="noreferrer">{txHash}</a>
        </p>
      )}
    </div>
  );
}
