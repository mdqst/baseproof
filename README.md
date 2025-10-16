# BaseProof — WalletConnect + Network Switch (Base / Base Sepolia)

- WalletConnect v2 EthereumProvider (no AppKit, no thirdweb)
- Network switcher (Base ↔ Base Sepolia), default = Base Sepolia
- Auto wallet_switchEthereumChain / wallet_addEthereumChain
- Native mint via ethers v6 (contract fixed to Sepolia address)
- Vercel-ready (Vite, SPA rewrite)

## Env vars
- VITE_REOWN_PROJECT_ID — from https://cloud.reown.com

## Build
- Framework: Vite
- Build: npm run build
- Output: dist
