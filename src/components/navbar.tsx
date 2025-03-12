import { Loader } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between w-full py-4 px-8 text-white shadow-md">
      <div className="flex items-center space-x-2">
      <Loader className="font-thin" />
        <h1 className="text-2xl font-thin">
          Memora
        </h1>
      </div>
      {/* <div className="flex items-center space-x-4">
          <a href="#" className="px-4 py-2 rounded-full bg-white text-black">
            Home
          </a>
          <a href="#" className="px-4 py-2 rounded-full bg-gray-800 hover:bg-gray-700">
            Pricing
          </a>
          <a href="#" className="px-4 py-2 rounded-full bg-gray-800 hover:bg-gray-700">
            Our Cards
          </a>
          <a href="#" className="px-4 py-2 rounded-full bg-gray-800 hover:bg-gray-700">
            Customers
          </a>
          <a href="#" className="px-4 py-2 rounded-full bg-gray-800 hover:bg-gray-700">
            Contact
          </a>
        </div> */}
    </nav>
  );
}
