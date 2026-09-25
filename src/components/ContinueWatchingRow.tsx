import React from 'react';
import { WatchHistoryItem, Movie } from '../types/movie';
import { Play, Clock } from 'lucide-react';

interface ContinueWatchingRowProps {
  historyItems: (WatchHistoryItem & { movie?: Movie })[];
  onPlay: (movie: Movie, resumePosition?: number) => void;
}

export const ContinueWatchingRow: React.FC<ContinueWatchingRowProps> = ({ historyItems, onPlay }) => {
  const validItems = historyItems.filter(h => h.movie && !h.completed && h.position > 0);

  if (validItems.length === 0) return null;

  return (
    <section className="my-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-4">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          <Clock className="w-5 h-5 text-emerald-400" />
          <span>Continue Watching</span>
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">Pick up right where you left off</p>
      </div>

      <div className="flex items-center gap-4 overflow-x-auto scrollbar-none py-2" style={{ scrollbarWidth: 'none' }}>
        {validItems.map(item => {
          const movie = item.movie!;
          const progressPercent = Math.min(100, Math.max(0, (item.position / (item.duration || movie.runtime * 60)) * 100));
          const remainingSec = (item.duration || movie.runtime * 60) - item.position;
          const remainingMin = Math.ceil(remainingSec / 60);

          return (
            <div
              key={item.id}
              onClick={() => onPlay(movie, item.position)}
              className="group relative flex-shrink-0 w-64 sm:w-72 rounded-2xl overflow-hidden bg-[#101622] border border-slate-800 hover:border-emerald-500/50 shadow-lg cursor-pointer transition transform hover:scale-[1.02]"
            >
              {/* Backdrop Still */}
              <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
                <img
                  src={movie.backdrop || movie.poster}
                  alt={movie.title}
                  className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shadow-xl group-hover:scale-110 transition">
                    <Play className="w-5 h-5 fill-slate-950 ml-0.5" />
                  </div>
                </div>

                {/* Remaining Time Badge */}
                <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-black/80 text-[10px] text-slate-300 font-mono">
                  {remainingMin > 0 ? `${remainingMin}m remaining` : 'Resume'}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1 bg-slate-800">
                <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${progressPercent}%` }} />
              </div>

              {/* Title info */}
              <div className="p-3">
                <h4 className="font-bold text-slate-100 text-sm truncate group-hover:text-emerald-400 transition-colors">
                  {movie.title}
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {movie.type === 'tv' ? 'TV Series' : `${movie.year} · Movie`}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
