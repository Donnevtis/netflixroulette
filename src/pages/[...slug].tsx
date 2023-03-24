import React, { Suspense, lazy, useCallback } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next/types';
import { useRouter } from 'next/router';
import { Movie, RequestParams, SEARCH_PARAMS } from '@src/types';
import { useAppDispatch } from '@src/hooks/redux';

import Header from '@src/components/Header/Header';
import MovieDetails from '@src/components/MovieDetails/MovieDetails';
import ErrorBoundary from '@src/components/ErrorBoundary/ErrorBoundary';
import Spinner from '@src/components/Spinner/Spinner';
import GenresFilter from '@src/components/GenresFilter/GenresFilter';
import Sorting from '@src/components/Sorting/Sorting';
import Title from '@src/components/Title/Title';
import EditMovie from '@src/components/forms/EditMovie';
import DeleteMovie from '@src/components/forms/DeleteMovie';
import AddMovie from '@src/components/forms/AddMovie';
import { updateMovies } from '@src/store/actionCreators/movies';
import API from '@src/api/api';

import styles from './search.module.scss';

const ResultsBody = lazy(() => import('@src/components/ResultsBody/ResultsBody'));
type SearchProps = {
  movies: Movie[];
  query: string;
  sortBy: string;
  genre: string;
};

const Search = ({
  movies,
  genre,
  query,
  sortBy,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const dispatch = useAppDispatch();
  dispatch(updateMovies(movies));

  const router = useRouter();
  const activeMovieId = router.query[SEARCH_PARAMS.MOVIE];
  const form = router.query.slug?.[1];

  const handleCloseMovieDetails = useCallback(() => {
    router.push('/search');
  }, [router]);

  const activeMovie = activeMovieId && movies.find(({ id }) => id === Number(activeMovieId));

  return (
    <>
      <ErrorBoundary>
        {activeMovie ? (
          <MovieDetails onClick={handleCloseMovieDetails} movie={activeMovie} />
        ) : (
          <Header query={query} />
        )}
        <Suspense fallback={<Spinner />}>
          <section className={styles.container}>
            <div className={styles.controlsBar}>
              <GenresFilter selected={genre} />
              <Sorting selected={sortBy} />
            </div>
            <hr className={styles.hr} />
            <ResultsBody />
          </section>
          <footer className={styles.footer}>
            <Title />
          </footer>
        </Suspense>
      </ErrorBoundary>
      {form === 'add' && <AddMovie />}
      {form === 'edit' && <EditMovie />}
      {form === 'delete' && <DeleteMovie />}
    </>
  );
};

export default Search;

export const getServerSideProps: GetServerSideProps<SearchProps> = async (context) => {
  const { query = '', genre = 'all', sortBy = 'popularity' } = context.query as RequestParams;

  const movies = await API.getAll({ genre, query, sortBy });

  return {
    props: {
      movies,
      genre,
      query,
      sortBy,
    },
  };
};
