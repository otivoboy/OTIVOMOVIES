import React, { useState } from 'react';
import { Search, Bell, ChevronDown, Menu, User, Settings, Clock, Shield, LogOut, Check } from 'lucide-react';
import { UserProfile } from '../types/movie';

interface TopHeaderProps {
  userProfile?: UserProfile;
  onOpenSearch: () => void;
  onOpenMobileMenu: () => void;
  onNavigate: (tab: string) => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  userProfile,
  onOpenSearch,
  onOpenMobileMenu,
  onNavigate
}) => {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  const displayName = userProfile?.name || 'Stephen';
  const displayEmail = userProfile?.email || 'otivoai@gmail.com';
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-30 w-full h-16 bg-[#090d16]/90 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
      {/* Left: Mobile Menu Toggle + Search Bar */}
      <div className="flex items-center gap-3 flex-1 max-w-2xl">
        <button
          onClick={onOpenMobileMenu}
          className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 lg:hidden flex-shrink-0"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search Bar (Matching user screenshot) */}
        <div
          onClick={onOpenSearch}
          className="w-full flex items-center gap-3 px-4 py-2 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition cursor-pointer group shadow-inner"
        >
          <Search className="w-4 h-4 text-slate-400 group-hover:text-[#00E575] transition-colors flex-shrink-0" />
          <span className="text-xs sm:text-sm text-slate-400 group-hover:text-slate-300 transition-colors truncate">
            Search for movies, TV shows, actors, genres...
          </span>
          <span className="hidden sm:inline-block ml-auto text-[10px] font-mono text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700/50">
            ⌘K
          </span>
        </div>
      </div>

      {/* Right: Notifications + User Profile */}
      <div className="flex items-center gap-3 flex-shrink-0">
        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => {
              setNotificationsOpen(!notificationsOpen);
              setHasUnread(false);
              setProfileDropdownOpen(false);
            }}
            className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition relative"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {hasUnread && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            )}
          </button>

          {/* Notifications Dropdown */}
          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-[#0c111c] border border-slate-800 shadow-2xl p-4 z-50 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-bold text-white uppercase tracking-wider">Notifications</span>
                <span className="text-[10px] text-emerald-400 font-bold">1 New</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">Dune: Part Two</span>
                    <span className="text-[10px] text-slate-400">Just now</span>
                  </div>
                  <p className="text-slate-300 text-[11px]">
                    New 1080p HLS adaptive streaming source now available in your region.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/50 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">Live TMDB Gateway</span>
                    <span className="text-[10px] text-slate-400">Today</span>
                  </div>
                  <p className="text-slate-300 text-[11px]">
                    Catalog refreshed with trending titles and legal streaming provider availability.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Capsule (Matching user screenshot) */}
        <div className="relative">
          <button
            onClick={() => {
              setProfileDropdownOpen(!profileDropdownOpen);
              setNotificationsOpen(false);
            }}
            className="flex items-center gap-2.5 p-1.5 pr-3 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-[#00E575] flex items-center justify-center text-slate-950 font-black text-xs shadow-md shadow-[#00E575]/20 flex-shrink-0">
              {initial}
            </div>
            <span className="text-xs font-bold text-white hidden sm:inline-block max-w-[100px] truncate">
              {displayName}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {/* User Profile Dropdown */}
          {profileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#0c111c] border border-slate-800 shadow-2xl p-2 z-50 space-y-1">
              <div className="p-3 border-b border-slate-800">
                <p className="text-xs font-bold text-white truncate">{displayName}</p>
                <p className="text-[11px] text-slate-400 truncate">{displayEmail}</p>
              </div>

              <button
                onClick={() => {
                  onNavigate('profile');
                  setProfileDropdownOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-slate-300 hover:text-white hover:bg-slate-900 transition"
              >
                <User className="w-4 h-4 text-emerald-400" />
                <span>Account & Preferences</span>
              </button>

              <button
                onClick={() => {
                  onNavigate('watchlist');
                  setProfileDropdownOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-slate-300 hover:text-white hover:bg-slate-900 transition"
              >
                <Clock className="w-4 h-4 text-blue-400" />
                <span>My Watchlist</span>
              </button>

              <button
                onClick={() => {
                  onNavigate('admin');
                  setProfileDropdownOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-slate-300 hover:text-white hover:bg-slate-900 transition"
              >
                <Settings className="w-4 h-4 text-amber-400" />
                <span>Admin & API Keys</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
