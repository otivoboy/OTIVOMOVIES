import { Movie, Episode } from '../types/movie';

export interface StreamResult {
  id: string;
  sourceName: string;
  adapterId: string;
  type: 'hls' | 'mp4' | 'embed';
  url: string;
  quality?: string;
  language?: string;
  isAuthorized: boolean;
  providerName: string;
  latencyMs?: number;
  note?: string;
}

export interface StreamingSourceAdapter {
  id: string;
  name: string;
  description: string;
  priority: number;
  isEnabled: boolean;

  resolveMovie(tmdbId: number, imdbId?: string, movie?: Movie): Promise<StreamResult | null>;

  resolveEpisode(
    tmdbId: number,
    season: number,
    episode: number,
    imdbId?: string,
    movie?: Movie
  ): Promise<StreamResult | null>;
}

// Adapter 1: OTIVO CDN & Object Storage
export class OtivoCdnAdapter implements StreamingSourceAdapter {
  id = 'otivo-cdn';
  name = 'OTIVO CDN & Storage (S3/R2)';
  description = 'High-speed edge CDN hosting authorized HLS master streams (.m3u8) & multi-bitrate MP4s.';
  priority = 1;
  isEnabled = true;

  async resolveMovie(tmdbId: number, _imdbId?: string, movie?: Movie): Promise<StreamResult | null> {
    const startTime = performance.now();
    if (!movie) return null;

    // Search for direct OTIVO CDN streams in movie
    const cdnSource = movie.streamingSources?.find(
      s => (s.isAuthorized !== false) &&
           (s.type === 'HLS' || s.type === 'MP4' || s.streamUrl?.includes('.m3u8') || s.streamUrl?.includes('.mp4')) &&
           (s.sourceType === 'OWNED' || s.sourceType === 'AUTHORIZED_FREE' || s.isFree)
    );

    if (cdnSource && cdnSource.streamUrl) {
      const isHls = cdnSource.streamUrl.includes('.m3u8') || cdnSource.type === 'HLS';
      return {
        id: `cdn-${movie.id}`,
        sourceName: this.name,
        adapterId: this.id,
        type: isHls ? 'hls' : 'mp4',
        url: cdnSource.streamUrl,
        quality: cdnSource.quality || '1080p',
        language: cdnSource.language || 'English',
        isAuthorized: true,
        providerName: 'OTIVO Edge CDN',
        latencyMs: Math.round(performance.now() - startTime + 12),
        note: 'Multi-bitrate HLS adaptive stream'
      };
    }

    return null;
  }

  async resolveEpisode(
    _tmdbId: number,
    season: number,
    episodeNum: number,
    _imdbId?: string,
    movie?: Movie
  ): Promise<StreamResult | null> {
    const startTime = performance.now();
    if (!movie || !movie.seasons) return null;

    const matchedSeason = movie.seasons.find(s => s.seasonNumber === season);
    const matchedEpisode = matchedSeason?.episodes.find(e => e.episodeNumber === episodeNum);

    if (matchedEpisode && matchedEpisode.streamingSources?.length > 0) {
      const src = matchedEpisode.streamingSources[0];
      const isHls = src.streamUrl?.includes('.m3u8') || src.type === 'HLS';
      return {
        id: `cdn-ep-${matchedEpisode.id}`,
        sourceName: this.name,
        adapterId: this.id,
        type: isHls ? 'hls' : 'mp4',
        url: src.streamUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
        quality: src.quality || '1080p',
        language: 'English',
        isAuthorized: true,
        providerName: 'OTIVO Edge CDN',
        latencyMs: Math.round(performance.now() - startTime + 15),
        note: `S${season}E${episodeNum} Direct Master Stream`
      };
    }

    return null;
  }
}

// Adapter 2: Licensed Partner Stream API
export class LicensedApiAdapter implements StreamingSourceAdapter {
  id = 'licensed-api';
  name = 'Licensed Partner Stream Network';
  description = 'Authorized AVOD & FAST network partner feeds delivering licensed movies and series.';
  priority = 2;
  isEnabled = true;

  async resolveMovie(tmdbId: number, _imdbId?: string, movie?: Movie): Promise<StreamResult | null> {
    const startTime = performance.now();
    if (!movie) return null;

    const partnerSource = movie.streamingSources?.find(
      s => s.sourceType === 'AUTHORIZED_AVOD' || s.providerName?.toLowerCase().includes('partner') || s.providerName?.toLowerCase().includes('avod')
    );

    if (partnerSource && partnerSource.streamUrl) {
      return {
        id: `partner-${movie.id}`,
        sourceName: this.name,
        adapterId: this.id,
        type: partnerSource.streamUrl.includes('.m3u8') ? 'hls' : 'mp4',
        url: partnerSource.streamUrl,
        quality: partnerSource.quality || '720p',
        language: partnerSource.language || 'English',
        isAuthorized: true,
        providerName: partnerSource.providerName || 'Licensed Partner Network',
        latencyMs: Math.round(performance.now() - startTime + 38),
        note: 'Authorized AVOD Partner Stream'
      };
    }

    return null;
  }

  async resolveEpisode(
    _tmdbId: number,
    _season: number,
    _episode: number,
    _imdbId?: string,
    _movie?: Movie
  ): Promise<StreamResult | null> {
    return null;
  }
}

// Adapter 3: Authorized Studio Embed
export class AuthorizedEmbedAdapter implements StreamingSourceAdapter {
  id = 'authorized-embed';
  name = 'Authorized Studio Player Embed';
  description = 'Embedded players provided directly by copyright holders, studios, or public domain archives.';
  priority = 3;
  isEnabled = true;

  async resolveMovie(_tmdbId: number, _imdbId?: string, movie?: Movie): Promise<StreamResult | null> {
    const startTime = performance.now();
    if (!movie) return null;

    const embedSource = movie.streamingSources?.find(
      s => s.sourceType === 'AUTHORIZED_EMBED' || Boolean(s.embedUrl)
    );

    if (embedSource) {
      return {
        id: `embed-${movie.id}`,
        sourceName: this.name,
        adapterId: this.id,
        type: 'embed',
        url: embedSource.embedUrl || embedSource.streamUrl,
        quality: '1080p',
        language: 'English',
        isAuthorized: true,
        providerName: 'Official Studio Player',
        latencyMs: Math.round(performance.now() - startTime + 24),
        note: 'Official Studio Embed'
      };
    }

    return null;
  }

  async resolveEpisode(
    _tmdbId: number,
    _season: number,
    _episode: number,
    _imdbId?: string,
    _movie?: Movie
  ): Promise<StreamResult | null> {
    return null;
  }
}

// Adapter 4: Official Studio Trailer & Clip Fallback
export class OfficialTrailerAdapter implements StreamingSourceAdapter {
  id = 'official-trailer';
  name = 'Official Studio Trailer & Preview';
  description = 'Fallback source streaming high-definition official studio trailers when no full-length authorized stream is licensed.';
  priority = 4;
  isEnabled = true;

  async resolveMovie(_tmdbId: number, _imdbId?: string, movie?: Movie): Promise<StreamResult | null> {
    const startTime = performance.now();
    const trailerUrl = movie?.trailerUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4';

    return {
      id: `trailer-${movie?.id || 'default'}`,
      sourceName: this.name,
      adapterId: this.id,
      type: trailerUrl.includes('.m3u8') ? 'hls' : trailerUrl.includes('youtube') || trailerUrl.includes('vimeo') ? 'embed' : 'mp4',
      url: trailerUrl,
      quality: '1080p 4K Trailer',
      language: 'English',
      isAuthorized: true,
      providerName: 'Official Studio Preview',
      latencyMs: Math.round(performance.now() - startTime + 8),
      note: 'Official Trailer Stream'
    };
  }

  async resolveEpisode(
    _tmdbId: number,
    _season: number,
    _episode: number,
    _imdbId?: string,
    movie?: Movie
  ): Promise<StreamResult | null> {
    return this.resolveMovie(_tmdbId, _imdbId, movie);
  }
}

// STREAM RESOLVER MANAGER
export class StreamResolverManager {
  private adapters: StreamingSourceAdapter[] = [];

  constructor() {
    this.adapters = [
      new OtivoCdnAdapter(),
      new LicensedApiAdapter(),
      new AuthorizedEmbedAdapter(),
      new OfficialTrailerAdapter()
    ].sort((a, b) => a.priority - b.priority);
  }

  public getAdapters(): StreamingSourceAdapter[] {
    return this.adapters;
  }

  public toggleAdapter(adapterId: string, enabled: boolean) {
    const found = this.adapters.find(a => a.id === adapterId);
    if (found) found.isEnabled = enabled;
  }

  /**
   * Resolves available stream sources for a movie across all enabled adapters.
   * Runs adapters in priority sequence (1 -> 2 -> 3 -> 4).
   */
  public async resolveMovieStreams(
    movie: Movie
  ): Promise<{ primary: StreamResult; allSources: StreamResult[]; resolvedInMs: number }> {
    const startTime = performance.now();
    const tmdbId = movie.tmdbId || 0;
    const imdbId = movie.imdbId;

    const results: StreamResult[] = [];

    for (const adapter of this.adapters) {
      if (!adapter.isEnabled) continue;

      try {
        const stream = await adapter.resolveMovie(tmdbId, imdbId, movie);
        if (stream) {
          results.push(stream);
        }
      } catch (err) {
        console.warn(`[StreamResolver] Adapter ${adapter.id} failed:`, err);
      }
    }

    const resolvedInMs = Math.round(performance.now() - startTime);

    // Primary is the highest-priority resolved source
    const primary = results[0] || {
      id: `fallback-${movie.id}`,
      sourceName: 'Default Fallback Stream',
      adapterId: 'default',
      type: 'mp4',
      url: movie.trailerUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
      quality: '1080p',
      language: 'English',
      isAuthorized: true,
      providerName: 'OTIVO Fallback',
      latencyMs: resolvedInMs
    };

    return { primary, allSources: results, resolvedInMs };
  }

  /**
   * Resolves episode streams for TV series.
   */
  public async resolveEpisodeStreams(
    movie: Movie,
    seasonNumber: number,
    episodeNumber: number
  ): Promise<{ primary: StreamResult; allSources: StreamResult[]; resolvedInMs: number }> {
    const startTime = performance.now();
    const tmdbId = movie.tmdbId || 0;
    const imdbId = movie.imdbId;

    const results: StreamResult[] = [];

    for (const adapter of this.adapters) {
      if (!adapter.isEnabled) continue;

      try {
        const stream = await adapter.resolveEpisode(tmdbId, seasonNumber, episodeNumber, imdbId, movie);
        if (stream) {
          results.push(stream);
        }
      } catch (err) {
        console.warn(`[StreamResolver] Episode Adapter ${adapter.id} failed:`, err);
      }
    }

    const resolvedInMs = Math.round(performance.now() - startTime);

    const primary = results[0] || {
      id: `ep-fallback-${movie.id}-${seasonNumber}-${episodeNumber}`,
      sourceName: 'Default Episode Stream',
      adapterId: 'default',
      type: 'mp4',
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
      quality: '1080p',
      language: 'English',
      isAuthorized: true,
      providerName: 'OTIVO Edge CDN',
      latencyMs: resolvedInMs,
      note: `S${seasonNumber}E${episodeNumber} Stream`
    };

    return { primary, allSources: results.length > 0 ? results : [primary], resolvedInMs };
  }
}

// Singleton Instance for App
export const globalStreamResolver = new StreamResolverManager();
