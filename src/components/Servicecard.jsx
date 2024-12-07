import './Servicecard.css';
import { Clipboard2Check } from 'react-bootstrap-icons';
import Button from './Button'

function Servicecard(props){
  return(
    <div className='blue-card'>
      <div className='intern-container'>
        <div className='row'>
          <Clipboard2Check size={48} />
          <div className='category-container'>
            <h3>{props.category}</h3>
          </div>
        </div>
        <h2 className='service-card-title'>{props.title}</h2>
        <p className='service-card-description'>{props.description}</p>
        <div className='w60'>
          <Button
            title="VER SERVIÇO"
            href={props.href}
            buttonType="principal"
          />
        </div>
        <p className='services-card-details'>Quer mais detalhes? <a className='white' href='/'>Clique aqui</a></p>
      </div>
    </div>
  )
}

export default Servicecard