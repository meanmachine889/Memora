"use client";
import React from "react";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config } from "../../../../config";
import MyCourses from "@/components/my-courses";

const page = () => {
  const queryClient = new QueryClient();
  return (
    <div>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <div className="flex-1 px-5 w-full h-full min-h-[calc(100vh-3.5rem)]">
            <MyCourses />
          </div>
        </QueryClientProvider>
      </WagmiProvider>
    </div>
  );
};

export default page;
