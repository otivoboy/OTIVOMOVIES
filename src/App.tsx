import React, { useState, useEffect, useCallback } from 'react';
import { Movie, WatchHistoryItem } from './types/movie';
import {
  fetchMoviesUniversal,
  fetchHistoryUniversal,
  fetchWatchlistUniversal,
  toggleWatchlistUniversal,
  saveHistoryItemUniversal
} from './services/apiService';
import { Sidebar } from './components/Sidebar';
import { TopHeader } from './components/TopHeader';
import { MobileNav } from './components/MobileNav';
import { OfflineIndicator } from './components/OfflineIndicator';
import { SEOHead } from './components/SEOHead';
import { VideoPlayerModal } from './components/VideoPlayerModal';
import { MovieDetailsModal } from './components/MovieDetailsModal';
import { SearchModal } from './components/SearchModal';

import { HomePage } from './pages/HomePage';
import { MoviesPage } from './pages/MoviesPage';
import { TvShowsPage } from './pages/TvShowsPage';
import { GenresPage } from './pages/GenresPage';
import { UpcomingPage } from './pages/UpcomingPage';
import { FreeToWatchPage } from './pages/FreeToWatchPage';
import { WatchlistPage } from './pages/WatchlistPage';
import { AdminPage } from './pages/AdminPage';
import { PersonPage } from './pages/PersonPage';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Modals state
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [playingMovie, setPlayingMovie] = useState<{ movie: Movie; resumePosition?: number } | null>(null);
  const [selectedPersonId, setSelectedPersonId] = useState<string | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  // Watchlist & History State
  const [watchlistIds, setWatchlistIds] = useState<string[]>([]);
  const [historyItems, setHistoryItems] = useState<(WatchHistoryItem & { movie?: Movie })[]>([]);

  const fetchMovies = useCallback((forceRefresh = false) => {
    setLoading(true);
    fetchMoviesUniversal(forceRefresh)
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setMovies(data);
        }
      })
      .catch(err => console.error('Error fetching movies:', err))
      .finally(() => setLoading(false));
  }, []);

  const fetchHistory = useCallback(() => {
    fetchHistoryUniversal()
      .then(data => {
        if (Array.isArray(data)) setHistoryItems(data);
      })
      .catch(err => console.error('Error fetching history:', err));
  }, []);

  const fetchWatchlist = useCallback(() => {
    fetchWatchlistUniversal()
      .then(ids => {
        if (Array.isArray(ids)) setWatchlistIds(ids);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetchMovies();
    fetchHistory();
    fetchWatchlist();
  }, [fetchMovies, fetchHistory, fetchWatchlist]);

  const handleToggleWatchlist = async (movieId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = await toggleWatchlistUniversal(movieId);
    setWatchlistIds(updated);
  };

  const handleUpdateHistory = useCallback(async (position: number, duration: number, completed: boolean) => {
    if (!playingMovie) return;
    await saveHistoryItemUniversal(playingMovie.movie.id, position, duration);
    fetchHistory();
  }, [playingMovie, fetchHistory]);

  const handleNavigate = (tab: string, extra?: any) => {
    setCurrentTab(tab);
    if (extra?.genre) setSelectedGenre(extra.genre);
    if (extra?.personId) setSelectedPersonId(extra.personId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#05090D] text-slate-100 flex flex-col selection:bg-[#00F060]/30 selection:text-[#00F060]">
      <SEOHead title={selectedMovie?.title} movie={selectedMovie || undefined} />

      {/* Fixed Left Sidebar for Desktop & Mobile Overlay Drawer */}
      <Sidebar
        currentTab={currentTab}
        watchlistCount={watchlistIds.length}
        isOpenMobile={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* Main Content Area Container (Padded left on desktop for fixed sidebar) */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        {/* Sticky Top Header */}
        <TopHeader
          onOpenSearch={() => setSearchModalOpen(true)}
          onOpenMobileMenu={() => setMobileSidebarOpen(true)}
          onNavigate={handleNavigate}
        />

        {/* Main View Router */}
        <main className="flex-1 min-w-0">
          {loading ? (
            <div className="h-[80vh] flex items-center justify-center text-slate-500 font-mono text-xs animate-pulse">
              Loading OTIVO Movies Catalog...
            </div>
          ) : (
            <>
              {currentTab === 'home' && (
                <HomePage
                  movies={movies}
                  watchlistIds={watchlistIds}
                  historyItems={historyItems}
                  onSelectMovie={setSelectedMovie}
                  onPlayMovie={(movie, resumePos) => setPlayingMovie({ movie, resumePosition: resumePos })}
                  onToggleWatchlist={handleToggleWatchlist}
                />
              )}

              {currentTab === 'movies' && (
                <MoviesPage
                  movies={movies}
                  watchlistIds={watchlistIds}
                  onSelectMovie={setSelectedMovie}
                  onPlayMovie={(movie) => setPlayingMovie({ movie })}
                  onToggleWatchlist={handleToggleWatchlist}
                />
              )}

              {currentTab === 'tv' && (
                <TvShowsPage
                  movies={movies}
                  watchlistIds={watchlistIds}
                  onSelectMovie={setSelectedMovie}
                  onPlayMovie={(movie) => setPlayingMovie({ movie })}
                  onToggleWatchlist={handleToggleWatchlist}
                />
              )}

              {currentTab === 'genres' && (
                <GenresPage
                  movies={movies}
                  watchlistIds={watchlistIds}
                  initialGenre={selectedGenre || undefined}
                  onSelectMovie={setSelectedMovie}
                  onPlayMovie={(movie) => setPlayingMovie({ movie })}
                  onToggleWatchlist={handleToggleWatchlist}
                />
              )}

              {currentTab === 'upcoming' && (
                <UpcomingPage
                  movies={movies}
                  watchlistIds={watchlistIds}
                  onSelectMovie={setSelectedMovie}
                  onPlayMovie={(movie) => setPlayingMovie({ movie })}
                  onToggleWatchlist={handleToggleWatchlist}
                />
              )}

              {currentTab === 'free' && (
                <FreeToWatchPage
                  movies={movies}
                  watchlistIds={watchlistIds}
                  onSelectMovie={setSelectedMovie}
                  onPlayMovie={(movie) => setPlayingMovie({ movie })}
                  onToggleWatchlist={handleToggleWatchlist}
                />
              )}

              {currentTab === 'watchlist' && (
                <WatchlistPage
                  movies={movies}
                  watchlistIds={watchlistIds}
                  onSelectMovie={setSelectedMovie}
                  onPlayMovie={(movie) => setPlayingMovie({ movie })}
                  onToggleWatchlist={handleToggleWatchlist}
                />
              )}

              {currentTab === 'person' && selectedPersonId && (
                <PersonPage
                  personId={selectedPersonId}
                  movies={movies}
                  watchlistIds={watchlistIds}
                  onSelectMovie={setSelectedMovie}
                  onPlayMovie={(movie) => setPlayingMovie({ movie })}
                  onToggleWatchlist={handleToggleWatchlist}
                />
              )}

              {currentTab === 'admin' && (
                <AdminPage movies={movies} onRefreshMovies={fetchMovies} />
              )}
            </>
          )}
        </main>

        {/* Mobile Bottom Navigation Bar */}
        <MobileNav
          currentTab={currentTab}
          onNavigate={handleNavigate}
          onOpenSearch={() => setSearchModalOpen(true)}
        />
      </div>

      {/* Global Modals */}
      {selectedMovie && (
        <MovieDetailsModal
          movie={selectedMovie}
          allMovies={movies}
          watchlistIds={watchlistIds}
          onClose={() => setSelectedMovie(null)}
          onPlay={(movie) => {
            setSelectedMovie(null);
            setPlayingMovie({ movie });
          }}
          onToggleWatchlist={handleToggleWatchlist}
          onSelectMovie={setSelectedMovie}
          onSelectPerson={(personId) => {
            setSelectedMovie(null);
            handleNavigate('person', { personId });
          }}
        />
      )}

      {playingMovie && (
        <VideoPlayerModal
          movie={playingMovie.movie}
          initialPosition={playingMovie.resumePosition || 0}
          onClose={() => setPlayingMovie(null)}
          onUpdateHistory={handleUpdateHistory}
        />
      )}

      {searchModalOpen && (
        <SearchModal
          allMovies={movies}
          onClose={() => setSearchModalOpen(false)}
          onSelectMovie={(movie) => {
            setSearchModalOpen(false);
            setSelectedMovie(movie);
          }}
          onSelectPerson={(personId) => {
            setSearchModalOpen(false);
            handleNavigate('person', { personId });
          }}
          onSelectGenre={(genre) => {
            setSearchModalOpen(false);
            handleNavigate('genres', { genre });
          }}
        />
      )}

      <OfflineIndicator />
    </div>
  );
}
