
import { useNavigate } from 'react-router-dom';

const MoviePreview = ({ movie }) => {
  const navigate = useNavigate();

  return (
    <article className="group overflow-hidden rounded-xl border border-amber-500/25 bg-[#1c1311] shadow-lg transition duration-300 hover:-translate-y-1 hover:border-amber-400/80 hover:shadow-amber-900/30">
      <div className="relative overflow-hidden">
        <img
          className="h-96 w-full object-cover transition duration-500 group-hover:scale-105"
          src={
            movie.Poster && movie.Poster !== 'N/A'
              ? movie.Poster
              : 'https://placehold.co/300x450/211715/F5D38A?text=No+Poster'
          }
          alt={`${movie.Title} poster`}
        />

        <div className="absolute left-3 top-3 rounded-md border border-amber-300/40 bg-black/80 px-3 py-1">
          <span className="text-xs font-bold tracking-widest text-amber-300">
            NOW SHOWING
          </span>
        </div>
      </div>

      <div className="p-5">
        <h2 className="mb-2 text-xl font-bold text-amber-100 transition group-hover:text-amber-300">
          {movie.Title}
        </h2>

        <p className="mb-5 text-sm text-stone-400">
          Release year: {movie.Year}
        </p>

        <button
          className="w-full rounded-lg border border-amber-400/50 bg-red-800 px-4 py-3 font-bold tracking-wide text-white transition hover:bg-red-700"
          onClick={() => navigate(`/movie/${movie.imdbID}`)}
        >
          View Movie Details →
        </button>
      </div>
    </article>
  );
};

export default MoviePreview;
