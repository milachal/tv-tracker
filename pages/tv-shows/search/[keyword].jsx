import { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { tmdbAPI } from '../../../axios';
import formatDate from '../../../utils/formatDate';
import Navigation from '../../../components/navigation';

const SearchResults = ({ data, apiKey }) => {
  const [searchResults, setSearchResults] = useState('');
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
      {data.results.map((result) => {
        const imgSrc = result.poster_path ? `https://image.tmdb.org/t/p/w500${result.poster_path}` : 'https://via.placeholder.com/150x200';
        const imgSrcBig = result.poster_path ? `https://image.tmdb.org/t/p/w1280${result.poster_path}` : 'https://via.placeholder.com/350x200';
        return (
          <TvShowContainer
            key={result.id}
            url={imgSrcBig}
          >
            <ImageWrapper>
              <Link href={`/tv-shows/${result.id}`}>
                <a>
                  <Image src={imgSrc} alt="poster" />
                </a>
              </Link>
            </ImageWrapper>
            <InfoContainer>
              <Link href={`/tv-shows/${result.id}`}>
                <a><Title>{result.name}</Title></a>
              </Link>
              <Subtitle>{formatDate(result.first_air_date)}</Subtitle>
            </InfoContainer>
          </TvShowContainer>
        );
      })}
    </>
  );
};

export default SearchResults;

export async function getServerSideProps(context) {
  const response = await tmdbAPI.get(`/search/tv?api_key=${process.env.TMDB_API_KEY}&query=${context.params.keyword}`);

  return {
    props: {
      data: response.data,
      apiKey: process.env.TMDB_API_KEY,
    },
  };
}

const TvShowContainer = styled.div`
  background-image: linear-gradient(rgba(0, 0, 0, 0.7),rgba(0, 0, 0, 0.7)), url(${(props) => props.url});
  width: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  color: #ffffff;
`;

const ImageWrapper = styled.div`
  display: inline-block;
  width: 15%;
  padding: 20px 50px;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 5px;
  float: left;
`;

const InfoContainer = styled.div`
  display: inline-block;
  width: 85%;
  padding: 20px;
  vertical-align: top;
`;

const Title = styled.h3`
  color: #FFF447;
  margin: 10px 0 0 0;
  &:hover {
    color: #fff;
  }
`;

const Subtitle = styled.h5`
  margin: 10px 0;
  display: inline-block;
`;
