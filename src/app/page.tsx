"use client";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import {
  WagmiProvider,
} from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config } from "../../config";

export default function Home() {
  const queryClient = new QueryClient();
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <div className="flex flex-col items-center justify-start min-h-screen py-2 font-[family-name:var(--font-poppins)]">
          <Navbar />
          <Hero />
        </div>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
