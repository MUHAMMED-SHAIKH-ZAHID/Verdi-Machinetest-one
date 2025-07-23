import { Routes, Route,  } from 'react-router-dom';
import DashboardLayout from '../layout/DashboardLayout';
import Error from '../components/Error';


const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
        <DashboardLayout />
        }
      >
          </Route>
                <Route path="*" element={<Error />} />

    </Routes>
  );
};

export default AppRoutes;
