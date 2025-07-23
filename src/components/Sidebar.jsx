import { useState } from 'react';
import {
  MdDashboard,
  MdAccountBalanceWallet,
  MdLocationCity,
  MdAssessment,
  MdSettings,
  MdStore
} from 'react-icons/md';
import Modal from './Modal';
import CreateOrders from '../pages/dashboard/CreateOrders';

const sidebarItems = [
  { id: 1, label: 'Dashboard', icon: <MdDashboard />, path: '/dashboard' },
  { id: 2, label: 'Wallet', icon: <MdAccountBalanceWallet />, path: '/wallet' },
  { id: 3, label: 'Branch', icon: <MdLocationCity />, path: '/branch' },
  { id: 4, label: 'Reports', icon: <MdAssessment />, path: '/reports' },
  { id: 5, label: 'Settings', icon: <MdSettings />, path: '/settings' },
];

export default function Sidebar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-full md:w-72 h-screen p-4">
      <div className="bg-black text-white flex flex-col h-full rounded-2xl p-5 justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2 text-[#d2fb00] mb-8">
            <MdStore />
            Verdi Delivery
          </h2>

          <div className="space-y-2">
            {sidebarItems.map((item) => (
              <div
                key={item.id}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition-all
                ${item.path === '/dashboard' ? 'bg-[#d2fb00] text-black font-semibold' : 'hover:bg-gray-800'}`}
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full bg-[#d2fb00] hover:bg-[#c0ea00] text-black font-semibold py-2 rounded-lg transition-all"
        >
          + Create Order
        </button>
      </div>

  {isModalOpen && (
  <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
    <CreateOrders onClose={() => setIsModalOpen(false)} /> 
  </Modal>
)}
    </div>
  );
}
