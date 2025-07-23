import { FaBuildingColumns } from "react-icons/fa6";

export default function Navbar() {
  return (
    <nav className="bg-black m-6 rounded-2xl text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
        
        {/* Left Section - Branch Info */}
        <div className="flex items-center gap-2">
          <div className="text-lg text-red-300">
            <FaBuildingColumns />
          </div>
          <div className="grid">
            <div className="text-[10px] text-gray-400">Branch</div>
            <div className="text-sm sm:text-md font-semibold">Downtown Store</div>
          </div>
        </div>

        {/* Right Section - Wallet Balance */}
        <div className="bg-gray-900 rounded-2xl flex gap-2 items-center px-4 py-2 text-sm sm:text-base">
          <div className="text-gray-200">Wallet Balance</div>
          <div className="text-[#d2fb00] font-semibold">$2,454.50</div>
        </div>

      </div>
    </nav>
  );
}
