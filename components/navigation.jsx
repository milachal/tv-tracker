import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { tmdbAPI } from '../axios';
import SearchBar from './searchbar';
import SearchBarSuggestion from './searchBarSuggestion';
import AuthButton from './authButton';

const Navigation = ({
  apiKey, passSearchResultsData, searchResults, disableSearchBarSuggestions,
}) => {
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
    if (!e.target.value) {
      return;
    }
    const res = await tmdbAPI.get(`/search/tv?api_key=${apiKey}&query=${e.target.value}`);
    setShowSuggestion(true);
    passSearchResultsData(res.data);
  };

  return (
    <NavBar>
      <Link href="/">
        <a href="/"><StyledLink>Home</StyledLink></a>
      </Link>
      <Link href="/tv-shows/myShows">
        <a><StyledLink>My TV Shows</StyledLink></a>
      </Link>
      <div ref={clickRef}>
        <SearchBar
          value={searchQuery}
          onChange={searchHandler}
          placeholder="search for tv shows"
        />
        {!disableSearchBarSuggestions && searchQuery && showSuggestion ? (
          <SearchBarSuggestion
            searchResults={searchResults}
            keyword={searchQuery}
            setShowSuggestion={setShowSuggestion}
          />
        ) : null}
      </div>
      <AuthButton />
    </NavBar>
  );
};

export default Navigation;

const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #011C26;
  width: 100%;
  padding: 20px 40px;
  font-size: 20px;
`;

const StyledLink = styled.span`
  cursor: pointer;
  padding-left: 3rem;
  &:hover{
  color: #3EB595;
}
`;
