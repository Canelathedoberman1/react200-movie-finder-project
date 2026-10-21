
import { createContext, useReducer } from 'react';

export const MovieContext = createContext();

const initialState = {
  movies: [],
  movie: null,
  loading: false,
  error: '',
};

function movieReducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return {
        ...state,
        loading: true,
        error: '',
      };

    case 'FETCH_MOVIES_SUCCESS':
      return {
        ...state,
        loading: false,
        movies: action.payload,
        error: '',
      };

    case 'FETCH_MOVIE_SUCCESS':
      return {
        ...state,
        loading: false,
        movie: action.payload,
        error: '',
      };

    case 'FETCH_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}

export function MovieProvider({ children }) {
  const [state, dispatch] = useReducer(movieReducer, initialState);

  return (
    <MovieContext.Provider value={{ state, dispatch }}>
      {children}
    </MovieContext.Provider>
  );
}
