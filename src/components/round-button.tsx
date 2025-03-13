import { ArrowRight } from "lucide-react";

export default function RoundButton() {
  return (
    <div className="mt-8 px-5 py-3 items-center cursor-pointer transition-all rounded-full flex gap-3 hover:gap-5 text-lg font-normal bg-gradient-to-b from-gray-300 to-gray-500 text-gray-900 hover:bg-gray-200">
      Get Started{" "}
      <div className="rounded-full bg-gray-900 p-1">
        <ArrowRight className="text-white" />
      </div>
    </div>
  );
}
