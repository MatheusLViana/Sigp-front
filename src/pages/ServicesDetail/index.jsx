import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../services/api";
import "./index.css";

function ServiceDetails() {
  const { id } = useParams(); // Captura o ID do serviço a partir da URL
  const [service, setService] = useState(null);
  const [solicitacao, setSolicitacao] = useState(null); // Estado para armazenar a solicitação do serviço
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false); // Controle de exibição do modal
  const [error, setError] = useState(null);

  const fetchServiceDetails = async () => {
    try {
      setLoading(true);
      const serviceResponse = await api.get(`/services/${id}`);
      const solicitacaoResponse = await api.get("/solicitacoes/");

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

  useEffect(() => {
    fetchServiceDetails();
  }, [id]);

  const handleSolicitarServico = async () => {
    try {
      const response = await api.post("/solicitacoes/", {
        id_servico: id,
      });
      alert("Solicitação criada com sucesso!");
      setSolicitacao(response.data); // Atualiza a solicitação diretamente
      setShowModal(false); // Fecha o modal após a criação
    } catch (err) {
      console.error(err);
      alert(
        err.response?.data?.message ||
          "Erro ao solicitar o serviço. Tente novamente."
      );
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="service-details-container">
      <div className="service-header">
        <h1>{service?.nome}</h1>
        <p className="category">Categoria: {service?.categoria}</p>
      </div>
      <div className="service-body">
        <p>{service?.descricao}</p>
        <h3>Etapas do Serviço</h3>
        <ul className="service-steps">
          {service?.etapas.map((etapa) => (
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
            to={`/solicitacoes/${solicitacao.id}`} // Corrige o ID da solicitação
            className="solicitacao-existente-btn"
          >
            Acompanhar Solicitação
          </Link>
        ) : (
          <>
            <button
              onClick={() => setShowModal(true)}
              className="solicitar-servico-btn"
            >
              Solicitar Serviço
            </button>

            {showModal && (
              <div className="modal">
                <div className="modal-content">
                  <h2>Confirmar Solicitação</h2>
                  <p>
                    Deseja realmente solicitar este serviço? Esta ação não pode
                    ser desfeita.
                  </p>
                  <div className="modal-actions">
                    <button
                      className="btn confirmar-btn"
                      onClick={handleSolicitarServico}
                    >
                      Sim, solicitar
                    </button>
                    <button
                      className="btn cancelar-btn"
                      onClick={() => setShowModal(false)}
                    >
                      Não, voltar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default ServiceDetails;
