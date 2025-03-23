import Image from "next/image";
import { Course } from "./CourseCard";
import UploadForm from "./image-upload";
import { Button } from "./ui/button";
import { ethers } from "ethers";
import factoryAbi from "../../ethereum/abi/MemNftFactory.json";

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
    <div className="flex-1 py-4 min-w-full h-full flex flex-col justify-start items-start min-h-[calc(100vh-3.5rem)]">
      <div className="w-full flex justify-between">
        <div className="flex flex-col">
          <p className="text-4xl mb-2">{course.title}</p>
          <p className="text-xl mb-9 text-gray-500">
            {!course.address && "Not deployed yet"}
          </p>
        </div>
        {!course.address && admin && <Button onClick={deployNFT} className="">Deploy</Button>}
      </div>
      <p className="text-2xl mb-5">Content</p>
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
      <UploadForm />
    </div>
  );
}
