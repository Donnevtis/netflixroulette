import React, { useState } from 'react';
import { Movie } from '@src/types';
import styles from './ResultsBody.module.scss';

import MovieCard from './MovieCard/MovieCard';
import ContextMenu from './ContextMenu/ContextMenu';
import Spinner from '../Spinner/Spinner';

type Props = {
  movies: Movie[];
  showLoader: boolean;
  onOpenEdit: () => void;
  onOpenDelete: () => void;
  setCurrentId: React.Dispatch<React.SetStateAction<number>>;
};

const ResultsBody = ({
  movies, showLoader, onOpenEdit, onOpenDelete, setCurrentId,
}: Props) => {
  const [state, setShowMenu] = useState({
    showMenu: false,
    coordinateX: 0,
    coordinateY: 0,
  });

  const handleOpenMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setShowMenu({
      showMenu: true,
      coordinateX: event.pageX,
      coordinateY: event.pageY,
    });
  };

  const handleCloseMenu = () => {
    setShowMenu({
      showMenu: false,
      coordinateX: 0,
      coordinateY: 0,
    });
  };

  const { showMenu, coordinateX, coordinateY } = state;

  return showLoader ? (
    <Spinner />
  ) : (
    <>
      <div className={styles.resultCount}>
        <b className={styles.resultCount__digit}>{String(movies.length)}</b>
        {` movie${movies.length === 1 ? '' : 's'} found`}
      </div>
      <div className={styles.movieList}>
        {movies.map(({
          id: movieId, title, tagline, release_date, poster_path,
        }) => (
          <MovieCard
            key={movieId}
            id={movieId}
            title={title}
            tagline={tagline}
            release_date={release_date}
            poster_path={poster_path}
            onContextMenu={handleOpenMenu}
            setCurrentId={setCurrentId}
          />
        ))}
        {showMenu && (
          <ContextMenu
            onClose={handleCloseMenu}
            coordinateX={coordinateX}
            coordinateY={coordinateY}
            onOpenEdit={onOpenEdit}
            onOpenDelete={onOpenDelete}
          />
        )}
      </div>
    </>
  );
};

export default ResultsBody;
