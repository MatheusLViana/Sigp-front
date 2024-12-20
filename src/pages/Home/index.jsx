import NewsCarousel from "../../components/NewsCarousel";
import HomeCard from "../../components/HomeCard";
import SearchInput from "../../components/SearchInput";
import "./index.css";

function Home() {
  return (
    <>
      <SearchInput
        name="main-input"
        placeholder="O que você procura no momento? Ex: consulta de IPVA, dados da saúde, etc"
        boxShadows={true}
      />
      <br />
      <NewsCarousel />
      <div className="cards-list">
        <HomeCard
          isClickable={false}
          cardStyle="principal"
          category="Noticias"
          text="Conheça nosso sistema de atendimento ao cidadão"
          buttonTitle="ACESSAR Noticias"
          buttonType="principal"
          href="/Noticias"
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
          href="/services"
        />
        <HomeCard
          isClickable={true}
          backgroundImg="https://cdn-icons-png.flaticon.com/512/610/610128.png"
        />
      </div>
    </>
  );
}

export default Home;
