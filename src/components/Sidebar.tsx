import React from 'react';
import {
  Home,
  Film,
  Tv,
  Calendar,
  LayoutGrid,
  Plus,
  Clock,
  Sparkles,
  Settings,
  HelpCircle,
  Play,
  X
} from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  watchlistCount?: number;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
  onNavigate: (tab: string, extra?: any) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  watchlistCount = 0,
  isOpenMobile = false,
  onCloseMobile,
  onNavigate
}) => {
  const mainNavItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'movies', label: 'Movies', icon: Film },
    { id: 'tv', label: 'TV Shows', icon: Tv },
    { id: 'upcoming', label: 'Upcoming', icon: Calendar },
    { id: 'genres', label: 'Genres', icon: LayoutGrid },
    { id: 'watchlist', label: 'My List', icon: Plus, badge: watchlistCount },
    { id: 'profile', label: 'Watch History', icon: Clock }
  ];

  const moreNavItems = [
    { id: 'free', label: 'Free Content', icon: Sparkles },
    { id: 'admin', label: 'Settings', icon: Settings },
    { id: 'help', label: 'Help & Support', icon: HelpCircle }
  ];

  const handleItemClick = (id: string) => {
    if (id === 'help') {
      alert('OTIVO Movies Support: For questions regarding catalog streaming licenses, TMDB API configuration, or playback, contact support@otivomovies.com');
      return;
    }
    onNavigate(id);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#0a0f18] border-r border-slate-800/80 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col flex-1 overflow-y-auto px-4 py-5 scrollbar-thin scrollbar-thumb-slate-800">
          {/* Logo Brand Header */}
          <div className="flex items-center justify-between px-2 mb-6">
            <button
              onClick={() => handleItemClick('home')}
              className="flex items-center gap-3 text-left group focus:outline-none"
            >
              <div className="w-10 h-10 rounded-2xl bg-[#00E575] flex items-center justify-center shadow-lg shadow-[#00E575]/25 group-hover:scale-105 transition-transform duration-200">
                <Play className="w-5 h-5 text-[#081018] fill-[#081018] ml-0.5" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black tracking-tight text-white font-mono leading-none">
                  OTIVO
                </span>
                <span className="text-[10px] font-bold tracking-widest text-[#00E575] uppercase mt-0.5">
                  MOVIES
                </span>
              </div>
            </button>

            {/* Mobile Close Button */}
            <button
              onClick={onCloseMobile}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white lg:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Primary Navigation Items */}
          <nav className="space-y-1.5">
            {mainNavItems.map(item => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-xs transition-all duration-150 ${
                    isActive
                      ? 'bg-[#00E575] text-[#081018] font-bold shadow-lg shadow-[#00E575]/20'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#081018]' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>

                  {Boolean(item.badge && item.badge > 0) && (
                    <span
                      className={`px-1.5 py-0.5 text-[10px] font-mono rounded-full ${
                        isActive
                          ? 'bg-[#081018] text-[#00E575]'
                          : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* MORE Section */}
          <div className="mt-8 pt-4 border-t border-slate-800/80">
            <span className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">
              MORE
            </span>
            <nav className="space-y-1">
              {moreNavItems.map(item => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl font-medium text-xs transition-all duration-150 ${
                      isActive
                        ? 'bg-[#00E575] text-[#081018] font-bold shadow-lg shadow-[#00E575]/20'
                        : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#081018]' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-800/80 bg-[#090d16]/80 text-[11px] text-slate-400 flex items-center justify-between">
          <span className="font-mono">OTIVO Core v2.4</span>
          <span className="w-2 h-2 rounded-full bg-[#00E575] animate-pulse" title="System Online" />
        </div>
      </aside>
    </>
  );
};
