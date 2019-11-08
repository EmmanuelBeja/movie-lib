import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import {
  GET_DIRECTORS_QUERY,
  GET_MOVIES_QUERY,
  ADD_MOVIE_MUTATION
} from '../../queries';

function AddMovie() {
  const [ state, setState ] = useState({
    name: "",
    genre: "",
    directorId: ""
  })

  const { loading, error, data } = useQuery(GET_DIRECTORS_QUERY);
  const [addMovie] = useMutation(ADD_MOVIE_MUTATION);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const directorOptions = data.directors.map(({ name, id }) => (
    <option key={id} value={id}>{name}</option>
  ))

  const handleChange = event => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault();
    addMovie({
      variables: {...state},
      refetchQueries: [{query: GET_MOVIES_QUERY}]
    });
  }

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <input type="text" className="form-input" placeholder="Enter Movie Name" name="name" onChange={handleChange}/>
        </div>
        <div>
          <input type="text" className="form-input" placeholder="Enter Genre" name="genre" onChange={handleChange}/>
        </div>
        <div>
          <select className="form-input form-select" name="directorId" onChange={handleChange}>
            <option>Select Director</option>
            {directorOptions}
          </select>
        </div>
        <button className="btn-add-movie">Add Movie</button>
      </form>
    </div>
  );
}

export default AddMovie;
