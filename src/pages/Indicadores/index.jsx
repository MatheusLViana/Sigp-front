import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2"; // Gráfico Doughnut do Chart.js
import "chart.js/auto"; // Import necessário para inicializar o Chart.js
import api from "../../services/api"; // Serviço Axios configurado para chamadas à API
import "./index.css";

function Dashboard() {
  const [chartData, setChartData] = useState(null); // Estado para armazenar os dados do gráfico
  const [loading, setLoading] = useState(true); // Estado para indicar carregamento
  const [error, setError] = useState(null); // Estado para erros

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await api.get("dados/gender-data/"); // Endpoint para buscar dados
        const { labels, counts } = response.data;

        // Configuração dos dados para o gráfico
        setChartData({
          labels,
          datasets: [
            {
              label: "Distribuição por Gênero",
              data: counts,
              backgroundColor: [
                "#FF6384", // Vermelho
                "#36A2EB", // Azul
                "#FFCE56", // Amarelo
                "#4BC0C0", // Verde-água
                "#9966FF", // Roxo
                "#FF9F40", // Laranja
              ],
              hoverBackgroundColor: [
                "#FF6384CC",
                "#36A2EBCC",
                "#FFCE56CC",
                "#4BC0C0CC",
                "#9966FFCC",
                "#FF9F40CC",
              ], // Cores ao passar o mouse
            },
          ],
        });
      } catch (err) {
        console.error("Erro ao carregar os dados do gráfico:", err);
        setError("Erro ao carregar os Dashboard. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, []);

  if (loading) return <p>Carregando Dashboard...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="Dashboard-container">
      <h1 className="Dashboard-title">Distribuição por Gênero</h1>
      <div className="chart-container">
        {chartData ? (
          <Doughnut data={chartData} />
        ) : (
          <p>Não há dados suficientes para exibir o gráfico.</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
