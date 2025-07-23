import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Modal from '../components/Modal';
import { useSelector } from 'react-redux';
import CreateOrders from './CreateOrders';

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dashboardItems = useSelector((state) => state.dashboard.dashboardItems);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex">
      <Sidebar onOpenModal={openModal} />

      <div className="flex-1 p-4">
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <CreateOrders onClose={closeModal} />
        </Modal>

        <h2 className="text-xl font-semibold mb-4">Dashboard Data</h2>
        <div className="space-y-2">
          {dashboardItems.map((item) => (
            <div key={item.id} className="bg-gray-100 p-3 rounded shadow-sm">
              <p><strong>ID:</strong> {item.id}</p>
              <p><strong>Customer:</strong> {item.customerName}</p>
              <p><strong>Area:</strong> {item.area}</p>
              <p><strong>Driver:</strong> {item.driver}</p>
              <p><strong>Phone:</strong> {item.phone}</p>
              <p><strong>ETA:</strong> {item.eta} mins</p>
              <p><strong>Status:</strong> {item.status}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
