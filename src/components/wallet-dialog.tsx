"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Loader } from "lucide-react";
import { useConnectors, useConnect } from "wagmi";
import RoundButton from "./round-button";

export default function WalletDialog() {
  const wallets = useConnectors();
  const { connect } = useConnect();
  return (
    <Dialog>
      <DialogTrigger>
        <RoundButton />
      </DialogTrigger>
      <DialogContent className="border-[#171717] font-[family-name:var(--font-poppins)]  text-white p-6 rounded-lg">
        <DialogHeader className="flex flex-col justify-center items-center text-center">
          <DialogTitle className="flex flex-col gap-3 items-center text-gray-300 font-thin text-3xl">
            <Loader size={30} /> Connect to Memora
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4 items-center justify-center flex w-[100%]">
          <div className="flex flex-col w-[85%] bg-[#101010] rounded-xl">
            {wallets.map((wallet, index) => (
              <Button
                key={wallet.name}
                onClick={() => connect({ connector: wallet })}
                className={`px-6 py-6 text-lg font-thin hover:bg-[#101010] bg-[#101010] justify-start text-gray-400 rounded-lg ${
                  index === 0
                    ? ""
                    : "border-t-2 border-[#1a1a1a] rounded-t-none"
                }`}
              >
                {wallet.name}
              </Button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
