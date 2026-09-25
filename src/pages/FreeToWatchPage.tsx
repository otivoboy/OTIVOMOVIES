import React from 'react';
import { Movie } from '../types/movie';
import { MovieCard } from '../components/MovieCard';
import { Play, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface FreeToWatchPageProps {
  movies: Movie[];
  watchlistIds: string[];
  onSelectMovie: (movie: Movie) => void;
  onPlayMovie: (movie: Movie) => void;
  onToggleWatchlist: (movieId: string, e: React.MouseEvent) => void;
}

export const FreeToWatchPage: React.FC<FreeToWatchPageProps> = ({
  movies,
  watchlistIds,
  onSelectMovie,
  onPlayMovie,
  onToggleWatchlist
}) => {
  const freeMovies = movies.filter(m => m.isFree || m.streamingSources.some(s => s.isFree));

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-950/60 via-[#0a121e] to-[#090d16] border border-emerald-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4" />
            <span>100% Authorized & Verified Free</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">Free to Watch Catalog</h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Legal, full-length streaming. Enjoy open-license films, public domain classics, and authorized AVOD partners with zero subscription required.
          </p>
        </div>

        <div className="flex flex-col gap-2 text-xs text-emerald-300 font-medium bg-emerald-950/40 p-4 rounded-2xl border border-emerald-500/20 flex-shrink-0">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>No Piracy or Unauthorized Mirrors</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>High-Definition HLS Video Stream</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Verified Legal Rights Registry</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
        {freeMovies.map(movie => (
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
