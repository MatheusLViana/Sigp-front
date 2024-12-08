import React, { useState } from "react";
import { useAuth } from "../../components/AuthContext";
import logo from "../../assets/LogoSIGP.png";
import "./index.css";

function Login() {
  const { login } = useAuth(); // Pega a função de login do contexto
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState(""); // Para exibir mensagens de erro ou sucesso

  const handleLogin = async (e) => {
    e.preventDefault(); // Evita o reload da página
    try {
      await login(email, password); // Executa o login pelo contexto
      setFeedback("Login realizado com sucesso!");
      window.location.href = "/home"; // Redireciona o usuário
    } catch (error) {
      setFeedback(error.response?.data?.error || "Erro ao realizar login.");
    }
  };

  return (
    <div className="blue-card vertical-padding">
      <div className="central-container">
        <div className="logo-container">
          <img src={logo} className="central-logo" alt="logo" />
          <p className="page-logo-txt">UniCidade</p>
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
