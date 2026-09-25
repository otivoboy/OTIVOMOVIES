import React from 'react';
import { Movie } from '../types/movie';
import { MovieCard } from '../components/MovieCard';
import { Tv } from 'lucide-react';

interface TvShowsPageProps {
  movies: Movie[];
  watchlistIds: string[];
  onSelectMovie: (movie: Movie) => void;
  onPlayMovie: (movie: Movie) => void;
  onToggleWatchlist: (movieId: string, e: React.MouseEvent) => void;
}

export const TvShowsPage: React.FC<TvShowsPageProps> = ({
  movies,
  watchlistIds,
  onSelectMovie,
  onPlayMovie,
  onToggleWatchlist
}) => {
  const tvCatalog = movies.filter(m => m.type === 'tv');

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400">
          <Tv className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">TV Shows & Series</h1>
          <p className="text-xs text-slate-400 mt-0.5">Explore full seasons, episodes, and television series</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
        {tvCatalog.map(show => (
          <MovieCard
            key={show.id}
            movie={show}
            isInWatchlist={watchlistIds.includes(show.id)}
            onSelect={onSelectMovie}
            onPlay={onPlayMovie}
            onToggleWatchlist={onToggleWatchlist}
          />
        ))}
      </div>
    </div>
  );
};
