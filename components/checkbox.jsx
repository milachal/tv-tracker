import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useSession } from 'next-auth/client';

const Checkbox = ({
  episodeId, seasonId, seasonNum, tvShowId, watchedEpisodesArr,
}) => {
  const [isWatched, setIsWatched] = useState(false);
  const [session] = useSession();
  useEffect(() => {
    if (watchedEpisodesArr.length > 0) {
      watchedEpisodesArr.map((episode) => {
        if (episode.includes(episodeId)) {
          setIsWatched(true);
        }
        // eslint-disable-next-line
        return;
      });
    }
  });

  const handleCheckBox = (e) => {
    if (e.target.checked) {
      setIsWatched(e.target.checked);
      axios.post('/api/episodes', {
        userEmail: session.user.email,
        episodeId: `${tvShowId}-${seasonNum}-${seasonId}-${episodeId}`,
      });
    }
    setIsWatched(e.target.checked);
  };

  return (
    <Label>
      <Input
        type="checkbox"
        checked={isWatched}
        onChange={handleCheckBox}
      />
      <CheckboxContainer>Watched</CheckboxContainer>
    </Label>
  );
};

export default Checkbox;

const Label = styled.label`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  position: relative;
`;

const Input = styled.input`
  height: 20px;
  width: 20px;
  -webkit-appearance: none;
  -moz-appearance: none;
  -o-appearance: none;
  appearance: none;
  border: 1px solid #34495E;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
  &:checked {
    border: 1px solid #3EB595;
    content: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiIGNsYXNzPSIiPjxnPgo8cG9seWdvbiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHN0eWxlPSIiIHBvaW50cz0iMjAyLjYyNCw0NzguMDE2IDAsMjkxLjM2IDcwLjUxMiwyMTQuOCAxOTEuOTY4LDMyNi42NTYgNDMxLjQ0LDMzLjk4NCA1MTIsOTkuOTA0ICIgZmlsbD0iIzNlYjU5NSIgZGF0YS1vcmlnaW5hbD0iIzBiYTRlMCIgY2xhc3M9IiI+PC9wb2x5Z29uPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8L2c+PC9zdmc+);
  }
`;

const CheckboxContainer = styled.span`
  padding: 0.5rem 0.25rem;
`;
