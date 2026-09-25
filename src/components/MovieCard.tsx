import React from 'react';
import { Movie } from '../types/movie';
import { Play, Plus, Check, Info, Star } from 'lucide-react';

interface MovieCardProps {
  movie: Movie;
  isInWatchlist?: boolean;
  onSelect: (movie: Movie) => void;
  onPlay: (movie: Movie) => void;
  onToggleWatchlist: (movieId: string, e: React.MouseEvent) => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  isInWatchlist = false,
  onSelect,
  onPlay,
  onToggleWatchlist
}) => {
  const isFree = movie.isFree || movie.streamingSources.some(s => s.isFree);

  return (
    <div
      onClick={() => onSelect(movie)}
      className="group relative flex-shrink-0 w-44 sm:w-52 md:w-60 cursor-pointer rounded-2xl overflow-hidden bg-[#101622] border border-slate-800/80 hover:border-emerald-500/50 shadow-xl transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:shadow-emerald-950/40"
    >
      {/* Poster Image Container */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-slate-900">
        <img
          src={movie.poster}
          alt={movie.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            // Fallback image container on error
            (e.target as HTMLElement).style.display = 'none';
          }}
        />

        {/* Free Badge */}
        {isFree && (
          <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-md bg-emerald-500 text-slate-950 text-[10px] font-extrabold uppercase tracking-widest shadow-lg">
            FREE
          </div>
        )}

        {/* Rating Badge */}
        <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-amber-400 text-xs font-bold flex items-center gap-1 border border-white/10">
          <Star className="w-3 h-3 fill-amber-400" />
          <span>{movie.rating.toFixed(1)}</span>
        </div>

        {/* Dark Hover Scrim & Quick Actions */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-[#090d16]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3.5">
          <div className="flex items-center gap-2 mb-2">
            {isFree ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onPlay(movie);
                }}
                className="p-2.5 rounded-full bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition shadow-lg hover:scale-110"
                title="Watch Free Now"
              >
                <Play className="w-4 h-4 fill-slate-950 ml-0.5" />
              </button>
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(movie);
                }}
                className="p-2.5 rounded-full bg-slate-800 text-slate-200 hover:bg-slate-700 transition"
                title="More Info"
              >
                <Info className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={(e) => onToggleWatchlist(movie.id, e)}
              className={`p-2.5 rounded-full transition ${
                isInWatchlist
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
              }`}
              title={isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
            >
              {isInWatchlist ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            </button>
          </div>

          <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed font-normal">
            {movie.overview}
          </p>
        </div>
      </div>

      {/* Card Metadata Footer */}
      <div className="p-3">
        <h3 className="font-bold text-slate-100 text-sm tracking-tight truncate group-hover:text-emerald-400 transition-colors">
          {movie.title}
        </h3>
        <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-1 font-mono">
          <span>{movie.year}</span>
          <span className="text-slate-600">·</span>
          <span>{movie.genres[0] || 'Movie'}</span>
          <span className="text-slate-600">·</span>
          <span>{movie.type === 'tv' ? 'TV' : `${movie.runtime}m`}</span>
        </div>
      </div>
    </div>
  );
};
