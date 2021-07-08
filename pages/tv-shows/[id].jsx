import { useState } from 'react';
import styled from 'styled-components';
import { tmdbAPI } from '../../axios';
import formatDate from '../../utils/formatDate';
import Navigation from '../../components/navigation';
import RaitingComponent from '../../components/tv-show-raiting';
import TvShowSeasonShortInfo from '../../components/tv-show-season';

const TvShowPage = ({ data, apiKey }) => {
  const [searchResults, setSearchResults] = useState('');
  const passSearchResultsData = (navigationComponentData) => {
    setSearchResults(navigationComponentData);
  };
  const imgSrcBig = data.poster_path ? `https://image.tmdb.org/t/p/w1280${data.poster_path}` : 'https://via.placeholder.com/350x200';
  const imgSrc = data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : 'https://via.placeholder.com/150x200';
  return (
    <>
      <Navigation
        apiKey={apiKey}
        passSearchResultsData={passSearchResultsData}
        searchResults={searchResults}
      />
      <TvShowDetailsContainer url={imgSrcBig}>
        <PosterContainer>
          <TvShowPoster src={imgSrc} />
        </PosterContainer>
        <InfoContainer>
          <Title>{data.name}</Title>
          <h3>{formatDate(data.first_air_date)}</h3>
          <RaitingContainer>
            <RaitingComponent>{data.vote_average}</RaitingComponent>
          </RaitingContainer>
          <TvShowText>{data.overview}</TvShowText>
        </InfoContainer>
      </TvShowDetailsContainer>
      <TvShowSeasonShortInfo
        seasons={data.seasons}
        data={data}
        imgSrc={imgSrc}
      />
    </>
  );
};

export default TvShowPage;

export async function getServerSideProps(context) {
  const response = await tmdbAPI.get(`tv/${context.params.id}?api_key=${process.env.TMDB_API_KEY}`);
  return {
    props: {
      data: response.data,
      apiKey: process.env.TMDB_API_KEY,
    },
  };
}

const TvShowDetailsContainer = styled.div`
  background-image: linear-gradient(rgba(0, 0, 0, 0.7),rgba(0, 0, 0, 0.7)), url(${(props) => props.url});
  width: 100%;
  background-repeat: no-repeat;
  background-size: cover;
`;

const PosterContainer = styled.div`
  display: inline-block;
  width: 25%;
  padding: 30px 0 30px 50px;
`;

const TvShowPoster = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 5px;
`;

const InfoContainer = styled.div`
  display: inline-block;
  vertical-align: top;
  width: 75%;
  color: #ffffff;
  padding: 0px 80px;

`;

const Title = styled.h1`
  color: #FFF447;
`;

const TvShowText = styled.p`
  font-size: 20px;
`;

const RaitingContainer = styled.div`
  color: #ffffff;
`;
