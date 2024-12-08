import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../services/api";
import "./index.css";

function ServiceDetails() {
  const { id } = useParams(); // Captura o ID do serviço a partir da URL
  const [service, setService] = useState(null);
  const [solicitacao, setSolicitacao] = useState(null); // Estado para armazenar a solicitação do serviço
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const [serviceResponse, solicitacaoResponse] = await Promise.all([
          api.get(`/services/${id}`),
          api.get("/solicitacoes/"), // Busca todas as solicitações
        ]);

        setService(serviceResponse.data);

        // Verifica se já há uma solicitação para o serviço
        const solicitacaoExistente = solicitacaoResponse.data.results.find(
          (solicitacao) => solicitacao.servico === serviceResponse.data.nome
        );
        setSolicitacao(solicitacaoExistente || null);
      } catch (err) {
        setError(
          "Erro ao carregar os detalhes do serviço. Tente novamente mais tarde."
        );
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceDetails();
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="service-details-container">
      <div className="service-header">
        <h1>{service.nome}</h1>
        <p className="category">Categoria: {service.categoria}</p>
      </div>
      <div className="service-body">
        <p>{service.descricao}</p>
        <h3>Etapas do Serviço</h3>
        <ul className="service-steps">
          {service.etapas.map((etapa) => (
            <li key={etapa.id}>
              <strong>
                {etapa.ordem}. {etapa.nome}
              </strong>
              <p>{etapa.descricao}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="service-actions">
        {solicitacao ? (
          <Link
            to={`/solicitacoes/${solicitacao.id}`}
            className="solicitacao-existente-btn"
          >
            Acompanhar Solicitação
          </Link>
        ) : (
          <button
            onClick={async () => {
              try {
                const response = await api.post("/solicitacoes/", {
                  id_servico: id,
                });
                alert("Solicitação criada com sucesso!");
                setSolicitacao(response.data); // Atualiza a solicitação para mostrar o link
              } catch (err) {
                alert("Erro ao solicitar o serviço. Tente novamente.");
              }
            }}
            className="solicitar-servico-btn"
          >
            Solicitar Serviço
          </button>
        )}
      </div>
    </div>
  );
}

export default ServiceDetails;
