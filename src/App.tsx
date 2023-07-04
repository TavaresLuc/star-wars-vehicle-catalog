import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

import { Button, Container, Pages } from './components/Home/styles';

function App() {
  // Definindo a interface do objeto Vehicle
  interface Vehicle {
    name: string;
    url: string;
    model: string;
    cost_in_credits: number;
    length: string;
    cargo_capacity: number;
    vehicle_class: string;
  }

  // Estado para armazenar os veículos
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  // Estado para controlar o carregamento
  
  const [loading, setLoading] = useState(true);
  // Estado para controlar a página atual
  const [currentPage, setCurrentPage] = useState(1);

  // Estado para armazenar o número total de páginas
  const [totalPages, setTotalPages] = useState(1);

  // Função para buscar os veículos de acordo com a página informada
  const getVehicles = (page: number) => {
    setLoading(true);
    axios
      .get(`https://swapi.dev/api/vehicles/?page=${page}`)
      .then((response) => {
        console.log(response);
        
        // Verifica se a lista de veículos retornada está vazia
        if (response.data.results.length === 0) {
          // Incrementa o valor da página atual e chama a função novamente
          // Essa função serve para pular para a próxima página caso uma página seja excluída da API e fique um gap na paginação
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

  // Buscar os veículos ao alterar a página atual
  useEffect(() => {
    getVehicles(currentPage);
  }, [currentPage]);

  // Filtrando os veículos com cost_in_credits maior que 0
  const filteredVehicles = vehicles.filter((vehicle) => vehicle.cost_in_credits > 0);

  return (
    <Container>
      <h1>Veículos</h1>
      {loading ? (
        <div> 
          <p className="loader"></p>
          <p className="loading"> Carregando... </p>
        </div>
      ) : (
        <>
          <div className='pagination'>
            <Pages className="page" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
              Página Anterior
            </Pages>
            <Pages className="page" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
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
                  <Button>Quero esse!</Button>
                </li>
              ))
            ) : (
              <li>Nenhum veículo disponível.</li>
            )}
          </ul>
          <div className='pagination'>
            <Pages className="page" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
              Página Anterior
            </Pages>
            <Pages className="page" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
              Próxima Página
            </Pages>
          </div>
        </>
      )}
    </Container>
  );
}

export default App;

