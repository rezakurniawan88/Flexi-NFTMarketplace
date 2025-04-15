"use client";

import "@rainbow-me/rainbowkit/styles.css";
import { darkTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import WagmiProviderWithConfig from "./wagmiProvider";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <WagmiProviderWithConfig>
                <QueryClientProvider client={queryClient}>
                    <RainbowKitProvider modalSize="compact" theme={darkTheme({
                        ...darkTheme.accentColors.purple,
                    })}>
                        {children}
                    </RainbowKitProvider>
                </QueryClientProvider>
            </WagmiProviderWithConfig>
        </SessionProvider>
    );
}
