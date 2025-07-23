import React from 'react'
import AppRoutes from './routes/Approutes'
import { useSelector } from 'react-redux';
import { openModal } from './features/dashboardSlice';


const App = () => {
    const modalOpen = useSelector((state) => state.dashboard.modalOpen);

  return (
    <div>
      
      <AppRoutes />;
      {modalOpen && <CreateOrders />}


    </div>
  )
}

export default App
