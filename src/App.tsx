import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Container, Pages } from './components/Home/styles';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import VehicleDetails from './components/VehicleDetails';

import './App.css';



interface Vehicle {
  name: string;
  url: string;
  model: string;
  cost_in_credits: number;
  length: string;
  cargo_capacity: number;
  vehicle_class: string;
}

const App: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  

  const getVehicles = (page: number) => {
    setLoading(true);
    axios
      .get(`https://swapi.dev/api/vehicles/?page=${page}`)
      .then((response) => {
        if (response.data.results.length === 0) {
          setCurrentPage((prevPage) => prevPage + 1);
        } else {
          setVehicles(response.data.results);
          setTotalPages(Math.ceil(response.data.count / response.data.results.length));
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log('Vehicles not found', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    getVehicles(currentPage);
  }, [currentPage]);

  const filteredVehicles = vehicles.filter((vehicle) => vehicle.cost_in_credits > 0);

  return (
    <Router>
      <Container>
        {loading ? (
          <div>
            <p className="loader"></p>
            <p className="loading"> Carregando... </p>
          </div>
        ) : (
          <>
            <div className="header">
              <img src="./src/assets/SW-logo.png" alt="SW Logo" className="logo"></img>
            </div>
            <div className="pagination">
              <Pages
                className="page"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Página Anterior
              </Pages>
              <Pages
                className="page"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Próxima Página
              </Pages>
            </div>
            <ul>
              {filteredVehicles.length > 0 ? (
                filteredVehicles.map((vehicle) => (
                  <li key={vehicle.name}>
                    <span>{vehicle.name}</span>
                    <p>
                      <span>Modelo: </span>
                      {vehicle.model}
                    </p>
                    <p>
                      <span>Classe: </span> {vehicle.vehicle_class}
                    </p>
                    <p>
                      <span>Tamanho: </span>
                      {vehicle.length} metros
                    </p>
                    <p>
                      <span>Capacidade: </span>
                    </p>
                    <p>
                      <span>Capacidade: </span>
                      {vehicle.cargo_capacity} Kg
                    </p>
                    <p>
                      <span>Valor: R$</span>
                      {vehicle.cost_in_credits}
                    </p>
                    <Link to={`/vehicle/${vehicle.name}`}>
                      <Button onClick={() => useNavigate()}>Quero esse!</Button>
                    </Link>
                  </li>
                ))
              ) : (
                <li>Nenhum veículo disponível.</li>
                )}
                </ul>
        
                <div className="pagination">
                  <Pages
                    className="page"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Página Anterior
                  </Pages>
                  <Pages
                    className="page"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Próxima Página
                  </Pages>
                </div>
        
                <Routes>
                <Route path="/" element="App"/>
                <Route path="/vehicle/:id" element={<VehicleDetails vehicles={vehicles} />} />
                </Routes>





              </>
            )}
          </Container>
        </Router>
        
  );
}

export default App;

