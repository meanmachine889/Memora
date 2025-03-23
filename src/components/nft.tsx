/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import { useAccount, WagmiProvider } from "wagmi";
import { ethers } from "ethers";
import contractAbi from "../../ethereum/abi/MemNft.json";
import { config } from "../../config";
import Image from "next/image";
import { Button } from "./ui/button";

interface NftMetadata {
  name: string;
  description: string;
  price: string;
  image: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  attributes: any[];
}

export function Nft({ addressCont }: { addressCont: string }) {
  const { address } = useAccount();
  const deployedContract = addressCont;

  // Array of metadata URIs
  const metadataURIs = [
    "https://gateway.pinata.cloud/ipfs/QmXv7FeQSmojY77ypzUDKh4o6AuGENmqSt9auTXZYyK3pi",
    "https://gateway.pinata.cloud/ipfs/QmXv7FeQSmojY77ypzUDKh4o6AuGENmqSt9auTXZYyK3pi",
    "https://gateway.pinata.cloud/ipfs/QmXv7FeQSmojY77ypzUDKh4o6AuGENmqSt9auTXZYyK3pi",
    "https://gateway.pinata.cloud/ipfs/QmXv7FeQSmojY77ypzUDKh4o6AuGENmqSt9auTXZYyK3pi",
    "https://gateway.pinata.cloud/ipfs/QmXv7FeQSmojY77ypzUDKh4o6AuGENmqSt9auTXZYyK3pi",
  ];

  const hardcodedRecipient = "0x24013dd89F619013476A054e520060562A1dEea7";
  const [nftData, setNftData] = useState<NftMetadata[]>([]);

  useEffect(() => {
    async function fetchMetadata() {
      const data = await Promise.all(
        metadataURIs.map(async (uri) => {
          try {
            const response = await fetch(uri);
            return response.json();
          } catch (error) {
            console.error("Error fetching metadata:", error);
            return null;
          }
        })
      );
      setNftData(data.filter((item) => item !== null)); // Remove nulls
    }

    fetchMetadata();
  }, []);

  async function mintNft(tokenURI: string) {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        deployedContract,
        contractAbi,
        signer
      );

      const tx = await contract.mintNFT(hardcodedRecipient, 180, tokenURI);
      await tx.wait();
      console.log(`NFT minted successfully: ${tokenURI}`);
    } catch (error) {
      console.error("Error minting NFT:", error);
    }
  }

  return (
    <div className="flex flex-col items-center w-[100%]">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-[100%]">
        {nftData.map((nft, index) => (
          <div key={index} className="w-[100%]">
            <div key={index} className="relative aspect-square items-center rounded-lg">
              <Image
                src={nft.image}
                alt={nft.name}
                layout="fill"
                className="object-cover rounded-md mb-2"
              />
            </div>
            <p className="font-normal">{nft.name}</p>
            <p className="text-sm text-gray-600">{nft.description}</p>
            <Button
              onClick={() => mintNft(metadataURIs[index])}
              className="mt-2 px-4 py-2 rounded-md"
            >
              Mint {nft.name}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function NftStuff({ addressCont }: { addressCont: string }) {
  return (
    <WagmiProvider config={config}>
      <Nft addressCont={addressCont} />
    </WagmiProvider>
  );
}
