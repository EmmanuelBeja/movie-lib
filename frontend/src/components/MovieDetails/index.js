import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_MOVIE_QUERY } from '../../queries';


function MovieDetails(id) {
  const { loading, error, data } = useQuery(GET_MOVIE_QUERY, {
    variables: { id: id.id },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <div>
      <div className="movie-title"><h1>Movie Details</h1></div>
      <div className="movie-details">
        <div><b>Movie:</b> {data.movie.name}</div>
        <div><b>Genre:</b> {data.movie.genre}</div>
      </div>
      <div className="movies-by">
        <h3>Director Profile</h3>
        <div><b>Name:</b> {data.movie.director.name}</div>
        <div><b>Age:</b> {data.movie.director.age}</div>
        <div>
          <b>Movies:</b>
          {data.movie.director.movies.map(({ name, id }) =>
          <span key={id}>
            <i> {name},</i>
          </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
