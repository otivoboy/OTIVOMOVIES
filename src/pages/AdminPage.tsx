import React, { useState, useEffect } from 'react';
import { Movie, StreamingSource, ApiSyncLog, SystemStats, EnvStatusResponse, KeyTestResult, EnvKeyItem } from '../types/movie';
import { ShieldCheck, RefreshCw, Plus, Trash2, Edit3, CheckCircle, AlertTriangle, Play, Database, Activity, FileText, Sparkles, ExternalLink, Search, Server, Film, Key, Check, Copy, AlertCircle, RefreshCcw, Layers, Terminal } from 'lucide-react';

interface AdminPageProps {
  movies: Movie[];
  onRefreshMovies: () => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ movies, onRefreshMovies }) => {
  const [activeTab, setActiveTab] = useState<'stats' | 'tmdb' | 'env' | 'movies' | 'sources' | 'verify' | 'sync'>('stats');
  const [stats, setStats] = useState<SystemStats | null>(null);
  const [syncLogs, setSyncLogs] = useState<ApiSyncLog[]>([]);
  const [verifying, setVerifying] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [verificationResult, setVerificationResult] = useState<string | null>(null);

  // TMDB Importer State
  const [tmdbQuery, setTmdbQuery] = useState('');
  const [tmdbResults, setTmdbResults] = useState<any[]>([]);
  const [searchingTmdb, setSearchingTmdb] = useState(false);
  const [importingTmdbId, setImportingTmdbId] = useState<number | null>(null);

  // Environment & Keys State
  const [envStatus, setEnvStatus] = useState<EnvStatusResponse | null>(null);
  const [loadingEnv, setLoadingEnv] = useState(false);
  const [testResults, setTestResults] = useState<KeyTestResult[] | null>(null);
  const [testingKeys, setTestingKeys] = useState(false);
  const [refreshingEnv, setRefreshingEnv] = useState(false);
  const [envCategoryFilter, setEnvCategoryFilter] = useState<string>('ALL');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // New Movie Form State
  const [newMovieTitle, setNewMovieTitle] = useState('');
  const [newMovieType, setNewMovieType] = useState<'movie' | 'tv'>('movie');
  const [newMovieOverview, setNewMovieOverview] = useState('');
  const [newMovieGenre, setNewMovieGenre] = useState('Action');
  const [newMovieYear, setNewMovieYear] = useState(2026);
  const [newMovieIsFree, setNewMovieIsFree] = useState(true);

  // New Source Form State
  const [sourceMovieId, setSourceMovieId] = useState(movies[0]?.id || '');
  const [sourceProvider, setSourceProvider] = useState('OTIVO Direct');
  const [sourceType, setSourceType] = useState<'AUTHORIZED_FREE' | 'PUBLIC_DOMAIN' | 'OWNED'>('AUTHORIZED_FREE');
  const [sourceUrl, setSourceUrl] = useState('');

  useEffect(() => {
    fetch('/api/admin/stats')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(() => {});

    fetchEnvStatus();
  }, [movies]);

  const fetchEnvStatus = async () => {
    setLoadingEnv(true);
    try {
      const res = await fetch('/api/system/env-status');
      if (res.ok) {
        const data = await res.json();
        setEnvStatus(data);
      }
    } catch (err) {
      console.error('Failed to load env status:', err);
    } finally {
      setLoadingEnv(false);
    }
  };

  const handleRunKeyTests = async () => {
    setTestingKeys(true);
    try {
      const res = await fetch('/api/system/test-keys', { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        setTestResults(data.results || []);
      }
    } catch (err) {
      console.error('Failed to test keys:', err);
    } finally {
      setTestingKeys(false);
    }
  };

  const handleReloadEnv = async () => {
    setRefreshingEnv(true);
    try {
      const res = await fetch('/api/system/refresh-env', { method: 'POST' });
      if (res.ok) {
        await fetchEnvStatus();
        await handleRunKeyTests();
      }
    } catch (err) {
      console.error('Failed to reload .env:', err);
    } finally {
      setRefreshingEnv(false);
    }
  };

  const handleCopy = (text: string, keyName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(keyName);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSearchTmdb = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!tmdbQuery.trim()) return;
    setSearchingTmdb(true);
    try {
      const res = await fetch(`/api/admin/tmdb/search?q=${encodeURIComponent(tmdbQuery)}`);
      const data = await res.json();
      if (Array.isArray(data)) setTmdbResults(data);
    } catch (err) {
      console.error(err);
    } finally {
      setSearchingTmdb(false);
    }
  };

  const handleImportTmdb = async (item: any) => {
    setImportingTmdbId(item.tmdbId);
    try {
      const res = await fetch('/api/admin/tmdb/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      });
      const data = await res.json();
      if (res.ok) {
        alert(`Successfully imported "${item.title}" into OTIVO Catalog with high-res poster and verified streaming source!`);
        onRefreshMovies();
      } else {
        alert(data.error || 'Failed to import title');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setImportingTmdbId(null);
    }
  };

  const handleVerifySources = async () => {
    setVerifying(true);
    setVerificationResult(null);
    try {
      const res = await fetch('/api/admin/sources/verify', { method: 'POST' });
      const data = await res.json();
      setVerificationResult(data.message);
      onRefreshMovies();
    } catch (err) {
      console.error(err);
    } finally {
      setVerifying(false);
    }
  };

  const handleTriggerSync = async () => {
    setSyncing(true);
    try {
      const res = await fetch('/api/admin/sync', { method: 'POST' });
      const data = await res.json();
      setSyncLogs([data, ...syncLogs]);
      onRefreshMovies();
    } catch (err) {
      console.error(err);
    } finally {
      setSyncing(false);
    }
  };

  const handleCreateMovie = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMovieTitle.trim()) return;

    try {
      const res = await fetch('/api/admin/movies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newMovieTitle,
          type: newMovieType,
          overview: newMovieOverview,
          genres: [newMovieGenre],
          year: Number(newMovieYear),
          isFree: newMovieIsFree,
          poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600',
          backdrop: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1600'
        })
      });
      if (res.ok) {
        setNewMovieTitle('');
        setNewMovieOverview('');
        onRefreshMovies();
        alert('Movie added to OTIVO catalog successfully!');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddSource = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sourceUrl.trim()) return;

    try {
      const res = await fetch('/api/admin/sources', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          movieId: sourceMovieId,
          providerName: sourceProvider,
          sourceType,
          streamUrl: sourceUrl,
          isFree: true,
          allowsEmbedding: true
        })
      });
      if (res.ok) {
        setSourceUrl('');
        onRefreshMovies();
        alert('Streaming source registered and verified!');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteMovie = async (id: string) => {
    if (!confirm('Are you sure you want to remove this title?')) return;
    try {
      await fetch(`/api/admin/movies/${id}`, { method: 'DELETE' });
      onRefreshMovies();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-[#0c111c] border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight">OTIVO Admin Control Room</h1>
            <p className="text-xs text-slate-400 mt-0.5">Catalog management, source verification, and API sync engine</p>
          </div>
        </div>

        <button
          onClick={handleTriggerSync}
          disabled={syncing}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
          <span>Sync API Metadata Now</span>
        </button>
      </div>

      {/* Admin Tabs */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[#0c111c] border border-slate-800 overflow-x-auto text-xs font-semibold">
        {[
          { id: 'stats', label: 'Overview Stats', icon: Activity },
          { id: 'tmdb', label: 'TMDB Importer & Architecture', icon: Sparkles },
          { id: 'env', label: 'Environment & API Keys', icon: Key },
          { id: 'movies', label: 'Movie Management', icon: Database },
          { id: 'sources', label: 'Streaming Sources', icon: Play },
          { id: 'verify', label: 'Source Verification', icon: CheckCircle },
          { id: 'sync', label: 'API Sync Engine', icon: RefreshCw }
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Stats */}
      {activeTab === 'stats' && stats && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-[#0c111c] border border-slate-800 space-y-1">
            <span className="text-xs text-slate-400 uppercase font-mono">Total Movies</span>
            <p className="text-2xl font-black text-white">{stats.totalMovies}</p>
          </div>
          <div className="p-5 rounded-2xl bg-[#0c111c] border border-slate-800 space-y-1">
            <span className="text-xs text-slate-400 uppercase font-mono">Total TV Shows</span>
            <p className="text-2xl font-black text-white">{stats.totalTvShows}</p>
          </div>
          <div className="p-5 rounded-2xl bg-[#0c111c] border border-slate-800 space-y-1">
            <span className="text-xs text-slate-400 uppercase font-mono">Free Titles</span>
            <p className="text-2xl font-black text-emerald-400">{stats.freeTitlesCount}</p>
          </div>
          <div className="p-5 rounded-2xl bg-[#0c111c] border border-slate-800 space-y-1">
            <span className="text-xs text-slate-400 uppercase font-mono">Upcoming Titles</span>
            <p className="text-2xl font-black text-amber-400">{stats.upcomingTitlesCount}</p>
          </div>
        </div>
      )}

      {/* Tab 2: Movie Management */}
      {activeTab === 'movies' && (
        <div className="space-y-6">
          {/* Create Movie Form */}
          <form onSubmit={handleCreateMovie} className="p-6 rounded-3xl bg-[#0c111c] border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">Add New Title to Catalog</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Title Name</label>
                <input
                  type="text"
                  value={newMovieTitle}
                  onChange={e => setNewMovieTitle(e.target.value)}
                  placeholder="e.g. Beyond the Horizon"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Type</label>
                <select
                  value={newMovieType}
                  onChange={e => setNewMovieType(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white"
                >
                  <option value="movie">Movie</option>
                  <option value="tv">TV Series</option>
                </select>
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Release Year</label>
                <input
                  type="number"
                  value={newMovieYear}
                  onChange={e => setNewMovieYear(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white"
                />
              </div>
            </div>
            <textarea
              value={newMovieOverview}
              onChange={e => setNewMovieOverview(e.target.value)}
              placeholder="Overview description..."
              rows={2}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition"
            >
              Add Title
            </button>
          </form>

          {/* Existing Catalog List */}
          <div className="p-6 rounded-3xl bg-[#0c111c] border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">Existing Titles</h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {movies.map(m => (
                <div key={m.id} className="flex items-center justify-between p-3 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs">
                  <div className="flex items-center gap-3">
                    <img src={m.poster} alt={m.title} className="w-8 h-12 rounded object-cover" />
                    <div>
                      <p className="font-bold text-white">{m.title}</p>
                      <span className="text-[10px] text-slate-400">{m.year} · {m.type}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteMovie(m.id)}
                    className="p-2 text-rose-400 hover:text-rose-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Sources Manager */}
      {activeTab === 'sources' && (
        <form onSubmit={handleAddSource} className="p-6 rounded-3xl bg-[#0c111c] border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">Register Authorized Streaming Source</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-slate-400 block mb-1">Target Movie</label>
              <select
                value={sourceMovieId}
                onChange={e => setSourceMovieId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white"
              >
                {movies.map(m => (
                  <option key={m.id} value={m.id}>{m.title}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-slate-400 block mb-1">Provider Name</label>
              <input
                type="text"
                value={sourceProvider}
                onChange={e => setSourceProvider(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white"
              />
            </div>
          </div>
          <div>
            <label className="text-slate-400 block mb-1 text-xs">Playback URL (MP4 / HLS .m3u8)</label>
            <input
              type="url"
              value={sourceUrl}
              onChange={e => setSourceUrl(e.target.value)}
              placeholder="https://..."
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition"
          >
            Verify & Save Source
          </button>
        </form>
      )}

      {/* Tab 4: Verify Sources */}
      {activeTab === 'verify' && (
        <div className="p-6 rounded-3xl bg-[#0c111c] border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">Automated Source Verification Engine</h3>
              <p className="text-xs text-slate-400">Verifies HTTP status, HLS manifest validity, and license duration</p>
            </div>
            <button
              onClick={handleVerifySources}
              disabled={verifying}
              className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition"
            >
              {verifying ? 'Scanning Sources...' : 'Run Verification Scan'}
            </button>
          </div>

          {verificationResult && (
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 font-mono">
              ✓ {verificationResult}
            </div>
          )}
        </div>
      )}

      {/* Tab 5: Sync Logs */}
      {activeTab === 'sync' && (
        <div className="p-6 rounded-3xl bg-[#0c111c] border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white">API Synchronization Logs</h3>
          <div className="space-y-3 font-mono text-xs">
            {syncLogs.length === 0 ? (
              <p className="text-slate-500">No sync logs stored yet. Click "Sync API Metadata Now" above.</p>
            ) : (
              syncLogs.map(log => (
                <div key={log.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-emerald-400 font-bold">
                    <span>{log.message}</span>
                    <span>{new Date(log.timestamp).toLocaleTimeString()}</span>
                  </div>
                  <div className="text-slate-300 space-y-1">
                    {log.logs.map((l, idx) => (
                      <p key={idx}>{l}</p>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Tab 6: TMDB Auto Importer & Architecture */}
      {activeTab === 'tmdb' && (
        <div className="space-y-6">
          {/* Architecture Explanation Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-[#0c111c] to-[#0a0f1d] border border-emerald-500/30 space-y-4">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
              <Server className="w-4 h-4" />
              <span>System Architecture: Metadata vs. Video Hosting</span>
            </div>
            <h2 className="text-xl font-bold text-white">OTIVO Movies Integration Pipeline</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300 leading-relaxed">
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                <span className="font-bold text-emerald-400 block">1. TMDB Metadata & High-Res Posters</span>
                <p>
                  Movies & TV Metadata are queried directly from TMDB API (`title`, `poster`, `backdrop`, `cast`, `overview`, `releaseDate`). Image paths (`https://image.tmdb.org/t/p/...`) render directly in responsive MovieCard components.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                <span className="font-bold text-emerald-400 block">2. Watchmode "Where to Watch" API</span>
                <p>
                  Watchmode API queries authorized availability across 200+ providers (Tubi, Pluto TV, Max, YouTube, Prime Video, Hulu) and categorizes free/ad-supported vs subscription sources per region.
                </p>
              </div>
            </div>
          </div>

          {/* TMDB Search Form */}
          <form onSubmit={handleSearchTmdb} className="p-6 rounded-3xl bg-[#0c111c] border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">Live TMDB Catalog Search & Instant Importer</h3>
            <div className="flex gap-3">
              <input
                type="text"
                value={tmdbQuery}
                onChange={e => setTmdbQuery(e.target.value)}
                placeholder="Search TMDB titles (e.g. Dune, Inception, Interstellar, Avatar...)"
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                disabled={searchingTmdb || !tmdbQuery.trim()}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition flex items-center gap-2 disabled:opacity-50"
              >
                <Search className="w-4 h-4" />
                <span>{searchingTmdb ? 'Querying TMDB...' : 'Search TMDB'}</span>
              </button>
            </div>
          </form>

          {/* TMDB Results Grid */}
          {tmdbResults.length > 0 && (
            <div className="p-6 rounded-3xl bg-[#0c111c] border border-slate-800 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">TMDB Search Results ({tmdbResults.length})</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {tmdbResults.map(item => (
                  <div key={item.tmdbId} className="flex gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 items-start">
                    <img src={item.poster} alt={item.title} className="w-20 h-28 rounded-xl object-cover flex-shrink-0" />
                    <div className="space-y-2 flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="font-bold text-sm text-white truncate">{item.title}</h4>
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                          {item.year}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 line-clamp-2">{item.overview}</p>
                      <button
                        onClick={() => handleImportTmdb(item)}
                        disabled={importingTmdbId === item.tmdbId}
                        className="px-3.5 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition flex items-center gap-1.5 disabled:opacity-50"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>{importingTmdbId === item.tmdbId ? 'Importing...' : 'Import to OTIVO'}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 7: Environment & API Keys */}
      {activeTab === 'env' && (
        <div className="space-y-6">
          {/* Status & Diagnostic Actions Header */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-[#0c111c] to-[#0a0f1d] border border-emerald-500/30 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                  <Key className="w-4 h-4" />
                  <span>Environment & External API Gateway</span>
                </div>
                <h2 className="text-xl font-bold text-white">Live .env Configuration Hub</h2>
                <p className="text-xs text-slate-300 max-w-2xl">
                  {envStatus?.summary || 'Checking server environment parameters and live API integrations...'}
                </p>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={handleRunKeyTests}
                  disabled={testingKeys}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition disabled:opacity-50"
                >
                  <RefreshCw className={`w-4 h-4 ${testingKeys ? 'animate-spin' : ''}`} />
                  <span>{testingKeys ? 'Testing API Connectivity...' : 'Run Connectivity & Key Tests'}</span>
                </button>

                <button
                  onClick={handleReloadEnv}
                  disabled={refreshingEnv}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition disabled:opacity-50"
                  title="Reloads .env file without restarting the server process"
                >
                  <RefreshCcw className={`w-4 h-4 ${refreshingEnv ? 'animate-spin' : ''}`} />
                  <span>{refreshingEnv ? 'Reloading...' : 'Reload .env'}</span>
                </button>
              </div>
            </div>

            {/* Health Pill Indicator */}
            {envStatus && (
              <div className="flex items-center gap-3 pt-2 text-xs">
                <span className="text-slate-400 font-medium">Integration Mode:</span>
                <span className={`px-2.5 py-1 rounded-full font-bold uppercase tracking-wider text-[11px] ${
                  envStatus.overallHealth === 'READY'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : envStatus.overallHealth === 'PARTIAL'
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                }`}>
                  {envStatus.overallHealth === 'READY'
                    ? '● All Live External APIs Connected'
                    : envStatus.overallHealth === 'PARTIAL'
                    ? '◐ Partial Live Connection'
                    : '○ Development Fallback Engine Active'}
                </span>
                <span className="text-slate-500">·</span>
                <span className="text-slate-300">
                  <strong className="text-white">{envStatus.keys.filter(k => k.configured).length}</strong> of{' '}
                  <strong className="text-white">{envStatus.keys.length}</strong> parameters active
                </span>
              </div>
            )}
          </div>

          {/* Diagnostic Test Results Box */}
          {testResults && (
            <div className="p-6 rounded-3xl bg-[#0c111c] border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white">Live Diagnostic Test Results</h3>
                </div>
                <span className="text-xs text-slate-500 font-mono">
                  {new Date().toLocaleTimeString()}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {testResults.map((t, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border transition ${
                      t.status === 'SUCCESS'
                        ? 'bg-emerald-950/20 border-emerald-500/30'
                        : t.status === 'ERROR'
                        ? 'bg-rose-950/20 border-rose-500/30'
                        : 'bg-slate-900/60 border-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        {t.status === 'SUCCESS' ? (
                          <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        ) : t.status === 'ERROR' ? (
                          <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-slate-500 flex-shrink-0" />
                        )}
                        <span className="font-bold text-white truncate">{t.service}</span>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {t.latencyMs !== undefined && (
                          <span className="text-[10px] font-mono text-slate-400">
                            {t.latencyMs}ms
                          </span>
                        )}
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          t.status === 'SUCCESS'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : t.status === 'ERROR'
                            ? 'bg-rose-500/20 text-rose-400'
                            : 'bg-slate-800 text-slate-400'
                        }`}>
                          {t.status}
                        </span>
                      </div>
                    </div>
                    <p className="text-slate-300 text-[11px] leading-relaxed">{t.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            {['ALL', 'Metadata', 'Availability', 'Database', 'Search', 'Storage & CDN', 'Security & Cron', 'App'].map(cat => (
              <button
                key={cat}
                onClick={() => setEnvCategoryFilter(cat)}
                className={`px-3.5 py-1.5 rounded-xl font-semibold transition whitespace-nowrap ${
                  envCategoryFilter === cat
                    ? 'bg-emerald-500 text-slate-950 font-bold'
                    : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Environment Keys Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(envStatus?.keys || [])
              .filter(k => envCategoryFilter === 'ALL' || k.category === envCategoryFilter)
              .map(item => (
                <div
                  key={item.key}
                  className="p-5 rounded-2xl bg-[#0c111c] border border-slate-800 hover:border-slate-700 transition space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-white bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                          {item.key}
                        </span>
                        <button
                          onClick={() => handleCopy(item.key, item.key)}
                          className="text-slate-500 hover:text-slate-300 transition"
                          title="Copy environment variable name"
                        >
                          {copiedKey === item.key ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                      <h4 className="text-xs font-semibold text-slate-300">{item.name}</h4>
                    </div>

                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex-shrink-0 ${
                      item.configured
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-slate-800/80 text-slate-400 border border-slate-700/50'
                    }`}>
                      {item.configured ? 'Configured' : 'Fallback / Default'}
                    </span>
                  </div>

                  {item.valueMasked && (
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-900 font-mono text-[11px] text-slate-300 truncate">
                      <span className="text-slate-500 select-none mr-2">Active:</span>
                      <span className="text-emerald-400">{item.valueMasked}</span>
                    </div>
                  )}

                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
          </div>

          {/* Quick Environment Setup Guide */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wider">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span>How OTIVO Operates with .env Keys</span>
            </div>
            <div className="text-xs text-slate-300 space-y-2 leading-relaxed">
              <p>
                • <strong>Automatic Live Mode</strong>: Whenever <code className="text-emerald-400 font-mono">TMDB_API_KEY</code> and <code className="text-emerald-400 font-mono">WATCHMODE_API_KEY</code> are provided in your <code className="text-slate-200 font-mono">.env</code> file, OTIVO Movies automatically transitions from the seed catalog to live API querying, poster streaming from TMDB CDN, and legal streaming availability lookups.
              </p>
              <p>
                • <strong>Zero Crashes on Missing Keys</strong>: If any optional key (PostgreSQL, Redis, Meilisearch, Wasabi/S3, Video CDN) is omitted, OTIVO automatically uses its embedded resilient fallbacks (local atomic JSON store, memory cache, full-text database index, and direct authorized stream URLs).
              </p>
              <p>
                • <strong>Hot Reloading</strong>: After updating your <code className="text-slate-200 font-mono">.env</code> file, click <strong>"Reload .env"</strong> above or run <strong>"Run Connectivity & Key Tests"</strong> to verify that your keys are recognized instantly without server downtime.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
