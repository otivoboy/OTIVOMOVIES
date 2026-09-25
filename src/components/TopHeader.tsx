import React, { useState } from 'react';
import { Search, Bell, Menu, Settings } from 'lucide-react';

interface TopHeaderProps {
  onOpenSearch: () => void;
  onOpenMobileMenu: () => void;
  onNavigate: (tab: string) => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  onOpenSearch,
  onOpenMobileMenu,
  onNavigate
}) => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  return (
    <header className="sticky top-0 z-30 w-full h-16 bg-[#05090D]/90 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
      {/* Left: Mobile Menu Toggle + Search Bar */}
      <div className="flex items-center gap-3 flex-1 max-w-2xl">
        <button
          onClick={onOpenMobileMenu}
          className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 lg:hidden flex-shrink-0"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search Bar */}
        <div
          onClick={onOpenSearch}
          className="w-full flex items-center gap-3 px-4 py-2 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition cursor-pointer group shadow-inner"
        >
          <Search className="w-4 h-4 text-slate-400 group-hover:text-[#00F060] transition-colors flex-shrink-0" />
          <span className="text-xs sm:text-sm text-slate-400 group-hover:text-slate-300 transition-colors truncate">
            Search for movies, TV shows, actors, genres...
          </span>
          <span className="hidden sm:inline-block ml-auto text-[10px] font-mono text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700/50">
            ⌘K
          </span>
        </div>
      </div>

      {/* Right: Notifications + Quick Settings */}
      <div className="flex items-center gap-3 flex-shrink-0">
        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => {
              setNotificationsOpen(!notificationsOpen);
              setHasUnread(false);
            }}
            className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition relative"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {hasUnread && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#00F060] animate-pulse" />
            )}
          </button>

          {/* Notifications Dropdown */}
          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-[#0B1118] border border-slate-800 shadow-2xl p-4 z-50 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-bold text-white uppercase tracking-wider">Notifications</span>
                <span className="text-[10px] text-[#00F060] font-bold">1 New</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">Dune: Part Two</span>
                    <span className="text-[10px] text-slate-400">Just now</span>
                  </div>
                  <p className="text-slate-300 text-[11px]">
                    1080p HLS adaptive streaming source active on OTIVO Edge CDN.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/50 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">Catalog Synchronized</span>
                    <span className="text-[10px] text-slate-400">Today</span>
                  </div>
                  <p className="text-slate-300 text-[11px]">
                    Fresh movies and series available in the OTIVO catalog.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Settings / Admin Button */}
        <button
          onClick={() => onNavigate('admin')}
          className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition"
          title="Admin Control Room"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
