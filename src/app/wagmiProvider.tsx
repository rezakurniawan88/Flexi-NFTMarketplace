import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import { createConfig, http, WagmiProvider } from "wagmi";
import { sepolia } from "wagmi/chains";
import { metaMaskWallet, walletConnectWallet, injectedWallet } from "@rainbow-me/rainbowkit/wallets";

const connectors = connectorsForWallets(
    [
        {
            groupName: "Recommended",
            wallets: [metaMaskWallet, walletConnectWallet, injectedWallet],
        },
    ],
    {
        appName: "Flexi | NFT Marketplace",
        projectId: "940ac0a819b2f1487b7a1aeebae654a2"
    }
)

const wagmiConfig = createConfig({
    chains: [sepolia],
    transports: {
        [sepolia.id]: http(process.env.SEPOLIA_RPC_URL as string),
    },
    connectors
});

export default function WagmiProviderWithConfig({ children }: { children: React.ReactNode }) {
    return <WagmiProvider config={wagmiConfig}>{children}</WagmiProvider>;
}
