import React from "react";
import { useAppKit } from "../lib/reown";

export default function Profile() {
  const { account, chain } = useAppKit();

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "32px" }}>
      <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 16 }}>Profile</h1>
      {!account ? (
        <p>Please connect your wallet to view details.</p>
      ) : (
        <div style={{ background: "#fff", padding: 16, borderRadius: 16, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
          <p style={{ marginBottom: 8 }}><strong>Address:</strong> {account.address}</p>
          {chain && <p><strong>Chain:</strong> {chain.name || chain.id}</p>}
        </div>
      )}
    </div>
  );
}
