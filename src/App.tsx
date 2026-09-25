import React, { useState, useEffect, useCallback } from 'react';
import { Movie, WatchHistoryItem, UserProfile } from './types/movie';
import { Navbar } from './components/Navbar';
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
import { ProfilePage } from './pages/ProfilePage';
import { AdminPage } from './pages/AdminPage';
import { PersonPage } from './pages/PersonPage';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  // Modals state
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [playingMovie, setPlayingMovie] = useState<{ movie: Movie; resumePosition?: number } | null>(null);
  const [selectedPersonId, setSelectedPersonId] = useState<string | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  // User & Watchlist State
  const [watchlistIds, setWatchlistIds] = useState<string[]>([]);
  const [historyItems, setHistoryItems] = useState<(WatchHistoryItem & { movie?: Movie })[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    id: 'user-demo',
    name: 'OTIVO Admin',
    email: 'otivoai@gmail.com',
    avatar: '',
    favoriteGenres: ['Sci-Fi', 'Action', 'Drama'],
    watchlist: [],
    history: [],
    ratings: {}
  });

  const fetchMovies = useCallback(() => {
    fetch('/api/movies')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setMovies(data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const fetchHistory = useCallback(() => {
    fetch('/api/history')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setHistoryItems(data);
      })
      .catch(err => console.error(err));
  }, []);

  const fetchWatchlist = useCallback(() => {
    fetch('/api/watchlist')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setWatchlistIds(data.map((m: any) => m.id));
        }
      })
      .catch(() => {});
  }, []);

  const fetchProfile = useCallback(() => {
    fetch('/api/profile')
      .then(res => res.json())
      .then(data => {
        if (data && data.email) {
          setUserProfile(data);
          if (Array.isArray(data.watchlist)) {
            setWatchlistIds(data.watchlist);
          }
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetchMovies();
    fetchHistory();
    fetchWatchlist();
    fetchProfile();
  }, [fetchMovies, fetchHistory, fetchWatchlist, fetchProfile]);

  const handleToggleWatchlist = (movieId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (watchlistIds.includes(movieId)) {
      setWatchlistIds(prev => prev.filter(id => id !== movieId));
      fetch(`/api/watchlist/${movieId}`, { method: 'DELETE' }).catch(() => {});
    } else {
      setWatchlistIds(prev => [...prev, movieId]);
      fetch('/api/watchlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ movieId })
      }).catch(() => {});
    }
  };

  const handleUpdateHistory = useCallback((position: number, duration: number, completed: boolean) => {
    if (!playingMovie) return;
    fetch('/api/history', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        movieId: playingMovie.movie.id,
        position,
        duration,
        completed
      })
    })
      .then(() => fetchHistory())
      .catch(() => {});
  }, [playingMovie, fetchHistory]);

  const handleNavigate = (tab: string, extra?: any) => {
    setCurrentTab(tab);
    if (extra?.genre) setSelectedGenre(extra.genre);
    if (extra?.personId) setSelectedPersonId(extra.personId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col selection:bg-emerald-500/30 selection:text-emerald-200">
      <SEOHead title={selectedMovie?.title} movie={selectedMovie || undefined} />

      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        watchlistCount={watchlistIds.length}
        onNavigate={handleNavigate}
        onOpenSearch={() => setSearchModalOpen(true)}
      />

      {/* Main Page View Router */}
      <main className="flex-1">
        {loading ? (
          <div className="h-screen flex items-center justify-center text-slate-500 font-mono text-xs animate-pulse">
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

            {currentTab === 'profile' && (
              <ProfilePage
                user={userProfile}
                historyItems={historyItems}
                movies={movies}
                watchlistCount={watchlistIds.length}
                onPlayMovie={(movie, pos) => setPlayingMovie({ movie, resumePosition: pos })}
                onNavigate={handleNavigate}
                onClearHistory={() => setHistoryItems([])}
                onUpdateProfile={(updated) => setUserProfile(prev => ({ ...prev, ...updated }))}
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

      {/* Video Player Modal */}
      {playingMovie && (
        <VideoPlayerModal
          movie={playingMovie.movie}
          initialPosition={playingMovie.resumePosition}
          onClose={() => setPlayingMovie(null)}
          onUpdateHistory={handleUpdateHistory}
        />
      )}

      {/* Movie Details Modal */}
      {selectedMovie && (
        <MovieDetailsModal
          movie={selectedMovie}
          allMovies={movies}
          watchlistIds={watchlistIds}
          onClose={() => setSelectedMovie(null)}
          onPlay={(m) => {
            setSelectedMovie(null);
            setPlayingMovie({ movie: m });
          }}
          onToggleWatchlist={handleToggleWatchlist}
          onSelectMovie={setSelectedMovie}
          onSelectPerson={(personId) => {
            setSelectedMovie(null);
            handleNavigate('person', { personId });
          }}
        />
      )}

      {/* Search Modal */}
      {searchModalOpen && (
        <SearchModal
          onClose={() => setSearchModalOpen(false)}
          onSelectMovie={setSelectedMovie}
          onSelectPerson={(personId) => handleNavigate('person', { personId })}
          onSelectGenre={(genre) => handleNavigate('genres', { genre })}
        />
      )}

      {/* Offline Status Toast */}
      <OfflineIndicator />
    </div>
  );
}
