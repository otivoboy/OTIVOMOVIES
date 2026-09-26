import React, { useRef } from 'react';
import { Movie } from '../types/movie';
import { MovieCard } from './MovieCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MovieRowProps {
  title: string;
  subtitle?: string;
  movies: Movie[];
  watchlistIds: string[];
  onSelect: (movie: Movie) => void;
  onPlay: (movie: Movie) => void;
  onToggleWatchlist: (movieId: string, e: React.MouseEvent) => void;
}

export const MovieRow: React.FC<MovieRowProps> = ({
  title,
  subtitle,
  movies,
  watchlistIds,
  onSelect,
  onPlay,
  onToggleWatchlist
}) => {
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollAmount = clientWidth * 0.75;
      rowRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (!movies || movies.length === 0) return null;

  return (
    <section className="relative my-6 sm:my-8 w-full">
      {/* Row Header */}
      <div className="flex items-end justify-between mb-3 px-1">
        <div>
          <h2 className="text-lg sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
            {title}
          </h2>
          {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
        </div>

        {/* Scroll Buttons */}
        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={() => scroll('left')}
            className="p-2 rounded-full bg-slate-900/90 border border-slate-800 text-slate-300 hover:text-white hover:border-[#00F060] transition"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-2 rounded-full bg-slate-900/90 border border-slate-800 text-slate-300 hover:text-white hover:border-[#00F060] transition"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Scroll List */}
      <div
        ref={rowRef}
        className="flex items-center gap-3 sm:gap-5 overflow-x-auto scrollbar-none py-2 px-1 scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {movies.map(movie => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isInWatchlist={watchlistIds.includes(movie.id)}
            onSelect={onSelect}
            onPlay={onPlay}
            onToggleWatchlist={onToggleWatchlist}
          />
        ))}
      </div>
    </section>
  );
};
