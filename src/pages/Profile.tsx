import React, { useEffect, useState } from 'react'
import { useActiveAccount } from 'thirdweb/react'
import { getContract, createThirdwebClient, defineChain } from 'thirdweb'
import { getOwnedNFTs } from 'thirdweb/extensions/erc721'

const CONTRACT_ADDRESS = import.meta.env.VITE_THIRDWEB_NFT_CONTRACT_ADDRESS
const client = createThirdwebClient({ clientId: import.meta.env.VITE_THIRDWEB_CLIENT_ID || 'NO_CLIENT_ID' })
const baseSepolia = defineChain(84532)

export default function Profile() {
  const account = useActiveAccount()
  const [nfts, setNfts] = useState<any[]>([])

  useEffect(() => {
    if (!account) return
    const run = async () => {
      const contract = getContract({ client, chain: baseSepolia, address: CONTRACT_ADDRESS })
      const owned = await getOwnedNFTs({ contract, owner: account.address })
      setNfts(owned)
    }
    run()
  }, [account])

  return (
    <div style={{maxWidth:960, margin:'0 auto', padding:'32px'}}>
      <h1 style={{fontSize:24, fontWeight:600, marginBottom:16}}>Your NFTs</h1>
      {!account && <p>Please connect your wallet to view your NFTs.</p>}
      <div style={{display:'grid', gridTemplateColumns:'repeat(4, minmax(0, 1fr))', gap:16}}>
        {nfts.map((nft, idx) => (
          <div key={idx} style={{background:'#fff', padding:12, borderRadius:12, boxShadow:'0 1px 3px rgba(0,0,0,0.06)'}}>
            <img src={nft.metadata?.image} alt={nft.metadata?.name} style={{width:'100%', borderRadius:8}} />
            <p style={{marginTop:8, fontSize:14, fontWeight:600}}>{nft.metadata?.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}