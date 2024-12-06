import NewsCarousel from '../../components/NewsCarousel';
import HomeCard from '../../components/HomeCard';
import SearchInput from '../../components/SearchInput';
import './index.css';

function Home() {
  return (
    <>
      <SearchInput
        name='main-input'
        placeholder='O que você procura no momento? Ex: consulta de IPVA, dados da saúde, etc'
      />
      <br />
      <NewsCarousel />
      <div className="cards-list">
        <HomeCard
          isClickable={false}
          cardStyle="principal"
          category="OUVIDORIA"
          text="Conheça nosso sistema de atendimento ao cidadão"
          buttonTitle="ACESSAR OUVIDORIA"
          buttonType="principal"
        />
        <HomeCard
          isClickable={false}
          cardStyle="transparente"
          text="Clique no botão abaixo para consultar o orçamento do município e suas evoluções:"
          buttonTitle="VER ORÇAMENTO DO ANO"
          buttonIcon="BoxArrowInUpRight"
          buttonType="secundario btn-with-logo"
        />
        <HomeCard
          isClickable={false}
          cardStyle="secundario"
          category="SERVIÇOS"
          text="Veja o que podemos fazer por você, cidadão!"
          buttonTitle="CONSULTAR SERVIÇOS"
          buttonType="principal"
        />
        <HomeCard
          isClickable={true}
          backgroundImg='https://cdn-icons-png.flaticon.com/512/610/610128.png'  
        />
      </div>
    </>
  );
}

export default Home;