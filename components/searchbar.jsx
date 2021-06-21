import React from 'react';
import styled from 'styled-components';

const SearchBar = ({
  value, onChange, placeholder, setSearchData,
}) => (
  <div>
    <Input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
    <Button onClick={() => setSearchData}>go</Button>

  </div>
);

export default SearchBar;

const Input = styled.input`
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    text-align: center;
    /* -webkit-transition: width 0.4s ease-in-out;
    transition: width 0.4s ease-in-out;
    &:focus { //doesn't work
        width: 100%;
        outline: none;
    } */
    &:focus {
        outline: none;
        color: #049DBF;
    }
`;

const Button = styled.button`
    background-color: #049DBF;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    margin-left: 10px;
    text-transform: uppercase;
    color: #fff; 
    &:hover {
        opacity: 0.8;
    }
`;
