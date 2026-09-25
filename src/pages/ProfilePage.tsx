import React, { useState } from 'react';
import { UserProfile, WatchHistoryItem, Movie } from '../types/movie';
import { User, Shield, Film, Clock, Heart, Sparkles, Check, Trash2, ArrowRight } from 'lucide-react';

interface ProfilePageProps {
  user: UserProfile;
  historyItems: (WatchHistoryItem & { movie?: Movie })[];
  movies: Movie[];
  watchlistCount?: number;
  onPlayMovie: (movie: Movie, resumePosition?: number) => void;
  onNavigate: (tab: string) => void;
  onClearHistory?: () => void;
  onUpdateProfile?: (updated: Partial<UserProfile>) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  user,
  historyItems,
  movies,
  watchlistCount = 0,
  onPlayMovie,
  onNavigate,
  onClearHistory,
  onUpdateProfile
}) => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>(user.favoriteGenres || []);
  const [saving, setSaving] = useState(false);

  const genres = ['Sci-Fi', 'Action', 'Drama', 'Adventure', 'Fantasy', 'Horror', 'Comedy', 'Mystery', 'Animation', 'Classic'];

  const toggleGenre = async (genre: string) => {
    let nextGenres: string[];
    if (selectedGenres.includes(genre)) {
      nextGenres = selectedGenres.filter(g => g !== genre);
    } else {
      nextGenres = [...selectedGenres, genre];
    }
    setSelectedGenres(nextGenres);

    setSaving(true);
    try {
      await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ favoriteGenres: nextGenres })
      });
      if (onUpdateProfile) {
        onUpdateProfile({ favoriteGenres: nextGenres });
      }
    } catch {
      // ignore
    } finally {
      setSaving(false);
    }
  };

  const handleClearHistory = async () => {
    if (!confirm('Are you sure you want to clear your entire watch history?')) return;
    try {
      await fetch('/api/history', { method: 'DELETE' });
      if (onClearHistory) onClearHistory();
    } catch {
      // ignore
    }
  };

  const userInitial = (user.email || 'Admin').charAt(0).toUpperCase();

  return (
    <div className="pt-24 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Account Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0c111c] border border-slate-800 flex flex-col sm:flex-row items-center gap-6 shadow-xl">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-slate-950 font-black text-3xl shadow-lg shadow-emerald-500/20 flex-shrink-0">
          {userInitial}
        </div>

        <div className="space-y-2 text-center sm:text-left flex-1">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <h1 className="text-2xl font-black text-white">{user.name || 'OTIVO Account'}</h1>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
              Verified Session
            </span>
          </div>
          <p className="text-xs text-slate-400 font-mono">{user.email || 'otivoai@gmail.com'}</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('admin')}
            className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 text-xs font-semibold text-slate-300 hover:text-emerald-400 transition flex items-center gap-2"
          >
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>Admin Portal</span>
          </button>
        </div>
      </div>

      {/* Account Activity Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div
          onClick={() => onNavigate('watchlist')}
          className="p-5 rounded-2xl bg-[#0c111c] border border-slate-800 hover:border-emerald-500/40 cursor-pointer transition group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Watchlist</span>
            <Heart className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-black text-white mt-2">{watchlistCount}</p>
          <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1 group-hover:text-emerald-400 transition">
            <span>View saved titles</span>
            <ArrowRight className="w-3 h-3" />
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#0c111c] border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Watch History</span>
            <Clock className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-black text-white mt-2">{historyItems.length}</p>
          <p className="text-[11px] text-slate-500 mt-1">Titles played on this device</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#0c111c] border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Catalog Server</span>
            <Film className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-black text-white mt-2">{movies.length}</p>
          <p className="text-[11px] text-emerald-400 mt-1">Real Verified Catalog</p>
        </div>
      </div>

      {/* Favorite Genres Selector */}
      <div className="p-6 rounded-3xl bg-[#0c111c] border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Preferred Genres</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">Customize your personal recommendations across movies and series</p>
          </div>
          {saving && <span className="text-[11px] text-emerald-400 font-mono animate-pulse">Saving...</span>}
        </div>

        <div className="flex flex-wrap gap-2.5">
          {genres.map(g => {
            const isSelected = selectedGenres.includes(g);
            return (
              <button
                key={g}
                onClick={() => toggleGenre(g)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
                  isSelected
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/20'
                    : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700'
                }`}
              >
                {isSelected && <Check className="w-3.5 h-3.5" />}
                <span>{g}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recent Watch History */}
      <div className="p-6 rounded-3xl bg-[#0c111c] border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>Watch History</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">Your recently played titles and session progress</p>
          </div>
          {historyItems.length > 0 && (
            <button
              onClick={handleClearHistory}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 text-xs font-semibold transition border border-red-500/20"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear History</span>
            </button>
          )}
        </div>

        <div className="space-y-3">
          {historyItems.length === 0 ? (
            <div className="text-center py-8 text-slate-500 text-xs">
              <Clock className="w-8 h-8 mx-auto mb-2 text-slate-700" />
              <p>No watch history yet.</p>
              <p className="text-[11px] text-slate-600 mt-0.5">Titles you stream will automatically appear here.</p>
            </div>
          ) : (
            historyItems.map(item => {
              if (!item.movie) return null;
              return (
                <div
                  key={item.id}
                  onClick={() => onPlayMovie(item.movie!, item.position)}
                  className="flex items-center justify-between p-3 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/50 cursor-pointer transition"
                >
                  <div className="flex items-center gap-3">
                    <img src={item.movie.poster} alt={item.movie.title} className="w-10 h-14 rounded-lg object-cover" />
                    <div>
                      <h4 className="font-bold text-xs text-white hover:text-emerald-400">{item.movie.title}</h4>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                        Watched {new Date(item.lastWatchedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                    Resume
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
