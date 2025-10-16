import { createAppKit } from "@reown/appkit/react";

export const { ConnectButton, useAppKit } = createAppKit({
  projectId: import.meta.env.VITE_REOWN_PROJECT_ID!,
  theme: "light",
});