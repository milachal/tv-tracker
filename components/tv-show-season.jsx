import { useEffect, useState } from 'react';
import styled from 'styled-components';
import formatDate from '../utils/formatDate';
import TabsBar from './tabsBar';
import TvShowSeasonsDetails from './tv-show-season-details';

const TvShowSeasonShortInfo = ({ seasons, data }) => {
  const [season, setSeason] = useState(seasons[0]);
  useEffect(() => {
    setSeason(seasons[0]);
  }, [seasons]);
  return (
    <Container>
      <div>
        {seasons.map((s) => (
          <span key={s.id}>
            <TabsBar
              onClick={() => {
                if (season && s.id === season.id) {
                  setSeason(null);
                } else {
                  setSeason(s);
                }
              }}
              tabTitle={s.name}
              tabId={s.name.replace(/ +/g, '')}
            />
          </span>
        ))}
      </div>
      {season && (
        <TvShowSeasonsDetails
          dataId={data.id}
          seasonNumber={season.season_number}
          title={season.name}
          subtitle={`Premiered on ${formatDate(season.air_date)}`}
          text={season.overview}
          imgSrc={season.poster_path ? `https://image.tmdb.org/t/p/w500${season.poster_path}` : 'https://via.placeholder.com/150x200'}
        />
      )}
    </Container>
  );
};

export default TvShowSeasonShortInfo;

const Container = styled.div`
  padding: 20px 50px;
  border-radius: 5px;
`;
