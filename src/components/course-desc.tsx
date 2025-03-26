/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Image from "next/image";
import { Course } from "./CourseCard";
import { Button } from "./ui/button";
import { ethers } from "ethers";
import factoryAbi from "../../ethereum/abi/MemNftFactory.json";
import contractAbi from "../../ethereum/abi/MemNft.json";
import AddAddress from "@/app/helpers/helpers";
import NftStuff from "./nft";
import AddNftDialog from "./addNftDialog";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import MembershipCard from "./membership-status";

export default function CourseDesc({
  course,
  admin,
}: {
  course: Course;
  admin?: boolean;
}) {
  const factoryAddress = "0x10Eb33fE55069795b56Fbff78628b9ee7621319c";
  const { address } = useAccount();
  const [tokenId, setTokenId] = useState<number>();
  const [membership, setMembership] = useState<Date>();
  async function deployNFT() {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(factoryAddress, factoryAbi, signer);

      const tx = await contract.createMemNFT("My Course NFT", "MCNFT");
      console.log("Transaction sent:", tx.hash);

      const receipt = await tx.wait();
      console.log("Transaction confirmed:", receipt);

      const _interface = new ethers.Interface(factoryAbi);
      const eventName = "MemNFTCreated";

      for (const log of receipt.logs) {
        try {
          const parsedLog = _interface.parseLog({
            topics: log.topics,
            data: log.data,
          });

          if (parsedLog && parsedLog.name === eventName) {
            const deployedAddress = parsedLog.args[1];
            console.log("New NFT Contract Address:", deployedAddress);
            alert(`NFT Contract Deployed at: ${deployedAddress}`);
            const res = await AddAddress({
              id: course.id,
              address: deployedAddress,
            });
            console.log(res);
            if (res.ok) {
              alert("Address added to course");
              window.location.reload();
            } else {
              alert("Error adding address to course");
            }
            return;
          }
        } catch {
          continue;
        }
      }

      console.log("Couldn't find MemNFTCreated event in logs");
    } catch (error) {
      console.error("Deployment failed:", error);
    }
  }

  async function getTokenId(address: `0x${string}`) {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(
        course.address,
        contractAbi,
        provider
      );

      const tid = await contract.existingMembership(address);
      const tokenIdInt = Number(tid);

      console.log("Raw Token ID (BigInt):", tid);
      console.log("Converted Token ID (Number):", tokenIdInt);
      setTokenId(tokenIdInt);

      console.log("State after setTokenId:", tokenIdInt);
    } catch (error) {
      console.error("Failed to get token ID:", error);
      setTokenId(undefined);
    }
  }
  async function getMembership(tokenId: number) {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(
        course.address,
        contractAbi,
        provider
      );
      const tid = BigInt(tokenId);
      const mem = await contract.expirationTimeStamps(tid);
      const expirationdate = new Date(Number(mem) * 1000);
      setMembership(expirationdate);
      console.log("Membership expires on:", expirationdate);
      console.log("Raw membership timestamp:", mem);
    } catch (error) {
      console.error("Failed to get membership:", error);
      return undefined;
    }
  }

  useEffect(() => {
    if (address) {
      getTokenId(address);
    }
  }, [address]);

  useEffect(() => {
    if (tokenId !== undefined && tokenId !== -1) {
      console.log("Getting membership for token ID:", tokenId);
      getMembership(tokenId);
    }
  }, [tokenId]);

  return (
    <div className="flex-1 py-4 min-w-full h-full flex flex-col gap-9 justify-start items-start min-h-[calc(100vh-3.5rem)]">
      <div className="w-full flex gap-7 justify-start">
        <div className="flex flex-col">
          <div className="flex gap-7">
            <p className="text-4xl mb-5">{course.title}</p>
            {!course.address && admin && (
              <Button
                onClick={deployNFT}
                className="w-fit bg-[#101010] border-2 text-gray-400"
              >
                Deploy
              </Button>
            )}
          </div>
          {!course.address && (
            <p className="text-xl mb-9 text-gray-500">
              Deploy on blockchain to start minting NFTs
            </p>
          )}
          {course.address && (
            <div className="flex h-fit w-fit items-center p-3 py-2 border-[#1b1b1b] border bg-[#101010] text-gray-400 rounded-sm space-x-2">
              {course.address
                ? `${course.address.slice(0, 11)}...${course.address.slice(-4)}`
                : "Loading..."}
            </div>
          )}
        </div>
      </div>

      {true && (
        <MembershipCard
          membership={membership}
          tokenId={tokenId?.toString()}
          contractAddress={course.address}
        />
      )}

      {!(membership && membership >= new Date()) && !(address == course.instructors[0]) && course.address && (
        <div className="flex flex-col w-full">
          <div className="flex gap-7">
            <p className="text-2xl mb-1">Membership NFTs</p>
            {admin && course.address && <AddNftDialog id={course.id} />}
          </div>
          <NftStuff addressCont={course.address} id={course.id} admin={address == course.instructors[0]} />
        </div>
      )}

      {((membership && membership >= new Date()) || admin) && (
        <div className="flex flex-col gap-2">
          <p className="text-2xl mb-2">Content</p>
          <div className="gap-3 grid grid-cols-4 w-full">
            {course.images.map((content, index) => (
              <div key={index} className="flex flex-col relative items-center">
                <Image
                  src={content}
                  alt={""}
                  width={400}
                  height={200}
                  quality={100}
                  className="rounded-md"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
