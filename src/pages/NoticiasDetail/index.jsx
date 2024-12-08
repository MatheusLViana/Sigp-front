import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../services/api";
import "./index.css";

function NoticiaDetalhada() {
  const { id } = useParams();
  const [noticia, setNoticia] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNoticia = async () => {
      try {
        const response = await api.get(`/noticias/${id}/`);
        if (response.status === 200) {
          setNoticia(response.data);
          setRelatedNews(response.data.noticias_relacionadas || []);
        } else {
          setError("Erro ao carregar a notícia.");
        }
      } catch (err) {
        setError("Erro ao buscar a notícia. Tente novamente mais tarde.");
        console.error("Erro ao buscar a notícia:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNoticia();
  }, [id]);

  if (loading) return <p>Carregando notícia...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="noticia-detalhada-container">
      <div className="noticia-detalhada">
        <h1 className="noticia-titulo">{noticia.titulo}</h1>
        {noticia.imagem && (
          <div
            className="noticia-imagem"
            style={{ backgroundImage: `url(${noticia.imagem})` }}
          ></div>
        )}
        <p className="noticia-autor">
          Publicado por: {noticia.autor} |{" "}
          {new Date(noticia.data_publicacao).toLocaleDateString("pt-BR")}
        </p>
        <p className="noticia-conteudo">{noticia.conteudo}</p>
      </div>

      {relatedNews.length > 0 && (
        <div className="noticias-relacionadas">
          <h2>Notícias Relacionadas</h2>
          <ul className="relacionadas-list">
            {relatedNews.map((news) => (
              <li key={news.id} className="relacionada-item">
                <div className="relacionada-card">
                  <div
                    className="relacionada-imagem"
                    style={{
                      backgroundImage: `url(${
                        news.imagem || "../assets/newspaper.jpg"
                      })`,
                    }}
                  ></div>
                  <h3 className="relacionada-titulo">{news.titulo}</h3>
                  <p className="relacionada-resumo">{news.resumo}</p>
                  <Link
                    to={`/noticias/${news.id}`}
                    className="relacionada-link"
                  >
                    Ler mais
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default NoticiaDetalhada;
