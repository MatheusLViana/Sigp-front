import { Link } from "react-router-dom";
import "./Newscard.css";

function Newscard({ id, imageurl, category, title, resume }) {
  return id ? (
    <Link to={`/noticias/${id}`} className="newscard-link">
      <div className="newscard-container">
        <div
          className="image-container"
          style={{
            backgroundImage: `url(${imageurl || "../assets/newspaper.jpg"})`, // Usa fallback de imagem
          }}
        ></div>
        <div className='news-txt-block'>
          <p className="news-category">{category || "Sem categoria"}</p>
          <h3 className="news-title">{title || "Título indisponível"}</h3>
          <p className="news-resume">{resume || "Resumo indisponível"}</p>
        </div>
        <p className="news-plus">+Saiba Mais</p>
      </div>
    </Link>
  ) : (
    <div className="newscard-container">
      <div
        className="image-container"
        style={{
          backgroundImage: `url(${imageurl || "../assets/newspaper.jpg"})`,
        }}
      ></div>
      <div className='news-txt-block'>
        <p className="news-category">{category || "Sem categoria"}</p>
        <h3 className="news-title">{title || "Título indisponível"}</h3>
        <p className="news-resume">{resume || "Resumo indisponível"}</p>
      </div>
      <p className="news-plus">+Saiba Mais</p>
    </div>
  );
}

export default Newscard;
