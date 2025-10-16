import React from 'react'
import { ConnectButton, useActiveAccount } from 'thirdweb/react'
import { getContract, createThirdwebClient, defineChain } from 'thirdweb'
import { mintTo } from 'thirdweb/extensions/erc721'

const CONTRACT_ADDRESS = import.meta.env.VITE_THIRDWEB_NFT_CONTRACT_ADDRESS
const client = createThirdwebClient({ clientId: import.meta.env.VITE_THIRDWEB_CLIENT_ID || 'NO_CLIENT_ID' })
const baseSepolia = defineChain(84532)

export default function MintButton() {
  const account = useActiveAccount()

  const handleMint = async () => {
    if (!account) {
      alert('Please connect your wallet first.')
      return
    }
    try {
      const contract = getContract({ client, chain: baseSepolia, address: CONTRACT_ADDRESS })
      const tx = await mintTo({
        contract,
        to: account.address,
        nft: {
          name: 'BaseProof Attendee',
          description: 'Proof of attendance — BaseProof',
          image: `${window.location.origin}/placeholder.png`,
        },
      })
      console.log('Mint tx', tx)
      alert('NFT minted!')
    } catch (e) {
      console.error(e)
      alert('Mint failed. See console for details.')
    }
  }

  return (
    <div>
      <ConnectButton client={client} />
      <button onClick={handleMint} style={{marginTop:12, background:'#2563eb', color:'#fff', padding:'10px 14px', borderRadius:8}}>
        Mint NFT
      </button>
    </div>
  )
}