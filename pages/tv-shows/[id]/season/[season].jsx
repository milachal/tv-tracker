import React from 'react';
import styled from 'styled-components';
import tmdbAPI from '../../../../axios';

const SeasonDetailsPage = ({ data }) => (
  <>
    <SeasonInfoContainer>
      <ImageWrapper>
        <SeasonImage src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} alt="season-poster" />
      </ImageWrapper>
      <SeasonOverviewContainer>
        <SeasonTitle>{data.name}</SeasonTitle>
        <SeasonText>{data.overview}</SeasonText>
      </SeasonOverviewContainer>
    </SeasonInfoContainer>
    <SeasonSubtitle>{`Episodes: ${data.episodes.length}`}</SeasonSubtitle>
    {data.episodes.map((episode) => (
      <div key={episode.id}>
        <h4>
          {`Episode ${episode.episode_number}: `}
          <EpisodeName>{episode.name}</EpisodeName>
        </h4>
        <EpisodeImageWrapper>
          <EpisodeImage src={`https://image.tmdb.org/t/p/w500${episode.still_path}`} alt="episode-poster" />
        </EpisodeImageWrapper>
        <Button type="submit">watched</Button>
      </div>
    ))}
  </>
);

export default SeasonDetailsPage;

export async function getServerSideProps(context) {
  const res = await tmdbAPI.get(`tv/${context.params.id}/season/${context.params.season}?api_key=${process.env.TMDB_API_KEY}`);
  return {
    props: {
      data: res.data,
    },
  };
}

const SeasonInfoContainer = styled.div`
  background-color: #049DBF;
  color: #ffffff;

`;

const SeasonOverviewContainer = styled.div`
  display: inline-block;
  width: 70%;
  padding: 20px;
  vertical-align: top;
`;

const SeasonTitle = styled.h1`
  margin: 0;
`;

const SeasonSubtitle = styled.h3`
  color: #a09c9c;
`;

const ImageWrapper = styled.div`
  display: inline-block;
  width: 30%;
  padding: 20px;
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
  width: 20%;
`;

const EpisodeImage = styled.img`
  width: 100%;
  border-radius: 5px;
`;

const EpisodeName = styled.span`
  color: #a09c9c;
`;

const Button = styled.button`
  padding: 10px 15px;
  border-radius: 5px;  
`;
