import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import "./index.css";

function ServiceDetails() {
  const { id } = useParams(); // Captura o ID do serviço a partir da URL
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [solicitacaoStatus, setSolicitacaoStatus] = useState(""); // Para feedback de solicitação

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const response = await api.get(`/services/${id}`);
        setService(response.data);
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

  const handleSolicitarServico = async () => {
    try {
      const response = await api.post("/solicitacoes/", { id_servico: id });
      if (response.status === 201) {
        setSolicitacaoStatus("Solicitação criada com sucesso!");
      } else {
        throw new Error("Erro ao criar solicitação.");
      }
    } catch (err) {
      setSolicitacaoStatus(
        err.response?.data?.detail || "Erro ao solicitar serviço."
      );
    }
  };

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
      <button className="solicitar-btn" onClick={handleSolicitarServico}>
        Solicitar Serviço
      </button>
      {solicitacaoStatus && <p className="feedback">{solicitacaoStatus}</p>}
      <div className="related-services">
        <h3>Serviços Relacionados</h3>
        <ul>
          {service.servicos_relacionados.map((relacionado) => (
            <li key={relacionado.id}>
              <a href={`/services/${relacionado.id}`}>{relacionado.nome}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ServiceDetails;
