import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



interface Vehicle {
  name: string;
  model: string;
  cost_in_credits: number;
  length: string;
  cargo_capacity: number;
  vehicle_class: string;
}

interface VehicleDetailsParams {
  id: string;
  [key: string]: string;
}

interface VehicleDetailsProps {
  vehicles: Vehicle[];
}

const VehicleDetails: React.FC<VehicleDetailsProps> = ({ vehicles }) => {
  const { id } = useParams<VehicleDetailsParams>();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);

  const navigate = useNavigate();


  useEffect(() => {
    const selectedVehicle = vehicles.find((vehicle) => vehicle.name === id);
    setVehicle(selectedVehicle || null);
  }, [id, vehicles]);

  if (!vehicle) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h2>{vehicle.name}</h2>
      <p>Modelo: {vehicle.model}</p>
      <p>Classe: {vehicle.vehicle_class}</p>
      <p>Tamanho: {vehicle.length} metros</p>
      <p>Capacidade: {vehicle.cargo_capacity} Kg</p>
      <p>Valor: R${vehicle.cost_in_credits}</p>
    </div>
  );
};

export default VehicleDetails;
