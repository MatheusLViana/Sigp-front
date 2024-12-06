import { useState } from 'react';
import logo from '../../assets/LogoSIGP.png'
import './index.css';

function Register() {

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('') 

  return (
    <div className='blue-card'>
      <div className='central-container'>
        <div className='logo-container'>
            <img src={logo} className="navbar-logo" alt="logo" />
            <p className='page-logo-txt'>Sistema Integrado de Gestão Pública</p>
        </div>
        <h1 className='page-title'>Cadastre-se</h1>
        <form className='central-form-container'>
          <div className='form-sub-container'>
            <div className='half-central-input-container'>
              <label htmlFor='name'>Primeiro Nome</label>
              <input className='central-text-input'
                  type='text'
                  name='name'
                  placeholder='Meu primeiro nome'
                  onChange={setName}
              />
            </div>
            <div className='half-central-input-container'>
              <label htmlFor='name'>Último Nome</label>
              <input className='central-text-input'
                  type='text'
                  name='name'
                  placeholder='Meu último nome'
                  onChange={setLastName}
              />
            </div>
          </div>
          <label htmlFor='email'>E-mail</label>
          <input className='central-text-input plus-margin-bottom'
              type='text'
              name='email'
              placeholder='Meu e-mail'
              onChange={setEmail}
          />
          <label htmlFor='password'>Senha</label>
          <input className='central-text-input'
              type='password'
              name='password'
              placeholder='Minha senha'
              onChange={setPassword}
          />
          <div className='new-password-check-container'>
            <input className='login-checkbox' type="checkbox" id="remember" name="remember" value="false" />
            <label htmlFor="remember"> Quero me lembrar desta senha</label>
          </div>
          <input className="login-submit" type="submit" value="Cadastrar Agora" />
        </form>
        <p className='central-info-page'>Ou cadastre-se com:</p>
        <div className='buttons-container gap-12'>
            <a className='login-outline-btn'>Google</a>
            <a className='login-outline-btn'>Apple</a>
            <a className='login-outline-btn'>X</a>
        </div>
        <div className='register-link'>
            <p>Já possui uma conta? <a href='/login'>Fazer Login</a></p>
        </div>
      </div>
    </div>
  );
}

export default Register;