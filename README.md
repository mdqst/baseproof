# BaseProof (Thirdweb v5 + Vite)

Fully working minimal dApp:
- Connect wallet (Thirdweb React v5 `ConnectButton`)
- Mint ERC-721 NFT on Base Sepolia
- View owned NFTs on /profile

> Reown: once your deploy works, you can swap the ConnectButton to Reown AppKit. This template guarantees a successful Vercel build first.

## Env Vars (Vercel → Settings → Environment Variables)
- `VITE_THIRDWEB_CLIENT_ID` — create at https://thirdweb.com/dashboard (free)
- `VITE_THIRDWEB_NFT_CONTRACT_ADDRESS` — your ERC-721 contract address on Base Sepolia

## Build settings (Vercel)
- Framework: Vite
- Build command: `npm run build`
- Output dir: `dist`

## SPA routing
`vercel.json` already included with SPA rewrite.

(rebuild trigger)
