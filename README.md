# BaseProof — WalletConnect + Native Mint (Base Sepolia)

This template uses **WalletConnect v2 (EthereumProvider)** directly + **ethers v6**.
- Connect wallet via QR/modal
- Mint NFT by calling common `mint()` variants on your contract
- Chain: Base Sepolia (84532)
- Vercel-ready SPA

## Env vars (Vercel → Settings → Environment Variables)
- `VITE_REOWN_PROJECT_ID` — your Project ID from https://cloud.reown.com

## Build
- Framework: Vite
- Build: `npm run build`
- Output: `dist`

## Contract address
- `src/components/NativeMint.tsx` → `CONTRACT_ADDRESS`
