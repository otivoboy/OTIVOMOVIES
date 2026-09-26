import React from 'react';
import { Search, Menu } from 'lucide-react';

interface TopHeaderProps {
  onOpenSearch: () => void;
  onOpenMobileMenu: () => void;
  onNavigate?: (tab: string) => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  onOpenSearch,
  onOpenMobileMenu
}) => {
  return (
    <header className="sticky top-0 z-30 w-full h-16 bg-[#05090D]/90 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
      {/* Mobile Menu Toggle + Global Search Bar */}
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
    </header>
  );
};
