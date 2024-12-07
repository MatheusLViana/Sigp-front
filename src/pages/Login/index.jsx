import { useState } from 'react';
import api from '../../services/api';
import logo from '../../assets/LogoSIGP.png';
import './index.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [feedback, setFeedback] = useState(''); // Para exibir mensagens de erro ou sucesso

  const handleLogin = async (e) => {
    e.preventDefault(); // Evita o reload da página
    try {
      const response = await api.post('/login/', { email, password });
      const { access_token, refresh_token, perfil, id_usuario } = response.data;

      // Armazena os tokens no localStorage (ou sessionStorage)
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);
      localStorage.setItem('perfil', perfil);
      localStorage.setItem('id_usuario', id_usuario);

      setFeedback('Login realizado com sucesso!');
      // Redirecione o usuário ou realize outras ações
      window.location.href = '/home';
    } catch (error) {
      setFeedback(error.response?.data?.error || 'Erro ao realizar login.');
    }
  };

  return (
    <div className="blue-card vertical-padding">
      <div className="central-container">
        <div className="logo-container">
          <img src={logo} className="navbar-logo" alt="logo" />
          <p className="page-logo-txt">Sistema Integrado de Gestão Pública</p>
        </div>
        <h1 className="page-title">Login</h1>
        <form className="central-form-container" onSubmit={handleLogin}>
          <label htmlFor="email">Seu e-mail</label>
          <input
            className="central-text-input plus-margin-bottom"
            type="text"
            name="email"
            placeholder="Colocar e-mail"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Sua senha</label>
          <input
            className="central-text-input"
            type="password"
            name="password"
            placeholder="Colocar senha"
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="feedback-login">{feedback}</p>
          <div className="form-sub-container">
            <div className="login-check-container">
              <input
                className="login-checkbox"
                type="checkbox"
                id="remember"
                name="remember"
              />
              <label htmlFor="remember"> Lembrar senha</label>
            </div>
            <a href="/new-password">Esqueceu a senha?</a>
          </div>
          <input className="login-submit" type="submit" value="Logar" />
        </form>
        <div className="buttons-container">
          <a className="login-outline-btn">Logar com o Google</a>
          <a className="login-outline-btn">Logar com a Apple</a>
        </div>
        <div className="register-link">
          <p>
            Não tem uma conta? <a href="/register">Cadastre-se</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
