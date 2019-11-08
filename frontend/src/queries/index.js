import { gql } from 'apollo-boost';

const GET_DIRECTORS_QUERY = gql`
  {
    directors {
      name
      id
    }
  }
`;

const GET_MOVIES_QUERY = gql`
  {
    movies {
      name
      id
    }
  }
`;

const GET_MOVIE_QUERY = gql`
  query($id: ID!){
    movie(id: $id) {
      name
      id
      genre
      director{
        id
        name
        age
        movies{
          name
          id
        }
      }
    }
  }
`;

const ADD_MOVIE_MUTATION = gql`
  mutation($name: String!, $genre: String!, $directorId: ID!){
    addMovie(name: $name, genre: $genre, directorId: $directorId){
      name
      genre
      id
    }
  }
`;

export { GET_DIRECTORS_QUERY, GET_MOVIES_QUERY, GET_MOVIE_QUERY, ADD_MOVIE_MUTATION };
