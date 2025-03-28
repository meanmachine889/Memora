"use client";

import { useAccount, useDisconnect, WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config } from "../../config";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const queryClient = new QueryClient();
export default function Address() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <AddressProvider />
      </QueryClientProvider>
    </WagmiProvider>
  );
}

function AddressProvider() {
  const router = useRouter();
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const [isClient, setIsClient] = useState(false);

  const disconnectAcc = async () => {
    disconnect();
    router.push("/");
  }

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; 

  return (
    <div className="flex max-w-full items-center space-x-4">
      <div className="flex items-center space-x-4">
        <div className="flex items-center p-3 py-2 border-[#1b1b1b] border bg-[#101010] text-gray-400 rounded-sm space-x-2">
          {address ? `${address.slice(0, 11)}...${address.slice(-4)}` : "Loading..."}
        </div>
      </div>
      <Button
        onClick={disconnectAcc}
        className="px-2 py-4 rounded-sm text-md font-normal bg-[#3f3f3f] text-gray-400 hover:bg-gray-200"
      >
        <LogOut className="h-4 w-4" />
      </Button>
    </div>
  );
}
