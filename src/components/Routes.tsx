import { Routes, Route } from 'react-router-dom';
import App from '../App';
import VehicleDetails from './VehicleDetails';

interface AppRoutesProps {
    vehicles: any[];
  }
  
  const AppRoutes: React.FC<AppRoutesProps> = ({ vehicles }) => {
    return (
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/vehicle/:id" element={<VehicleDetails vehicles={vehicles} />} />
      </Routes>
    );
  };
  
  export default AppRoutes;
