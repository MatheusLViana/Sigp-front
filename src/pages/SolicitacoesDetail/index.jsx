import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import "./index.css";

function SolicitacaoDetalhes() {
  const { id } = useParams(); // Captura o ID da solicitação a partir da URL
  const [detalhes, setDetalhes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetalhes = async () => {
      try {
        const response = await api.get(`/solicitacoes/${id}/`);
        setDetalhes(response.data);
      } catch (err) {
        setError("Erro ao carregar os detalhes da solicitação.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetalhes();
  }, [id]);

  if (loading) return <p>Carregando detalhes da solicitação...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="detalhes-solicitacao-container">
      <div className="detalhes-header">
        <h1>{detalhes.servico_nome}</h1>
        <p>
          <strong>Status:</strong> {detalhes.status}
        </p>
        <p>
          <strong>Data da Solicitação:</strong>{" "}
          {new Date(detalhes.data_solicitacao).toLocaleDateString()}
        </p>
      </div>
      <div className="detalhes-body">
        <h3>Etapas da Solicitação</h3>
        <ul className="etapas-list">
          {detalhes.etapas.map((etapa, index) => (
            <li
              key={index}
              className={`etapa-item ${
                etapa.concluida ? "etapa-concluida" : "etapa-pendente"
              }`}
            >
              <strong>
                {etapa.ordem}. {etapa.nome_etapa}
              </strong>
              <p>{etapa.descricao_etapa}</p>
              {etapa.concluida ? <span>✅</span> : <span>⏳</span>}
            </li>
          ))}
        </ul>
        <p>
          <strong>Comentário do Servidor:</strong>{" "}
          {detalhes.comentario_servidor || "Nenhum comentário disponível."}
        </p>
      </div>
    </div>
  );
}

export default SolicitacaoDetalhes;
