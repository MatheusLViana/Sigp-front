import React, { useEffect, useState } from "react";
import api from "../../services/api";
import SolicitacaoCard from "../../components/SolicitacaoCard";
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
          setSolicitacoes(response.data.results); // Pega a lista de solicitações do backend
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
              <SolicitacaoCard
                servico={solicitacao.servico} // Nome do serviço
                status={solicitacao.status} // Status
                etapasConcluidas={solicitacao.etapas_concluidas} // Etapas concluídas
                totalEtapas={solicitacao.total_etapas} // Total de etapas
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhuma solicitação encontrada.</p>
      )}
    </div>
  );
}

export default Solicitacoes;
