import React from 'react';
import './SearchInput.css';
import { Search } from 'react-bootstrap-icons'; // Ícone de busca

function SearchInput({ name, placeholder, value, onChange, boxShadows }) {
  return (
    <div className={`input-container ${boxShadows ? 'box-shadows' : ''}`}>
      <Search className="input-logo" size={20} color="#888888" />
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default SearchInput;
