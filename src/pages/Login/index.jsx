import { useState } from 'react';
import logo from '../../assets/LogoSIGP.png'
import './index.css';

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('') 

  return (
    <div className='blue-card vertical-padding'>
      <div className='central-container'>
        <div className='logo-container'>
            <img src={logo} className="navbar-logo" alt="logo" />
            <p className='page-logo-txt'>Sistema Integrado de Gestão Pública</p>
        </div>
        <h1 className='page-title'>Login</h1>
        <form className='central-form-container'>
          <label htmlFor='email'>Seu e-mail</label>
          <input className='central-text-input plus-margin-bottom'
              type='text'
              name='email'
              placeholder='Colocar e-mail'
              onChange={setEmail}
          />
          <label htmlFor='password'>Sua senha</label>
          <input className='central-text-input'
              type='password'
              name='password'
              placeholder='Colocar senha'
              onChange={setPassword}
          />
          <p className='feedback-login'>A senha deve conter ao menos 8 caracteres</p>
          <div className='form-sub-container'>
              <div className='login-check-container'>
                  <input className='login-checkbox' type="checkbox" id="remember" name="remember" value="false" />
                  <label htmlFor="remember"> Lembrar senha</label>
              </div>
              <a href='/new-password'>Esqueceu a senha?</a>
          </div>
          <input className="login-submit" type="submit" value="Logar" />
        </form>
        <div className='buttons-container'>
            <a className='login-outline-btn'>Logar com o Google</a>
            <a className='login-outline-btn'>Logar com a Apple</a>
        </div>
        <div className='register-link'>
            <p>Não tem uma conta? <a href='/register'>Cadastre-se</a></p>
        </div>
      </div>
    </div>
  );
}

export default Login;