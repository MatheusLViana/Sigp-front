import React, { useState } from "react";
import { useAuth } from "../components/AuthContext";
import { BoxArrowLeft, List } from "react-bootstrap-icons";
import logo from "../assets/LogoSIGP.png";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { user, logout } = useAuth();
  const [click, setClick] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => setClick(!click);

  const handleLogout = () => {
    logout();
    navigate("/home");
  };

  return (
    <div className={click ? "navbar active" : "navbar"}>
      <div className="navbar-container">
        <a className="logo-container" href="/home">
          <img src={logo} className="navbar-logo" alt="logo" />
          <p className="navbar-logo-txt">UniCidade</p>
        </a>
        <div className="links-container">
          <a className="navbar-thin-link" href="/services">
            Serviços
          </a>
          <a className="navbar-thin-link" href="/Noticias">
            Notícias
          </a>
          <a className="navbar-thin-link" href="/Dashboard">
            Indicadores
          </a>
          {user && (
            <a className="navbar-thin-link" href="/solicitacoes">
              Solicitações
            </a>
          )}
        </div>
        <div className="login-container">
          {user ? (
            <>
              <span className="navbar-greeting">
                Olá, {user.nome_completo.split(" ")[0]}!
              </span>
              <button className="logout-btn" onClick={handleLogout}>
                <BoxArrowLeft size={32} />
                <span>SAIR</span>
              </button>
            </>
          ) : (
            <>
              <a className="login-btn" href="/login">
                ENTRAR
              </a>
              <a className="register-btn" href="/register">
                CADASTRAR-SE
              </a>
            </>
          )}
        </div>
        <div className="menu-icon" onClick={handleClick}>
          <List size={36} />
        </div>
      </div>
      <ul className={click ? "mobile-menu-list active" : "mobile-menu-list"}>
        {user && (
          <span className="navbar-greeting">
            Olá, {user.nome_completo.split(" ")[0]}!
          </span>
        )}
        <li>
          <a className="navbar-thin-link" href="/services">
            Serviços
          </a>
        </li>
        <li>
          <a className="navbar-thin-link" href="/Noticias">
            Notícias
          </a>
        </li>
        <li>
          <a className="navbar-thin-link" href="/Dashboard">
            Dashboard
          </a>
        </li>
        {user && (
          <li>
            <a className="navbar-thin-link" href="/solicitacoes">
              Solicitações
            </a>
          </li>
        )}
        {user ? (
          <li>
            <button className="logout-btn" onClick={handleLogout}>
              <BoxArrowLeft size={32} />
              <span>SAIR</span>
            </button>
          </li>
        ) : (
          <>
            <li>
              <a className="login-btn" href="/login">
                ENTRAR
              </a>
            </li>
            <li>
              <a className="register-btn" href="/register">
                CADASTRAR-SE
              </a>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default Navbar;
