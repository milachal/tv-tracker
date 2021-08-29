import styled from 'styled-components';

const SearchBar = ({
  value, onChange, placeholder,
}) => (
  <>
    <Input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      data-cy="searchBar"
    />
  </>
);

export default SearchBar;

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
