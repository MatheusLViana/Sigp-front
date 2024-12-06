import { useState } from 'react';
import logo from '../../assets/LogoSIGP.png'
import './index.css';

function NewPassword() {

  const [email, setEmail] = useState('');

  return (
    <>
      <div className='blue-card'>
      <div className='central-container'>
        <div className='logo-container'>
            <img src={logo} className="navbar-logo" alt="logo" />
            <p className='page-logo-txt'>Sistema Integrado de Gestão Pública</p>
        </div>
        <h1 className='page-title less-margin-bottom'>Esqueceu sua senha?</h1>
        <p className='page-text'>Não se preocupe, iremos mandar uma mensagem para você via e-mail, <br />a fim de que você recupere sua senha.</p>
        <form className='central-form-container'>
          <label htmlFor='email'>E-mail</label>
          <input className='central-text-input plus-margin-bottom'
              type='text'
              name='email'
              placeholder='Seu e-mail'
              onChange={setEmail}
          />
          <input className="login-submit" type="submit" value="Mandar Nova Senha" />
        </form>
      </div>
    </div>
    </>
  );
}

export default NewPassword;