import React, { useState } from 'react';
import styled from 'styled-components';
import { formatDate } from '../utils/formatDate.js';
import TabsBar from './tabsBar';
import TvShowSeasonsDetails from './tv-show-season-details';

const TvShowSeasonShortInfo = ({ seasons, data }) => {
  const [season, setSeason] = useState(seasons[0]);

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
          imgSrc={season.poster_path}
        />
      )}
    </Container>
  );
};

export default TvShowSeasonShortInfo;

const Container = styled.div`
  margin: 20px 50px;
  border-radius: 5px;
`;
