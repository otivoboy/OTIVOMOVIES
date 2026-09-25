import React, { useState } from 'react';
import { Movie } from '../types/movie';
import { MovieCard } from '../components/MovieCard';
import { INITIAL_GENRES } from '../data/seedMovies';

interface GenresPageProps {
  movies: Movie[];
  watchlistIds: string[];
  initialGenre?: string;
  onSelectMovie: (movie: Movie) => void;
  onPlayMovie: (movie: Movie) => void;
  onToggleWatchlist: (movieId: string, e: React.MouseEvent) => void;
}

export const GenresPage: React.FC<GenresPageProps> = ({
  movies,
  watchlistIds,
  initialGenre,
  onSelectMovie,
  onPlayMovie,
  onToggleWatchlist
}) => {
  const [selectedGenre, setSelectedGenre] = useState<string>(initialGenre || INITIAL_GENRES[0]);

  const filteredMovies = movies.filter(m => m.genres.includes(selectedGenre));

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      <div>
        <h1 className="text-3xl font-black text-white tracking-tight">Browse by Genre</h1>
        <p className="text-xs text-slate-400 mt-1">Filter titles by thematic category and storytelling genre</p>
      </div>

      {/* Genre Pills */}
      <div className="flex flex-wrap items-center gap-2.5 p-4 rounded-2xl bg-[#0e1422] border border-slate-800">
        {INITIAL_GENRES.map(genre => (
          <button
            key={genre}
            onClick={() => setSelectedGenre(genre)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              selectedGenre === genre
                ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
            }`}
          >
            {genre}
          </button>
        ))}
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">{selectedGenre} Titles</h2>
        <span className="text-xs text-slate-400 font-mono">{filteredMovies.length} titles</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
        {filteredMovies.map(movie => (
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
