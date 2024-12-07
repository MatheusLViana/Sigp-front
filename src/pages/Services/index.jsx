import './index.css';
import SearchInput from '../../components/SearchInput';
import Servicecard from '../../components/Servicecard';
import ComboBoxMenu from '../../components/ComboBoxMenu';
import { useState, useEffect } from 'react';
import api from '../../services/api'; // Axios configurado

function Services() {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]); // Lista filtrada
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(''); // Campo de busca

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get('/services/');
        setServices(response.data);
        setFilteredServices(response.data); // Inicializa a lista filtrada
      } catch (err) {
        setError('Erro ao buscar os serviços. Tente novamente mais tarde.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Atualiza os serviços filtrados com base na busca
  useEffect(() => {
    const filtered = services.filter((service) =>
      service.nome.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setFilteredServices(filtered);
  }, [searchQuery, services]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Atualiza o estado da busca
  };

  return (
    <>
      <SearchInput
        name="main-input"
        placeholder="O que você procura no momento? Ex: consulta de IPVA, dados da saúde, etc"
        value={searchQuery} // Controla o valor do campo
        onChange={handleSearchChange} // Atualiza o valor quando digitado
        boxShadows={true}
      />
      <br />
      <br />
      <div className="blue-card">
        <h1 className="page-title">Buscar Serviços</h1>
      </div>
      <div className="services-container">
        <div className="container-32">
          <div className="blue-card">
            <div className="intern-container">
              <h3 className="service-search-txt">Buscar por palavras chave:</h3>
              <SearchInput
                name="services-input"
                placeholder="Ex: IPTU, etc"
                value={searchQuery} // Controla o valor do campo
                onChange={handleSearchChange} // Atualiza o valor quando digitado
              />
            </div>
          </div>
          <br />
          <h3 className="services-filter-txt">Filtros em ordem de:</h3>
          <hr />
          <ComboBoxMenu title="Categorias" />
          <ComboBoxMenu title="Status" />
        </div>
        <div className="container-64">
          {loading ? (
            <p>Carregando serviços...</p>
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : (
            <ul className="services-list">
              {filteredServices.map((service) => (
                <li className="service-item" key={service.id}>
                  <Servicecard
                    category={service.categoria}
                    title={service.nome}
                    href={`/services/${service.id}`} // Exemplo de link para detalhes
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

export default Services;
