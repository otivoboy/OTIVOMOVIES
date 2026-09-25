import React, { useState, useEffect } from 'react';
import { Search, Film, Tv, Sparkles, Heart, ShieldAlert, User, Menu, X, Play } from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';

interface NavbarProps {
  currentTab: string;
  watchlistCount?: number;
  onNavigate: (tab: string, extra?: any) => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, watchlistCount = 0, onNavigate, onOpenSearch }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'movies', label: 'Movies' },
    { id: 'tv', label: 'TV Shows' },
    { id: 'genres', label: 'Genres' },
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'free', label: 'Free to Watch' },
    { id: 'watchlist', label: 'Watchlist', badge: watchlistCount },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#090d16]/95 backdrop-blur-md border-b border-slate-800/80 shadow-2xl py-3'
          : 'bg-gradient-to-b from-black/80 via-[#090d16]/40 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Zone 1: Single Element Brand Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 text-left focus:outline-none group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition duration-200">
              <Play className="w-5 h-5 text-slate-950 fill-slate-950 ml-0.5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-wider text-white font-mono uppercase">
                OTIVO<span className="text-emerald-400 font-light">.MOVIES</span>
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
          {navLinks.map(link => {
            const isActive = currentTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`transition-colors py-1 relative hover:text-white whitespace-nowrap flex items-center gap-1.5 ${
                  isActive ? 'text-emerald-400 font-semibold' : 'text-slate-300'
                }`}
              >
                <span>{link.label}</span>
                {Boolean(link.badge && link.badge > 0) && (
                  <span className="px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono border border-emerald-500/30">
                    {link.badge}
                  </span>
                )}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400 rounded-full animate-fade-in" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/60 text-slate-300 hover:text-white hover:border-slate-500 transition duration-200 text-xs font-medium"
            title="Search movies, TV shows, actors..."
          >
            <Search className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">Search...</span>
          </button>

          <PWAInstallButton />

          <button
            onClick={() => onNavigate('admin')}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition ${
              currentTab === 'admin'
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-emerald-400 hover:border-emerald-500/40'
            }`}
            title="Admin Portal"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-emerald-400" />
            <span>Admin</span>
          </button>

          <button
            onClick={() => onNavigate('profile')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition text-xs font-semibold ${
              currentTab === 'profile'
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50'
                : 'border-slate-800 hover:border-slate-700 bg-slate-900 text-slate-300 hover:text-white'
            }`}
            title="Account & Activity"
          >
            <User className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden md:inline">Account</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Slideout Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0c111c] border-b border-slate-800 px-4 py-4 space-y-2 animate-fade-in">
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => {
                onNavigate(link.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left py-2.5 px-3 rounded-lg text-sm font-medium transition flex items-center justify-between ${
                currentTab === link.id
                  ? 'bg-emerald-500/20 text-emerald-400 font-semibold'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span>{link.label}</span>
              {Boolean(link.badge && link.badge > 0) && (
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono">
                  {link.badge}
                </span>
              )}
            </button>
          ))}
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={() => {
                onNavigate('profile');
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 text-xs font-medium text-slate-300 hover:text-emerald-400 py-2"
            >
              <User className="w-4 h-4 text-emerald-400" />
              <span>Account & Activity</span>
            </button>
            <button
              onClick={() => {
                onNavigate('admin');
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 text-xs font-medium text-slate-300 hover:text-emerald-400 py-2"
            >
              <ShieldAlert className="w-4 h-4 text-emerald-400" />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
