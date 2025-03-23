/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import CourseCard, { Course } from "./CourseCard";
import FormDialog from "@/components/form-dialog";
import factoryAbi from "../../ethereum/abi/MemNftFactory.json";
import contractAbi from "../../ethereum/abi/MemNft.json";
import { ethers } from "ethers";

export default function MyCourses() {
  const { address } = useAccount();
  const [courses, setCourses] = useState<Course[]>([]);
  const factoryAddress = "0x10Eb33fE55069795b56Fbff78628b9ee7621319c";
  const deployedContract = "0x4728FcaFF52e21eA8216AbfeBe12cF2fcb38e493";
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(
          `/api/get-courses?instructor=${address?.toString()}`
        );
        const data = await res.json();
        console.log(data);
        setCourses(data.courses);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCourses();
  }, [address]);

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
            return;
          }
        } catch (error) {
          continue;
        }
      }

      console.log("Couldn't find MemNFTCreated event in logs");
    } catch (error) {
      console.error("Deployment failed:", error);
    }
  }

  async function getDeployedContracts() {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(factoryAddress, factoryAbi, signer);

      const address = await signer.getAddress();
      console.log("Current address:", address);

      const deployedContracts = await contract.getCreatorContracts(address);
      console.log("Deployed contracts:", deployedContracts);

      const totalDeployedCount = await contract.getDeployedContractsCount();
      console.log("Total contracts deployed on platform:", totalDeployedCount);

      return deployedContracts;
    } catch (error) {
      console.error("Failed to get deployed contracts:", error);
      return [];
    }
  }

  async function getOwner() {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        deployedContract,
        contractAbi,
        signer
      );

      const address = await signer.getAddress();
      console.log("Current address:", address);

      const owner = await contract.owner();
      console.log("Owner of contract:", owner);

      const symbol = await contract.symbol();
      console.log("Symbol of contract:", symbol);

      const name = await contract.name();
      console.log("Name of contract:", name);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="py-4 flex flex-col justify-start items-start">
      <div className="flex justify-between items-center w-full">
        <p className="text-2xl mb-9">Your Courses</p>
        <FormDialog />
      </div>
      {courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-full">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} admin={true} />
          ))}
        </div>
      ) : (
        <div className="text-white">No courses found</div>
      )}
      <button onClick={deployNFT}>🚀 Deploy MemNFT</button>
      <button onClick={getDeployedContracts}>📜 Get Deployed Contracts</button>
      <button onClick={getOwner}>👑 Get ooowner</button>
    </div>
  );
}
