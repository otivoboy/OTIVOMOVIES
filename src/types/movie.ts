export type SourceType = 
  | 'OWNED'
  | 'PUBLIC_DOMAIN'
  | 'AUTHORIZED_FREE'
  | 'AUTHORIZED_AVOD'
  | 'AUTHORIZED_EMBED'
  | 'EXTERNAL_PROVIDER';

export type VerificationStatus = 
  | 'VERIFIED'
  | 'UNVERIFIED'
  | 'VERIFYING'
  | 'FAILED'
  | 'EXPIRED'
  | 'DISABLED';

export type ReleaseStatus = 
  | 'UPCOMING'
  | 'COMING_THIS_WEEK'
  | 'COMING_THIS_MONTH'
  | 'RELEASED'
  | 'FREE_AVAILABLE'
  | 'WATCHABLE';

export type StreamProtocol = 'HLS' | 'MP4' | 'TRAILER' | 'EXTERNAL';
export type StreamQuality = '1080p' | '720p' | '480p' | 'Auto';

export interface StreamingSource {
  id: string;
  movieId: string;
  providerName: string;
  provider?: string;
  providerLogo?: string;
  sourceType: SourceType;
  streamUrl: string;
  url?: string;
  embedUrl?: string;
  type?: StreamProtocol;
  quality?: StreamQuality;
  isAuthorized?: boolean;
  isVerified?: boolean;
  isActive?: boolean;
  licenseStatus: 'VALID' | 'PENDING' | 'EXPIRED' | 'REVOKED';
  verificationStatus: VerificationStatus;
  region: string;
  language: string;
  isFree: boolean;
  requiresAccount?: boolean;
  allowsEmbedding?: boolean;
  verifiedAt: string;
  expiresAt?: string;
  createdAt?: string;
  updatedAt?: string;
  lastError?: string;
}

export type MovieWatchAction =
  | { type: 'STREAM'; label: 'Watch Free'; source: StreamingSource }
  | { type: 'TRAILER'; label: 'Watch Trailer'; trailerUrl: string }
  | { type: 'PROVIDER'; label: string; providerUrl: string; providerName: string };

export function getMovieStreamingAction(movie: Movie): MovieWatchAction {
  // 1. Authorized full movie stream
  const authorizedSource = movie.streamingSources?.find(
    s => (s.isAuthorized !== false) &&
         (s.verificationStatus === 'VERIFIED' || s.isVerified !== false) &&
         (s.isActive !== false) &&
         (s.isFree || s.sourceType === 'AUTHORIZED_FREE' || s.sourceType === 'OWNED' || s.sourceType === 'PUBLIC_DOMAIN') &&
         (s.type === 'HLS' || s.type === 'MP4' || s.streamUrl?.includes('.m3u8') || s.streamUrl?.includes('.mp4') || s.streamUrl?.includes('sample'))
  );

  if (authorizedSource) {
    return { type: 'STREAM', label: 'Watch Free', source: authorizedSource };
  }

  // 2. Commercial / External Provider Availability
  const externalProvider = movie.whereToWatch?.find(p => p.url && p.url !== '#watch' && !p.url.startsWith('#'));
  if (externalProvider) {
    return {
      type: 'PROVIDER',
      label: `Watch on ${externalProvider.name}`,
      providerUrl: externalProvider.url,
      providerName: externalProvider.name
    };
  }

  // 3. Official Trailer
  if (movie.trailerUrl) {
    return { type: 'TRAILER', label: 'Watch Trailer', trailerUrl: movie.trailerUrl };
  }

  // Default fallback trailer
  return {
    type: 'TRAILER',
    label: 'Watch Trailer',
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4'
  };
}

export interface AuthorizedProvider {
  id: string;
  name: string;
  logo: string;
  type: 'flatrate' | 'free' | 'rent' | 'buy' | 'ads';
  url: string;
  quality?: string;
}

export interface CastMember {
  id: string;
  name: string;
  character: string;
  photo: string;
  order: number;
}

export interface CrewMember {
  id: string;
  name: string;
  job: string;
  department: string;
}

export interface Episode {
  id: string;
  showId: string;
  seasonNumber: number;
  episodeNumber: number;
  title: string;
  overview: string;
  airDate: string;
  runtime: number;
  stillImage: string;
  streamingSources: StreamingSource[];
}

export interface Season {
  id: string;
  showId: string;
  seasonNumber: number;
  title: string;
  overview: string;
  poster?: string;
  episodes: Episode[];
}

export interface Movie {
  id: string;
  title: string;
  slug: string;
  type: 'movie' | 'tv';
  tagline?: string;
  overview: string;
  releaseDate: string;
  year: number;
  runtime: number; // minutes
  rating: number; // 0 - 10
  voteCount: number;
  ageRating: string;
  poster: string;
  backdrop: string;
  genres: string[];
  languages: string[];
  countries: string[];
  trailerUrl?: string;
  status: ReleaseStatus;
  isFree: boolean;
  isFeatured?: boolean;
  isTrending?: boolean;
  isPopular?: boolean;
  isNewRelease?: boolean;
  isUpcoming?: boolean;
  tmdbId?: number;
  imdbId?: string;
  cast: CastMember[];
  crew: CrewMember[];
  seasons?: Season[];
  streamingSources: StreamingSource[];
  whereToWatch: AuthorizedProvider[];
  createdAt: string;
  updatedAt: string;
}

export interface WatchHistoryItem {
  id: string;
  movieId: string;
  episodeId?: string;
  position: number; // seconds
  duration: number; // seconds
  completed: boolean;
  lastWatchedAt: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  favoriteGenres: string[];
  watchlist: string[]; // movie IDs
  history: WatchHistoryItem[];
  ratings: Record<string, number>; // movieId -> rating 1-10
}

export interface Comment {
  id: string;
  movieId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  text: string;
  rating?: number;
  createdAt: string;
  isReported?: boolean;
}

export interface ApiSyncLog {
  id: string;
  timestamp: string;
  status: 'COMPLETED' | 'RUNNING' | 'FAILED';
  moviesUpdated: number;
  newMovies: number;
  updatedMovies: number;
  failedMovies: number;
  message: string;
  logs: string[];
}

export interface SystemStats {
  totalMovies: number;
  totalTvShows: number;
  freeTitlesCount: number;
  upcomingTitlesCount: number;
  activeUsersCount: number;
  totalWatchSessions: number;
  failedSourcesCount: number;
  lastApiSync: string;
}

export interface EnvKeyItem {
  key: string;
  name: string;
  category: 'Metadata' | 'Availability' | 'Database' | 'Search' | 'Storage & CDN' | 'Security & Cron' | 'App';
  configured: boolean;
  valueMasked?: string;
  description: string;
}

export interface EnvStatusResponse {
  keys: EnvKeyItem[];
  overallHealth: 'READY' | 'PARTIAL' | 'DEVELOPMENT_FALLBACK';
  summary: string;
}

export interface KeyTestResult {
  service: string;
  status: 'SUCCESS' | 'ERROR' | 'SKIPPED';
  message: string;
  latencyMs?: number;
  details?: any;
}
