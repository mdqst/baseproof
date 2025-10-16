import React from "react";
import { useActiveAccount } from "thirdweb/react";
import { getContract, createThirdwebClient, defineChain } from "thirdweb";
import { mintTo } from "thirdweb/extensions/erc721";
import { createAppKit } from "@reown/appkit/react";

const CONTRACT_ADDRESS = import.meta.env.VITE_THIRDWEB_NFT_CONTRACT_ADDRESS!;
const clientId = import.meta.env.VITE_THIRDWEB_CLIENT_ID!;
const reownId = import.meta.env.VITE_REOWN_PROJECT_ID!;
const client = createThirdwebClient({ clientId });
const baseSepolia = defineChain(84532);

// ✅ инициализация Reown SDK (без отдельного адаптера)
const appKit = createAppKit({
  projectId: reownId,
  theme: "light",
  features: {
    analytics: true,
    email: false,
  },
});

export default function MintButton() {
  const account = useActiveAccount();

  const handleMint = async () => {
    if (!account) {
      alert("Please connect your wallet first.");
      return;
    }

    try {
      const contract = getContract({ client, chain: baseSepolia, address: CONTRACT_ADDRESS });
      const tx = await mintTo({
        contract,
        to: account.address,
        nft: {
          name: "BaseProof Attendee",
          description: "Proof of attendance — BaseProof",
          image: `${window.location.origin}/placeholder.png`,
        },
      });
      console.log("Mint tx:", tx);
      alert("NFT minted!");
    } catch (e) {
      console.error(e);
      alert("Mint failed. See console for details.");
    }
  };

  return (
    <div>
      {/* ✅ Кнопка подключения Reown */}
      <appKit.ConnectButton />
      <button
        onClick={handleMint}
        style={{
          marginTop: 12,
          background: "#2563eb",
          color: "#fff",
          padding: "10px 14px",
          borderRadius: 8,
        }}
      >
        Mint NFT
      </button>
    </div>
  );
}
