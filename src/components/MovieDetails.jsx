
import { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MovieContext } from '../context/MovieContext';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useContext(MovieContext);

  useEffect(() => {
    const fetchMovie = async () => {
      dispatch({ type: 'FETCH_START' });

      try {
        const response = await fetch(`/api/movie/${id}`);
        const data = await response.json();

        if (!response.ok || data.Response === 'False') {
          throw new Error(data.Error || 'Could not load movie details.');
        }

        dispatch({
          type: 'FETCH_MOVIE_SUCCESS',
          payload: data,
        });
      } catch (error) {
        dispatch({
          type: 'FETCH_ERROR',
          payload: error.message || 'Something went wrong.',
        });
      }
    };

    fetchMovie();
  }, [id, dispatch]);

  const movie = state.movie;

  return (
    <main className="min-h-screen bg-[#100b0a] px-5 py-10 text-white sm:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 flex items-center justify-between border-b border-amber-500/30 pb-5">
          <div className="flex items-center gap-3">
            <span className="text-4xl" role="img" aria-label="Popcorn">
              🍿
            </span>
            <div>
              <p className="text-xs font-bold tracking-[0.3em] text-amber-400">
                THE MOVIE EXPERIENCE
              </p>
              <h2 className="font-black tracking-widest">MOVIE HOUSE</h2>
            </div>
          </div>

          <span className="hidden text-sm tracking-widest text-amber-300 sm:block">
            LIGHTS. CAMERA. ACTION.
          </span>
        </header>

        <button
          onClick={() => navigate('/')}
          className="mb-8 rounded-lg border border-amber-400/50 bg-red-800 px-5 py-3 font-bold transition hover:bg-red-700"
        >
          ← Back to Search
        </button>

        {state.loading && (
          <p className="py-10 text-center text-amber-300">
            🍿 Loading movie details...
          </p>
        )}

        {state.error && (
          <p className="rounded-lg border border-red-800 bg-red-950/50 p-4 text-red-300">
            {state.error}
          </p>
        )}

        {movie && !state.loading && (
          <>
            <div className="mb-8 rounded-xl border border-amber-500/30 bg-gradient-to-r from-red-950 to-[#211511] p-6 text-center sm:p-10">
              <p className="mb-3 text-sm font-bold tracking-[0.4em] text-amber-400">
                ★ NOW SHOWING ★
              </p>

              <h1 className="text-3xl font-black text-amber-300 sm:text-5xl">
                {movie.Title}
              </h1>

              <p className="mt-3 text-stone-300">
                {movie.Year} · {movie.Rated} · {movie.Runtime}
              </p>
            </div>

            <div className="grid items-start gap-8 md:grid-cols-[320px_1fr]">
              <div className="overflow-hidden rounded-xl border-2 border-amber-500/40 shadow-xl shadow-amber-950/30">
                <img
                  className="w-full"
                  src={
                    movie.Poster && movie.Poster !== 'N/A'
                      ? movie.Poster
                      : 'https://placehold.co/300x450/211715/F5D38A?text=No+Poster'
                  }
                  alt={`${movie.Title} poster`}
                />
              </div>

              <section className="rounded-xl border border-amber-500/20 bg-[#1c1311] p-6 sm:p-8">
                <h2 className="mb-4 border-b border-amber-500/20 pb-3 text-2xl font-bold text-amber-300">
                  About This Movie
                </h2>

                <p className="mb-6 leading-7 text-stone-200">
                  {movie.Plot}
                </p>

                <div className="space-y-4 text-sm sm:text-base">
                  <p>
                    <strong className="text-amber-300">IMDb Rating:</strong>{' '}
                    {movie.imdbRating || 'Not available'}
                  </p>

                  <p>
                    <strong className="text-amber-300">Genre:</strong>{' '}
                    {movie.Genre || 'Not available'}
                  </p>

                  <p>
                    <strong className="text-amber-300">Director:</strong>{' '}
                    {movie.Director || 'Not available'}
                  </p>

                  <p>
                    <strong className="text-amber-300">Actors:</strong>{' '}
                    {movie.Actors || 'Not available'}
                  </p>

                  <p>
                    <strong className="text-amber-300">Released:</strong>{' '}
                    {movie.Released || 'Not available'}
                  </p>

                  <p>
                    <strong className="text-amber-300">Language:</strong>{' '}
                    {movie.Language || 'Not available'}
                  </p>
                </div>

                <div className="mt-8 border-t border-amber-500/20 pt-5 text-center">
                  <p className="text-amber-300">
                    🍿 Enjoy the show!
                  </p>
                </div>
              </section>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default MovieDetails;
