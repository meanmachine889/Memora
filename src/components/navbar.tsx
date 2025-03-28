"use client";

import { Loader } from "lucide-react";
import WalletNavbar from "./wallet-navbar";
import { useAccount, useDisconnect } from "wagmi";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <nav className="flex items-center justify-center py-3 w-screen max-w-screen text-white">
      <div className="w-[95%] flex md:flex-row flex-col md:gap-0 gap-4 items-center justify-center md:justify-between">
        <div className="flex items-center space-x-2">
          <Loader className="font-thin" />
          <h1 className="text-2xl font-thin">Memora</h1>
        </div>

        {!address && <WalletNavbar />}
        {address && (
          <div className=" items-center gap-4 flex">
            <div className="flex items-center gap-4">
              <div className="flex items-center p-3 py-2 border-[#1b1b1b] border bg-[#101010] rounded-sm space-x-2">
                <span>
                  {address?.slice(0, 6)}...{address?.slice(-4)}
                </span>
              </div>
            </div>
            <Button
              onClick={() => disconnect()}
              className="px-2 py-5 rounded-sm text-md font-normal bg-gradient-to-b from-gray-300 to-gray-400 text-black hover:bg-gray-200"
            >
              Disconnect
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
