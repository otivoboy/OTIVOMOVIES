import React, { useState } from 'react';
import { Movie, getMovieStreamingAction } from '../types/movie';
import {
  Play,
  Plus,
  Check,
  Share2,
  Star,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Film,
  Tv,
  Globe
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
  const [selectedRegion, setSelectedRegion] = useState('🇰🇪 (Kenya)');

  const inWatchlist = watchlistIds.includes(movie.id);
  const action = getMovieStreamingAction(movie);
  const hasFreeStream = movie.isFree || movie.streamingSources.some(s => s.isFree && s.isAuthorized !== false);

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
    <section className="p-4 sm:p-6 lg:p-8 rounded-3xl bg-[#0b101b] border border-slate-800/80 shadow-2xl relative overflow-hidden">
      {/* Subtle backdrop glow */}
      <div
        className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"
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
            {hasFreeStream && (
              <div className="absolute top-3 left-3 px-2 py-1 rounded-md bg-[#00E575] text-[#081018] font-black text-[11px] uppercase tracking-wider shadow-md">
                HD FREE
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
              <button
                onClick={() => onPlayMovie(movie)}
                className="w-full py-2.5 rounded-xl bg-[#00E575] text-[#081018] font-bold text-xs flex items-center justify-center gap-2 shadow-lg"
              >
                <Play className="w-4 h-4 fill-[#081018]" />
                <span>{action.label}</span>
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

            {/* Ratings Row (Matching user screenshot) */}
            <div className="flex items-center gap-4 pt-1">
              <div className="flex items-center gap-1.5 text-amber-400 font-bold text-xs">
                <Star className="w-4 h-4 fill-amber-400" />
                <span className="text-white text-sm">{movie.rating}</span>
                <span className="text-slate-500 font-normal">/10</span>
                <span className="text-slate-400 font-normal text-[11px]">
                  ({(movie.voteCount || 1200).toLocaleString()} votes)
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-[#00E575] font-bold text-xs">
                <div className="w-4 h-4 rounded-full bg-[#00E575]/20 flex items-center justify-center text-[10px]">
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

          {/* Distinct Action Buttons (Matching user screenshot) */}
          <div className="flex items-center flex-wrap gap-3 pt-1">
            {action.type === 'STREAM' ? (
              <button
                onClick={() => onPlayMovie(movie)}
                className="px-6 py-3 rounded-2xl bg-[#00E575] hover:bg-[#00c965] text-[#081018] font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-[#00E575]/25 transition hover:scale-[1.02]"
              >
                <Play className="w-4 h-4 fill-[#081018]" />
                <span>Watch Free</span>
              </button>
            ) : action.type === 'PROVIDER' ? (
              <a
                href={action.providerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-2xl bg-blue-500 hover:bg-blue-400 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-blue-500/25 transition hover:scale-[1.02]"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>{action.label}</span>
              </a>
            ) : (
              <button
                onClick={() => onPlayMovie(movie)}
                className="px-6 py-3 rounded-2xl bg-[#00E575] hover:bg-[#00c965] text-[#081018] font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-[#00E575]/25 transition hover:scale-[1.02]"
              >
                <Play className="w-4 h-4 fill-[#081018]" />
                <span>Watch Trailer</span>
              </button>
            )}

            <button
              onClick={e => onToggleWatchlist(movie.id, e)}
              className="px-4 py-3 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-white border border-slate-800 font-bold text-xs flex items-center gap-2 transition"
            >
              {inWatchlist ? <Check className="w-4 h-4 text-[#00E575]" /> : <Plus className="w-4 h-4" />}
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
                    activeTab === tab.id ? 'text-[#00E575] font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <span>{tab.label}</span>
                  {activeTab === tab.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00E575] rounded-full" />
                  )}
                </button>
              ))}
            </div>

            {/* Tab Panels */}
            <div className="pt-3 text-xs text-slate-300">
              {activeTab === 'overview' && (
                <p className="text-slate-400 leading-relaxed">
                  Released by Warner Bros. Pictures & Legendary Entertainment. Directed by Denis Villeneuve with cinematography by Greig Fraser and musical score composed by Hans Zimmer.
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

        {/* Right Column: "Where to Watch" Panel (4 cols) (Matching user screenshot) */}
        <div className="lg:col-span-4 p-5 rounded-2xl bg-slate-900/70 border border-slate-800/90 space-y-4 shadow-xl">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Where to Watch
            </h3>
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Available in your region {selectedRegion}</span>
              <button
                onClick={() => {
                  const regions = ['🇰🇪 (Kenya)', '🇺🇸 (United States)', '🇬🇧 (United Kingdom)', '🌍 (Global)'];
                  const nextIdx = (regions.indexOf(selectedRegion) + 1) % regions.length;
                  setSelectedRegion(regions[nextIdx]);
                }}
                className="text-[10px] text-[#00E575] hover:underline"
                title="Change region"
              >
                Change
              </button>
            </div>
          </div>

          {/* Highlighted OTIVO Free Streaming Card (Matching screenshot) */}
          <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-950/60 to-slate-900 border border-[#00E575]/40 flex items-center justify-between gap-3 shadow-lg">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#00E575]/20 text-[#00E575] flex items-center justify-center font-bold text-xs">
                Free
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-white">Free on</span>
                  <span className="text-xs font-black text-[#00E575]">OTIVO</span>
                  <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-[#00E575] text-[9px] font-bold">HD</span>
                </div>
                <span className="text-[10px] text-slate-400">Authorized Stream</span>
              </div>
            </div>

            <button
              onClick={() => onPlayMovie(movie)}
              className="px-3.5 py-1.5 rounded-xl bg-[#00E575] hover:bg-[#00c965] text-[#081018] font-bold text-xs flex items-center gap-1.5 shadow-md shadow-[#00E575]/20 transition"
            >
              <Play className="w-3 h-3 fill-[#081018]" />
              <span>Watch Free</span>
            </button>
          </div>

          {/* "Also Available On" List (Matching screenshot) */}
          <div className="space-y-2 pt-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Also Available On
            </span>

            {[
              { name: 'Netflix', type: 'Subscription', color: 'bg-red-500', url: 'https://www.netflix.com' },
              { name: 'Prime Video', type: 'Subscription', color: 'bg-blue-600', url: 'https://www.primevideo.com' },
              { name: 'Disney+', type: 'Subscription', color: 'bg-indigo-600', url: 'https://www.disneyplus.com' },
              { name: 'Apple TV+', type: 'Subscription', color: 'bg-zinc-700', url: 'https://tv.apple.com' }
            ].map(provider => (
              <div
                key={provider.name}
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/60 hover:border-slate-700 transition"
              >
                <div className="flex items-center gap-2.5">
                  <div className={`w-6 h-6 rounded-md ${provider.color} flex items-center justify-center text-white text-[10px] font-bold shadow-sm`}>
                    {provider.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">{provider.name}</p>
                    <p className="text-[10px] text-slate-400">{provider.type}</p>
                  </div>
                </div>

                <a
                  href={provider.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium text-[11px] transition flex items-center gap-1"
                >
                  <span>Watch Now</span>
                  <ExternalLink className="w-2.5 h-2.5 text-slate-400" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
