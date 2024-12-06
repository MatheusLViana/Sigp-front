import './index.css';
import SearchInput from '../../components/SearchInput';

function Ouvidoria(){
  return(
    <>
      <SearchInput
        name='main-input'
        placeholder='O que você procura no momento? Ex: consulta de IPVA, dados da saúde, etc'
      />
      <br />
      <br />
      <div className='blue-card'>
        <h1 className='page-title'>Ouvidoria do Usuário</h1>
      </div>
    </>
  )
}

export default Ouvidoria;