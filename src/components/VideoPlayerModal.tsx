import React, { useEffect, useRef, useState } from 'react';
import { Movie, StreamingSource } from '../types/movie';
import { globalStreamResolver, StreamResult } from '../services/streamingResolver';
import Hls from 'hls.js';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  X,
  ShieldCheck,
  AlertTriangle,
  Layers,
  CheckCircle2,
  ChevronDown,
  RotateCcw,
  RotateCw
} from 'lucide-react';

interface VideoPlayerModalProps {
  movie: Movie;
  source?: StreamingSource;
  seasonNumber?: number;
  episodeNumber?: number;
  initialPosition?: number;
  onClose: () => void;
  onUpdateHistory: (position: number, duration: number, completed: boolean) => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  movie,
  source,
  seasonNumber,
  episodeNumber,
  initialPosition = 0,
  onClose,
  onUpdateHistory
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const playPromiseRef = useRef<Promise<void> | null>(null);

  // Resolver & Multi-source states
  const [resolvedSources, setResolvedSources] = useState<StreamResult[]>([]);
  const [activeSourceIndex, setActiveSourceIndex] = useState(0);
  const [isResolving, setIsResolving] = useState(true);
  const [showSourceMenu, setShowSourceMenu] = useState(false);
  const [showQualityMenu, setShowQualityMenu] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);

  // Player controls
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedQuality, setSelectedQuality] = useState<'Auto' | '1080p' | '720p' | '480p'>('1080p');
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [playbackError, setPlaybackError] = useState<string | null>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const safePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    try {
      const p = video.play();
      if (p !== undefined) {
        playPromiseRef.current = p;
        p.then(() => {
          playPromiseRef.current = null;
          setIsPlaying(true);
        }).catch((err) => {
          playPromiseRef.current = null;
          if (err.name !== 'AbortError' && err.name !== 'NotAllowedError') {
            console.warn('Playback error:', err);
          }
        });
      } else {
        setIsPlaying(true);
      }
    } catch {}
  };

  const safePause = () => {
    const video = videoRef.current;
    if (!video) return;
    if (playPromiseRef.current) {
      playPromiseRef.current
        .then(() => {
          video.pause();
          setIsPlaying(false);
        })
        .catch(() => {
          video.pause();
          setIsPlaying(false);
        });
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      safePause();
    } else {
      safePlay();
    }
  };

  // 1. Run Stream Resolver on Mount
  useEffect(() => {
    let isMounted = true;
    setIsResolving(true);

    const resolveStream = async () => {
      try {
        if (seasonNumber && episodeNumber) {
          const res = await globalStreamResolver.resolveEpisodeStreams(movie, seasonNumber, episodeNumber);
          if (isMounted) {
            setResolvedSources(res.allSources);
            setActiveSourceIndex(0);
          }
        } else {
          const res = await globalStreamResolver.resolveMovieStreams(movie);
          if (isMounted) {
            setResolvedSources(res.allSources);
            setActiveSourceIndex(0);
          }
        }
      } catch (err) {
        console.error('Error resolving streams:', err);
      } finally {
        if (isMounted) setIsResolving(false);
      }
    };

    resolveStream();

    return () => {
      isMounted = false;
    };
  }, [movie, seasonNumber, episodeNumber]);

  const activeStream: StreamResult | null = resolvedSources[activeSourceIndex] || (source ? {
    id: source.id,
    sourceName: source.providerName || 'OTIVO Direct Stream',
    adapterId: 'direct',
    type: source.type === 'HLS' || source.streamUrl.includes('.m3u8') ? 'hls' : 'mp4',
    url: source.streamUrl,
    quality: source.quality || '1080p',
    language: source.language || 'English',
    isAuthorized: true,
    providerName: source.providerName || 'OTIVO Edge CDN'
  } : null);

  const streamUrl = activeStream?.url || '';

  // 2. Attach HLS.js or Native HTML5 Video
  useEffect(() => {
    if (isResolving) return;
    setPlaybackError(null);
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;

    if (streamUrl.includes('.m3u8') && Hls.isSupported()) {
      hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true
      });
      hls.loadSource(streamUrl);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (initialPosition > 0) video.currentTime = initialPosition;
        safePlay();
      });

      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (data.fatal) {
          console.warn('HLS error:', data);
          setPlaybackError('Stream buffering on current source adapter. Attempting failover...');
          if (resolvedSources.length > activeSourceIndex + 1) {
            setActiveSourceIndex(prev => prev + 1);
          }
        }
      });
    } else {
      video.src = streamUrl;
      if (initialPosition > 0) video.currentTime = initialPosition;
      safePlay();
    }

    return () => {
      if (hls) hls.destroy();
    };
  }, [streamUrl, isResolving, activeSourceIndex, resolvedSources.length, initialPosition]);

  // 3. Time, duration & history listener
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      setDuration(video.duration || 0);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      onUpdateHistory(video.duration || 100, video.duration || 100, true);
    };

    const handleError = () => {
      setPlaybackError('Unable to play stream on this server. Switch source adapter.');
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('error', handleError);

    const saveInterval = setInterval(() => {
      if (video.currentTime > 0) {
        onUpdateHistory(video.currentTime, video.duration || 0, video.ended);
      }
    }, 5000);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('error', handleError);
      clearInterval(saveInterval);
      if (video.currentTime > 0) {
        onUpdateHistory(video.currentTime, video.duration || 0, video.ended);
      }
    };
  }, [onUpdateHistory]);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;
    const seekTime = Number(e.target.value);
    video.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const skipSeconds = (seconds: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = Math.max(0, Math.min(video.duration || 0, video.currentTime + seconds));
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;
    const vol = Number(e.target.value);
    video.volume = vol;
    setVolume(vol);
    setIsMuted(vol === 0);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleSpeedChange = (speed: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = speed;
    setPlaybackSpeed(speed);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const handleUserInteraction = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying && !showSourceMenu && !showQualityMenu && !showSettingsMenu) {
        setShowControls(false);
      }
    }, 3500);
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '00:00';
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hrs > 0) {
      return `${hrs}:${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div
      ref={containerRef}
      onClick={handleUserInteraction}
      onMouseMove={handleUserInteraction}
      onTouchStart={handleUserInteraction}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden font-sans select-none"
    >
      {/* Loading Overlay when Resolving Stream */}
      {isResolving && (
        <div className="absolute inset-0 z-40 bg-black flex flex-col items-center justify-center gap-4 text-center px-4">
          <div className="w-12 h-12 rounded-full border-4 border-[#00F060]/20 border-t-[#00F060] animate-spin" />
          <div className="space-y-1">
            <p className="text-sm font-bold text-white tracking-wide">Connecting to OTIVO Stream Adapter...</p>
            <p className="text-xs text-slate-400">Verifying HLS master manifest and edge CDN response</p>
          </div>
        </div>
      )}

      {/* No Stream Available Overlay */}
      {!isResolving && !streamUrl && (
        <div className="absolute inset-0 z-30 bg-[#05090D] flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto">
          <img src={movie.poster} alt={movie.title} className="w-32 h-48 object-cover rounded-2xl border border-slate-800 shadow-2xl mb-4" />
          <h3 className="text-xl font-black text-white">{movie.title}</h3>
          <p className="text-xs text-slate-400 mt-1 font-mono">{movie.year} · {movie.type === 'tv' ? 'TV Series' : 'Movie'}</p>
          <div className="mt-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 text-left w-full">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              <span>Direct Stream Source Pending</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              No direct HLS stream is currently active for this title on OTIVO CDN. Check Watchmode availability or select an authorized provider.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            {movie.whereToWatch && movie.whereToWatch.length > 0 && (
              <a
                href={movie.whereToWatch[0].url || '#'}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-xl bg-[#00F060] text-black font-extrabold text-xs shadow-lg"
              >
                Watch on {movie.whereToWatch[0].name}
              </a>
            )}
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs hover:bg-slate-700"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Direct Video Stream (HLS or MP4) */}
      <video
        ref={videoRef}
        onClick={togglePlay}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        className="w-full h-full object-contain cursor-pointer"
        playsInline
      />

      {/* Central Big Play/Pause & Skip Buttons on Mobile (Touch Overlay) */}
      {showControls && !isResolving && (
        <div className="absolute inset-0 flex items-center justify-center gap-8 pointer-events-none z-20">
          <button
            onClick={(e) => {
              e.stopPropagation();
              skipSeconds(-10);
            }}
            className="pointer-events-auto p-3.5 sm:p-4 rounded-full bg-black/60 text-slate-200 hover:text-white border border-white/10 backdrop-blur-md active:scale-95 transition"
            title="Rewind 10 seconds"
          >
            <RotateCcw className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              togglePlay();
            }}
            className="pointer-events-auto p-5 sm:p-6 rounded-full bg-[#00F060] text-black shadow-2xl shadow-[#00F060]/30 active:scale-90 transition transform"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <Pause className="w-7 h-7 sm:w-8 sm:h-8 fill-black" />
            ) : (
              <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-black ml-1" />
            )}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              skipSeconds(10);
            }}
            className="pointer-events-auto p-3.5 sm:p-4 rounded-full bg-black/60 text-slate-200 hover:text-white border border-white/10 backdrop-blur-md active:scale-95 transition"
            title="Forward 10 seconds"
          >
            <RotateCw className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      )}

      {/* Top Header Controls Overlay */}
      <div
        className={`absolute top-0 left-0 right-0 p-3 sm:p-6 bg-gradient-to-b from-black/95 via-black/60 to-transparent flex items-center justify-between transition-opacity duration-300 z-30 ${
          showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex items-center gap-2 sm:gap-3 max-w-[65%] sm:max-w-md">
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#00F060]/20 text-[#00F060] border border-[#00F060]/30 text-xs font-bold uppercase tracking-wider flex-shrink-0">
            <ShieldCheck className="w-4 h-4" />
            <span>{activeStream?.providerName || 'OTIVO Edge CDN'}</span>
          </div>
          <div className="truncate">
            <h2 className="text-sm sm:text-lg font-black text-white truncate leading-tight">
              {movie.title}
            </h2>
            {seasonNumber && episodeNumber && (
              <p className="text-[10px] sm:text-xs text-[#00F060] font-medium truncate">
                S{seasonNumber} E{episodeNumber}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quality Picker */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowQualityMenu(!showQualityMenu);
                setShowSourceMenu(false);
                setShowSettingsMenu(false);
              }}
              className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-bold text-slate-200 hover:text-white transition"
            >
              <span>{selectedQuality}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {showQualityMenu && (
              <div className="absolute right-0 mt-2 w-36 rounded-2xl bg-[#0B1118] border border-slate-800 p-2 shadow-2xl z-40 space-y-1 text-xs backdrop-blur-xl">
                {['1080p', '720p', '480p', 'Auto'].map(q => (
                  <button
                    key={q}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedQuality(q as any);
                      setShowQualityMenu(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl font-medium ${
                      selectedQuality === q ? 'bg-[#00F060] text-black font-bold' : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span>{q}</span>
                    {selectedQuality === q && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Close Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="p-2 sm:p-2.5 rounded-full bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 transition shadow-lg border border-white/10"
            title="Close video player"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      </div>

      {/* Playback Error Toast */}
      {playbackError && (
        <div className="absolute top-16 sm:top-20 z-40 px-3 py-2 rounded-2xl bg-amber-950/90 border border-amber-500/40 text-amber-300 text-xs flex items-center gap-2 shadow-2xl backdrop-blur-md max-w-[90vw]">
          <AlertTriangle className="w-4 h-4 flex-shrink-0 text-amber-400" />
          <span className="truncate">{playbackError}</span>
        </div>
      )}

      {/* Floating Multi-Source Adapter Selector Widget */}
      <div
        className={`absolute bottom-20 sm:bottom-24 right-3 sm:right-6 z-30 transition-all duration-300 ${
          showControls ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowSourceMenu(!showSourceMenu);
              setShowQualityMenu(false);
              setShowSettingsMenu(false);
            }}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl bg-[#0B1118]/90 border border-slate-800 text-[11px] sm:text-xs font-bold text-white shadow-2xl hover:border-[#00F060] transition backdrop-blur-md"
          >
            <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00F060]" />
            <span className="max-w-[120px] sm:max-w-none truncate">Source: {activeStream?.sourceName || 'Auto'}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showSourceMenu && (
            <div className="absolute right-0 bottom-12 w-72 sm:w-80 rounded-3xl bg-[#0B1118]/95 border border-slate-800 p-3 shadow-2xl z-50 space-y-2 backdrop-blur-xl">
              <div className="flex items-center justify-between px-2 pb-2 border-b border-slate-800 text-xs">
                <span className="font-black text-white uppercase tracking-wider text-[11px]">
                  Movie Stream Adapters
                </span>
                <span className="text-[10px] text-[#00F060] font-mono">
                  {resolvedSources.length} Verified
                </span>
              </div>

              <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
                {resolvedSources.map((s, idx) => {
                  const isActive = idx === activeSourceIndex;
                  return (
                    <button
                      key={s.id || idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveSourceIndex(idx);
                        setShowSourceMenu(false);
                      }}
                      className={`w-full text-left p-2.5 rounded-2xl transition border ${
                        isActive
                          ? 'bg-[#00F060]/15 border-[#00F060] text-white shadow-md'
                          : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-2.5 h-2.5 rounded-full ${isActive ? 'bg-[#00F060] animate-pulse' : 'bg-slate-600'}`} />
                          <span className="font-bold text-xs truncate max-w-[150px]">{s.sourceName}</span>
                        </div>
                        <span className="text-[10px] font-mono text-[#00F060] px-1.5 py-0.5 rounded bg-slate-800">
                          {s.type.toUpperCase()}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Custom Controls Bar */}
      <div
        className={`absolute bottom-0 left-0 right-0 p-3 sm:p-6 bg-gradient-to-t from-black/95 via-black/70 to-transparent transition-opacity duration-300 z-20 space-y-2 sm:space-y-3 ${
          showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Progress Timeline */}
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-[11px] sm:text-xs font-mono text-slate-300 min-w-[40px] text-right">
            {formatTime(currentTime)}
          </span>
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1.5 bg-slate-800 accent-[#00F060] rounded-lg cursor-pointer hover:h-2 transition-all"
          />
          <span className="text-[11px] sm:text-xs font-mono text-slate-300 min-w-[40px]">
            {formatTime(duration)}
          </span>
        </div>

        {/* Action Row */}
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
              className="p-2.5 sm:p-3 rounded-full bg-[#00F060] text-black hover:bg-[#16FF72] transition shadow-lg"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-4 h-4 sm:w-5 sm:h-5 fill-black" /> : <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-black ml-0.5" />}
            </button>

            {/* Volume Slider */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMute();
                }}
                className="text-slate-300 hover:text-white"
              >
                {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-16 lg:w-20 h-1.5 bg-slate-800 accent-[#00F060] rounded cursor-pointer"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 text-xs font-medium text-slate-300">
            {/* Playback Speed Selector */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowSettingsMenu(!showSettingsMenu);
                  setShowSourceMenu(false);
                  setShowQualityMenu(false);
                }}
                className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 font-mono text-[11px] sm:text-xs text-white hover:border-[#00F060] transition"
              >
                {playbackSpeed}x
              </button>

              {showSettingsMenu && (
                <div className="absolute right-0 bottom-10 w-28 rounded-2xl bg-[#0B1118] border border-slate-800 p-2 shadow-2xl z-40 space-y-1 text-xs backdrop-blur-xl">
                  {[0.75, 1, 1.25, 1.5, 2].map(speed => (
                    <button
                      key={speed}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSpeedChange(speed);
                        setShowSettingsMenu(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl font-mono ${
                        playbackSpeed === speed ? 'bg-[#00F060] text-black font-bold' : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <span>{speed}x</span>
                      {playbackSpeed === speed && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Fullscreen Toggle */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFullscreen();
              }}
              className="p-2 sm:p-2.5 rounded-xl bg-slate-900/90 text-slate-300 hover:text-white border border-slate-800"
              title="Fullscreen"
            >
              {isFullscreen ? <Minimize className="w-4 h-4 sm:w-5 sm:h-5" /> : <Maximize className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
