import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import tmdbAPI from '../axios';
import SearchBar from './searchbar';
import SearchBarSuggestion from './searchBarSuggestion';

const Navigation = ({ apiKey, passSearchData, searchResult }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestion, setShowSuggestion] = useState(false);
  const clickRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (clickRef.current && !clickRef.current.contains(e.target)) {
        setShowSuggestion(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [clickRef]);

  const searchHandler = async (e) => {
    setSearchQuery(e.target.value);
    if (!searchQuery) {
      return;
    }
    const res = await tmdbAPI.get(`/search/tv?api_key=${apiKey}&query=${e.target.value}`);
    setShowSuggestion(true);
    passSearchData(res.data);
  };

  return (
    <NavBar>
      <Link href="/">
        <StyledA>Home</StyledA>
      </Link>
      <StyledA>About</StyledA>
      <SearchBarContainer ref={clickRef}>
        <SearchBar
          value={searchQuery}
          onChange={searchHandler}
          placeholder="search for tv shows"
        />
        {searchQuery && showSuggestion ? (
          <SearchBarSuggestion searchResults={searchResult} />
        ) : null}
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
