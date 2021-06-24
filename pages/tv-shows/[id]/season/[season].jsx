import React, { useState } from 'react';
import styled from 'styled-components';
import tmdbAPI from '../../../../axios';
import Navigation from '../../../../components/navigation';
import Checkbox from '../../../../components/checkbox';

const SeasonDetailsPage = ({ data, apiKey }) => {
  const [searchResults, setSearchResults] = useState(null);
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
      <SeasonInfoContainer url={`https://image.tmdb.org/t/p/w1280${data.poster_path}`}>
        <ImageWrapper>
          <SeasonImage src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} alt="season-poster" />
        </ImageWrapper>
        <SeasonOverviewContainer>
          <SeasonTitle>{data.name}</SeasonTitle>
          <SeasonText>{data.overview}</SeasonText>
        </SeasonOverviewContainer>
      </SeasonInfoContainer>
      {data.episodes.map((episode) => (
        <EpisodesContainer key={episode.id}>
          <SeasonSubtitle>{`Episodes: ${data.episodes.length}`}</SeasonSubtitle>
          <h4>
            {`Episode ${episode.episode_number}: `}
            <EpisodeName>{episode.name}</EpisodeName>
          </h4>
          <EpisodeImageWrapper>
            <EpisodeImage src={`https://image.tmdb.org/t/p/w500${episode.still_path}`} alt="episode-poster" />
          </EpisodeImageWrapper>
          <EpisodeOverviewWrapper>
            <Checkbox />
            <p>{episode.overview}</p>
          </EpisodeOverviewWrapper>
        </EpisodesContainer>
      ))}
    </>
  );
};

export default SeasonDetailsPage;

export async function getServerSideProps(context) {
  const res = await tmdbAPI.get(`tv/${context.params.id}/season/${context.params.season}?api_key=${process.env.TMDB_API_KEY}`);
  return {
    props: {
      data: res.data,
      apiKey: process.env.TMDB_API_KEY,
    },
  };
}

const SeasonInfoContainer = styled.div`
  background-image: linear-gradient(rgba(0, 0, 0, 0.7),rgba(0, 0, 0, 0.7)), url(${(props) => props.url});
  width: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  color: #ffffff;
`;

const SeasonOverviewContainer = styled.div`
  display: inline-block;
  width: 75%;
  padding: 20px;
  vertical-align: top;
`;

const SeasonTitle = styled.h1`
  margin: 0;
`;

const SeasonSubtitle = styled.h3`
  color: #a09c9c;
`;

const EpisodesContainer = styled.div`
  padding: 20px 50px;
`;

const ImageWrapper = styled.div`
  display: inline-block;
  width: 25%;
  padding: 20px 50px;
`;

const SeasonImage = styled.img`
  width: 100%;
  border-radius: 5px;
  float: left;
`;

const SeasonText = styled.p`
  font-size: 20px;
`;

const EpisodeImageWrapper = styled.div`
  display: inline-block;
  width: 25%;
  padding: 20px;
  padding-left: 0px;
`;

const EpisodeImage = styled.img`
  width: 100%;
  border-radius: 5px;
`;

const EpisodeName = styled.span`
  color: #3EB595;
`;

const EpisodeOverviewWrapper = styled.div`
  display: inline-block;
  width: 75%;
  padding: 20px 60px;
  vertical-align: top;
`;
