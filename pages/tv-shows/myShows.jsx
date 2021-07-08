import { useState } from 'react';
import { getSession } from 'next-auth/client';
import Link from 'next/link';
import styled from 'styled-components';
import { tmdbAPI, episodesAPI } from '../../axios';
import Navigation from '../../components/navigation';

const MyShows = ({ apiKey, showsData }) => {
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
      <ShowsContainer>
        {showsData.map((show, index) => {
          const imgSrc = show.posterPath ? `https://image.tmdb.org/t/p/w500/${show.posterPath}` : 'https://via.placeholder.com/150x200';
          return (
            <ShowWrapper key={index}>
              <Link href={`/tv-shows/${show.data.id}`}>
                <a>
                  <ShowTitle>{show.data.name}</ShowTitle>
                </a>
              </Link>
              <Link href={`/tv-shows/${show.data.id}/season/${show.seasonNum}`}>
                <ShowSubtitle>{`Season ${show.seasonNum}`}</ShowSubtitle>
              </Link>
              <div>
                <Link href={`/tv-shows/${show.data.id}`}>
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

export default MyShows;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const result = await episodesAPI.get('/get-episodes', {
    headers: {
      'User-Email': `${session.user.email}`,
    },
  });

  const showsIds = result.data.watchedEpisodes
    .map((episode) => {
      const tvShowId = episode.split('-')[0];
      const seasonNum = episode.split('-')[1];
      const seasonId = episode.split('-')[2];
      const posterPath = episode.split('-')[4];
      return JSON.stringify({
        tvShowId,
        seasonNum,
        seasonId,
        posterPath,
      });
    });
  const uniqueShowsIds = Array.from(new Set(showsIds), JSON.parse);

  const showsData = await Promise.all(uniqueShowsIds.map(async (show) => {
    const res = await tmdbAPI.get(`tv/${show.tvShowId}?api_key=${process.env.TMDB_API_KEY}`);
    return {
      data: res.data,
      seasonNum: show.seasonNum,
      seasonId: show.seasonId,
      posterPath: show.posterPath,
    };
  }));

  return {
    props: {
      apiKey: process.env.TMDB_API_KEY,
      uniqueShowsIds,
      showsData,
    },
  };
}

const ShowsContainer = styled.div`
  display: inline-flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
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

const ShowSubtitle = styled.h4`
  color: #011C26;
  margin: 10px 0;
  display: inline-block;
`;

const ShowWrapper = styled.div`
  margin: 30px;
`;
