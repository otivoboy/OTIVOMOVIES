import React from 'react';
import { Play } from 'lucide-react';
import { Movie } from '../types/movie';

interface TrailerClip {
  id: string;
  title: string;
  duration: string;
  thumbnail: string;
  videoUrl: string;
}

interface TrailersClipsRowProps {
  movie?: Movie;
  onPlayTrailer: (videoUrl: string, title: string) => void;
}

export const TrailersClipsRow: React.FC<TrailersClipsRowProps> = ({
  movie,
  onPlayTrailer
}) => {
  const defaultClips: TrailerClip[] = [
    {
      id: 'clip-1',
      title: 'Official Trailer',
      duration: '2:38',
      thumbnail: movie?.backdrop || 'https://image.tmdb.org/t/p/original/xOMo8BRK7PfcJv9JCnx7s520QIq.jpg',
      videoUrl: movie?.trailerUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4'
    },
    {
      id: 'clip-2',
      title: 'Teaser Trailer',
      duration: '1:45',
      thumbnail: 'https://image.tmdb.org/t/p/w780/s16H6tpK2utvwDtzZ8Qy4qm5Emw.jpg',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
    },
    {
      id: 'clip-3',
      title: 'Behind The Scenes',
      duration: '4:12',
      thumbnail: 'https://image.tmdb.org/t/p/w780/8pjW1YrA232qv1ESR22UBm13P8G.jpg',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
    },
    {
      id: 'clip-4',
      title: 'Exclusive First Look',
      duration: '3:05',
      thumbnail: 'https://image.tmdb.org/t/p/w780/9l1eZi2A3R22452554.jpg',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4'
    }
  ];

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-black tracking-tight text-white flex items-center gap-2">
          <span>Trailers & Clips</span>
          {movie && <span className="text-xs font-normal text-slate-400">({movie.title})</span>}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {defaultClips.map((clip) => (
          <button
            key={clip.id}
            onClick={() => onPlayTrailer(clip.videoUrl, `${movie ? movie.title + ' — ' : ''}${clip.title}`)}
            className="group text-left space-y-2 focus:outline-none"
          >
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-[#0B1118] border border-slate-800/80 group-hover:border-[#00F060]/50 transition-all duration-300 shadow-xl">
              <img
                src={clip.thumbnail}
                alt={clip.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                onError={(e) => {
                  // Fallback thumbnail if image fails
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#05090D] via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

              {/* Center Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-black/60 group-hover:bg-[#00F060] text-white group-hover:text-black flex items-center justify-center backdrop-blur-md border border-white/20 group-hover:border-[#00F060] transition-all duration-300 transform group-hover:scale-110 shadow-lg">
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </div>
              </div>

              {/* Duration Badge */}
              <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/80 text-white font-mono text-[10px] font-bold border border-white/10">
                {clip.duration}
              </div>
            </div>

            <div>
              <p className="text-xs font-bold text-white group-hover:text-[#00F060] transition-colors">
                {clip.title}
              </p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};
