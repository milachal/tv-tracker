import React, { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import tmdbAPI from '../axios';
import SearchBar from './searchbar';

const Navigation = ({ apiKey, passSearchData, data }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchData, setSearchData] = useState(data);

  const searchHandler = async (e) => {
    setSearchQuery(e.target.value);
    const res = await tmdbAPI.get(`/search/tv?api_key=${apiKey}&query=${e.target.value}`);
    setSearchData(res.data);
    passSearchData(searchData);
  };

  return (
    <NavBar>
      <Link href="/">
        <StyledA>Home</StyledA>
      </Link>
      <StyledA>About</StyledA>
      <SearchBar
        value={searchQuery}
        onChange={searchHandler}
        placeholder="search for tv shows"
        setSearchData={() => setSearchData(data)}
      />
    </NavBar>
  );
};

export default Navigation;

const NavBar = styled.nav`
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    background-color: #011C26;
    width: 100%;
    padding: 20px;
    font-size: 20px;
`;
const StyledA = styled.a`
    cursor: pointer;
    &:hover{
    color: #049DBF;
  }
`;
