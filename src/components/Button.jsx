import './Button.css';
import { BoxArrowInUpRight } from 'react-bootstrap-icons';

function Button(props){
  return(
    <a className={`btn btn-${props.buttonType}`} href={props.href}>
        {props.icon &&
          (props.icon === 'BoxArrowInUpRight' ? (<BoxArrowInUpRight size={24} className='btn-icon'/>):
          (<div>chiclete</div>))
        }
        <div className='btn-text'>
            {props.title}
        </div>
    </a>
  )
}

export default Button