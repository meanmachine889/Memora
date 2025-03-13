"use client";
import { Button } from "@/components/ui/button";
import { useAccount } from "wagmi";
import WalletDialog from "./wallet-dialog";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Screenshot from "./screenshot";

export default function Hero() {
  const { address } = useAccount();
  return (
    <div className="flex bg-[#101010] w-[95%] rounded-xl flex-col mt-5 items-center justify-between font-light pt-8 md:pt-12 lg:pt-16 text-white">
      <p className="text-center text-4xl md:text-5xl lg:text-7xl mt-4">
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
            className="px-4 py-6 rounded-sm text-lg  transition-all font-normal bg-gradient-to-b from-gray-300 to-gray-400 text-gray-900 hover:bg-gray-200"
          >
            <Link className="gap-2 hover:gap-4 transition-all flex items-center" href={"/dashboard"}>
              Dashboard <ArrowRight className="" />
            </Link>
          </Button>
        </div>
      )}
      <Screenshot />
    </div>
  );
}
