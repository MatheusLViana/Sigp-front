import './index.css';
import SearchInput from '../../components/SearchInput';
import Servicecard from '../../components/Servicecard';
import { useState } from 'react';
import ComboBoxMenu from '../../components/ComboBoxMenu';

function Services(){

  const [services, setServices] = useState([
    {
      id:1,
      category:'IPTU',
      title:'Consultar IPTU',
      description:'Veja como estão os pagamentos dos seus impostos!',
    },
    {
      id:2,
      category:'IPTU',
      title:'Consultar IPTU',
      description:'Veja como estão os pagamentos dos seus impostos!',
    }
  ]);

  return(
    <>
      <SearchInput
        name='main-input'
        placeholder='O que você procura no momento? Ex: consulta de IPVA, dados da saúde, etc'
        boxShadows={true}
      />
      <br />
      <br />
      <div className='blue-card'>
        <h1 className='page-title'>Buscar Serviços</h1>
      </div>
      <div className='services-container'>
        <div className='container-32'>
          <div className='blue-card'>
            <div className='intern-container'>
              <h3 className='service-search-txt'>Buscar por palavras chave:</h3>
              <SearchInput 
                name='services-input'
                placeholder='Ex: IPTU, etc'/>
            </div>
          </div>
          <br />
          <h3 className='services-filter-txt'>Filtros em ordem de:</h3>
          <hr />
          <ComboBoxMenu 
            title="Categorias"
          />
          <ComboBoxMenu 
            title="Status"
          />
        </div>
        <div className='container-64'>
          <ul className='services-list'>
            {
              services.map(service => {
                return(
                  <li className='service-item' key={service.id}>
                    <Servicecard
                      category={service.category}
                      title={service.title}
                      description={service.description}
                    />
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    </>
  )
}

export default Services;