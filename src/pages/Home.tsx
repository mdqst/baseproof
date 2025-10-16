import React from 'react'
import QRCode from 'react-qr-code'
import MintButton from '../components/MintButton'

export default function Home() {
  const eventId = 'event-001'
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://example.com'
  const eventUrl = `${baseUrl}/mint?event=${eventId}`

  return (
    <div style={{maxWidth:960, margin:'0 auto', padding:'32px'}}>
      <header style={{marginBottom:24}}>
        <h1 style={{fontSize:28, fontWeight:600}}>BaseProof — NFT Attendance Tracker</h1>
        <p style={{color:'#475569'}}>Scan QR to mint your attendance badge on Base Sepolia.</p>
      </header>

      <div style={{display:'grid', gridTemplateColumns: '1fr 1fr', gap:24}}>
        <section style={{background:'#fff', padding:16, borderRadius:16, boxShadow:'0 1px 3px rgba(0,0,0,0.06)'}}>
          <h2 style={{fontSize:18, fontWeight:600, marginBottom:8}}>QR for Mint</h2>
          <div style={{display:'flex', justifyContent:'center', padding:12}}>
            <QRCode value={eventUrl} size={200} />
          </div>
          <p style={{fontSize:12, color:'#64748b', wordBreak:'break-all'}}>{eventUrl}</p>
        </section>

        <section style={{background:'#fff', padding:16, borderRadius:16, boxShadow:'0 1px 3px rgba(0,0,0,0.06)'}}>
          <h2 style={{fontSize:18, fontWeight:600, marginBottom:8}}>Mint NFT</h2>
          <p style={{fontSize:14, color:'#475569'}}>Connect your wallet and click “Mint NFT”. A placeholder image will be stored in the NFT metadata.</p>
          <div style={{marginTop:16}}>
            <MintButton />
          </div>
        </section>
      </div>
    </div>
  )
}