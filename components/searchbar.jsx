import React from 'react';
import styled from 'styled-components';
// import Link from 'next/link';

const SearchBar = ({
  value, onChange, placeholder,
}) => (
  <InputContainer>
    <Input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
    {/* <Link>
      <a>
        <Button>go</Button>
      </a>
    </Link> */}

  </InputContainer>
);

export default SearchBar;

const InputContainer = styled.div`
`;

const Input = styled.input`
  position: relative;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  text-align: center;
  &:focus {
      outline: none;
      color: #3EB595;
  }
`;

// const Button = styled.div`
//     background-color: #3EB595;
//     border: none;
//     border-radius: 5px;
//     padding: 5px 10px;
//     margin-left: 10px;
//     text-transform: uppercase;
//     color: #fff; 
//     &:hover {
//         opacity: 0.8;
//     }
// `;
