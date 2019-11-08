import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_MOVIES_QUERY } from '../../queries';
import MovieDetails from '../MovieDetails/';
import NothingSelected from '../MovieDetails/NothingSelected';
import AddMovie from '../AddMovie/';
import './style.css';

function MovieList() {
  const [ selected, setSelected ] = useState(null)
  const { loading, error, data } = useQuery(GET_MOVIES_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <div>
      <div className="add-movie-container">
        <AddMovie />
      </div>
      <div className="movie">
        <div className="movies-container">
          <div className="movies-title"><h1>Movies</h1></div>
          {data.movies.map(({ name, id }) =>
          <span key={id}>
            <button className="btn-movie" onClick={e => setSelected(id)}>{name}</button>
          </span>
          )}
        </div>
        <div className="movie-container">
          {selected ? <MovieDetails id={selected} /> : <NothingSelected />}
        </div>
      </div>
    </div>
  );
}

export default MovieList;
