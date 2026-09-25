import React, { useEffect, useState } from 'react';
import { Movie } from '../types/movie';
import { MovieCard } from '../components/MovieCard';
import { User, Film } from 'lucide-react';

interface PersonPageProps {
  personId: string;
  movies: Movie[];
  watchlistIds: string[];
  onSelectMovie: (movie: Movie) => void;
  onPlayMovie: (movie: Movie) => void;
  onToggleWatchlist: (movieId: string, e: React.MouseEvent) => void;
}

export const PersonPage: React.FC<PersonPageProps> = ({
  personId,
  movies,
  watchlistIds,
  onSelectMovie,
  onPlayMovie,
  onToggleWatchlist
}) => {
  const [personData, setPersonData] = useState<any>(null);
  const [filmography, setFilmography] = useState<Movie[]>([]);

  useEffect(() => {
    fetch(`/api/person/${personId}`)
      .then(res => res.json())
      .then(data => {
        if (data.person) setPersonData(data.person);
        if (Array.isArray(data.filmography)) setFilmography(data.filmography);
      })
      .catch(() => {});
  }, [personId]);

  if (!personData) {
    return (
      <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 text-center text-slate-500 font-mono text-xs">
        Loading Person Details...
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Profile Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0c111c] border border-slate-800 flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <img
          src={personData.photo}
          alt={personData.name}
          className="w-28 h-28 sm:w-36 sm:h-36 rounded-full object-cover border-4 border-slate-800 shadow-2xl flex-shrink-0"
        />
        <div className="space-y-3 text-center sm:text-left flex-1">
          <h1 className="text-3xl font-black text-white">{personData.name}</h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl">{personData.biography}</p>
        </div>
      </div>

      {/* Known For / Filmography */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Film className="w-5 h-5 text-emerald-400" />
          <span>Filmography ({filmography.length})</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {filmography.map(movie => (
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
    </div>
  );
};
