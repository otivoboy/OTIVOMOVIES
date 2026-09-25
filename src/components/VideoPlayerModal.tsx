import React, { useEffect, useRef, useState } from 'react';
import { Movie, StreamingSource } from '../types/movie';
import Hls from 'hls.js';
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, X, RotateCcw, FastForward, ShieldCheck, Film, AlertTriangle, Layers } from 'lucide-react';

interface VideoPlayerModalProps {
  movie: Movie;
  source?: StreamingSource;
  initialPosition?: number;
  onClose: () => void;
  onUpdateHistory: (position: number, duration: number, completed: boolean) => void;
}

function getYouTubeEmbedUrl(url: string): string | null {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11)
    ? `https://www.youtube-nocookie.com/embed/${match[2]}?autoplay=1&rel=0&modestbranding=1`
    : null;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  movie,
  source,
  initialPosition = 0,
  onClose,
  onUpdateHistory
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [selectedSourceIdx, setSelectedSourceIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [playbackError, setPlaybackError] = useState<string | null>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Determine active streaming source or fallback to trailerUrl
  const allSources = movie.streamingSources && movie.streamingSources.length > 0
    ? movie.streamingSources
    : [
        {
          id: `fallback-${movie.id}`,
          movieId: movie.id,
          providerName: 'OTIVO Official Stream',
          sourceType: 'AUTHORIZED_FREE' as const,
          streamUrl: movie.trailerUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
          licenseStatus: 'VALID' as const,
          verificationStatus: 'VERIFIED' as const,
          region: 'Global',
          language: 'English',
          isFree: true,
          requiresAccount: false,
          allowsEmbedding: true,
          verifiedAt: new Date().toISOString()
        }
      ];

  const activeSource = source || allSources[selectedSourceIdx] || allSources[0];
  const streamUrl = activeSource.streamUrl;
  const ytEmbedUrl = getYouTubeEmbedUrl(streamUrl);

  useEffect(() => {
    setPlaybackError(null);
    const video = videoRef.current;
    if (!video || ytEmbedUrl) return;

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
        video.play().catch(() => {});
      });

      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (data.fatal) {
          console.warn('HLS stream fatal error, falling back:', data);
          setPlaybackError('Stream buffering issue. Switch source or retry.');
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              hls?.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              hls?.recoverMediaError();
              break;
            default:
              hls?.destroy();
              break;
          }
        }
      });
    } else {
      video.src = streamUrl;
      if (initialPosition > 0) video.currentTime = initialPosition;
      video.play().catch(() => {});
    }

    return () => {
      if (hls) hls.destroy();
    };
  }, [streamUrl, ytEmbedUrl, initialPosition]);

  // Sync play state & history save intervals
  useEffect(() => {
    const video = videoRef.current;
    if (!video || ytEmbedUrl) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      setDuration(video.duration || 0);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      onUpdateHistory(video.duration || 100, video.duration || 100, true);
    };

    const handleError = () => {
      setPlaybackError('Unable to load video stream. Please check network connection.');
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('error', handleError);

    // Save history periodically every 5s
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
  }, [onUpdateHistory, ytEmbedUrl]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play();
      setIsPlaying(true);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;
    const seekTime = Number(e.target.value);
    video.currentTime = seekTime;
    setCurrentTime(seekTime);
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
    if (isMuted) {
      video.muted = false;
      setIsMuted(false);
    } else {
      video.muted = true;
      setIsMuted(true);
    }
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

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
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
      onMouseMove={handleMouseMove}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden font-sans"
    >
      {/* YouTube Embed Player */}
      {ytEmbedUrl ? (
        <div className="w-full h-full flex items-center justify-center">
          <iframe
            src={ytEmbedUrl}
            title={movie.title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      ) : (
        /* Native / HLS HTML5 Video Element */
        <video
          ref={videoRef}
          onClick={togglePlay}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          className="w-full h-full object-contain cursor-pointer"
        />
      )}

      {/* Top Header Overlay */}
      <div
        className={`absolute top-0 left-0 right-0 p-6 bg-gradient-to-b from-black/95 via-black/50 to-transparent flex items-center justify-between transition-opacity duration-300 z-20 ${
          showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>
              {streamUrl.includes('.m3u8')
                ? 'OTIVO HLS 1080p Stream'
                : activeSource.providerName || 'Authorized Legal Stream'}
            </span>
          </div>
          <h2 className="text-lg font-bold text-white truncate max-w-md">{movie.title}</h2>
        </div>

        <div className="flex items-center gap-3">
          {/* Multi-Source Switcher */}
          {allSources.length > 1 && (
            <div className="flex items-center gap-1.5 bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
              <Layers className="w-3.5 h-3.5 text-emerald-400" />
              <select
                value={selectedSourceIdx}
                onChange={e => setSelectedSourceIdx(Number(e.target.value))}
                className="bg-transparent text-white font-medium focus:outline-none cursor-pointer"
              >
                {allSources.map((s, idx) => (
                  <option key={s.id || idx} value={idx} className="bg-slate-900 text-white">
                    {s.providerName || `Source #${idx + 1}`}
                  </option>
                ))}
              </select>
            </div>
          )}

          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 transition shadow-lg"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Playback Error Warning */}
      {playbackError && (
        <div className="absolute top-20 z-30 px-4 py-2.5 rounded-2xl bg-amber-950/80 border border-amber-500/40 text-amber-300 text-xs flex items-center gap-2 shadow-2xl backdrop-blur-md">
          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
          <span>{playbackError}</span>
        </div>
      )}

      {/* Bottom Custom Controls Overlay (Only for HTML5/HLS video) */}
      {!ytEmbedUrl && (
        <div
          className={`absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/95 via-black/60 to-transparent transition-opacity duration-300 z-20 space-y-3 ${
            showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* Timeline Bar */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-300 min-w-[45px] text-right">
              {formatTime(currentTime)}
            </span>
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1.5 bg-slate-700 accent-emerald-500 rounded-lg cursor-pointer hover:h-2 transition-all"
            />
            <span className="text-xs font-mono text-slate-300 min-w-[45px]">
              {formatTime(duration)}
            </span>
          </div>

          {/* Action Controls Row */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={togglePlay}
                className="p-3 rounded-full bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition shadow-lg shadow-emerald-500/20"
              >
                {isPlaying ? <Pause className="w-5 h-5 fill-slate-950" /> : <Play className="w-5 h-5 fill-slate-950 ml-0.5" />}
              </button>

              {/* Volume Control */}
              <div className="flex items-center gap-2 group">
                <button onClick={toggleMute} className="text-slate-300 hover:text-white">
                  {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-20 h-1.5 bg-slate-700 accent-emerald-400 rounded cursor-pointer"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs font-medium text-slate-300">
              {/* Quality & Format Tag */}
              <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-slate-800 text-emerald-400 font-mono text-[11px] border border-slate-700">
                {streamUrl.includes('.m3u8') ? 'HLS · Adaptive 1080p' : 'MP4 · Direct Stream'}
              </span>

              {/* Speed Selector */}
              <div className="flex items-center gap-1 bg-slate-900/80 px-2.5 py-1.5 rounded-lg border border-slate-800">
                {[0.75, 1, 1.25, 1.5, 2].map(speed => (
                  <button
                    key={speed}
                    onClick={() => handleSpeedChange(speed)}
                    className={`px-1.5 py-0.5 rounded ${
                      playbackSpeed === speed ? 'bg-emerald-500 text-slate-950 font-bold' : 'hover:text-white'
                    }`}
                  >
                    {speed}x
                  </button>
                ))}
              </div>

              {/* Fullscreen Toggle */}
              <button
                onClick={toggleFullscreen}
                className="p-2.5 rounded-lg bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800"
              >
                {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
