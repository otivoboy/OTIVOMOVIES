import React, { useState, useEffect, useRef } from 'react';
import { Movie } from '../types/movie';
import { Play, Plus, Check, Info, Star, ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroCarouselProps {
  featuredMovies: Movie[];
  watchlistIds: string[];
  onSelect: (movie: Movie) => void;
  onPlay: (movie: Movie) => void;
  onToggleWatchlist: (movieId: string, e: React.MouseEvent) => void;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({
  featuredMovies,
  watchlistIds,
  onSelect,
  onPlay,
  onToggleWatchlist
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (isPaused || featuredMovies.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % featuredMovies.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [isPaused, featuredMovies.length]);

  if (!featuredMovies || featuredMovies.length === 0) return null;

  const currentMovie = featuredMovies[currentIndex];
  const isFree = currentMovie.isFree || currentMovie.streamingSources.some(s => s.isFree);
  const isInWatchlist = watchlistIds.includes(currentMovie.id);

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % featuredMovies.length);
  };

  const handlePrev = () => {
    setCurrentIndex(prev => (prev - 1 + featuredMovies.length) % featuredMovies.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (diff > 50) handleNext();
    if (diff < -50) handlePrev();
    touchStartX.current = null;
  };

  return (
    <section
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full h-[75vh] min-h-[500px] max-h-[720px] bg-[#090d16] overflow-hidden select-none"
    >
      {/* Hero Backdrop Image */}
      <div className="absolute inset-0 transition-opacity duration-1000 ease-in-out">
        <img
          src={currentMovie.backdrop || currentMovie.poster}
          alt={currentMovie.title}
          className="w-full h-full object-cover object-center scale-105 animate-subtle-zoom"
        />
        {/* Dark Cinematic Vignette Scrim */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#090d16] via-[#090d16]/70 to-transparent w-full md:w-3/4 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-[#090d16]/30 to-transparent h-full z-10" />
      </div>

      {/* Hero Content Overlay */}
      <div className="relative z-20 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-end pb-16 sm:pb-20">
        <div className="max-w-2xl space-y-4">
          {/* Metadata Row */}
          <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
            {isFree && (
              <span className="px-2.5 py-0.5 rounded bg-emerald-500 text-slate-950 font-extrabold uppercase tracking-widest text-[10px]">
                Authorized Free
              </span>
            )}
            <span className="flex items-center gap-1 text-amber-400 font-bold bg-black/50 px-2 py-0.5 rounded border border-white/10">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{currentMovie.rating.toFixed(1)}</span>
            </span>
            <span>·</span>
            <span>{currentMovie.year}</span>
            <span>·</span>
            <span>{currentMovie.ageRating}</span>
            <span>·</span>
            <span>{currentMovie.type === 'tv' ? 'TV Series' : `${currentMovie.runtime}m`}</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white drop-shadow-lg leading-none">
            {currentMovie.title}
          </h1>

          {/* Tagline / Overview */}
          <p className="text-sm sm:text-base text-slate-300 line-clamp-2 sm:line-clamp-3 leading-relaxed max-w-xl font-normal">
            {currentMovie.tagline || currentMovie.overview}
          </p>

          {/* Genres */}
          <div className="flex items-center gap-2 text-xs text-slate-400">
            {currentMovie.genres.map((g, idx) => (
              <React.Fragment key={g}>
                <span className="hover:text-emerald-400 transition">{g}</span>
                {idx < currentMovie.genres.length - 1 && <span className="text-slate-600">·</span>}
              </React.Fragment>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {isFree ? (
              <button
                onClick={() => onPlay(currentMovie)}
                className="flex items-center gap-2.5 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-xl shadow-emerald-500/20 transition duration-200 transform hover:scale-105"
              >
                <Play className="w-5 h-5 fill-slate-950 ml-0.5" />
                <span>Watch Free</span>
              </button>
            ) : (
              <button
                onClick={() => onSelect(currentMovie)}
                className="flex items-center gap-2.5 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 shadow-xl transition"
              >
                <Info className="w-5 h-5 text-emerald-400" />
                <span>Where to Watch</span>
              </button>
            )}

            <button
              onClick={(e) => onToggleWatchlist(currentMovie.id, e)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition ${
                isInWatchlist
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80'
              }`}
            >
              {isInWatchlist ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>In Watchlist</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Add to Watchlist</span>
                </>
              )}
            </button>

            <button
              onClick={() => onSelect(currentMovie)}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-700/80 font-semibold text-sm transition"
            >
              <Info className="w-4 h-4" />
              <span>More Info</span>
            </button>
          </div>
        </div>
      </div>

      {/* Carousel Controls (Left/Right arrows + Indicators) */}
      <button
        onClick={handlePrev}
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-slate-950/60 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-900 transition"
        aria-label="Previous featured movie"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={handleNext}
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-slate-950/60 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-900 transition"
        aria-label="Next featured movie"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Carousel Slide Indicators */}
      <div className="absolute bottom-6 right-6 sm:right-12 z-30 flex items-center gap-2">
        {featuredMovies.map((m, idx) => (
          <button
            key={m.id}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === currentIndex ? 'w-8 bg-emerald-400' : 'w-2 bg-slate-700 hover:bg-slate-500'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
