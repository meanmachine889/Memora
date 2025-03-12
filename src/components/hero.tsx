"use client";
import { Button } from "@/components/ui/button";
import { useAccount, useDisconnect } from "wagmi";
import WalletDialog from "./wallet-dialog";

export default function Hero() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  return (
    <div className="flex flex-col items-center justify-center font-light w-full py-8 md:py-12 lg:py-16 text-white">
      <p className="text-center text-4xl md:text-5xl lg:text-7xl">
        <span className="bg-gradient-to-b from-white to-gray-500 text-transparent bg-clip-text">
          Monetize your Content
        </span>
        <br />
        <span className="text-2xl p-2 md:text-3xl lg:text-4xl bg-gradient-to-b from-gray-300 to-gray-600 text-transparent bg-clip-text mt-2 block">
          Without banks holding you back
        </span>
      </p>
      <p className="text-base md:text-lg mt-5 md:mt-5 w-full md:w-3/4 lg:w-[50%] text-center text-gray-300">
        With our revolutionary NFT Memberships, you can own, trade, and transfer
        your subscriptions without banks, restrictions, or middlemen.
      </p>
      {!address && <WalletDialog />}
      {address && (
        <div className="flex flex-col items-center justify-center mt-8">
            <Button
                onClick={() => disconnect()}
                className="px-4 py-6 rounded-full text-lg font-medium bg-gradient-to-b from-gray-300 to-gray-400 text-black hover:bg-gray-200"
            >
                Disconnect
            </Button>
            <p>{address}</p>
        </div>
      )}
    </div>
  );
}
