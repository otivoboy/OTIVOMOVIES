import React from 'react';
import { Home, Search, Film, Tv, Heart } from 'lucide-react';

interface MobileNavProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  onOpenSearch: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ currentTab, onNavigate, onOpenSearch }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'search', label: 'Search', icon: Search, isSearch: true },
    { id: 'movies', label: 'Movies', icon: Film },
    { id: 'tv', label: 'TV Shows', icon: Tv },
    { id: 'watchlist', label: 'Watchlist', icon: Heart },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#05090D]/95 backdrop-blur-lg border-t border-slate-800/80 px-2 py-1.5 flex items-center justify-around text-slate-400">
      {navItems.map(item => {
        const Icon = item.icon;
        const isActive = currentTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => {
              if (item.isSearch) {
                onOpenSearch();
              } else {
                onNavigate(item.id);
              }
            }}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition duration-200 ${
              isActive ? 'text-[#00F060] font-semibold' : 'hover:text-slate-200'
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? 'text-[#00F060] scale-110' : ''}`} />
            <span className="text-[10px] mt-1 tracking-tight">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
