"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "./ui/button";
import contractAbi from "../../ethereum/abi/MemNft.json";
import { ethers } from "ethers";
import { useState } from "react";
import { Input } from "./ui/input";
import { toast } from "sonner";

interface MembershipCardProps {
  membership?: Date | null;
  tokenId?: string | null;
  contractAddress?: string | null;
}

export default function MembershipCard({
  membership,
  tokenId,
  contractAddress,
}: MembershipCardProps) {
  const isActive = membership && membership >= new Date();
  const [receiver, setReceiver] = useState<string>("");
  const [state, setState] = useState("");
  async function transferNFT() {
    try {
      setState("loading");
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider!.getSigner();
      const Contract = new ethers.Contract(
        contractAddress!,
        contractAbi,
        signer
      );

      const tx = await Contract.transferMembership(
        receiver,
        tokenId
      );
      await tx.wait();
      toast("Membership transferred successfully to " + receiver);
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    } catch (error) {
      toast(error instanceof Error ? error.message.split(":")[1].trim() : "An unknown error occurred");
    } finally {
      setState("");
    }
  }

  return (
    <Card className="bg-[#101010] border-[#1a1a1a] w-full max-w-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-zinc-500 md:text-lg text-sm font-normal">
          Membership Status
        </CardTitle>
        {isActive && (
          <Badge
            variant="outline"
            className="bg-green-500/20 text-green-400 border-green-700 px-1 md:px-3 py-1"
          >
            <CheckCircle2 className="w-4 h-4 mr-1" />
            Active
          </Badge>
        )}
        {!isActive && (
          <Badge variant="outline" className="px-3 py-1 font-normal">
            Inactive
          </Badge>
        )}
      </CardHeader>
      {isActive && (
        <CardContent className="gap-2 flex flex-col">
          <div className="flex justify-between w-full">
            {membership && (
              <div className="flex items-center space-x-3">
                <div className="md:text-lg text-sm">
                  <p className="text-sm text-zinc-400">Expires on</p>
                  <p className="text-gray-300 font-normal">
                    {membership.toDateString()}
                  </p>
                </div>
              </div>
            )}

            {tokenId && (
              <div className="flex items-center justify-between space-x-3">
                <Badge className="bg-[#101010] border-[#1a1a1a] border-2">
                  <p className="text-sm text-zinc-400">NFT ID : </p>
                  <p className="text-gray-300 font-mono font-normal">
                    {tokenId}
                  </p>
                </Badge>
              </div>
            )}
          </div>

          {membership && tokenId && <Separator className="bg-zinc-800 my-2" />}

          <div className="flex justify-between gap-3">
            <Input
              value={receiver}
              onChange={(e) => setReceiver(e.target.value)}
            />
            <Button
              onClick={() => transferNFT()}
              disabled = {state ==  "loading" || !receiver}
              className="bg-[#101010] border-2 text-gray-300 hover:bg-[#1a1a1a]"
            >
              {state == "loading" ? "Transferring..." : "Transfer"}
              <ArrowRight />
            </Button>
          </div>
        </CardContent>
      )}
      {!isActive && (
        <CardContent className="gap-2 flex flex-col">
          <div className="flex items-center space-x-3">
            <div>
              <p className="text-sm text-zinc-400">
                Get a membership to view content
              </p>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
