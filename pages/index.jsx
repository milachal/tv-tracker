import { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { tmdbAPI } from '../axios';
import formatDate from '../utils/formatDate';
import Navigation from '../components/navigation';
import RaitingComponent from '../components/tv-show-raiting';

const Home = ({ data, apiKey }) => {
  const [searchResults, setSearchResults] = useState(data);
  const passSearchResultsData = (navigationComponentData) => {
    setSearchResults(navigationComponentData);
  };
  return (
    <>
      <Navigation
        apiKey={apiKey}
        passSearchResultsData={passSearchResultsData}
        searchResults={searchResults}
      />
      <ShowsContainer>
        {searchResults.results.slice(0, 10).map((show) => {
          const imgSrc = show.poster_path ? `https://image.tmdb.org/t/p/w500${show.poster_path}` : 'https://via.placeholder.com/150x200';
          return (
            <ShowWrapper key={show.id}>
              <ShowInfoContainer>
                <Link href={`/tv-shows/${show.id}`}>
                  <a>
                    <ShowTitle>{show.name}</ShowTitle>
                  </a>
                </Link>
                <ShowSubtitle>{formatDate(show.first_air_date)}</ShowSubtitle>
                <ShowRaitingContainer>
                  <RaitingComponent>{show.vote_average}</RaitingComponent>
                </ShowRaitingContainer>
              </ShowInfoContainer>
              <div>
                <Link href={`/tv-shows/${show.id}`}>
                  <a><Image src={imgSrc} /></a>
                </Link>
              </div>
            </ShowWrapper>
          );
        })}
      </ShowsContainer>

    </>
  );
};

export default Home;

export async function getServerSideProps() {
  const res = await tmdbAPI.get(`tv/popular?api_key=${process.env.TMDB_API_KEY}`);

  return {
    props: {
      data: res.data,
      apiKey: process.env.TMDB_API_KEY,
    },
  };
}

const ShowsContainer = styled.div`
  display: inline-flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

const ShowInfoContainer = styled.div`
  max-width: 260px;
`;

const Image = styled.img`
  height: 400px;
  border-radius: 10px;
`;

const ShowTitle = styled.h3`
  color: #3EB595;
  margin: 10px 0 0 0;
  &:hover {
    color: #03588C;
  }
`;

const ShowSubtitle = styled.h5`
  color: #011C26;
  margin: 10px 0;
  display: inline-block;
`;

const ShowWrapper = styled.div`
  margin: 30px;
`;

const ShowRaitingContainer = styled.div`
  float: right;
  color: #3EB595;
`;
