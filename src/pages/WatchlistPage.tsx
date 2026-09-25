import React from 'react';
import { Movie } from '../types/movie';
import { MovieCard } from '../components/MovieCard';
import { Heart, Trash2 } from 'lucide-react';

interface WatchlistPageProps {
  movies: Movie[];
  watchlistIds: string[];
  onSelectMovie: (movie: Movie) => void;
  onPlayMovie: (movie: Movie) => void;
  onToggleWatchlist: (movieId: string, e: React.MouseEvent) => void;
}

export const WatchlistPage: React.FC<WatchlistPageProps> = ({
  movies,
  watchlistIds,
  onSelectMovie,
  onPlayMovie,
  onToggleWatchlist
}) => {
  const watchlistMovies = movies.filter(m => watchlistIds.includes(m.id));

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400">
            <Heart className="w-6 h-6 fill-emerald-400/20" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight">My Watchlist</h1>
            <p className="text-xs text-slate-400 mt-0.5">Saved movies and TV shows across your synchronized devices</p>
          </div>
        </div>
        <span className="text-xs font-mono text-slate-400">{watchlistMovies.length} items</span>
      </div>

      {watchlistMovies.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-[#0d121f] border border-slate-800 space-y-4 my-8">
          <Heart className="w-12 h-12 text-slate-700 mx-auto" />
          <h2 className="text-lg font-bold text-slate-300">Your Watchlist is empty</h2>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Click "+ Add to Watchlist" on any movie card or detail page to save titles here for later viewing.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {watchlistMovies.map(movie => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isInWatchlist={true}
              onSelect={onSelectMovie}
              onPlay={onPlayMovie}
              onToggleWatchlist={onToggleWatchlist}
            />
          ))}
        </div>
      )}
    </div>
  );
};
