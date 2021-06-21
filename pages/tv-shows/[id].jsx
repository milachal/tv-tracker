import React from 'react';
import styled from 'styled-components';
import tmdbAPI from '../../axios';
import { formatDate } from '../../utils/formatDate';
import RaitingComponent from '../../components/tv-show-raiting';
import TvShowSeasonShortInfo from '../../components/tv-show-season';

const TvShowPage = ({ data }) => (
  <>
    <TvShowDetailsContainer url={`https://image.tmdb.org/t/p/w1280${data.poster_path}`}>
      <PosterContainer>
        <TvShowPoster src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} />
      </PosterContainer>
      <InfoContainer>
        <h1>{data.name}</h1>
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
    />
  </>
);

export default TvShowPage;

export async function getServerSideProps(context) {
  const response = await tmdbAPI.get(`tv/${context.params.id}?api_key=${process.env.TMDB_API_KEY}`);
  return {
    props: {
      data: response.data,
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
  width: 20%;
`;

const TvShowPoster = styled.img`
  width: 100%;
  height: 100%;
  margin: 30px 0 30px 50px;
  border-radius: 5px;
`;

const InfoContainer = styled.div`
  display: inline-block;
  vertical-align: top;
  width: 80%;
  color: #ffffff;
  padding: 0px 80px;

`;

const TvShowText = styled.p`
  font-size: 20px;
`;

const RaitingContainer = styled.div`
  color: #ffffff;
`;
