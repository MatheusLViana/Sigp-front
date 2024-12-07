import "./index.css";
import SearchInput from "../../components/SearchInput";
import Servicecard from "../../components/Servicecard"; // Importando o componente
import { useState, useEffect } from "react";
import api from "../../services/api"; // Axios configurado

function Services() {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]); // Lista filtrada
  const [categories, setCategories] = useState([]); // Lista de categorias
  const [selectedCategory, setSelectedCategory] = useState(null); // Categoria selecionada
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // Campo de busca

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get("/services/");
        setServices(response.data);
        setFilteredServices(response.data); // Inicializa a lista filtrada
      } catch (err) {
        setError("Erro ao buscar os serviços. Tente novamente mais tarde.");
        console.error("Erro ao buscar serviços:", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await api.get("/categorias-services/");
        if (response.data && response.status === 200) {
          setCategories(response.data); // Define as categorias
        } else {
          console.error("Resposta inesperada ao buscar categorias:", response);
        }
      } catch (err) {
        console.error("Erro ao buscar categorias:", err);
      }
    };

    fetchServices();
    fetchCategories();
  }, []);

  // Atualiza os serviços filtrados com base na busca e categoria
  useEffect(() => {
    const filtered = services.filter(
      (service) =>
        service.nome.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedCategory ? service.categoria === selectedCategory : true)
    );
    setFilteredServices(filtered);
  }, [searchQuery, selectedCategory, services]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Atualiza o estado da busca
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category); // Alterna seleção
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
              <h3 className="service-search-txt">Buscar por palavras-chave:</h3>
              <SearchInput
                name="services-input"
                placeholder="Ex: IPTU, etc"
                value={searchQuery} // Controla o valor do campo
                onChange={handleSearchChange} // Atualiza o valor quando digitado
              />
            </div>
          </div>
          <br />
          <h3 className="services-filter-txt">Categorias</h3>
          <div className="categories-container">
            {categories.length > 0 ? (
              categories.map((category) => (
                <div
                  key={category.id}
                  className={`category-item ${
                    selectedCategory === category.nome ? "active" : ""
                  }`}
                  onClick={() => handleCategoryClick(category.nome)}
                >
                  {category.nome}
                </div>
              ))
            ) : (
              <p className="error-message">Nenhuma categoria encontrada.</p>
            )}
          </div>
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
                    href={`/services/${service.id}`} // Link para os detalhes do serviço
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
