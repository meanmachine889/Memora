/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import { useAccount, WagmiProvider } from "wagmi";
import { ethers } from "ethers";
import contractAbi from "../../ethereum/abi/MemNft.json";
import { config } from "../../config";
import Image from "next/image";
import { Button } from "./ui/button";
import { getNFTs } from "@/app/helpers/helpers";
import { Input } from "./ui/input";
import { toast } from "sonner";

interface NftMetadata {
  name: string;
  description: string;
  price: string;
  image: string;
  attributes: {
    contentId: string;
    duration: string;
  };
}

export function Nft({
  addressCont,
  id,
  admin,
}: {
  addressCont: string;
  id: string;
  admin?: boolean;
}) {
  const deployedContract = addressCont;
  const { address } = useAccount();
  const [nftData, setNftData] = useState<NftMetadata[]>([]);
  const [metadataURIs, setMetadataURIs] = useState<string[]>([]);
  const [receiver, setReceiver] = useState<string>("");
  const [Loading, setLoading] = useState<boolean>(false);
  const [minting, setMinting] = useState<boolean>(false);

  useEffect(() => {
    async function fetchMetadata() {
      setLoading(true);
      const res = await getNFTs({ id });
      console.log(res);
      setMetadataURIs(res);
      const data = await Promise.all(
        res.map(async (uri: string) => {
          try {
            const response = await fetch(uri);
            return response.json();
          } catch (error) {
            toast("Error fetching NFTs");
            return null;
          }
        })
      );
      setNftData(data.filter((item) => item !== null));
      setLoading(false);
    }

    fetchMetadata();
  }, [id]);

  async function mintNft(tokenURI: string, index: number) {
    try {
      setMinting(true);
      const pro = new ethers.BrowserProvider(window.ethereum);
      const signer = await pro.getSigner();
      const contract = new ethers.Contract(
        deployedContract,
        contractAbi,
        signer
      );

      const nft = nftData[index];
      const duration = nft.attributes?.duration
        ? parseInt(nft.attributes.duration)
        : 180;

      alert(`Minting NFT with duration: ${duration} days`);

      const rec = receiver ? receiver : address;
      const tx = await contract.mintNFT(rec, duration, tokenURI, {
        gasLimit: 500000,
      });
      await tx.wait();
      toast(`NFT minted successfully to ${rec}`);
    } catch (error) {
      console.error("Minting error:", error);
      toast("Error minting NFT");
    } finally {
      setMinting(false);
    }
  }

  return (
    <div className="flex flex-col w-full mt-5">
      <div className="grid md:grid-cols-4 gap-3 w-full">
        {!Loading && nftData.length === 0 && (
          <div className="text-gray-500">No NFTs found</div>
        )}
        {Loading && <div>Loading NFTs</div>}
        {!Loading &&
          nftData.map((nft, index) => (
            <div
              key={index}
              className="flex flex-col items-stretch border-2 rounded-lg overflow-hidden shadow-sm hover:shadow-md bg-[#101010] transition-shadow"
            >
              <div className="relative w-full rounded-sm aspect-[11/9]">
                <Image
                  src={nft.image || "/placeholder.svg"}
                  alt={nft.name}
                  layout="fill"
                  className="object-cover "
                />
              </div>

              <div className="flex flex-col justify-between py-2 px-2 w-full flex-1 ">
                <div className="flex flex-col gap-2 flex-1 items-start">
                  <h3 className="font-normal text-gray-300 text-lg">
                    {nft.name}
                  </h3>
                  <p className="text-sm text-gray-600">{nft.description}</p>
                </div>

                {admin && (
                  <div className="flex justify-start gap-3 mt-4">
                    <Input
                      onChange={(e) => setReceiver(e.target.value)}
                      placeholder={`${address}`}
                    />
                    <Button
                      variant={"outline"}
                      disabled={minting}
                      onClick={() => mintNft(metadataURIs[index], index)}
                      className="flex items-center text-gray-300 gap-1 rounded-md"
                    >
                      <span>mint</span>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default function NftStuff({
  addressCont,
  id,
  admin,
}: {
  addressCont: string;
  id: string;
  admin?: boolean;
}) {
  return (
    <WagmiProvider config={config}>
      <Nft addressCont={addressCont} id={id} admin={admin} />
    </WagmiProvider>
  );
}
