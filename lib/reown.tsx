import { createAppKit } from "@reown/appkit/react";

export const appKit = createAppKit({
  projectId: import.meta.env.VITE_REOWN_PROJECT_ID!,
  theme: "light",
  // 👇 структура, которую теперь требует SDK
  networks: {
    caipNetworks: [
      {
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
      },
    ],
  },
});

export const ConnectButton = appKit.ConnectButton;
export const useAppKit = appKit.useAppKit;
