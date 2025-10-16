import { createAppKit, walletConnectAdapter } from "@reown/appkit/react";

// Base Sepolia network configuration (CAIP-style)
const baseSepolia = {
  id: "eip155:84532",
  name: "Base Sepolia",
  chainNamespace: "eip155",
  rpcUrls: ["https://sepolia.base.org"],
  blockExplorerUrls: ["https://sepolia.basescan.org"],
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
};

export const appKit = createAppKit({
  projectId: import.meta.env.VITE_REOWN_PROJECT_ID || "",
  theme: "light",
  networks: {
    caipNetworks: [baseSepolia],
  },
  // 👇 это обязательное поле; без него extendCaipNetworks ломается
  adapters: [walletConnectAdapter()],
});

export const ConnectButton = appKit.ConnectButton;
export const useAppKit = appKit.useAppKit;
