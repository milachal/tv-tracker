import React, { useState } from 'react';
import tmdbAPI from '../../../axios';
import { formatDate } from '../../../utils/formatDate';
import Navigation from '../../../components/navigation';

const SearchResults = ({ data, apiKey }) => {
  const [searchResults, setSearchResults] = useState('');
  const passSearchResultsData = (navigationComponentData) => {
    setSearchResults(navigationComponentData);
  };
  console.log(searchResults);
  return (
    <>
      <Navigation
        apiKey={apiKey}
        passSearchResultsData={passSearchResultsData}
        searchResults={searchResults}
      />
      {data.results.map((result) => (
        <div key={result.id}>
          <div>
            <img src={`https://image.tmdb.org/t/p/w500${result.poster_path}`} alt="poster" />
          </div>
          <div>
            <h5>{result.name}</h5>
            <h6>{formatDate(result.first_air_date)}</h6>
          </div>
          <div>
            <p>{result.overview}</p>
          </div>
        </div>
      ))}
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
