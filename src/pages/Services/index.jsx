import './index.css';
import SearchInput from '../../components/SearchInput';

function Services(){
  return(
    <>
      <SearchInput
        name='main-input'
        placeholder='O que você procura no momento? Ex: consulta de IPVA, dados da saúde, etc'
      />
      <br />
      <br />
      <div className='blue-card'>
        <h1 className='page-title'>Buscar Serviços</h1>
      </div>
      <div className='services-container'>
        <div className='container-32'>
          <div className='blue-card'>
            <h3>Buscar por palavras chave:</h3>
            <SearchInput />
          </div>
        </div>
        <div className='container-64'>

        </div>
      </div>
    </>
  )
}

export default Services;