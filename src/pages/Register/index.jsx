import { useState } from 'react';
import logo from '../../assets/LogoSIGP.png';
import api from '../../services/api'; // Import Axios configurado
import './index.css';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [feedback, setFeedback] = useState(''); // Feedback para o usuário
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/register/', {
        nome_completo: nome,
        cpf,
        email,
        password,
      });

      setFeedback('Cadastro realizado com sucesso! Redirecionando...');
      setTimeout(() => navigate('/login'), 2000); // Redireciona para a tela de login após 2 segundos
    } catch (error) {
      let errorMessage = 'Erro ao realizar o cadastro.';
      if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        if (typeof errors === 'object') {
          errorMessage = Object.values(errors).join(' ');
        } else {
          errorMessage = errors;
        }
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      }
      setFeedback(errorMessage); // Exibe mensagem de erro amigável
    }
  };

  return (
    <div className="blue-card vertical-padding">
      <div className="central-container">
        <div className="logo-container">
          <img src={logo} className="navbar-logo" alt="logo" />
          <p className="page-logo-txt">Sistema Integrado de Gestão Pública</p>
        </div>
        <h1 className="page-title">Cadastre-se</h1>
        <form className="central-form-container" onSubmit={handleRegister}>
          <label htmlFor="nome">Nome Completo</label>
          <input
            className="central-text-input"
            type="text"
            name="nome"
            placeholder="Meu nome completo"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <label htmlFor="cpf">CPF</label>
          <input
            className="central-text-input plus-margin-bottom"
            type="text"
            name="cpf"
            placeholder="Meu CPF"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />
          <label htmlFor="email">E-mail</label>
          <input
            className="central-text-input plus-margin-bottom"
            type="email"
            name="email"
            placeholder="Meu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Senha</label>
          <input
            className="central-text-input"
            type="password"
            name="password"
            placeholder="Minha senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="new-password-check-container">
            <input
              className="login-checkbox"
              type="checkbox"
              id="remember"
              name="remember"
              value="false"
            />
            <label htmlFor="remember"> Quero me lembrar desta senha</label>
          </div>
          <input
            className="login-submit"
            type="submit"
            value="Cadastrar Agora"
          />
        </form>
        {feedback && <p className="feedback-message">{feedback}</p>}
        <p className="central-info-page">Ou cadastre-se com:</p>
        <div className="buttons-container gap-12">
          <a className="login-outline-btn">Google</a>
          <a className="login-outline-btn">Apple</a>
          <a className="login-outline-btn">X</a>
        </div>
        <div className="register-link">
          <p>
            Já possui uma conta? <a href="/login">Fazer Login</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
