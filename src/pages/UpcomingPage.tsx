import React, { useState } from 'react';
import { Movie } from '../types/movie';
import { MovieCard } from '../components/MovieCard';
import { Calendar, Clock, Bell, Sparkles } from 'lucide-react';

interface UpcomingPageProps {
  movies: Movie[];
  watchlistIds: string[];
  onSelectMovie: (movie: Movie) => void;
  onPlayMovie: (movie: Movie) => void;
  onToggleWatchlist: (movieId: string, e: React.MouseEvent) => void;
}

export const UpcomingPage: React.FC<UpcomingPageProps> = ({
  movies,
  watchlistIds,
  onSelectMovie,
  onPlayMovie,
  onToggleWatchlist
}) => {
  const [filter, setFilter] = useState<'all' | 'this_month' | 'upcoming'>('all');

  const upcomingMovies = movies.filter(m =>
    m.isUpcoming || m.status.includes('UPCOMING') || m.status.includes('COMING') || m.year >= 2026
  );

  const filtered = upcomingMovies.filter(m => {
    if (filter === 'this_month') return m.status === 'COMING_THIS_MONTH';
    if (filter === 'upcoming') return m.status === 'UPCOMING';
    return true;
  });

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Release Engine</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">Upcoming Releases</h1>
          <p className="text-xs text-slate-400 mt-1">Track premiere dates, theatrical windows, and streaming availability</p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-medium">
          {(['all', 'this_month', 'upcoming'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg capitalize transition ${
                filter === f ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              {f === 'this_month' ? 'Coming This Month' : f === 'upcoming' ? 'Future Releases' : 'All Upcoming'}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Upcoming Spotlight */}
      {filtered.length > 0 && (
        <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 p-6 sm:p-10 flex flex-col md:flex-row gap-8 items-center">
          <img
            src={filtered[0].backdrop || filtered[0].poster}
            alt={filtered[0].title}
            className="absolute inset-0 w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f1d] via-[#0a0f1d]/90 to-transparent" />

          <img
            src={filtered[0].poster}
            alt={filtered[0].title}
            className="relative w-40 sm:w-48 rounded-2xl shadow-2xl border border-slate-700/80 flex-shrink-0 z-10"
          />

          <div className="relative z-10 space-y-4 max-w-xl">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <Calendar className="w-4 h-4" />
              <span>Releasing {filtered[0].releaseDate}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white">{filtered[0].title}</h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">{filtered[0].overview}</p>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={(e) => onToggleWatchlist(filtered[0].id, e)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition"
              >
                <Bell className="w-4 h-4" />
                <span>{watchlistIds.includes(filtered[0].id) ? 'Reminding You' : 'Remind Me'}</span>
              </button>
              <button
                onClick={() => onSelectMovie(filtered[0])}
                className="px-5 py-2.5 rounded-xl bg-slate-800 text-white font-bold text-xs border border-slate-700 hover:bg-slate-700 transition"
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      )}

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
