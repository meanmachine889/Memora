// import { useWriteContract , useReadContract } from "wagmi";
// import contractABI from "../public/MemNFTFactory.json";

// const factoryAddress = "0xYourFactoryContractAddress"; // Update this
// const { writeContract } = useWriteContract()

// // 🟢 Deploy a new MemNFT contract
// export function useDeployMemNFT() {
//   return useWriteContract ({
//     address: factoryAddress,
//     abi: contractABI,
//     functionName: "createMemNFT",
//   });
// }

// // 🟢 Fetch deployed contracts for a creator
// export function useCreatorContracts(address: string) {
//   return useReadContract({
//     address: factoryAddress,
//     abi: contractABI,
//     functionName: "getCreatorContracts",
//     args: [address],
//   });
// }
