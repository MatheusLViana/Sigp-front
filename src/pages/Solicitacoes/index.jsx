import React, { useEffect, useState } from "react";
import api from "../../services/api";
import "./index.css";

function Solicitacoes() {
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSolicitacoes = async () => {
      try {
        const response = await api.get("/solicitacoes/");
        if (response.status === 200) {
          setSolicitacoes(response.data);
        } else {
          throw new Error("Erro ao buscar solicitações.");
        }
      } catch (err) {
        setError(
          "Erro ao carregar as solicitações. Tente novamente mais tarde."
        );
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSolicitacoes();
  }, []);

  if (loading) return <p>Carregando solicitações...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="solicitacoes-container">
      <h1>Minhas Solicitações</h1>
      {solicitacoes.length > 0 ? (
        <ul className="solicitacoes-list">
          {solicitacoes.map((solicitacao) => (
            <li key={solicitacao.id} className="solicitacao-item">
              <h2 className="solicitacao-title">{solicitacao.servico_nome}</h2>
              <p className="solicitacao-status">
                <strong>Status:</strong> {solicitacao.status}
              </p>
              <p className="solicitacao-data">
                <strong>Data da Solicitação:</strong>{" "}
                {new Date(solicitacao.data_solicitacao).toLocaleDateString()}
              </p>
              <p className="solicitacao-comentario">
                <strong>Comentário do Servidor:</strong>{" "}
                {solicitacao.comentario_servidor ||
                  "Sem comentários do servidor."}
              </p>
              <ul className="etapas-list">
                {solicitacao.etapas.map((etapa) => (
                  <li
                    key={etapa.id}
                    className={`etapa-item ${
                      etapa.concluida ? "etapa-concluida" : "etapa-pendente"
                    }`}
                  >
                    {etapa.ordem}. {etapa.nome_etapa}{" "}
                    {etapa.concluida ? "✅" : "⏳"}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-solicitacoes">Nenhuma solicitação encontrada.</p>
      )}
    </div>
  );
}

export default Solicitacoes;
