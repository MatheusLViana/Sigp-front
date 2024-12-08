import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NewPassword from "./pages/NewPassword";
import Register from "./pages/Register";
import Services from "./pages/Services";
import ServiceDetails from "./pages/ServicesDetail";
import Noticias from "./pages/Noticias";
import NoticiaDetalhada from "./pages/NoticiasDetail";
import Indicadores from "./pages/Indicadores";
import Solicitações from "./pages/Solicitacoes";
import SolicitacaoDetalhes from "./pages/SolicitacoesDetail";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Navbar />
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" exact={true} element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/new-password" element={<NewPassword />} />
          <Route path="/register" element={<Register />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:id" element={<ServiceDetails />} />
          <Route path="/noticias" element={<Noticias />} />
          <Route path="/noticias/:id" element={<NoticiaDetalhada />} />
          <Route path="/indicadores" element={<Indicadores />} />
          <Route path="/solicitacoes" element={<Solicitações />} />
          <Route path="/solicitacoes/:id" element={<SolicitacaoDetalhes />} />
        </Routes>
      </div>
      <footer>
        <div className="intern-footer-div">
          <div className="subdiv-row">
            <div className="subdiv-column">
              <a href='#'>SECRETARIAS</a>
              <a href='#'>OUVIDORIA</a>
              <a href='#'>TRANSPARÊNCIA</a>
            </div>
            <div className="subdiv-column">
              <a href='#'>ÁREA DA IMPRENSA</a>
              <a href='#'>CONTATOS ÚTEIS</a>
            </div>
          </div>
          <p className="version-txt">UniCidade 2024 V1.0</p>
        </div>
      </footer>
    </BrowserRouter>
  );
}

export default App;
