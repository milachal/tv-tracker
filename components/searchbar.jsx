import styled from 'styled-components';

const SearchBar = ({
  value, onChange, placeholder,
}) => (
  <>
    <Input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  </>
);

export default SearchBar;

// const InputContainer = styled.div`
// `;

const Input = styled.input`
  position: relative;
  border: none;
  border-radius: 5px;
  padding: 10px 10px;
  text-align: center;
  width: 130px;
  -webkit-transition: width 0.4s ease-in-out;
  transition: width 0.4s ease-in-out;
  &:focus {
    outline: none;
    color: #3EB595;
    width: 400px;
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
