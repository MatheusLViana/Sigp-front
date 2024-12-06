import { List } from 'react-bootstrap-icons'
import logo from '../assets/LogoSIGP.png'
import './Navbar.css'
import { useState } from 'react'

function Navbar(){

  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  return(
    <div className={click ? 'navbar active' : 'navbar'}>
      <div className='navbar-container'>
        <a className='logo-container' href='/'>
          <img src={logo} className="navbar-logo" alt="logo" />
          <p className='navbar-logo-txt'>Sistema Integrado de Gestão Pública</p>
        </a>
        <div className='links-container'>
          <a className='navbar-thin-link' href='/servicos'>Serviços</a>
          <a className='navbar-thin-link' href='/ouvidoria'>Ouvidoria</a>
          <a className='navbar-thin-link' href='/status'>Status de Serviços</a>
        </div>
        <div className='login-container'>
          <a className='login-btn' href='/login'>ENTRAR</a>
          <a className='register-btn' href='/register'>CADASTRAR-SE</a>
        </div>
        <div className='menu-icon' onClick={handleClick}>
          <List size={36}/>
        </div>
      </div>
      <ul className={click ? 'mobile-menu-list active' : 'mobile-menu-list'}>
        <li><a className='navbar-thin-link' href='/servicos'>Serviços</a></li>
        <li><a className='navbar-thin-link' href='/ouvidoria'>Ouvidoria</a></li>
        <li><a className='navbar-thin-link' href='/status'>Status de Serviços</a></li>
        <li><a className='login-btn' href='/login'>ENTRAR</a></li>
        <li><a className='register-btn' href='/register'>CADASTRAR-SE</a></li>
      </ul>
    </div>
  )
}

export default Navbar