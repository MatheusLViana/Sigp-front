import { useEffect, useState } from "react";
import Newscard from "./Newscard";
import "./NewsCarousel.css";
import api from "../services/api";

function NewsCarousel() {
  const [newsCards, setNewsCards] = useState([]);
  /*
    {
      id:0,
      imageurl:'https://diariodocomercio.com.br/wp-content/uploads/2020/01/deficit-dinheiro-30-10-2.jpg',
      category:'ORÇAMENTO',
      title:'Nova LDO é aprovada na Câmara',
      resume:'Com a nova medida, o orçamento passa a ter R$250 bi a mais em relação ao mês passado.'
    },
    {
      id:1,
      imageurl:'https://cdn6.campograndenews.com.br/uploads/noticias/2020/03/10/1t97gy9oy7i16.jpg',
      category:'MEIO AMBIENTE',
      title:'A iniciativa dos moradores do bairro Confiança tem surtido efeito contra a dengue',
      resume:'O bairro com menor número de doentes pelas doenças transmitidas pelo Aedes Aegypti esse ano foi o bairro Confiança. O sr. Agnério comemora dando um exemplo para toda a juventude.',
    },
    {
      id:2,
      imageurl:'https://urbanomnibus.net/wp-content/uploads/sites/2/2011/11/Landfill_1000.jpg',
      category:'MEIO AMBIENTE',
      title:'Nosso lixão será um luxo',
      resume:'Dentro de um mês o processo de limpeza geral do lixão municipal será concluído',
    },
    {
      id:3,
      imageurl:'https://flj.com.br/wp-content/uploads/2023/12/639a380f8b9b8f46109a92b0_renda-fixa-como-comecar-a-investir-16.webp',
      category:'ORÇAMENTO',
      title:'Dívida pública é totalmente quitada',
      resume:'O novo governo conseguiu em 5 meses apenas quitar toda a dívida deixada pela gestão anterior',
    },
    {
      id:4,
      imageurl:'https://cestosdelixoelixeiras.com.br/imagesblog/Preservacao-do-meio-ambiente-aglobal-5.jpg',
      category:'MEIO AMBIENTE',
      title:'Novos investimentos na manutenção das áreas verdes da cidade',
      resume:'Nosso município foi contemplado com um incentivo do governo para mater as áres verdes.',
    },
    {
      id:5,
      imageurl:'https://segredosdomundo.r7.com/wp-content/uploads/2017/09/16-fatos-para-entender-de-vez-o-que-e-a-carreta-furacao.jpg',
      category:'CULTURA',
      title:'Carreta furacão faz nova turnê na região',
      resume:'Responsável avisa que da próxima semana em diante estarão passando pelas cidades da nossa região.',
    },
    {
      id:6,
      imageurl:'https://www.acidadeon.com/tudoep/wp-content/uploads/sites/10/2023/12/moeda_real_1200x675_07032023162154.jpg',
      category:'ORÇAMENTO',
      title:'Governo do estado envia suporte financeiro para conclusão da nossa barragem auxiliar',
      resume:'Com a nova medida, o orçamento passa a ter R$250 bi a mais em relação ao mês passado.'
    },
    {
      id:7,
      imageurl:'https://ichef.bbci.co.uk/ace/ws/640/cpsprodpb/5DA1/production/_120096932_gettyimages-1176175896.jpg.webp',
      category:'SEGURANÇA',
      title:'Nova campanha sobre violência no trânsito',
      resume:'O novo projeto de concientização da Secretaria de Segurança Pública foca no trânsito e vai começar pela divulgação de material impresso nas entradas da cidade.',
    }
  */
  const [carrouselList, setCarrouselList] = useState([]);
  const [carrouselSegments, setCarrouselSegments] = useState([]);

  function handleSegmentChange(segmentID) {
    const initialList = carrouselSegments.map((segment) =>
      segment.id !== segmentID ? { ...segment, value: 0 } : segment
    );
    const updatedList = initialList.map((segment) =>
      segment.id === segmentID ? { ...segment, value: 1 } : segment
    );
    setCarrouselSegments(updatedList);
    window.location.href = "#section" + segmentID;
  }

  useEffect(() => {
    const elementsPerSection = 3;
    const flags = Math.ceil(newsCards.length / elementsPerSection);
    let mainList = [];
    for (let a = 0, i = 0; a < flags; a++) {
      let subList = [];
      for (
        let b = 0;
        b < elementsPerSection && i < newsCards.length;
        b++, i++
      ) {
        subList.push(newsCards[i]);
      }
      const e = {
        id: a,
        item: subList,
      };
      mainList.push(e);
    }
    setCarrouselList(mainList);

    if (flags > 1) {
      let segments = [];
      for (let i = 0; i < flags; i++) {
        const s = {
          id: i,
          value: i === 0 ? true : false,
        };
        segments.push(s);
      }
      setCarrouselSegments(segments);
    }
  }, [newsCards]);

  useEffect(() => {
    const handleNews = async () => {
      try {
        const response = await api.get("/home/");
        const news = response.data["noticias"];
        setNewsCards(news);
      } catch (err) {
        console.error("Erro ao buscar noticias:", err);
      }
    };
    handleNews();
  }, []);

  return (
    <div className="carousel-container">
      <ul className="carrousel-list">
        {carrouselList.map((list) => {
          return (
            <li className="group-list" key={list.id} id={`section${list.id}`}>
              <ul className="content-list">
                {list.item.map((card) => {
                  return (
                    <li className="card-item" key={card.id}>
                      <Newscard
                        imageurl={card.imagem}
                        category={card.categoria}
                        title={card.titulo}
                        resume={card.resumo}
                      />
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
      <ul className="carousel-flags">
        {carrouselSegments.map((segment) => {
          return (
            <li key={segment.id}>
              <div
                className={segment.value ? "dot-flag active" : "dot-flag"}
                onClick={() => handleSegmentChange(segment.id)}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default NewsCarousel;
