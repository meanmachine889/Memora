import Image from "next/image";
import { Course } from "./CourseCard";
import UploadForm from "./image-upload";
import { Button } from "./ui/button";
import { ethers } from "ethers";
import factoryAbi from "../../ethereum/abi/MemNftFactory.json";
import AddAddress from "@/app/helpers/addAddress";
import NftStuff from "./nft";
import AddNftDialog from "./addNftDialog";

export default function CourseDesc({
  course,
  admin,
}: {
  course: Course;
  admin?: boolean;
}) {
  const factoryAddress = "0x10Eb33fE55069795b56Fbff78628b9ee7621319c";

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

  return (
    <div className="flex-1 py-4 min-w-full h-full flex gap-5 flex-col justify-start items-start min-h-[calc(100vh-3.5rem)]">
      <div className="w-full flex justify-between">
        <div className="flex flex-col">
          <p className="text-4xl mb-5">{course.title}</p>
          {!course.address && (
            <p className="text-xl mb-9 text-gray-500">Not deployed yet</p>
          )}
          {course.address && (
            <div className="flex h-fit items-center p-3 py-2 border-[#1b1b1b] border bg-[#101010] text-gray-400 rounded-sm space-x-2">
              {course.address
                ? `${course.address.slice(0, 11)}...${course.address.slice(-4)}`
                : "Loading..."}
            </div>
          )}
        </div>
        {!course.address && admin && (
          <Button onClick={deployNFT} className="">
            Deploy
          </Button>
        )}
      </div>
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
      <p className="text-2xl mb-2">Membership NFTs</p>
      {/* <Customers /> */}
      <AddNftDialog id={course.id} />
      <NftStuff addressCont={course.address} />
    </div>
  );
}
