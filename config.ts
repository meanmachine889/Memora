import { http, createConfig } from "wagmi";
import { sepolia } from "wagmi/chains";
import { injected } from "wagmi/connectors";

export const config = createConfig({
  connectors: [injected()],
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(
      "https://worldchain-sepolia.g.alchemy.com/v2/OSA4sNtirGuNH_3nxqVsRzps_7njVftj"
    ),
  },
});
