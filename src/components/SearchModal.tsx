import React, { useState, useEffect } from 'react';
import { Movie } from '../types/movie';
import { Search, X, Film, Tv, User, Filter, SlidersHorizontal } from 'lucide-react';
import { searchUniversal } from '../services/apiService';

interface SearchModalProps {
  allMovies?: Movie[];
  onClose: () => void;
  onSelectMovie: (movie: Movie) => void;
  onSelectPerson: (personId: string) => void;
  onSelectGenre: (genre: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  allMovies = [],
  onClose,
  onSelectMovie,
  onSelectPerson,
  onSelectGenre
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{
    movies: Movie[];
    tv: Movie[];
    people: any[];
    genres: string[];
  }>({ movies: [], tv: [], people: [], genres: [] });
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'all' | 'movies' | 'tv' | 'people' | 'genres'>('all');

  useEffect(() => {
    if (!query.trim()) {
      setResults({ movies: [], tv: [], people: [], genres: [] });
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const data = await searchUniversal(query, allMovies);
        setResults(data);
      } catch (err) {
        console.error('Search failed:', err);
      } finally {
        setLoading(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [query, allMovies]);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-20 px-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-3xl rounded-3xl bg-[#0c111d] border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[82vh]">
        {/* Search Bar Input */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3 bg-[#0c111d] sticky top-0 z-10">
          <Search className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search movies, TV shows, actors, directors, genres..."
            autoFocus
            className="w-full bg-transparent text-white placeholder-slate-500 font-medium text-sm sm:text-base focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          )}
          <button onClick={onClose} className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white text-xs font-semibold">
            Cancel
          </button>
        </div>

        {/* Filter Categories */}
        {query && (
          <div className="flex items-center gap-2 px-4 py-2 border-b border-slate-800/80 bg-slate-950/60 overflow-x-auto text-xs">
            {(['all', 'movies', 'tv', 'people', 'genres'] as const).map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 rounded-lg capitalize font-medium transition whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Search Results Container */}
        <div className="p-4 overflow-y-auto space-y-6 flex-1">
          {loading && (
            <div className="p-8 text-center text-slate-400 text-xs font-mono animate-pulse">
              Searching OTIVO catalog...
            </div>
          )}

          {!loading && !query && (
            <div className="p-8 text-center space-y-3">
              <Search className="w-10 h-10 text-slate-700 mx-auto" />
              <p className="text-slate-400 text-xs">Type a movie title, actor, or genre above to start searching.</p>
            </div>
          )}

          {!loading && query && (
            <>
              {/* Movies Results */}
              {(activeCategory === 'all' || activeCategory === 'movies') && results.movies.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-2">
                    <Film className="w-4 h-4 text-emerald-400" />
                    <span>Movies ({results.movies.length})</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {results.movies.map(m => (
                      <div
                        key={m.id}
                        onClick={() => {
                          onSelectMovie(m);
                          onClose();
                        }}
                        className="flex items-center gap-3 p-2 rounded-xl bg-slate-900/60 hover:bg-slate-800 border border-slate-800/60 cursor-pointer transition"
                      >
                        <img src={m.poster} alt={m.title} className="w-10 h-14 rounded-lg object-cover flex-shrink-0" />
                        <div className="overflow-hidden">
                          <p className="font-bold text-xs text-white truncate">{m.title}</p>
                          <p className="text-[11px] text-slate-400 mt-0.5">{m.year} · {m.genres[0]}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TV Results */}
              {(activeCategory === 'all' || activeCategory === 'tv') && results.tv.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-2">
                    <Tv className="w-4 h-4 text-emerald-400" />
                    <span>TV Shows ({results.tv.length})</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {results.tv.map(t => (
                      <div
                        key={t.id}
                        onClick={() => {
                          onSelectMovie(t);
                          onClose();
                        }}
                        className="flex items-center gap-3 p-2 rounded-xl bg-slate-900/60 hover:bg-slate-800 border border-slate-800/60 cursor-pointer transition"
                      >
                        <img src={t.poster} alt={t.title} className="w-10 h-14 rounded-lg object-cover flex-shrink-0" />
                        <div className="overflow-hidden">
                          <p className="font-bold text-xs text-white truncate">{t.title}</p>
                          <p className="text-[11px] text-slate-400 mt-0.5">{t.year} · TV Series</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* People Results */}
              {(activeCategory === 'all' || activeCategory === 'people') && results.people.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-2">
                    <User className="w-4 h-4 text-emerald-400" />
                    <span>People ({results.people.length})</span>
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {results.people.map(p => (
                      <div
                        key={p.id}
                        onClick={() => {
                          onSelectPerson(p.id);
                          onClose();
                        }}
                        className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-900/60 hover:bg-slate-800 border border-slate-800/60 cursor-pointer transition"
                      >
                        <img src={p.photo} alt={p.name} className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
                        <div className="overflow-hidden">
                          <p className="font-bold text-xs text-white truncate">{p.name}</p>
                          <p className="text-[10px] text-slate-500 truncate">{p.knownFor}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Genres Results */}
              {(activeCategory === 'all' || activeCategory === 'genres') && results.genres.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Genres</h3>
                  <div className="flex flex-wrap gap-2">
                    {results.genres.map(g => (
                      <button
                        key={g}
                        onClick={() => {
                          onSelectGenre(g);
                          onClose();
                        }}
                        className="px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold hover:bg-emerald-500/20 transition"
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
