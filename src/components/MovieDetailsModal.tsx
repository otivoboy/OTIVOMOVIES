import React, { useState, useEffect } from 'react';
import { Movie, Comment } from '../types/movie';
import { X, Play, Plus, Check, Star, ShieldCheck, Film, MessageSquare, Send, Sparkles } from 'lucide-react';
import { fetchCommentsUniversal, addCommentUniversal } from '../services/apiService';

interface MovieDetailsModalProps {
  movie: Movie;
  allMovies: Movie[];
  watchlistIds: string[];
  onClose: () => void;
  onPlay: (movie: Movie) => void;
  onToggleWatchlist: (movieId: string, e: React.MouseEvent) => void;
  onSelectMovie: (movie: Movie) => void;
  onSelectPerson?: (personId: string) => void;
}

export const MovieDetailsModal: React.FC<MovieDetailsModalProps> = ({
  movie,
  allMovies,
  watchlistIds,
  onClose,
  onPlay,
  onToggleWatchlist,
  onSelectMovie,
  onSelectPerson
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'cast' | 'comments'>('overview');
  const [showTrailer, setShowTrailer] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newCommentText, setNewCommentText] = useState('');
  const [userRating, setUserRating] = useState<number>(9);
  const [submittingComment, setSubmittingComment] = useState(false);

  const isInWatchlist = watchlistIds.includes(movie.id);

  // Similar movies
  const similarMovies = allMovies
    .filter(m => m.id !== movie.id && m.genres.some(g => movie.genres.includes(g)))
    .slice(0, 6);

  useEffect(() => {
    fetchCommentsUniversal(movie.id)
      .then(data => setComments(data))
      .catch(() => {});
  }, [movie.id]);

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    setSubmittingComment(true);
    try {
      const newComment = await addCommentUniversal(movie.id, newCommentText, userRating);
      setComments(prev => [newComment, ...prev]);
      setNewCommentText('');
    } catch (err) {
      console.error(err);
    } finally {
      setSubmittingComment(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl rounded-3xl bg-[#0B1118] border border-slate-800/90 shadow-2xl overflow-hidden my-auto max-h-[94vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-black/70 text-slate-300 hover:text-white hover:bg-black transition backdrop-blur-md border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Banner Header */}
        <div className="relative h-64 sm:h-80 md:h-96 w-full flex-shrink-0 bg-slate-900">
          <img
            src={movie.backdrop || movie.poster}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1118] via-[#0B1118]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1118] via-[#0B1118]/40 to-transparent" />

          {/* Title & Key Info inside Banner */}
          <div className="absolute bottom-6 left-6 right-6 flex items-end gap-5">
            <img
              src={movie.poster}
              alt={movie.title}
              className="hidden sm:block w-32 md:w-40 rounded-2xl border-2 border-slate-700/80 shadow-2xl flex-shrink-0 object-cover"
            />
            <div className="space-y-2 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-300">
                <span className="px-2.5 py-0.5 rounded bg-[#00F060] text-black font-extrabold uppercase text-[10px] tracking-wider">
                  OTIVO STREAM
                </span>
                <span className="flex items-center gap-1 text-amber-400 font-bold bg-black/60 px-2 py-0.5 rounded border border-white/10">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{movie.rating.toFixed(1)}</span>
                </span>
                <span>·</span>
                <span>{movie.year}</span>
                <span>·</span>
                <span>{movie.ageRating}</span>
                <span>·</span>
                <span>{movie.type === 'tv' ? 'TV Series' : `${movie.runtime}m`}</span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                {movie.title}
              </h1>

              {movie.tagline && (
                <p className="text-xs sm:text-sm text-slate-300 italic">{movie.tagline}</p>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onPlay(movie)}
                  className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#00F060] hover:bg-[#16FF72] text-black font-bold text-xs sm:text-sm shadow-xl shadow-[#00F060]/20 transition transform hover:scale-105"
                >
                  <Play className="w-4 h-4 fill-black ml-0.5" />
                  <span>Watch Movie</span>
                </button>

                <button
                  onClick={(e) => onToggleWatchlist(movie.id, e)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition ${
                    isInWatchlist
                      ? 'bg-[#00F060]/20 text-[#00F060] border border-[#00F060]/40'
                      : 'bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700'
                  }`}
                >
                  {isInWatchlist ? <Check className="w-4 h-4 text-[#00F060]" /> : <Plus className="w-4 h-4" />}
                  <span>{isInWatchlist ? 'In My List' : 'Add to My List'}</span>
                </button>

                {movie.trailerUrl && (
                  <button
                    onClick={() => setShowTrailer(!showTrailer)}
                    className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-700 font-semibold text-xs sm:text-sm transition"
                  >
                    <Film className="w-4 h-4" />
                    <span>Trailer</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex items-center gap-6 px-6 border-b border-slate-800/80 bg-[#0B1118] sticky top-0 z-20">
          {(['overview', 'cast', 'comments'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3.5 text-xs sm:text-sm font-bold capitalize transition border-b-2 relative ${
                activeTab === tab
                  ? 'text-[#00F060] border-[#00F060]'
                  : 'text-slate-400 border-transparent hover:text-slate-200'
              }`}
            >
              {tab === 'comments' ? 'Reviews' : tab}
              {tab === 'comments' && comments.length > 0 && (
                <span className="ml-1.5 px-1.5 py-0.2 rounded-full bg-slate-800 text-[10px] text-slate-300">
                  {comments.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Trailer Embed Popup */}
          {showTrailer && movie.trailerUrl && (
            <div className="rounded-2xl overflow-hidden bg-black aspect-video border border-slate-800 shadow-2xl my-2">
              <video src={movie.trailerUrl} controls autoPlay className="w-full h-full object-contain" />
            </div>
          )}

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Overview</h3>
                <p className="text-slate-200 text-sm sm:text-base leading-relaxed">{movie.overview}</p>
              </div>

              {/* Genre Pills */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Genres</h3>
                <div className="flex flex-wrap gap-2">
                  {movie.genres.map(g => (
                    <span key={g} className="px-3 py-1 rounded-xl bg-slate-900/90 text-slate-300 text-xs font-medium border border-slate-800">
                      {g}
                    </span>
                  ))}
                </div>
              </div>

              {/* Technical Metadata Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs">
                <div>
                  <span className="text-slate-500 block">Release Date</span>
                  <span className="text-slate-200 font-medium">{movie.releaseDate}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Runtime</span>
                  <span className="text-slate-200 font-medium">{movie.runtime} minutes</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Languages</span>
                  <span className="text-slate-200 font-medium">{movie.languages.join(', ')}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Countries</span>
                  <span className="text-slate-200 font-medium">{movie.countries.join(', ')}</span>
                </div>
              </div>

              {/* Similar Titles */}
              {similarMovies.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold tracking-tight text-white mb-3">More Like This</h3>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                    {similarMovies.map(m => (
                      <div
                        key={m.id}
                        onClick={() => onSelectMovie(m)}
                        className="cursor-pointer rounded-xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-[#00F060] transition group"
                      >
                        <img src={m.poster} alt={m.title} className="aspect-[2/3] object-cover w-full group-hover:scale-105 transition" />
                        <div className="p-1.5">
                          <p className="text-[11px] font-bold text-slate-200 truncate group-hover:text-[#00F060]">{m.title}</p>
                          <span className="text-[10px] text-slate-500">{m.year}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Cast Tab */}
          {activeTab === 'cast' && (
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Featured Cast</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {movie.cast.map(c => (
                  <div
                    key={c.id}
                    onClick={() => onSelectPerson && onSelectPerson(c.id)}
                    className="flex items-center gap-3 p-2.5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 cursor-pointer transition"
                  >
                    <img src={c.photo} alt={c.name} className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
                    <div className="overflow-hidden">
                      <p className="font-bold text-xs text-white truncate hover:text-[#00F060]">{c.name}</p>
                      <p className="text-[11px] text-slate-400 truncate">{c.character}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Comments & Rating Tab */}
          {activeTab === 'comments' && (
            <div className="space-y-6">
              <form onSubmit={handleAddComment} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">Leave a Review</h4>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">Rating:</span>
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5,6,7,8,9,10].map(num => (
                      <button
                        type="button"
                        key={num}
                        onClick={() => setUserRating(num)}
                        className={`w-6 h-6 rounded text-[10px] font-bold ${
                          userRating >= num ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
                <textarea
                  value={newCommentText}
                  onChange={e => setNewCommentText(e.target.value)}
                  placeholder="Share your thoughts about this title..."
                  rows={2}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-[#00F060]"
                />
                <button
                  type="submit"
                  disabled={submittingComment || !newCommentText.trim()}
                  className="px-5 py-2.5 rounded-xl bg-[#00F060] hover:bg-[#16FF72] text-black font-bold text-xs transition disabled:opacity-50"
                >
                  Post Review
                </button>
              </form>

              {/* Comments List */}
              <div className="space-y-3">
                {comments.length === 0 ? (
                  <p className="text-xs text-slate-500">No reviews yet. Be the first to share a review!</p>
                ) : (
                  comments.map(c => (
                    <div key={c.id} className="p-3.5 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-slate-200">{c.userName}</span>
                        {c.rating && (
                          <span className="text-[10px] text-amber-400 font-bold bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                            {c.rating}/10 ★
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">{c.text}</p>
                      <span className="text-[10px] text-slate-500 block pt-1 font-mono">
                        {new Date(c.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
