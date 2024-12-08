import defaultBG from "../assets/newspaper.jpg";
import './Newscard.css'

function Newscard(props){
  return(
    <div className='newscard-container' onClick={props.link}>
      <div
        className='image-container'
        style={props.imageurl===null ? {backgroundImage: 'url(' + defaultBG + ')'}:{backgroundImage: 'url(' + props.imageurl + ')'}}
      >
      </div>
      <div className='news-txt-block'>
        <p className='news-category'>{props.category}</p>
        <h3 className='news-title'>{props.title}</h3>
        <p className='news-resume'>{props.resume}</p>
      </div>
      <p className='news-plus'>+Saiba Mais</p>
    </div>
  )
}

export default Newscard