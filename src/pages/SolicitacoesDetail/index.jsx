import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./index.css";

function SolicitacaoDetalhada() {
  const { id } = useParams();
  const [solicitacao, setSolicitacao] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSolicitacao = async () => {
      try {
        const response = await api.get(`/solicitacoes/${id}/`);
        setSolicitacao(response.data);
      } catch (err) {
        console.error(err);
        setError("Erro ao carregar os detalhes da solicitação.");
      } finally {
        setLoading(false);
      }
    };

    fetchSolicitacao();
  }, [id]);

  const handleDelete = async () => {
    try {
      await api.delete(`/solicitacoes/${id}/`);
      alert("Solicitação cancelada com sucesso!");
      navigate("/solicitacoes");
    } catch (err) {
      console.error("Erro ao cancelar solicitação:", err);
      alert("Erro ao cancelar a solicitação.");
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="solicitacao-detalhada-container">
      <header className="solicitacao-header">
        <h1>{solicitacao.servico_nome}</h1>
        <p>
          Status: <strong>{solicitacao.status}</strong>
        </p>
        <p>
          Data da Solicitação:{" "}
          <strong>
            {new Date(solicitacao.data_solicitacao).toLocaleDateString()}
          </strong>
        </p>
      </header>
      <section className="solicitacao-etapas">
        <h3>Etapas</h3>
        <ul>
          {solicitacao.etapas.map((etapa) => (
            <li
              key={etapa.id}
              className={`etapa-item ${
                etapa.concluida ? "etapa-concluida" : "etapa-pendente"
              }`}
            >
              <span>
                {etapa.ordem}. {etapa.nome_etapa}
              </span>
              <span>{etapa.concluida ? "✔" : "❌"}</span>
            </li>
          ))}
        </ul>
      </section>
      <button className="btn cancelar-btn" onClick={() => setShowModal(true)}>
        Cancelar Solicitação
      </button>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Tem certeza?</h2>
            <p>
              Deseja realmente cancelar esta solicitação? Esta ação não pode ser
              desfeita.
            </p>
            <div className="modal-actions">
              <button className="btn confirmar-btn" onClick={handleDelete}>
                Sim, cancelar
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
    </div>
  );
}

export default SolicitacaoDetalhada;
