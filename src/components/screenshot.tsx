import Image from "next/image";

export default function Screenshot() {
  return (
    <div className="relative mx-9 mt-9 border-4 border-[#171717] rounded-t-lg shadow-md">
      <Image
        width={2100}
        height={1000}
        src={
          "https://res.cloudinary.com/dnfv0h10u/image/upload/v1741896753/Screenshot_2025-03-14_014040_w3k4j4.png"
        }
        alt={""}
        className="w-full h-full object-cover rounded-t-sm"
      />
    </div>
  );
}
