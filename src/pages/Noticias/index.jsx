import { useEffect, useState } from "react";
import Newscard from "../../components/Newscard";
import SearchInput from "../../components/SearchInput";
import "./index.css";
import api from "../../services/api";

function Noticias() {
  const [noticias, setNoticias] = useState([]);
  const [filteredNoticias, setFilteredNoticias] = useState([]); // Lista filtrada
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // Campo de busca

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const response = await api.get("/noticias/");
        if (response.data && response.status === 200) {
          setNoticias(response.data);
          setFilteredNoticias(response.data); // Inicializa com todas as notícias
        } else {
          console.error("Resposta inesperada ao buscar notícias:", response);
          setError("Erro ao buscar as notícias.");
        }
      } catch (err) {
        setError("Erro ao buscar as notícias. Tente novamente mais tarde.");
        console.error("Erro ao buscar notícias:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNoticias();
  }, []);

  // Atualiza as notícias filtradas com base na busca
  useEffect(() => {
    const filtered = noticias.filter((noticia) =>
      noticia.titulo.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredNoticias(filtered);
  }, [searchQuery, noticias]);

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
      />
      <br />
      <br />
      <div className="blue-card">
        <h1 className="page-title">Todas as Notícias</h1>
      </div>
      <div className="noticias-container">
        {loading ? (
          <p>Carregando notícias...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : filteredNoticias.length > 0 ? (
          <ul className="noticias-list">
            {filteredNoticias.map((noticia) => (
              <li className="noticia-item" key={noticia.id}>
                <Newscard
                  id={noticia.id} // Adiciona o ID para o link funcionar
                  imageurl={noticia.imagem}
                  category={noticia.categoria}
                  title={noticia.titulo}
                  resume={noticia.resumo}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className="error-message">Nenhuma notícia encontrada.</p>
        )}
      </div>
    </>
  );
}

export default Noticias;
