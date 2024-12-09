import React, { useEffect, useState } from "react";
import { Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import api from "../../services/api";
import "./index.css";

// Registre os elementos do Chart.js
ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

function Dashboard() {
  const [genderData, setGenderData] = useState(null);
  const [districtData, setDistrictData] = useState(null);
  const [incomeData, setIncomeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [genderResponse, districtResponse, incomeResponse] =
          await Promise.all([
            api.get("dados/gender-distribution/"),
            api.get("dados/district-distribution/"),
            api.get("dados/income-distribution/"),
          ]);

        setGenderData({
          labels: genderResponse.data.labels,
          datasets: [
            {
              data: genderResponse.data.counts,
              backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
            },
          ],
        });

        setDistrictData({
          labels: districtResponse.data.labels,
          datasets: [
            {
              label: "População por Distrito",
              data: districtResponse.data.counts,
              backgroundColor: "#36A2EB",
            },
          ],
        });

        setIncomeData({
          labels: incomeResponse.data.labels,
          datasets: [
            {
              label: "Renda Média por Distrito",
              data: incomeResponse.data.avg_incomes,
              backgroundColor: "#FFCE56",
            },
          ],
        });
      } catch (err) {
        console.error("Erro ao carregar os dados do dashboard:", err);
        setError("Erro ao carregar os dados. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <p>Carregando dados do dashboard...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Dashboard Demográfico</h1>
        <p>Visão Geral dos Dados Populacionais</p>
      </header>

      <section className="metrics-container">
        <div className="metric-card">
          <h2>Total de Gêneros</h2>
          <p>{genderData?.datasets[0].data.reduce((a, b) => a + b, 0)}</p>
        </div>
        <div className="metric-card">
          <h2>Distritos Monitorados</h2>
          <p>{districtData?.labels.length}</p>
        </div>
        <div className="metric-card">
          <h2>Média de Renda</h2>
          <p>
            R${" "}
            {incomeData?.datasets[0].data.reduce((a, b) => a + b, 0).toFixed(2)}
          </p>
        </div>
      </section>

      <section className="charts-container">
        <div className="chart-item">
          <h3>Distribuição por Gênero</h3>
          <Doughnut data={genderData} />
        </div>
        <div className="chart-item">
          <h3>População por Distrito</h3>
          <Bar data={districtData} />
        </div>
        <div className="chart-item">
          <h3>Renda Média por Distrito</h3>
          <Bar data={incomeData} />
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
