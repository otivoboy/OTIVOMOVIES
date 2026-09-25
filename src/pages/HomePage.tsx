import React from 'react';
import { Movie, WatchHistoryItem } from '../types/movie';
import { HeroCarousel } from '../components/HeroCarousel';
import { ContinueWatchingRow } from '../components/ContinueWatchingRow';
import { MovieRow } from '../components/MovieRow';

interface HomePageProps {
  movies: Movie[];
  watchlistIds: string[];
  historyItems: (WatchHistoryItem & { movie?: Movie })[];
  onSelectMovie: (movie: Movie) => void;
  onPlayMovie: (movie: Movie, resumePosition?: number) => void;
  onToggleWatchlist: (movieId: string, e: React.MouseEvent) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  movies,
  watchlistIds,
  historyItems,
  onSelectMovie,
  onPlayMovie,
  onToggleWatchlist
}) => {
  const featured = movies.filter(m => m.isFeatured);
  const freeMovies = movies.filter(m => m.isFree || m.streamingSources.some(s => s.isFree));
  const trending = movies.filter(m => m.isTrending);
  const popular = movies.filter(m => m.isPopular);
  const tvShows = movies.filter(m => m.type === 'tv');
  const newReleases = movies.filter(m => m.isNewRelease || m.year >= 2025);
  const upcoming = movies.filter(m => m.isUpcoming || m.status.includes('UPCOMING') || m.status.includes('COMING'));

  const action = movies.filter(m => m.genres.includes('Action'));
  const scifi = movies.filter(m => m.genres.includes('Sci-Fi'));
  const fantasy = movies.filter(m => m.genres.includes('Fantasy'));
  const horror = movies.filter(m => m.genres.includes('Horror'));
  const classics = movies.filter(m => m.genres.includes('Classic') || m.year < 1980);

  return (
    <div className="pb-20 pt-16">
      {/* Hero Carousel */}
      <HeroCarousel
        featuredMovies={featured.length > 0 ? featured : movies.slice(0, 4)}
        watchlistIds={watchlistIds}
        onSelect={onSelectMovie}
        onPlay={onPlayMovie}
        onToggleWatchlist={onToggleWatchlist}
      />

      {/* Continue Watching */}
      <ContinueWatchingRow historyItems={historyItems} onPlay={onPlayMovie} />

      {/* Rows */}
      <MovieRow
        title="Free to Watch"
        subtitle="Legally available full-length movies and shows"
        movies={freeMovies}
        watchlistIds={watchlistIds}
        onSelect={onSelectMovie}
        onPlay={onPlayMovie}
        onToggleWatchlist={onToggleWatchlist}
      />

      <MovieRow
        title="Trending Now"
        subtitle="Most watched titles across OTIVO this week"
        movies={trending}
        watchlistIds={watchlistIds}
        onSelect={onSelectMovie}
        onPlay={onPlayMovie}
        onToggleWatchlist={onToggleWatchlist}
      />

      <MovieRow
        title="Popular Movies"
        subtitle="Top rated blockbusters and critical favorites"
        movies={popular.filter(m => m.type === 'movie')}
        watchlistIds={watchlistIds}
        onSelect={onSelectMovie}
        onPlay={onPlayMovie}
        onToggleWatchlist={onToggleWatchlist}
      />

      <MovieRow
        title="Popular TV Shows"
        subtitle="Binge-worthy series and season releases"
        movies={tvShows}
        watchlistIds={watchlistIds}
        onSelect={onSelectMovie}
        onPlay={onPlayMovie}
        onToggleWatchlist={onToggleWatchlist}
      />

      <MovieRow
        title="New Releases"
        subtitle="Fresh cinema arrivals and recent releases"
        movies={newReleases}
        watchlistIds={watchlistIds}
        onSelect={onSelectMovie}
        onPlay={onPlayMovie}
        onToggleWatchlist={onToggleWatchlist}
      />

      <MovieRow
        title="Upcoming Releases"
        subtitle="Anticipated future films and premiere dates"
        movies={upcoming}
        watchlistIds={watchlistIds}
        onSelect={onSelectMovie}
        onPlay={onPlayMovie}
        onToggleWatchlist={onToggleWatchlist}
      />

      <MovieRow
        title="Sci-Fi & Cyberpunk"
        movies={scifi}
        watchlistIds={watchlistIds}
        onSelect={onSelectMovie}
        onPlay={onPlayMovie}
        onToggleWatchlist={onToggleWatchlist}
      />

      <MovieRow
        title="High-Octane Action"
        movies={action}
        watchlistIds={watchlistIds}
        onSelect={onSelectMovie}
        onPlay={onPlayMovie}
        onToggleWatchlist={onToggleWatchlist}
      />

      <MovieRow
        title="Epic Fantasy"
        movies={fantasy}
        watchlistIds={watchlistIds}
        onSelect={onSelectMovie}
        onPlay={onPlayMovie}
        onToggleWatchlist={onToggleWatchlist}
      />

      <MovieRow
        title="Classic Cinema & Public Domain"
        subtitle="Timeless cinematic masterworks"
        movies={classics}
        watchlistIds={watchlistIds}
        onSelect={onSelectMovie}
        onPlay={onPlayMovie}
        onToggleWatchlist={onToggleWatchlist}
      />
    </div>
  );
};
