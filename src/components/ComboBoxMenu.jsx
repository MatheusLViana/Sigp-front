import { ArrowDown } from 'react-bootstrap-icons';
import './ComboBoxMenu.css';
function ComboBoxMenu(props){
    return(
        <div className='blue-card combo-margin'>
            <div className='intern-container-combo'>
                <h2 className=''>{props.title}</h2>
                <ArrowDown size={24} />
            </div>
        </div>
    )
}

export default ComboBoxMenu