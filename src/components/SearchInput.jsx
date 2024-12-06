import { Search } from 'react-bootstrap-icons'
import './SearchInput.css'

function SearchInput(props){
  return(
    <form className='input-container'>
      <div className="input-logo">
        <Search color='#888888'/>
      </div>
      <input name={props.name} placeholder={props.placeholder} value={props.value}/>
    </form>
  )
}

export default SearchInput