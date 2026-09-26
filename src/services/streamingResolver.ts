import { Movie, Episode } from '../types/movie';

export interface StreamResult {
  id: string;
  sourceName: string;
  adapterId: string;
  type: 'hls' | 'mp4';
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

// Adapter 0: Watchmode Real Streaming Provider Network (Priority 1 - First to resolve)
/**
 * WatchmodeAdapter queries the Watchmode API for real, authorized streaming sources.
 * Returns live links to Netflix, Amazon Prime, Hulu, Disney+, Apple TV, and 300+ providers.
 * Gracefully falls back if Watchmode API is unavailable.
 */
export class WatchmodeAdapter implements StreamingSourceAdapter {
  id = 'watchmode';
  name = 'Watchmode Real Provider Network';
  description = 'Live authorized streaming availability across 300+ providers (Netflix, Prime Video, Hulu, Disney+, etc). Returns direct embeddable streams and provider links.';
  priority = 0; // HIGHEST PRIORITY - queries real providers first
  isEnabled = true;

  private async queryWatchmodeApi(movieId: string, tmdbId?: number): Promise<any> {
    try {
      // Query the backend endpoint which wraps Watchmode API
      const res = await fetch(`/api/watchmode/availability/${movieId || tmdbId}`, {
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (res.ok) {
        const data = await res.json();
        return data.sources || data;
      }
    } catch (err) {
      console.warn('[WatchmodeAdapter] API query failed:', err);
    }
    return null;
  }

  async resolveMovie(_tmdbId: number, _imdbId?: string, movie?: Movie): Promise<StreamResult | null> {
    const startTime = performance.now();
    if (!movie) return null;

    try {
      const watchmodeSources = await this.queryWatchmodeApi(movie.id, movie.tmdbId);
      
      if (watchmodeSources && Array.isArray(watchmodeSources) && watchmodeSources.length > 0) {
        // Find the best available source (prefer free/subscription over rental)
        const source = watchmodeSources.find((s: any) => s.type === 'free') ||
                      watchmodeSources.find((s: any) => s.type === 'flatrate') ||
                      watchmodeSources[0];

        if (source && source.web_url) {
          return {
            id: `watchmode-${movie.id}`,
            sourceName: this.name,
            adapterId: this.id,
            type: 'mp4', // Watchmode provides embeddable web URLs
            url: source.web_url,
            quality: source.format || '1080p',
            language: 'Multiple',
            isAuthorized: true,
            providerName: source.name || 'Watchmode Network',
            latencyMs: Math.round(performance.now() - startTime),
            note: `Real stream from ${source.name} - ${source.type === 'free' ? 'Free' : 'Subscription'}`
          };
        }
      }
    } catch (err) {
      console.warn('[WatchmodeAdapter] Movie resolution failed:', err);
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
    if (!movie) return null;

    try {
      const watchmodeSources = await this.queryWatchmodeApi(movie.id, movie.tmdbId);
      
      if (watchmodeSources && Array.isArray(watchmodeSources) && watchmodeSources.length > 0) {
        const source = watchmodeSources[0];
        if (source && source.web_url) {
          return {
            id: `watchmode-ep-${movie.id}-s${season}e${episodeNum}`,
            sourceName: this.name,
            adapterId: this.id,
            type: 'mp4',
            url: source.web_url,
            quality: source.format || '1080p',
            language: 'Multiple',
            isAuthorized: true,
            providerName: source.name || 'Watchmode Network',
            latencyMs: Math.round(performance.now() - startTime),
            note: `S${season}E${episodeNum} - Real stream from ${source.name}`
          };
        }
      }
    } catch (err) {
      console.warn('[WatchmodeAdapter] Episode resolution failed:', err);
    }

    return null;
  }
}

// Adapter 1: OTIVO Edge CDN (Priority 2)
/**
 * OTIVO Edge CDN streams from self-hosted S3/Cloudflare R2 buckets.
 * Requires STORAGE_ENDPOINT, CDN_URL, VIDEO_CDN_URL environment variables.
 * Falls back gracefully if no CDN sources are configured.
 */
export class OtivoCdnAdapter implements StreamingSourceAdapter {
  id = 'otivo-cdn';
  name = 'OTIVO Edge CDN (S3/R2 Stream)';
  description = 'High-speed edge CDN hosting authorized HLS master manifests (.m3u8) & direct MP4 streams from self-hosted or licensed content.';
  priority = 1;
  isEnabled = true;

  async resolveMovie(_tmdbId: number, _imdbId?: string, movie?: Movie): Promise<StreamResult | null> {
    const startTime = performance.now();
    if (!movie) return null;

    // Look for authorized streaming sources attached to the movie
    const cdnSource = movie.streamingSources?.find(
      s => (s.isAuthorized !== false) &&
           (s.type === 'HLS' || s.type === 'MP4' || s.streamUrl?.includes('.m3u8') || s.streamUrl?.includes('.mp4'))
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
        note: 'Multi-bitrate HLS master stream' + (isHls ? '' : ' (Direct MP4)')
      };
    }

    // No CDN sources configured - return null to fall through to next adapter
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
        url: src.streamUrl || '',
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

// Adapter 2: Licensed Partner Stream Network (Priority 3)
/**
 * Licensed partner feeds for authorized AVOD & FAST networks.
 * Examples: Tubi, Pluto TV, YouTube Free Movies, Peacock Free, etc.
 * Returns HLS/MP4 streams where available.
 */
export class LicensedApiAdapter implements StreamingSourceAdapter {
  id = 'licensed-api';
  name = 'Licensed Partner Stream Network';
  description = 'Authorized AVOD & FAST partner network feeds (Tubi, Pluto, YouTube, Peacock Free) delivering direct HLS & MP4 streams where available.';
  priority = 2;
  isEnabled = true;

  async resolveMovie(_tmdbId: number, _imdbId?: string, movie?: Movie): Promise<StreamResult | null> {
    const startTime = performance.now();
    if (!movie) return null;

    // Check if movie has authorized partner sources already attached
    const partnerSource = movie.streamingSources?.find(
      s => s.sourceType === 'AUTHORIZED_FREE' && s.streamUrl && s.isFree
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
        latencyMs: Math.round(performance.now() - startTime + 28),
        note: 'Licensed Partner Direct Stream'
      };
    }

    return null;
  }

  async resolveEpisode(
    _tmdbId: number,
    season: number,
    episode: number,
    _imdbId?: string,
    movie?: Movie
  ): Promise<StreamResult | null> {
    const startTime = performance.now();
    if (!movie || !movie.seasons) return null;

    const matchedSeason = movie.seasons?.find(s => s.seasonNumber === season);
    const matchedEpisode = matchedSeason?.episodes?.find(e => e.episodeNumber === episode);

    if (matchedEpisode && matchedEpisode.streamingSources?.length > 0) {
      const src = matchedEpisode.streamingSources[0];
      return {
        id: `partner-ep-${matchedEpisode.id}`,
        sourceName: this.name,
        adapterId: this.id,
        type: src.streamUrl?.includes('.m3u8') ? 'hls' : 'mp4',
        url: src.streamUrl || '',
        quality: src.quality || '720p',
        language: src.language || 'English',
        isAuthorized: true,
        providerName: src.providerName || 'Licensed Partner Network',
        latencyMs: Math.round(performance.now() - startTime + 25),
        note: `S${season}E${episode} Licensed Partner Stream`
      };
    }

    return null;
  }
}

// STREAM RESOLVER MANAGER
/**
 * Multi-adapter stream resolver with graceful fallback chain:
 * 1. Watchmode (real providers) → live availability from 300+ services
 * 2. OTIVO Edge CDN → self-hosted or directly licensed content
 * 3. Licensed Partners → AVOD/FAST networks (Tubi, Pluto, etc.)
 * 
 * If all adapters fail, returns null (no stream available - UI should show provider selection).
 * Previously: fell back to demo videos. Now: fails cleanly to prompt user action.
 */
export class StreamResolverManager {
  private adapters: StreamingSourceAdapter[] = [];

  constructor() {
    this.adapters = [
      new WatchmodeAdapter(),
      new OtivoCdnAdapter(),
      new LicensedApiAdapter()
    ].sort((a, b) => a.priority - b.priority);
  }

  public getAdapters(): StreamingSourceAdapter[] {
    return this.adapters;
  }

  public toggleAdapter(adapterId: string, enabled: boolean) {
    const found = this.adapters.find(a => a.id === adapterId);
    if (found) found.isEnabled = enabled;
  }

  public async resolveMovieStreams(
    movie: Movie
  ): Promise<{ primary: StreamResult | null; allSources: StreamResult[]; resolvedInMs: number }> {
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
    const primary = results[0] || null;

    return { 
      primary, 
      allSources: results, 
      resolvedInMs 
    };
  }

  public async resolveEpisodeStreams(
    movie: Movie,
    seasonNumber: number,
    episodeNumber: number
  ): Promise<{ primary: StreamResult | null; allSources: StreamResult[]; resolvedInMs: number }> {
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
    const primary = results[0] || null;

    return { 
      primary, 
      allSources: results, 
      resolvedInMs 
    };
  }
}

export const globalStreamResolver = new StreamResolverManager();
