import { useState } from 'react';
import { getSession } from 'next-auth/client';
import { tmdbAPI, episodesAPI } from '../../axios';
import Navigation from '../../components/navigation';

const MyShows = ({ apiKey }) => {
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
    </>
  );
};

export default MyShows;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const result = await episodesAPI.get('/episodes', {
    headers: {
      'User-Email': `${session.user.email}`,
    },
  });

  const showsIds = result.data.watchedEpisodes
    .map((episode) => {
      const tvShowId = episode.split('-')[0];
      const seasonNum = episode.split('-')[1];
      return JSON.stringify({ tvShowId, seasonNum });
    });
  const uniqueShowsIds = Array.from(new Set(showsIds), JSON.parse);

  const showsData = await Promise.all(uniqueShowsIds.map(async (show) => {
    const res = await tmdbAPI.get(`tv/${show.tvShowId}?api_key=${process.env.TMDB_API_KEY}`);
    return res.data;
  }));

  return {
    props: {
      apiKey: process.env.TMDB_API_KEY,
      uniqueShowsIds,
      showsData,
    },
  };
}
