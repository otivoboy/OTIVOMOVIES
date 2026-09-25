import React, { useState } from 'react';
import { Movie } from '../types/movie';
import {
  Play,
  Plus,
  Check,
  Share2,
  Star,
  ShieldCheck,
  Sparkles,
  Film,
  Globe,
  Radio,
  Layers,
  CheckCircle2
} from 'lucide-react';

interface MovieSpotlightProps {
  movie: Movie;
  allMovies: Movie[];
  watchlistIds: string[];
  onPlayMovie: (movie: Movie) => void;
  onToggleWatchlist: (movieId: string, e: React.MouseEvent) => void;
  onSelectMovie: (movie: Movie) => void;
}

export const MovieSpotlight: React.FC<MovieSpotlightProps> = ({
  movie,
  allMovies,
  watchlistIds,
  onPlayMovie,
  onToggleWatchlist,
  onSelectMovie
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'cast' | 'crew' | 'similar' | 'reviews'>('overview');
  const [copiedShare, setCopiedShare] = useState(false);

  const inWatchlist = watchlistIds.includes(movie.id);

  const formatRuntime = (mins: number) => {
    const hours = Math.floor(mins / 60);
    const m = mins % 60;
    return `${hours}h ${m}m`;
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: movie.title,
        text: movie.overview,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  const similarMovies = allMovies
    .filter(m => m.id !== movie.id && m.genres.some(g => movie.genres.includes(g)))
    .slice(0, 5);

  return (
    <section className="p-4 sm:p-6 lg:p-8 rounded-3xl bg-[#0B1118] border border-slate-800/80 shadow-2xl relative overflow-hidden">
      {/* Subtle backdrop glow */}
      <div
        className="absolute -top-40 -left-40 w-96 h-96 bg-[#00F060]/10 rounded-full blur-3xl pointer-events-none"
      />
      <div
        className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
        {/* Left Column: Movie Poster (3 cols) */}
        <div className="lg:col-span-3 flex justify-center">
          <div className="relative group w-full max-w-[280px] rounded-2xl overflow-hidden shadow-2xl border border-slate-800/80 aspect-[2/3]">
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-[#00F060] text-black font-black text-[10px] uppercase tracking-wider shadow-md">
              OTIVO 1080P
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
              <button
                onClick={() => onPlayMovie(movie)}
                className="w-full py-2.5 rounded-xl bg-[#00F060] text-black font-bold text-xs flex items-center justify-center gap-2 shadow-lg"
              >
                <Play className="w-4 h-4 fill-black" />
                <span>Play Movie</span>
              </button>
            </div>
          </div>
        </div>

        {/* Center Column: Movie Details (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
              {movie.title}
            </h2>

            {/* Metadata Line */}
            <div className="flex items-center flex-wrap gap-2 text-xs text-slate-400 font-medium">
              <span>{movie.year}</span>
              <span className="text-slate-600">•</span>
              <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-bold text-[10px]">
                {movie.ageRating || 'PG-13'}
              </span>
              <span className="text-slate-600">•</span>
              <span>{formatRuntime(movie.runtime || 120)}</span>
              <span className="text-slate-600">•</span>
              <span>{movie.genres.join(' • ')}</span>
            </div>

            {/* Ratings Row */}
            <div className="flex items-center gap-4 pt-1">
              <div className="flex items-center gap-1.5 text-amber-400 font-bold text-xs">
                <Star className="w-4 h-4 fill-amber-400" />
                <span className="text-white text-sm">{movie.rating}</span>
                <span className="text-slate-500 font-normal">/10</span>
                <span className="text-slate-400 font-normal text-[11px]">
                  ({(movie.voteCount || 1200).toLocaleString()} votes)
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-[#00F060] font-bold text-xs">
                <div className="w-4 h-4 rounded-full bg-[#00F060]/20 flex items-center justify-center text-[10px]">
                  ✓
                </div>
                <span>92%</span>
                <span className="text-slate-400 font-normal text-[11px]">Audience Score</span>
              </div>
            </div>
          </div>

          {/* Synopsis */}
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {movie.overview}
          </p>

          {/* Action Buttons */}
          <div className="flex items-center flex-wrap gap-3 pt-1">
            <button
              onClick={() => onPlayMovie(movie)}
              className="px-6 py-3 rounded-2xl bg-[#00F060] hover:bg-[#16FF72] text-black font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-[#00F060]/25 transition hover:scale-[1.02]"
            >
              <Play className="w-4 h-4 fill-black ml-0.5" />
              <span>Watch Movie</span>
            </button>

            <button
              onClick={e => onToggleWatchlist(movie.id, e)}
              className="px-4 py-3 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-white border border-slate-800 font-bold text-xs flex items-center gap-2 transition"
            >
              {inWatchlist ? <Check className="w-4 h-4 text-[#00F060]" /> : <Plus className="w-4 h-4" />}
              <span>{inWatchlist ? 'In My List' : 'Add to My List'}</span>
            </button>

            <button
              onClick={handleShare}
              className="px-4 py-3 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 font-medium text-xs flex items-center gap-2 transition"
            >
              <Share2 className="w-4 h-4" />
              <span>{copiedShare ? 'Link Copied!' : 'Share'}</span>
            </button>
          </div>

          {/* Spotlight Detail Tabs */}
          <div className="pt-4 border-t border-slate-800/80">
            <div className="flex items-center gap-2 overflow-x-auto text-xs font-semibold pb-2">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'cast', label: 'Cast' },
                { id: 'crew', label: 'Crew' },
                { id: 'similar', label: 'Similar Movies' },
                { id: 'reviews', label: 'Reviews' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`pb-1 px-1 transition-colors relative whitespace-nowrap ${
                    activeTab === tab.id ? 'text-[#00F060] font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <span>{tab.label}</span>
                  {activeTab === tab.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00F060] rounded-full" />
                  )}
                </button>
              ))}
            </div>

            {/* Tab Panels */}
            <div className="pt-3 text-xs text-slate-300">
              {activeTab === 'overview' && (
                <p className="text-slate-400 leading-relaxed">
                  Available in full high-definition 1080p surround sound on OTIVO Movies. Direct streaming connected to edge servers.
                </p>
              )}

              {activeTab === 'cast' && (
                <div className="flex items-center gap-3 overflow-x-auto py-1">
                  {movie.cast.map(c => (
                    <div key={c.id} className="flex items-center gap-2 p-1.5 pr-3 rounded-xl bg-slate-900/80 border border-slate-800/80 flex-shrink-0">
                      <img src={c.photo} alt={c.name} className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <p className="font-bold text-white text-[11px] truncate max-w-[100px]">{c.name}</p>
                        <p className="text-[10px] text-slate-400 truncate max-w-[100px]">{c.character}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'crew' && (
                <div className="grid grid-cols-2 gap-2">
                  {movie.crew.map(cr => (
                    <div key={cr.id} className="p-2 rounded-xl bg-slate-900/60 border border-slate-800">
                      <p className="font-bold text-white text-[11px]">{cr.name}</p>
                      <p className="text-[10px] text-slate-400">{cr.job}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'similar' && (
                <div className="flex items-center gap-3 overflow-x-auto py-1">
                  {similarMovies.map(sim => (
                    <button
                      key={sim.id}
                      onClick={() => onSelectMovie(sim)}
                      className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-900/80 border border-slate-800 flex-shrink-0 text-left hover:border-slate-700 transition"
                    >
                      <img src={sim.poster} alt={sim.title} className="w-8 h-12 rounded object-cover" />
                      <div>
                        <p className="font-bold text-white text-[11px] truncate max-w-[100px]">{sim.title}</p>
                        <p className="text-[10px] text-slate-400">{sim.year}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-2">
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-white">Film Critic Review</span>
                      <span className="text-amber-400 font-bold">10/10</span>
                    </div>
                    <p className="text-slate-400 text-[11px]">
                      "A staggering visual and narrative triumph. Denis Villeneuve delivers a sci-fi masterpiece for the ages."
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: OTIVO Movie Streaming Engine Specs (4 cols) */}
        <div className="lg:col-span-4 p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-xl">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-[#00F060] animate-pulse" />
              <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">
                OTIVO Streaming Engine
              </h3>
            </div>
            <p className="text-xs text-slate-400">Direct connection to high-speed CDN servers</p>
          </div>

          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/60 to-slate-900 border border-[#00F060]/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">Master Quality</span>
              <span className="px-2 py-0.5 rounded bg-[#00F060] text-black font-extrabold text-[10px]">
                1080p Ultra HD
              </span>
            </div>

            <div className="space-y-1.5 text-xs text-slate-300 font-mono">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Protocol:</span>
                <span className="text-[#00F060]">HLS Adaptive (.m3u8)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Audio:</span>
                <span>5.1 Surround Sound</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Latency:</span>
                <span className="text-emerald-400">&lt; 14ms Edge CDN</span>
              </div>
            </div>

            <button
              onClick={() => onPlayMovie(movie)}
              className="w-full py-3 rounded-xl bg-[#00F060] hover:bg-[#16FF72] text-black font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#00F060]/20 transition"
            >
              <Play className="w-4 h-4 fill-black ml-0.5" />
              <span>Start Streaming Now</span>
            </button>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2 text-xs">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Supported Playback Features
            </span>
            <div className="grid grid-cols-2 gap-2 text-slate-300 text-[11px]">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00F060]" />
                <span>Multi-bitrate</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00F060]" />
                <span>Resume Progress</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00F060]" />
                <span>Variable Speed</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00F060]" />
                <span>Full Mobile View</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
