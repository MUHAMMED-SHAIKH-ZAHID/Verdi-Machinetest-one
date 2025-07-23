import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addDashboardItem } from '../../features/dashboardSlice';

const CreateOrders = ({onClose}) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    customerName: '',
    area: '',
    driver: '',
    phone: '',
    eta: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
      dispatch(addDashboardItem(formData)); 
       onClose();
  };

  return (
    <div className="fixed inset-0  bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-md">
        <h2 className="text-lg font-semibold mb-4">Create Order</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input name="customerName" value={formData.customerName} onChange={handleChange} placeholder="Customer Name" className="w-full border p-2 rounded" required />
          <input name="area" value={formData.area} onChange={handleChange} placeholder="Area" className="w-full border p-2 rounded" required />
          <input name="driver" value={formData.driver} onChange={handleChange} placeholder="Driver" className="w-full border p-2 rounded" required />
          <input name="phone" value={formData.phone} type='number' onChange={handleChange} placeholder="Phone" className="w-full border p-2 rounded" required />
          <input name="eta" value={formData.eta} type='number' onChange={handleChange} placeholder="ETA (in minutes)" className="w-full border p-2 rounded" required />
          <button type="submit" className="bg-[#d2fb00] hover:bg-[#d9fb00] hover:cursor-pointer text-black text-xl font-medium px-4 py-2 rounded w-full">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CreateOrders;
