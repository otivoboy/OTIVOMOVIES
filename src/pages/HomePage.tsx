import React from 'react';
import { Movie, WatchHistoryItem } from '../types/movie';
import { HeroCarousel } from '../components/HeroCarousel';
import { ContinueWatchingRow } from '../components/ContinueWatchingRow';
import { MovieRow } from '../components/MovieRow';
import { MovieSpotlight } from '../components/MovieSpotlight';
import { TrailersClipsRow } from '../components/TrailersClipsRow';

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
  const classics = movies.filter(m => m.genres.includes('Classic') || m.year < 1980);

  const spotlightMovie = movies.find(m => m.id === 'otivo-dune-2') || movies.find(m => m.title.includes('Dune')) || movies[1] || movies[0];

  const handlePlayTrailer = (videoUrl: string, title: string) => {
    if (spotlightMovie) {
      const customTrailerMovie: Movie = {
        ...spotlightMovie,
        title: title,
        trailerUrl: videoUrl
      };
      onPlayMovie(customTrailerMovie);
    }
  };

  return (
    <div className="pb-20 space-y-10 w-full">
      {/* 1. Hero Carousel Banner */}
      <HeroCarousel
        featuredMovies={featured.length > 0 ? featured : movies.slice(0, 4)}
        watchlistIds={watchlistIds}
        onSelect={onSelectMovie}
        onPlay={onPlayMovie}
        onToggleWatchlist={onToggleWatchlist}
      />

      <div className="px-4 sm:px-8 lg:px-12 2xl:px-16 space-y-12 w-full">
        {/* 2. Trending Movies Carousel */}
        <MovieRow
          title="Trending Movies"
          subtitle=""
          movies={trending.length > 0 ? trending : movies.slice(0, 8)}
          watchlistIds={watchlistIds}
          onSelect={onSelectMovie}
          onPlay={onPlayMovie}
          onToggleWatchlist={onToggleWatchlist}
        />

        {/* 3. Featured Movie Detail Section (Spotlight Dune: Part Two) */}
        {spotlightMovie && (
          <MovieSpotlight
            movie={spotlightMovie}
            allMovies={movies}
            watchlistIds={watchlistIds}
            onPlayMovie={onPlayMovie}
            onToggleWatchlist={onToggleWatchlist}
            onSelectMovie={onSelectMovie}
          />
        )}

        {/* 4. Trailers & Clips Section */}
        <TrailersClipsRow
          movie={spotlightMovie}
          onPlayTrailer={handlePlayTrailer}
        />

        {/* 5. Popular TV Shows Row */}
        <MovieRow
          title="Popular TV Shows"
          subtitle=""
          movies={tvShows}
          watchlistIds={watchlistIds}
          onSelect={onSelectMovie}
          onPlay={onPlayMovie}
          onToggleWatchlist={onToggleWatchlist}
        />

        {/* 6. Continue Watching Row */}
        <ContinueWatchingRow historyItems={historyItems} onPlay={onPlayMovie} />

        {/* 7. Free Content Section */}
        <MovieRow
          title="Free to Watch"
          subtitle="Legally available full-length movies and shows on OTIVO"
          movies={freeMovies}
          watchlistIds={watchlistIds}
          onSelect={onSelectMovie}
          onPlay={onPlayMovie}
          onToggleWatchlist={onToggleWatchlist}
        />

        {/* 8. Popular Blockbusters */}
        <MovieRow
          title="Popular Movies"
          subtitle="Top rated blockbusters and critical favorites"
          movies={popular.filter(m => m.type === 'movie')}
          watchlistIds={watchlistIds}
          onSelect={onSelectMovie}
          onPlay={onPlayMovie}
          onToggleWatchlist={onToggleWatchlist}
        />

        {/* 9. New & Upcoming Releases */}
        <MovieRow
          title="New Releases"
          movies={newReleases}
          watchlistIds={watchlistIds}
          onSelect={onSelectMovie}
          onPlay={onPlayMovie}
          onToggleWatchlist={onToggleWatchlist}
        />

        <MovieRow
          title="Upcoming Releases"
          movies={upcoming}
          watchlistIds={watchlistIds}
          onSelect={onSelectMovie}
          onPlay={onPlayMovie}
          onToggleWatchlist={onToggleWatchlist}
        />

        {/* 10. Genre Rows */}
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
          title="Classic Cinema"
          movies={classics}
          watchlistIds={watchlistIds}
          onSelect={onSelectMovie}
          onPlay={onPlayMovie}
          onToggleWatchlist={onToggleWatchlist}
        />
      </div>
    </div>
  );
};
