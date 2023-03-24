import React from 'react';
import useQueryString from '@src/hooks/useQueryString';
import { GENRE_FILTERS } from '@src/utils/constants';
import { GenreQueries, SEARCH_PARAMS } from '@src/types/';

import styles from './GenresFilter.module.scss';

import GenreButton from './GenreButton/GenreButton';
import { GenreFilterProps } from './GenresFilter.types';

const GenresFilter = ({ selected }: GenreFilterProps) => {
  const setQueryString = useQueryString();

  const handleGenreChange = (genre: GenreQueries) => {
    if (selected !== genre) {
      setQueryString(SEARCH_PARAMS.GENRE, genre);
    }
  };

  return (
    <div className={styles.genreButtons}>
      {GENRE_FILTERS.map((genre) => (
        <GenreButton
          key={genre}
          onClick={handleGenreChange}
          active={selected === genre}
          genre={genre}
        />
      ))}
    </div>
  );
};

export default GenresFilter;
