import { useEffect, useState } from "react";
import Newscard from "./Newscard";
import "./NewsCarousel.css";
import api from "../services/api";

function NewsCarousel() {
  const [newsCards, setNewsCards] = useState([]);
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
