import React from "react";
import "./SolicitacaoCard.css";

function SolicitacaoCard({ servico, status, etapasConcluidas, totalEtapas }) {
  const progressPercentage =
    totalEtapas > 0 ? Math.round((etapasConcluidas / totalEtapas) * 100) : 0;

  return (
    <div className="solicitacao-card">
      <div className="solicitacao-card-header">
        <h2 className="solicitacao-card-title">{servico}</h2>
        <span className={`solicitacao-card-tag status-${status.toLowerCase()}`}>
          {status}
        </span>
      </div>
      <div className="solicitacao-card-body">
        <div className="progress-bar-container">
          <div
            className="progress-bar"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <p className="progress-text">
          {etapasConcluidas} de {totalEtapas} etapas concluídas
        </p>
      </div>
    </div>
  );
}

export default SolicitacaoCard;
