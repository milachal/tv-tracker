import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { formatDate } from '../utils/formatDate';

const SearchBarSuggestion = ({ searchResults, keyword, setShowSuggestion }) => (
  <Container>
    {searchResults && searchResults.results ? searchResults.results.slice(0, 5).map((result) => {
      const imgSrc = result.poster_path ? `https://image.tmdb.org/t/p/w500${result.poster_path}` : 'https://via.placeholder.com/150';
      return (
        <div key={result.id}>
          <PosterContainer>
            <Poster src={imgSrc} alt="poster" />
          </PosterContainer>
          <TitleContainer>
            <Link href={`/tv-shows/${result.id}`}>
              <a onClick={() => setShowSuggestion(false)}>
                <Title>{result.name}</Title>
              </a>
            </Link>
            <Subtitle>{formatDate(result.first_air_date)}</Subtitle>
          </TitleContainer>
        </div>
    )}) : null }
    <Link href={`/tv-shows/search/${keyword}`}>
      <a>
        <h4>More results</h4>
      </a>
    </Link>
  </Container>
);

export default SearchBarSuggestion;

const Container = styled.div`
  z-index: 1;
  position: absolute;
  border-radius: 5px;
  border: 1px solid #C9C9C9;
  background-color: #fff;
  max-width: 400px;
`;

const TitleContainer = styled.div`
  width: 70%;
  display: inline-block;
  vertical-align: top;
  padding: 10px;
`;

const Title = styled.h4`
  color: #3EB595;
  margin: 5px;
`;

const Subtitle = styled.h5`
  color: #696969;
  margin: 5px;
`;

const PosterContainer = styled.div`
  width: 30%;
  display: inline-block;
  padding: 10px;
`;

const Poster = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 5px;
`;