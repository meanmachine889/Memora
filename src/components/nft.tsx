"use client"

import { useEffect, useState } from "react"
import { useAccount, WagmiProvider } from "wagmi"
import { ethers } from "ethers"
import contractAbi from "../../ethereum/abi/MemNft.json"
import { config } from "../../config"
import Image from "next/image"
import { Button } from "./ui/button"
import { getNFTs } from "@/app/helpers/helpers"

interface NftMetadata {
  name: string
  description: string
  price: string
  image: string
  attributes: any[]
}

export function Nft({ addressCont, id }: { addressCont: string; id: string }) {
  const deployedContract = addressCont

  const hardcodedRecipient = "0x24013dd89F619013476A054e520060562A1dEea7"
  const [nftData, setNftData] = useState<NftMetadata[]>([])
  const [metadataURIs, setMetadataURIs] = useState<string[]>([])

  useEffect(() => {
    async function fetchMetadata() {
      const res = await getNFTs({ id })
      console.log(res)
      setMetadataURIs(res)
      const data = await Promise.all(
        res.map(async (uri: string) => {
          try {
            const response = await fetch(uri)
            return response.json()
          } catch (error) {
            console.error("Error fetching metadata:", error)
            return null
          }
        }),
      )
      setNftData(data.filter((item) => item !== null)) // Remove nulls
    }

    fetchMetadata()
  }, [id])

  async function mintNft(tokenURI: string) {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      const contract = new ethers.Contract(deployedContract, contractAbi, signer)

      const tx = await contract.mintNFT(hardcodedRecipient, 180, tokenURI)
      await tx.wait()
      console.log(`NFT minted successfully: ${tokenURI}`)
    } catch (error) {
      console.error("Error minting NFT:", error)
    }
  }

  return (
    <div className="flex flex-col w-full mt-5">
      <div className="grid md:grid-cols-4 gap-3 w-full">
        {nftData.map((nft, index) => (
          <div
            key={index}
            className="flex flex-col items-stretch border-2 rounded-lg overflow-hidden shadow-sm hover:shadow-md bg-[#101010] transition-shadow"
          >
            <div className="relative w-full rounded-sm aspect-[11/9]">
              <Image src={nft.image || "/placeholder.svg"} alt={nft.name} layout="fill" className="object-cover " />
            </div>

            <div className="flex justify-between py-2 px-2 w-full flex-1 ">
              <div className="flex flex-col gap-2 flex-1 items-start">
                <h3 className="font-normal text-gray-300 text-lg">{nft.name}</h3>
                <p className="text-sm text-gray-600">{nft.description}</p>
              </div>

              <div className="flex justify-start mt-4">
                <Button variant={"outline"} onClick={() => mintNft(metadataURIs[index])} className="flex items-center text-gray-300 gap-1 rounded-full">
                  <span>Mint</span>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function NftStuff({
  addressCont,
  id,
}: {
  addressCont: string
  id: string
}) {
  return (
    <WagmiProvider config={config}>
      <Nft addressCont={addressCont} id={id} />
    </WagmiProvider>
  )
}

