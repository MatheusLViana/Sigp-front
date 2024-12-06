import Button from './Button'
import './HomeCard.css'

function HomeCard(props){
  return(
    <>
    {props.isClickable ? (
        <div
          className='clickablecard-container'
          onClick={props.onClick}
          style={{backgroundImage:'url(' + props.backgroundImg + ')'}}
        />
    ) : (
        <div className={`home-card ${props.cardStyle}`}>
            <h2>{props.category}</h2>
            <h1>{props.text}</h1>
            <Button
              title={props.buttonTitle}
              icon={props.buttonIcon}
              href={props.onClick}
              buttonType={props.buttonType}
            />
        </div>
    )}
    </>
  )
}

export default HomeCard