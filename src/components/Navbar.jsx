import { List } from 'react-bootstrap-icons';
import logo from '../assets/LogoSIGP.png';
import './Navbar.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const [click, setClick] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Verifica se o token existe ao carregar o componente
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setIsAuthenticated(!!token); // Define se o usuário está autenticado
  }, []);

  const handleLogout = () => {
    // Remove tokens do armazenamento
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('perfil');
    localStorage.removeItem('id_usuario');

    setIsAuthenticated(false); // Atualiza o estado de autenticação
    navigate('/home'); // Redireciona explicitamente para a página Home
  };

  const handleClick = () => setClick(!click);

  return (
    <div className={click ? 'navbar active' : 'navbar'}>
      <div className="navbar-container">
        <a className="logo-container" href="/home">
          <img src={logo} className="navbar-logo" alt="logo" />
          <p className="navbar-logo-txt">UniCidade</p>
        </a>
        <div className="links-container">
          <a className="navbar-thin-link" href="/services">
            Serviços
          </a>
          <a className="navbar-thin-link" href="/ouvidoria">
            Ouvidoria
          </a>
          <a className="navbar-thin-link" href="/status">
            Status de Serviços
          </a>
        </div>
        <div className="login-container">
          {isAuthenticated ? (
            <button className="login-btn logout-btn" onClick={handleLogout}>
              SAIR
            </button>
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
      <ul className={click ? 'mobile-menu-list active' : 'mobile-menu-list'}>
        <li>
          <a className="navbar-thin-link" href="/services">
            Serviços
          </a>
        </li>
        <li>
          <a className="navbar-thin-link" href="/ouvidoria">
            Ouvidoria
          </a>
        </li>
        <li>
          <a className="navbar-thin-link" href="/status">
            Status de Serviços
          </a>
        </li>
        {isAuthenticated ? (
          <li>
            <button className="login-btn logout-btn" onClick={handleLogout}>
              SAIR
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
