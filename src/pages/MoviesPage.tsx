import React, { useState } from 'react';
import { Movie } from '../types/movie';
import { MovieCard } from '../components/MovieCard';
import { Filter, SlidersHorizontal } from 'lucide-react';

interface MoviesPageProps {
  movies: Movie[];
  watchlistIds: string[];
  onSelectMovie: (movie: Movie) => void;
  onPlayMovie: (movie: Movie) => void;
  onToggleWatchlist: (movieId: string, e: React.MouseEvent) => void;
}

export const MoviesPage: React.FC<MoviesPageProps> = ({
  movies,
  watchlistIds,
  onSelectMovie,
  onPlayMovie,
  onToggleWatchlist
}) => {
  const [selectedGenre, setSelectedGenre] = useState<string>('All');
  const [onlyFree, setOnlyFree] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('popular');

  const movieCatalog = movies.filter(m => m.type === 'movie');

  let filtered = movieCatalog.filter(m => {
    if (selectedGenre !== 'All' && !m.genres.includes(selectedGenre)) return false;
    if (onlyFree && !m.isFree) return false;
    return true;
  });

  if (sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === 'year') {
    filtered.sort((a, b) => b.year - a.year);
  } else {
    filtered.sort((a, b) => b.voteCount - a.voteCount);
  }

  const allGenres = ['All', 'Action', 'Sci-Fi', 'Fantasy', 'Horror', 'Romance', 'Comedy', 'Mystery', 'Drama', 'Classic'];

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-white tracking-tight">Movie Catalog</h1>
        <p className="text-xs text-slate-400 mt-1">Explore feature films, blockbusters, and indie masterworks</p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#0e1422] border border-slate-800">
        <div className="flex flex-wrap items-center gap-2">
          {allGenres.map(g => (
            <button
              key={g}
              onClick={() => setSelectedGenre(g)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                selectedGenre === g
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4 text-xs font-medium text-slate-300">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={onlyFree}
              onChange={e => setOnlyFree(e.target.checked)}
              className="rounded accent-emerald-500"
            />
            <span>Free Only</span>
          </label>

          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs font-medium text-white focus:outline-none focus:border-emerald-500"
          >
            <option value="popular">Most Popular</option>
            <option value="rating">Highest Rated</option>
            <option value="year">Release Year</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
        {filtered.map(movie => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isInWatchlist={watchlistIds.includes(movie.id)}
            onSelect={onSelectMovie}
            onPlay={onPlayMovie}
            onToggleWatchlist={onToggleWatchlist}
          />
        ))}
      </div>
    </div>
  );
};
