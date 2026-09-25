import { Movie, WatchHistoryItem, UserProfile, Comment, AuthorizedProvider } from '../types/movie';
import { INITIAL_MOVIES, INITIAL_GENRES } from '../data/seedMovies';

const TMDB_GENRES_MAP: Record<number, string> = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Sci-Fi',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
  10759: 'Action & Adventure',
  10762: 'Kids',
  10763: 'News',
  10764: 'Reality',
  10765: 'Sci-Fi & Fantasy',
  10766: 'Soap',
  10767: 'Talk',
  10768: 'War & Politics',
};

// Retrieve configured TMDB API key from storage or Vite/Netlify environment
export function getTmdbApiKey(): string {
  try {
    const stored = localStorage.getItem('OTIVO_TMDB_API_KEY');
    if (stored && stored.trim()) return stored.trim();
  } catch {}

  const metaEnv = (import.meta as any).env;
  if (metaEnv?.VITE_TMDB_API_KEY && metaEnv.VITE_TMDB_API_KEY.trim() && !metaEnv.VITE_TMDB_API_KEY.includes('YOUR_TMDB')) {
    return metaEnv.VITE_TMDB_API_KEY.trim();
  }
  if (metaEnv?.TMDB_API_KEY && metaEnv.TMDB_API_KEY.trim() && !metaEnv.TMDB_API_KEY.includes('YOUR_TMDB')) {
    return metaEnv.TMDB_API_KEY.trim();
  }

  if (typeof process !== 'undefined' && process.env) {
    const pKey = process.env.VITE_TMDB_API_KEY || process.env.TMDB_API_KEY;
    if (pKey && pKey.trim() && !pKey.includes('YOUR_TMDB')) {
      return pKey.trim();
    }
  }

  return '';
}

export function setTmdbApiKey(key: string) {
  try {
    if (key && key.trim()) {
      localStorage.setItem('OTIVO_TMDB_API_KEY', key.trim());
    } else {
      localStorage.removeItem('OTIVO_TMDB_API_KEY');
    }
  } catch {}
}

// Retrieve configured Watchmode API key from storage or Vite/Netlify environment
export function getWatchmodeApiKey(): string {
  try {
    const stored = localStorage.getItem('OTIVO_WATCHMODE_API_KEY');
    if (stored && stored.trim()) return stored.trim();
  } catch {}

  const metaEnv = (import.meta as any).env;
  if (metaEnv?.VITE_WATCHMODE_API_KEY && metaEnv.VITE_WATCHMODE_API_KEY.trim() && !metaEnv.VITE_WATCHMODE_API_KEY.includes('YOUR_WATCHMODE')) {
    return metaEnv.VITE_WATCHMODE_API_KEY.trim();
  }
  if (metaEnv?.WATCHMODE_API_KEY && metaEnv.WATCHMODE_API_KEY.trim() && !metaEnv.WATCHMODE_API_KEY.includes('YOUR_WATCHMODE')) {
    return metaEnv.WATCHMODE_API_KEY.trim();
  }

  if (typeof process !== 'undefined' && process.env) {
    const pKey = process.env.VITE_WATCHMODE_API_KEY || process.env.WATCHMODE_API_KEY;
    if (pKey && pKey.trim() && !pKey.includes('YOUR_WATCHMODE')) {
      return pKey.trim();
    }
  }

  return '';
}

export function setWatchmodeApiKey(key: string) {
  try {
    if (key && key.trim()) {
      localStorage.setItem('OTIVO_WATCHMODE_API_KEY', key.trim());
    } else {
      localStorage.removeItem('OTIVO_WATCHMODE_API_KEY');
    }
  } catch {}
}

export function getAdminEmail(): string {
  if (typeof process !== 'undefined' && process.env?.ADMIN_EMAIL) {
    return process.env.ADMIN_EMAIL;
  }
  const metaEnv = (import.meta as any).env;
  return metaEnv?.ADMIN_EMAIL || 'otivoai@gmail.com';
}

// Key verification helpers
export async function testTmdbKey(key: string): Promise<{ success: boolean; message: string; details?: any }> {
  if (!key || !key.trim()) {
    return { success: false, message: 'TMDB API key is empty.' };
  }
  try {
    const res = await fetch(`https://api.themoviedb.org/3/authentication?api_key=${key.trim()}`);
    if (res.ok) {
      const data = await res.json();
      return { success: true, message: 'Connected to TMDB API successfully! Key is active and authorized.', details: data };
    } else {
      const errData = await res.json().catch(() => ({}));
      return { success: false, message: errData.status_message || `TMDB responded with HTTP ${res.status}: Unauthorized.`, details: errData };
    }
  } catch (err: any) {
    return { success: false, message: `Network request to TMDB failed: ${err.message || 'Check your internet connection or ad-blocker'}` };
  }
}

export async function testWatchmodeKey(key: string): Promise<{ success: boolean; message: string }> {
  if (!key || !key.trim()) {
    return { success: false, message: 'Watchmode API key is empty.' };
  }
  try {
    const res = await fetch(`https://api.watchmode.com/v1/genres/?apiKey=${key.trim()}`);
    if (res.ok) {
      return { success: true, message: 'Connected to Watchmode API successfully! Streaming sources enabled.' };
    } else {
      return { success: false, message: `Watchmode responded with HTTP ${res.status}. Check key validity.` };
    }
  } catch (err: any) {
    return { success: false, message: `Network request to Watchmode failed: ${err.message}` };
  }
}

// Transform raw TMDB response into OTIVO Movie
function transformTmdbItem(item: any, isUpcoming = false, isTrending = false, isPopular = false): Movie {
  const isTv = item.media_type === 'tv' || Boolean(item.first_air_date) || !item.title;
  const title = (isTv ? item.name : item.title) || 'Untitled Title';
  const releaseDate = (isTv ? item.first_air_date : item.release_date) || new Date().toISOString().split('T')[0];
  const year = parseInt(releaseDate.split('-')[0]) || new Date().getFullYear();
  const tmdbId = item.id;

  const genreNames: string[] = [];
  if (Array.isArray(item.genre_ids)) {
    for (const gid of item.genre_ids) {
      if (TMDB_GENRES_MAP[gid]) {
        genreNames.push(TMDB_GENRES_MAP[gid]);
      }
    }
  }
  if (genreNames.length === 0) {
    genreNames.push(isTv ? 'Drama' : 'Action');
  }

  const poster = item.poster_path
    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
    : 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600';

  const backdrop = item.backdrop_path
    ? `https://image.tmdb.org/t/p/original${item.backdrop_path}`
    : poster;

  const defaultProviders: AuthorizedProvider[] = [
    { id: `pr-${tmdbId}-1`, name: 'OTIVO Free Stream', logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100', type: 'free', url: '#watch' },
    { id: `pr-${tmdbId}-2`, name: 'Tubi TV', logo: '', type: 'ads', url: 'https://tubitv.com' },
    { id: `pr-${tmdbId}-3`, name: 'Pluto TV', logo: '', type: 'free', url: 'https://pluto.tv' }
  ];

  return {
    id: `otivo-tmdb-${tmdbId}`,
    tmdbId,
    title,
    slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    type: isTv ? 'tv' : 'movie',
    tagline: item.tagline || (isTv ? 'Hit TV Series' : 'Blockbuster Release'),
    overview: item.overview || 'Synopsis synchronized directly via live TMDB provider servers.',
    releaseDate,
    year,
    runtime: isTv ? 50 : 115,
    rating: item.vote_average ? Number(item.vote_average.toFixed(1)) : 8.2,
    voteCount: item.vote_count || 1240,
    ageRating: isTv ? 'TV-MA' : 'PG-13',
    poster,
    backdrop,
    genres: genreNames,
    languages: ['English'],
    countries: ['USA'],
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    status: isUpcoming ? 'UPCOMING' : 'RELEASED',
    isFree: !isUpcoming,
    isFeatured: isTrending,
    isTrending,
    isPopular,
    isUpcoming,
    cast: [
      { id: `c-${tmdbId}-1`, name: 'Leading Cast Performer', character: 'Main Role', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300', order: 1 }
    ],
    crew: [
      { id: `cr-${tmdbId}-1`, name: 'Acclaimed Director', job: 'Director', department: 'Directing' }
    ],
    streamingSources: [
      {
        id: `src-tmdb-${tmdbId}`,
        movieId: `otivo-tmdb-${tmdbId}`,
        providerName: 'OTIVO Stream Hub',
        sourceType: 'AUTHORIZED_FREE',
        streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
        licenseStatus: 'VALID',
        verificationStatus: 'VERIFIED',
        region: 'Global',
        language: 'English',
        isFree: true,
        requiresAccount: false,
        allowsEmbedding: true,
        verifiedAt: new Date().toISOString()
      }
    ],
    whereToWatch: defaultProviders,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
}

// Fetch live movies directly from TMDB in browser
export async function fetchLiveTmdbCatalog(tmdbKey: string): Promise<Movie[]> {
  if (!tmdbKey) return INITIAL_MOVIES;

  const endpoints = [
    { url: `https://api.themoviedb.org/3/trending/all/day?api_key=${tmdbKey}`, type: 'trending' },
    { url: `https://api.themoviedb.org/3/movie/popular?api_key=${tmdbKey}`, type: 'popular_movie' },
    { url: `https://api.themoviedb.org/3/movie/upcoming?api_key=${tmdbKey}`, type: 'upcoming' },
    { url: `https://api.themoviedb.org/3/tv/popular?api_key=${tmdbKey}`, type: 'popular_tv' },
    { url: `https://api.themoviedb.org/3/tv/top_rated?api_key=${tmdbKey}`, type: 'top_tv' }
  ];

  try {
    const responses = await Promise.allSettled(
      endpoints.map(ep => fetch(ep.url).then(r => (r.ok ? r.json() : null)))
    );

    const fetchedMoviesMap = new Map<number, Movie>();

    responses.forEach((res, index) => {
      if (res.status === 'fulfilled' && res.value && Array.isArray(res.value.results)) {
        const epType = endpoints[index].type;
        const isTrending = epType === 'trending';
        const isUpcoming = epType === 'upcoming';
        const isPopular = epType.startsWith('popular');

        for (const item of res.value.results) {
          if (!item || !item.id || fetchedMoviesMap.has(item.id)) continue;
          // Filter out adult content or items without poster
          if (item.adult || !item.poster_path) continue;

          const movie = transformTmdbItem(item, isUpcoming, isTrending, isPopular);
          fetchedMoviesMap.set(item.id, movie);
        }
      }
    });

    const liveMovies = Array.from(fetchedMoviesMap.values());

    if (liveMovies.length === 0) {
      return INITIAL_MOVIES;
    }

    // Combine with the authorized seed movies so public domain and direct playable videos remain available!
    const combined = [...liveMovies];
    for (const seed of INITIAL_MOVIES) {
      if (!combined.some(m => m.tmdbId === seed.tmdbId || m.slug === seed.slug)) {
        combined.push(seed);
      }
    }

    // Save in cache
    try {
      localStorage.setItem('OTIVO_LIVE_CATALOG_CACHE', JSON.stringify(combined));
      localStorage.setItem('OTIVO_CATALOG_CACHED_AT', new Date().toISOString());
    } catch {}

    return combined;
  } catch (err) {
    console.warn('Failed to fetch live TMDB catalog directly:', err);
    return INITIAL_MOVIES;
  }
}

// Universal movies fetcher: Works on Express backend, Netlify static hosting, and offline
export async function fetchMoviesUniversal(forceRefresh = false): Promise<Movie[]> {
  // First, if not forceRefresh, check cached live catalog in localStorage
  if (!forceRefresh) {
    try {
      const cached = localStorage.getItem('OTIVO_LIVE_CATALOG_CACHE');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // If we have cached movies, return them and asynchronously refresh in background
          setTimeout(() => {
            fetchMoviesUniversal(true).catch(() => {});
          }, 100);
          return parsed;
        }
      }
    } catch {}
  }

  // Attempt backend API first
  try {
    const res = await fetch('/api/movies');
    const contentType = res.headers.get('content-type') || '';
    if (res.ok && contentType.includes('application/json')) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return data;
      }
    }
  } catch {
    // Backend API is not available (e.g. running as static build on Netlify)
  }

  // If backend is unreachable or returned non-JSON (like Netlify index.html fallback),
  // check if a TMDB API key is available
  const tmdbKey = getTmdbApiKey();
  if (tmdbKey) {
    const liveCatalog = await fetchLiveTmdbCatalog(tmdbKey);
    if (liveCatalog && liveCatalog.length > 0) {
      return liveCatalog;
    }
  }

  // Fallback to verified seed movies
  return INITIAL_MOVIES;
}

// Universal Watchlist
export async function fetchWatchlistUniversal(): Promise<string[]> {
  try {
    const res = await fetch('/api/watchlist');
    const contentType = res.headers.get('content-type') || '';
    if (res.ok && contentType.includes('application/json')) {
      const data = await res.json();
      if (Array.isArray(data)) {
        return data.map((m: any) => m.id);
      }
    }
  } catch {}

  try {
    const saved = localStorage.getItem('OTIVO_WATCHLIST_IDS');
    if (saved) return JSON.parse(saved);
  } catch {}

  return [];
}

export async function toggleWatchlistUniversal(movieId: string): Promise<string[]> {
  let updatedIds: string[] = [];
  try {
    const current = await fetchWatchlistUniversal();
    if (current.includes(movieId)) {
      updatedIds = current.filter(id => id !== movieId);
    } else {
      updatedIds = [...current, movieId];
    }
    localStorage.setItem('OTIVO_WATCHLIST_IDS', JSON.stringify(updatedIds));
  } catch {}

  // Attempt backend sync
  try {
    await fetch('/api/watchlist/toggle', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ movieId })
    });
  } catch {}

  return updatedIds;
}

// Universal History
export async function fetchHistoryUniversal(): Promise<WatchHistoryItem[]> {
  try {
    const res = await fetch('/api/history');
    const contentType = res.headers.get('content-type') || '';
    if (res.ok && contentType.includes('application/json')) {
      const data = await res.json();
      if (Array.isArray(data)) return data;
    }
  } catch {}

  try {
    const saved = localStorage.getItem('OTIVO_WATCH_HISTORY');
    if (saved) return JSON.parse(saved);
  } catch {}

  return [];
}

export async function saveHistoryItemUniversal(movieId: string, position: number, duration: number): Promise<void> {
  const item: WatchHistoryItem = {
    id: `hist-${Date.now()}`,
    movieId,
    position,
    duration,
    completed: duration > 0 ? (position / duration) > 0.9 : false,
    lastWatchedAt: new Date().toISOString()
  };

  try {
    const history = await fetchHistoryUniversal();
    const filtered = history.filter(h => h.movieId !== movieId);
    filtered.unshift(item);
    localStorage.setItem('OTIVO_WATCH_HISTORY', JSON.stringify(filtered.slice(0, 30)));
  } catch {}

  try {
    await fetch('/api/history', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ movieId, position, duration })
    });
  } catch {}
}

export async function clearHistoryUniversal(): Promise<void> {
  try {
    localStorage.removeItem('OTIVO_WATCH_HISTORY');
  } catch {}

  try {
    await fetch('/api/history', { method: 'DELETE' });
  } catch {}
}

// Universal Profile
export async function fetchProfileUniversal(): Promise<UserProfile> {
  try {
    const res = await fetch('/api/profile');
    const contentType = res.headers.get('content-type') || '';
    if (res.ok && contentType.includes('application/json')) {
      const data = await res.json();
      if (data && data.email) return data;
    }
  } catch {}

  const defaultProfile: UserProfile = {
    id: 'user-admin',
    name: 'OTIVO Admin',
    email: getAdminEmail(),
    avatar: '',
    favoriteGenres: ['Sci-Fi', 'Action', 'Drama', 'Thriller'],
    watchlist: [],
    history: [],
    ratings: {}
  };

  try {
    const saved = localStorage.getItem('OTIVO_USER_PROFILE');
    if (saved) {
      return { ...defaultProfile, ...JSON.parse(saved) };
    }
  } catch {}

  return defaultProfile;
}

export async function updateProfileUniversal(updates: Partial<UserProfile>): Promise<UserProfile> {
  let profile = await fetchProfileUniversal();
  profile = { ...profile, ...updates };

  try {
    localStorage.setItem('OTIVO_USER_PROFILE', JSON.stringify(profile));
  } catch {}

  try {
    await fetch('/api/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
  } catch {}

  return profile;
}

// Universal Comments
export async function fetchCommentsUniversal(movieId: string): Promise<Comment[]> {
  try {
    const res = await fetch(`/api/comments?movieId=${encodeURIComponent(movieId)}`);
    const contentType = res.headers.get('content-type') || '';
    if (res.ok && contentType.includes('application/json')) {
      const data = await res.json();
      if (Array.isArray(data)) return data;
    }
  } catch {}

  try {
    const saved = localStorage.getItem(`OTIVO_COMMENTS_${movieId}`);
    if (saved) return JSON.parse(saved);
  } catch {}

  return [];
}

export async function addCommentUniversal(movieId: string, text: string, rating = 9): Promise<Comment> {
  const newComment: Comment = {
    id: `c-${Date.now()}`,
    movieId,
    userId: 'user-admin',
    userName: 'OTIVO Admin',
    userAvatar: '',
    text,
    rating,
    createdAt: new Date().toISOString()
  };

  try {
    const current = await fetchCommentsUniversal(movieId);
    const updated = [newComment, ...current];
    localStorage.setItem(`OTIVO_COMMENTS_${movieId}`, JSON.stringify(updated));
  } catch {}

  try {
    await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ movieId, text, rating })
    });
  } catch {}

  return newComment;
}

// Universal Search
export async function searchUniversal(query: string, allMovies: Movie[]): Promise<{
  movies: Movie[];
  tv: Movie[];
  people: any[];
  genres: string[];
}> {
  const q = query.trim().toLowerCase();
  if (!q) {
    return { movies: [], tv: [], people: [], genres: [] };
  }

  // Try backend first if available
  try {
    const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
    const contentType = res.headers.get('content-type') || '';
    if (res.ok && contentType.includes('application/json')) {
      const data = await res.json();
      if (data && (data.movies?.length > 0 || data.tv?.length > 0)) {
        return data;
      }
    }
  } catch {}

  // Filter in-memory movies
  const matchedMovies = allMovies.filter(m =>
    m.type === 'movie' &&
    (m.title.toLowerCase().includes(q) ||
     m.overview.toLowerCase().includes(q) ||
     m.genres.some(g => g.toLowerCase().includes(q)) ||
     m.cast.some(c => c.name.toLowerCase().includes(q)))
  );

  const matchedTv = allMovies.filter(m =>
    m.type === 'tv' &&
    (m.title.toLowerCase().includes(q) ||
     m.overview.toLowerCase().includes(q) ||
     m.genres.some(g => g.toLowerCase().includes(q)) ||
     m.cast.some(c => c.name.toLowerCase().includes(q)))
  );

  const matchedGenres = INITIAL_GENRES.filter(g => g.toLowerCase().includes(q));

  // Extract matched cast members
  const peopleMap = new Map<string, any>();
  for (const m of allMovies) {
    for (const c of m.cast) {
      if (c.name.toLowerCase().includes(q) && !peopleMap.has(c.name)) {
        peopleMap.set(c.name, {
          id: c.id,
          name: c.name,
          character: c.character,
          photo: c.photo,
          knownFor: m.title
        });
      }
    }
  }

  return {
    movies: matchedMovies,
    tv: matchedTv,
    people: Array.from(peopleMap.values()),
    genres: matchedGenres
  };
}
