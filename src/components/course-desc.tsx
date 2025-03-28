/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { toast } from "sonner";

export default function CourseDesc({
  course,
  admin
}: {
  course: Course;
  admin?: boolean;
}) {
  const factoryAddress = "0x10Eb33fE55069795b56Fbff78628b9ee7621319c";
  const { address } = useAccount();
  const [tokenId, setTokenId] = useState<number>();
  const [membership, setMembership] = useState<Date>();
  const [deployState, setDeployState] = useState<string>("");
  async function deployNFT() {
    try {
      setDeployState("deploying");
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
            toast(`Contract Deployed at: ${deployedAddress}`);
            const res = await AddAddress({
              id: course.id,
              address: deployedAddress,
            });
            if (res.ok) {
              toast("Address added to cloud");
              window.location.reload();
              setDeployState("deployed");
              return;
            } else {
              setDeployState("failed");
              toast("Error adding address to cloud deploy again");
            }
          }
        } catch {
          setDeployState("failed");
          continue;
        } finally {
          setDeployState("deployed");
        }
      }

      console.log("Couldn't find MemNFTCreated event in logs");
    } catch (error) {
      toast("Deployment failed");
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
            <p className="md:text-4xl text-xl mb-5">{course.title}</p>
            {!course.address && admin && (
              <Button
                onClick={deployNFT}
                disabled={deployState === "deploying"}
                className="w-fit bg-[#101010] border-2 text-gray-400"
              >
                {deployState === "deploying" ? "Deploying" : "Deploy"}
              </Button>
            )}
          </div>
          {!course.address && (
            <p className="text-xl mb-9 text-gray-500">
              Deploy on blockchain to start minting NFTs
            </p>
          )}
          {course.address && (
            <div className="flex md:flex-row flex-col md:items-center justify-start w-full md:text-lg text-md gap-2 text-gray-500 mt-2">
              Deployed at :{" "}
              <div className="flex h-fit w-fit items-center p-3 py-2 border-[#1b1b1b] border bg-[#101010] text-gray-400 rounded-sm space-x-2">
                {course.address
                  ? `${course.address.slice(0, 11)}...${course.address.slice(
                      -4
                    )}`
                  : "Loading..."}
              </div>
            </div>
          )}
          {course.instructors.length > 0 && (
            <div className="flex md:flex-row flex-col md:items-center justify-start w-full md:text-lg text-md gap-2 text-gray-500 mt-2">
              Created by :{" "}
              <div className="flex h-fit w-fit items-center p-3 py-2 border-[#1b1b1b] border bg-[#101010] text-gray-400 rounded-sm space-x-2">
                {course.instructors[0]
                  ? `${course.instructors[0].slice(
                      0,
                      11
                    )}...${course.instructors[0].slice(-4)}`
                  : "Loading..."}
              </div>
            </div>
          )}
        </div>
      </div>

      {!(address == course.instructors[0]) && (
        <MembershipCard
          membership={membership}
          tokenId={tokenId?.toString()}
          contractAddress={course.address}
        />
      )}


      {!(membership && membership >= new Date() && !(address === course.instructors[0])) && course.address && (
        <div className="flex flex-col w-full">
          <div className="flex md:flex-row flex-col md:gap-7">
            <p className="md:text-2xl text-lg mb-1">Membership NFTs</p>
            {address === course.instructors[0] && course.address && (
              <AddNftDialog id={course.id} />
            )}
          </div>
          <NftStuff
            addressCont={course.address}
            id={course.id}
            admin={address == course.instructors[0]}
          />
        </div>
      )}

      {((membership && membership >= new Date()) ||
        address == course.instructors[0]) && (
        <div className="flex flex-col gap-2 w-full">
          <p className="md:text-2xl text-lg mb-2">Content</p>
          <div className="gap-2 grid md:grid-cols-4 w-full">
            {course.images.map((content, index) => (
              <div key={index} className="relative w-full">
                <Image
                  src={content}
                  alt={""}
                  width={200}
                  height={200}
                  quality={100}
                  className="rounded-md w-full"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
