import EthereumProvider from "@walletconnect/ethereum-provider";

export const BASE_SEPOLIA_ID = 84532;

export async function initWalletConnect(projectId: string) {
  if (!projectId) throw new Error("VITE_REOWN_PROJECT_ID is missing");

  // 1️⃣ создаём провайдер
  const provider = await EthereumProvider.init({
    projectId,
    chains: [BASE_SEPOLIA_ID],
    showQrModal: true,
    rpc: { [BASE_SEPOLIA_ID]: "https://sepolia.base.org" },
    metadata: {
      name: "BaseProof",
      description: "WalletConnect + Native Mint (Base Sepolia)",
      url: typeof window !== "undefined" ? window.location.origin : "https://example.com",
      icons: ["https://walletconnect.com/meta/favicon.ico"],
    },
  });

  // 2️⃣ если уже подключён – просто вернуть
  const accounts = await provider.accounts;
  if (accounts && accounts.length > 0) return provider;

  // 3️⃣ если нет — вызвать connect(), чтобы открыть QR-модал
  await provider.connect();

  return provider;
}
