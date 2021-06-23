import React, { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import tmdbAPI from '../axios';
import SearchBar from './searchbar';
import SearchBarSuggestion from './searchBarSuggestion';

const Navigation = ({ apiKey, passSearchData, searchResult }) => {
  const [searchQuery, setSearchQuery] = useState('');
  // const [searchResult, setSearchResult] = useState('');

  const searchHandler = async (e) => {
    setSearchQuery(e.target.value);
    const res = await tmdbAPI.get(`/search/tv?api_key=${apiKey}&query=${e.target.value}`);
    passSearchData(res.data);
  };

  return (
    <NavBar>
      <Link href="/">
        <StyledA>Home</StyledA>
      </Link>
      <StyledA>About</StyledA>
      <SearchBarContainer>
        <SearchBar
          value={searchQuery}
          onChange={searchHandler}
          placeholder="search for tv shows"
        />
        <SearchBarSuggestion searchResults={searchResult} />
      </SearchBarContainer>
    </NavBar>
  );
};

export default Navigation;

const NavBar = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #011C26;
  width: 100%;
  padding: 20px;
  font-size: 20px;
`;
const StyledA = styled.a`
  cursor: pointer;
  &:hover{
  color: #3EB595;
}
`;

const SearchBarContainer = styled.div`
  /* display: flex;
  flex-direction: column;
  justify-content: space-around; */
`;
