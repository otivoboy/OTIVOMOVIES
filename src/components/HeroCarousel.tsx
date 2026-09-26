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
      className="relative w-full min-h-[500px] sm:min-h-[560px] lg:h-[70vh] lg:max-h-[720px] bg-[#05090D] overflow-hidden select-none"
    >
      {/* Hero Backdrop Image */}
      <div className="absolute inset-0 transition-opacity duration-1000 ease-in-out">
        <img
          src={currentMovie.backdrop || currentMovie.poster}
          alt={currentMovie.title}
          className="w-full h-full object-cover object-center scale-105 animate-subtle-zoom"
        />
        {/* Dark Cinematic Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#05090D] via-[#05090D]/85 sm:via-[#05090D]/75 to-transparent w-full lg:w-3/4 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#05090D] via-[#05090D]/50 to-transparent h-full z-10" />
      </div>

      {/* Hero Content Overlay (Fixed Spacing for Mobile Viewport) */}
      <div className="relative z-20 w-full h-full px-4 sm:px-8 lg:px-12 2xl:px-16 flex items-end pt-20 pb-16 sm:pb-20">
        <div className="max-w-3xl space-y-3 sm:space-y-4">
          {/* Badge & Metadata Row */}
          <div className="flex items-center flex-wrap gap-2 text-xs font-mono text-slate-300">
            <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-lg bg-[#00F060] text-black font-black uppercase tracking-widest text-[10px] shadow-lg shadow-[#00F060]/20">
              FEATURED
            </span>
            <span className="flex items-center gap-1 text-amber-400 font-bold bg-black/60 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg border border-white/10">
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
          <h1 className="text-2xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight text-white drop-shadow-2xl leading-tight sm:leading-none">
            {currentMovie.title}
          </h1>

          {/* Tagline / Overview */}
          <p className="text-xs sm:text-sm lg:text-base text-slate-300 line-clamp-2 sm:line-clamp-3 leading-relaxed max-w-2xl font-normal">
            {currentMovie.overview}
          </p>

          {/* Genres */}
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
            {currentMovie.genres.map((g, idx) => (
              <React.Fragment key={g}>
                <span className="hover:text-[#00F060] transition">{g}</span>
                {idx < currentMovie.genres.length - 1 && <span className="text-slate-600">·</span>}
              </React.Fragment>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-2">
            <button
              onClick={() => onPlay(currentMovie)}
              className="flex items-center gap-2 px-5 sm:px-8 py-3 sm:py-3.5 rounded-2xl bg-[#00F060] hover:bg-[#16FF72] text-black font-extrabold text-xs sm:text-sm shadow-xl shadow-[#00F060]/25 transition duration-200 transform active:scale-95 sm:hover:scale-105"
            >
              <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-black ml-0.5" />
              <span>Watch Movie</span>
            </button>

            <button
              onClick={(e) => onToggleWatchlist(currentMovie.id, e)}
              className={`flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-3 sm:py-3.5 rounded-2xl font-bold text-xs sm:text-sm transition ${
                isInWatchlist
                  ? 'bg-[#00F060]/20 text-[#00F060] border border-[#00F060]/40'
                  : 'bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80'
              }`}
            >
              {isInWatchlist ? (
                <>
                  <Check className="w-4 h-4 text-[#00F060]" />
                  <span>In My List</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Add to My List</span>
                </>
              )}
            </button>

            <button
              onClick={() => onSelect(currentMovie)}
              className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-3 sm:py-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 border border-slate-700/80 font-bold text-xs sm:text-sm transition"
            >
              <Info className="w-4 h-4" />
              <span>More Info</span>
            </button>
          </div>
        </div>
      </div>

      {/* Carousel Controls (Left/Right arrows) */}
      <button
        onClick={handlePrev}
        className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-30 p-3.5 rounded-full bg-black/60 border border-slate-800 text-slate-300 hover:text-white hover:bg-black transition backdrop-blur-md"
        aria-label="Previous featured movie"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={handleNext}
        className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-30 p-3.5 rounded-full bg-black/60 border border-slate-800 text-slate-300 hover:text-white hover:bg-black transition backdrop-blur-md"
        aria-label="Next featured movie"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Carousel Slide Indicators */}
      <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-12 z-30 flex items-center gap-2">
        {featuredMovies.map((m, idx) => (
          <button
            key={m.id}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === currentIndex ? 'w-8 bg-[#00F060]' : 'w-2.5 bg-slate-700 hover:bg-slate-500'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
