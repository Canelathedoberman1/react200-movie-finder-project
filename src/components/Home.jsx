
import { useState, useContext } from 'react';
import { MovieContext } from '../context/MovieContext';
import MoviePreview from './MoviePreview';

const Home = () => {
  const [query, setQuery] = useState('');
  const { state, dispatch } = useContext(MovieContext);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!query.trim()) {
      dispatch({
        type: 'FETCH_ERROR',
        payload: 'Please enter a movie title.',
      });
      return;
    }

    dispatch({ type: 'FETCH_START' });

    try {
      const response = await fetch(
        `/api/search?query=${encodeURIComponent(query)}`
      );
      const data = await response.json();

      if (!response.ok || data.Response === 'False') {
        throw new Error(data.Error || 'Could not find movies.');
      }

      dispatch({
        type: 'FETCH_MOVIES_SUCCESS',
        payload: data.Search || [],
      });
    } catch (error) {
      dispatch({
        type: 'FETCH_ERROR',
        payload: error.message || 'Something went wrong.',
      });
    }
  };

  return (
    <main className="min-h-screen bg-[#100b0a] px-5 py-8 text-white sm:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 flex items-center justify-between border-b border-amber-500/30 pb-5">
          <div className="flex items-center gap-3">
            <span className="text-4xl" role="img" aria-label="Popcorn">
              🍿
            </span>
            <div>
              <p className="text-xs font-bold tracking-[0.3em] text-amber-400">
                THE MOVIE EXPERIENCE
              </p>
              <h2 className="text-lg font-black tracking-widest text-white">
                MOVIE HOUSE
              </h2>
            </div>
          </div>

          <span className="hidden text-sm tracking-widest text-amber-300 sm:block">
            LIGHTS. CAMERA. ACTION.
          </span>
        </header>

        <section className="relative mb-12 overflow-hidden rounded-2xl border border-amber-500/40 bg-gradient-to-br from-red-950 via-[#25100d] to-black px-5 py-14 text-center shadow-2xl sm:py-20">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(245,158,11,0.18),_transparent_65%)]" />

          <div className="relative">
            <p className="mb-3 text-sm font-bold tracking-[0.5em] text-amber-300">
              ★ WELCOME TO ★
            </p>

            <h1 className="text-5xl font-black tracking-wider text-amber-300 drop-shadow-[0_0_18px_rgba(251,191,36,0.35)] sm:text-7xl md:text-8xl">
              HOLLYWOOD
            </h1>

            <div className="mx-auto my-5 h-1 max-w-xl bg-gradient-to-r from-transparent via-amber-400 to-transparent" />

            <h2 className="mb-3 text-2xl font-bold tracking-[0.2em] sm:text-3xl">
              MOVIE FINDER
            </h2>

            <p className="mx-auto max-w-lg text-sm text-stone-300 sm:text-base">
              Grab your popcorn and discover your next favorite movie.
            </p>
          </div>
        </section>

        <section className="mx-auto mb-12 max-w-3xl">
          <h2 className="mb-4 text-center text-xl font-bold text-amber-300">
            Find Your Next Blockbuster
          </h2>

          <form
            onSubmit={handleSearch}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <input
              className="min-w-0 flex-1 rounded-lg border border-amber-500/40 bg-[#211715] px-5 py-4 text-white outline-none placeholder:text-stone-500 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
              type="text"
              placeholder="Search for a movie..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />

            <button
              className="rounded-lg bg-red-700 px-8 py-4 font-bold tracking-wider transition hover:bg-red-600"
              type="submit"
            >
              SEARCH MOVIES
            </button>
          </form>
        </section>

        {state.loading && (
          <p className="mb-6 text-center text-amber-300">
            🍿 Finding your movies...
          </p>
        )}

        {state.error && (
          <p className="mb-6 text-center text-red-400">
            {state.error}
          </p>
        )}

        {state.movies.length > 0 && (
          <h2 className="mb-6 border-l-4 border-amber-400 pl-4 text-2xl font-bold">
            NOW SHOWING
          </h2>
        )}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {state.movies.map((movie) => (
            <MoviePreview key={movie.imdbID} movie={movie} />
          ))}
        </div>

        {!state.loading && !state.error && state.movies.length === 0 && (
          <div className="py-8 text-center">
            <p className="mb-3 text-4xl">🎬</p>
            <p className="text-lg font-semibold text-amber-200">
              Your next movie night starts here.
            </p>
            <p className="mt-2 text-sm text-stone-400">
              Search for a movie above to get started.
            </p>
          </div>
        )}

        <footer className="mt-16 border-t border-amber-500/20 py-6 text-center">
          <p className="text-sm text-stone-400">
            🍿 Made for movie lovers · Movie data powered by OMDb
          </p>
        </footer>
      </div>
    </main>
  );
};

export default Home;
