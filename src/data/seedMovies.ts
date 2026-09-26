import { Movie } from '../types/movie';

export const INITIAL_MOVIES: Movie[] = [
  // 1. HERO FEATURED: AVATAR: THE WAY OF WATER (2022)
  {
    id: 'otivo-avatar-2',
    title: 'Avatar: The Way of Water',
    slug: 'avatar-the-way-of-water',
    type: 'movie',
    tagline: 'Return to Pandora.',
    overview: 'Jake Sully and Neytiri return to Pandora in this breathtaking sequel filled with action, adventure and stunning visuals as they must leave their home and explore the regions of Pandora when an ancient threat resurfaces.',
    releaseDate: '2022-12-16',
    year: 2022,
    runtime: 192, // 3h 12m
    rating: 7.8,
    voteCount: 420000,
    ageRating: 'PG-13',
    poster: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/s16H6tpK2utvwDtzZ8Qy4qm5Emw.jpg',
    genres: ['Sci-Fi', 'Adventure', 'Action'],
    languages: ['English'],
    countries: ['USA'],
    trailerUrl: '',
    status: 'RELEASED',
    isFree: false,
    isFeatured: true,
    isTrending: true,
    isPopular: true,
    isNewRelease: false,
    tmdbId: 76600,
    imdbId: 'tt1630029',
    cast: [
      { id: 'av-1', name: 'Sam Worthington', character: 'Jake Sully', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300', order: 1 },
      { id: 'av-2', name: 'Zoe Saldaña', character: 'Neytiri', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300', order: 2 },
      { id: 'av-3', name: 'Sigourney Weaver', character: 'Kiri', photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300', order: 3 },
      { id: 'av-4', name: 'Stephen Lang', character: 'Miles Quaritch', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300', order: 4 }
    ],
    crew: [
      { id: 'av-cr1', name: 'James Cameron', job: 'Director', department: 'Directing' }
    ],
    streamingSources: [
      {
        id: 'src-avatar-trailer',
        movieId: 'otivo-avatar-2',
        providerName: 'Official 4K Trailer',
        sourceType: 'AUTHORIZED_EMBED',
        streamUrl: '',
        type: 'TRAILER',
        quality: '1080p',
        isAuthorized: false,
        isVerified: true,
        isActive: true,
        licenseStatus: 'VALID',
        verificationStatus: 'VERIFIED',
        region: 'Global',
        language: 'English',
        isFree: false,
        verifiedAt: '2026-09-25T00:00:00Z'
      }
    ],
    whereToWatch: [
      { id: 'w-av-1', name: 'Disney+', logo: '', type: 'flatrate', url: 'https://www.disneyplus.com' },
      { id: 'w-av-2', name: 'Apple TV+', logo: '', type: 'rent', url: 'https://tv.apple.com' },
      { id: 'w-av-3', name: 'Prime Video', logo: '', type: 'buy', url: 'https://www.primevideo.com' }
    ],
    createdAt: '2022-12-16T00:00:00Z',
    updatedAt: '2026-09-25T00:00:00Z'
  },

  // 2. SPOTLIGHT TITLE: DUNE: PART TWO (2024)
  {
    id: 'otivo-dune-2',
    title: 'Dune: Part Two',
    slug: 'dune-part-two',
    type: 'movie',
    tagline: 'Long live the fighters.',
    overview: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the universe, he endeavors to prevent a terrible future only he can foresee.',
    releaseDate: '2024-03-01',
    year: 2024,
    runtime: 166, // 2h 46m
    rating: 8.8,
    voteCount: 412000,
    ageRating: 'PG-13',
    poster: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/xOMo8BRK7PfcJv9JCnx7s520QIq.jpg',
    genres: ['Sci-Fi', 'Adventure', 'Drama', 'Action'],
    languages: ['English'],
    countries: ['USA'],
    trailerUrl: '',
    status: 'FREE_AVAILABLE',
    isFree: true,
    isFeatured: true,
    isTrending: true,
    isPopular: true,
    isNewRelease: true,
    tmdbId: 693134,
    imdbId: 'tt15239678',
    cast: [
      { id: 'dune-c1', name: 'Timothée Chalamet', character: 'Paul Atreides', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300', order: 1 },
      { id: 'dune-c2', name: 'Zendaya', character: 'Chani', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300', order: 2 },
      { id: 'dune-c3', name: 'Rebecca Ferguson', character: 'Lady Jessica', photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300', order: 3 },
      { id: 'dune-c4', name: 'Javier Bardem', character: 'Stilgar', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300', order: 4 },
      { id: 'dune-c5', name: 'Austin Butler', character: 'Feyd-Rautha', photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300', order: 5 }
    ],
    crew: [
      { id: 'dune-cr1', name: 'Denis Villeneuve', job: 'Director', department: 'Directing' },
      { id: 'dune-cr2', name: 'Greig Fraser', job: 'Director of Photography', department: 'Camera' },
      { id: 'dune-cr3', name: 'Hans Zimmer', job: 'Original Music Composer', department: 'Sound' }
    ],
    streamingSources: [
      {
        id: 'src-dune-hls',
        movieId: 'otivo-dune-2',
        providerName: 'OTIVO CDN (1080p HLS)',
        provider: 'OTIVO CDN',
        sourceType: 'AUTHORIZED_FREE',
        streamUrl: '',
        type: 'HLS',
        quality: '1080p',
        isAuthorized: true,
        isVerified: true,
        isActive: true,
        licenseStatus: 'VALID',
        verificationStatus: 'VERIFIED',
        region: 'Global',
        language: 'English',
        isFree: true,
        verifiedAt: '2026-09-25T00:00:00Z'
      },
      {
        id: 'src-dune-mp4',
        movieId: 'otivo-dune-2',
        providerName: 'OTIVO Direct Stream HD',
        provider: 'OTIVO Direct',
        sourceType: 'AUTHORIZED_FREE',
        streamUrl: '',
        type: 'MP4',
        quality: '720p',
        isAuthorized: true,
        isVerified: true,
        isActive: true,
        licenseStatus: 'VALID',
        verificationStatus: 'VERIFIED',
        region: 'Global',
        language: 'English',
        isFree: true,
        verifiedAt: '2026-09-25T00:00:00Z'
      }
    ],
    whereToWatch: [
      { id: 'w-dune-0', name: 'OTIVO Free', logo: '', type: 'free', url: '#watch' },
      { id: 'w-dune-1', name: 'Netflix', logo: '', type: 'flatrate', url: 'https://www.netflix.com' },
      { id: 'w-dune-2', name: 'Prime Video', logo: '', type: 'flatrate', url: 'https://www.primevideo.com' },
      { id: 'w-dune-3', name: 'Disney+', logo: '', type: 'flatrate', url: 'https://www.disneyplus.com' },
      { id: 'w-dune-4', name: 'Apple TV+', logo: '', type: 'flatrate', url: 'https://tv.apple.com' }
    ],
    createdAt: '2024-03-01T00:00:00Z',
    updatedAt: '2026-09-25T00:00:00Z'
  },

  // 3. DEADPOOL & WOLVERINE (2024)
  {
    id: 'otivo-deadpool-wolverine',
    title: 'Deadpool & Wolverine',
    slug: 'deadpool-and-wolverine',
    type: 'movie',
    tagline: 'Come together.',
    overview: 'A listless Wade Wilson toils away in civilian life with his days as the morally flexible mercenary, Deadpool, behind him. But when his homeworld faces an existential threat, Wade must reluctantly suit-up again with an even more reluctant Wolverine.',
    releaseDate: '2024-07-26',
    year: 2024,
    runtime: 128,
    rating: 7.7,
    voteCount: 380000,
    ageRating: 'R',
    poster: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/yDHYTjA3R0ne8NDRIl4d0L8UMxU.jpg',
    genres: ['Action', 'Comedy', 'Sci-Fi'],
    languages: ['English'],
    countries: ['USA'],
    trailerUrl: '',
    status: 'RELEASED',
    isFree: false,
    isTrending: true,
    isPopular: true,
    tmdbId: 533535,
    cast: [
      { id: 'dw-c1', name: 'Ryan Reynolds', character: 'Wade Wilson / Deadpool', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300', order: 1 },
      { id: 'dw-c2', name: 'Hugh Jackman', character: 'Logan / Wolverine', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300', order: 2 }
    ],
    crew: [{ id: 'dw-cr1', name: 'Shawn Levy', job: 'Director', department: 'Directing' }],
    streamingSources: [],
    whereToWatch: [
      { id: 'w-dw-1', name: 'Disney+', logo: '', type: 'flatrate', url: 'https://www.disneyplus.com' },
      { id: 'w-dw-2', name: 'Prime Video', logo: '', type: 'rent', url: 'https://www.primevideo.com' }
    ],
    createdAt: '2024-07-26T00:00:00Z',
    updatedAt: '2026-09-25T00:00:00Z'
  },

  // 4. INSIDE OUT 2 (2024)
  {
    id: 'otivo-inside-out-2',
    title: 'Inside Out 2',
    slug: 'inside-out-2',
    type: 'movie',
    tagline: 'Make room for new emotions.',
    overview: 'Teenager Riley\'s mind headquarters is undergoing a sudden demolition to make room for something entirely unexpected: new Emotions! Joy, Sadness, Anger, Fear and Disgust aren\'t sure how to feel when Anxiety shows up.',
    releaseDate: '2024-06-14',
    year: 2024,
    runtime: 96,
    rating: 7.6,
    voteCount: 310000,
    ageRating: 'PG',
    poster: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/xg270vg9bkHN9VeJJ73KaANknHN.jpg',
    genres: ['Animation', 'Family', 'Comedy', 'Adventure'],
    languages: ['English'],
    countries: ['USA'],
    trailerUrl: '',
    status: 'RELEASED',
    isFree: false,
    isTrending: true,
    isPopular: true,
    tmdbId: 1022789,
    cast: [
      { id: 'io-c1', name: 'Amy Poehler', character: 'Joy (voice)', photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300', order: 1 },
      { id: 'io-c2', name: 'Maya Hawke', character: 'Anxiety (voice)', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300', order: 2 }
    ],
    crew: [{ id: 'io-cr1', name: 'Kelsey Mann', job: 'Director', department: 'Directing' }],
    streamingSources: [],
    whereToWatch: [
      { id: 'w-io-1', name: 'Disney+', logo: '', type: 'flatrate', url: 'https://www.disneyplus.com' }
    ],
    createdAt: '2024-06-14T00:00:00Z',
    updatedAt: '2026-09-25T00:00:00Z'
  },

  // 5. JOHN WICK: CHAPTER 4 (2023)
  {
    id: 'otivo-john-wick-4',
    title: 'John Wick: Chapter 4',
    slug: 'john-wick-chapter-4',
    type: 'movie',
    tagline: 'No way back, one way out.',
    overview: 'With the price on his head ever increasing, John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy with powerful alliances across the globe.',
    releaseDate: '2023-03-24',
    year: 2023,
    runtime: 169,
    rating: 7.8,
    voteCount: 290000,
    ageRating: 'R',
    poster: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/h8gHn0OzBoaefW0w193TRYvdTeZ.jpg',
    genres: ['Action', 'Thriller', 'Crime'],
    languages: ['English'],
    countries: ['USA'],
    trailerUrl: '',
    status: 'RELEASED',
    isFree: false,
    isTrending: true,
    isPopular: true,
    tmdbId: 603692,
    cast: [
      { id: 'jw-c1', name: 'Keanu Reeves', character: 'John Wick', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300', order: 1 },
      { id: 'jw-c2', name: 'Donnie Yen', character: 'Caine', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300', order: 2 }
    ],
    crew: [{ id: 'jw-cr1', name: 'Chad Stahelski', job: 'Director', department: 'Directing' }],
    streamingSources: [],
    whereToWatch: [
      { id: 'w-jw-1', name: 'Netflix', logo: '', type: 'flatrate', url: 'https://www.netflix.com' },
      { id: 'w-jw-2', name: 'Apple TV+', logo: '', type: 'rent', url: 'https://tv.apple.com' }
    ],
    createdAt: '2023-03-24T00:00:00Z',
    updatedAt: '2026-09-25T00:00:00Z'
  },

  // 6. THE BATMAN (2022)
  {
    id: 'otivo-the-batman',
    title: 'The Batman',
    slug: 'the-batman',
    type: 'movie',
    tagline: 'Unmask the truth.',
    overview: 'In his second year of fighting crime, Batman uncovers corruption in Gotham City that connects to his own family while facing a serial killer known as the Riddler.',
    releaseDate: '2022-03-04',
    year: 2022,
    runtime: 176,
    rating: 7.7,
    voteCount: 390000,
    ageRating: 'PG-13',
    poster: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/74xTEgt7R36Fpooo50r9T25onhq.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/5P8SmMzSNYikXpxil6BYz9G66Ya.jpg',
    genres: ['Crime', 'Mystery', 'Thriller', 'Action'],
    languages: ['English'],
    countries: ['USA'],
    trailerUrl: '',
    status: 'RELEASED',
    isFree: false,
    isTrending: true,
    isPopular: true,
    tmdbId: 414906,
    cast: [
      { id: 'bat-c1', name: 'Robert Pattinson', character: 'Bruce Wayne / The Batman', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300', order: 1 },
      { id: 'bat-c2', name: 'Zoë Kravitz', character: 'Selina Kyle / Catwoman', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300', order: 2 }
    ],
    crew: [{ id: 'bat-cr1', name: 'Matt Reeves', job: 'Director', department: 'Directing' }],
    streamingSources: [],
    whereToWatch: [
      { id: 'w-bat-1', name: 'Max', logo: '', type: 'flatrate', url: 'https://www.max.com' },
      { id: 'w-bat-2', name: 'Netflix', logo: '', type: 'flatrate', url: 'https://www.netflix.com' }
    ],
    createdAt: '2022-03-04T00:00:00Z',
    updatedAt: '2026-09-25T00:00:00Z'
  },

  // 7. INTERSTELLAR (2014)
  {
    id: 'otivo-interstellar',
    title: 'Interstellar',
    slug: 'interstellar',
    type: 'movie',
    tagline: 'Mankind was born on Earth. It was never meant to die here.',
    overview: 'The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.',
    releaseDate: '2014-11-07',
    year: 2014,
    runtime: 169,
    rating: 8.7,
    voteCount: 1950000,
    ageRating: 'PG-13',
    poster: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/xJHokMbljvjADYdit5fK5VQsXEG.jpg',
    genres: ['Adventure', 'Drama', 'Sci-Fi'],
    languages: ['English'],
    countries: ['USA', 'UK'],
    trailerUrl: '',
    status: 'RELEASED',
    isFree: false,
    isTrending: true,
    isPopular: true,
    tmdbId: 157336,
    cast: [
      { id: 'int-c1', name: 'Matthew McConaughey', character: 'Cooper', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300', order: 1 },
      { id: 'int-c2', name: 'Anne Hathaway', character: 'Brand', photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300', order: 2 }
    ],
    crew: [{ id: 'int-cr1', name: 'Christopher Nolan', job: 'Director', department: 'Directing' }],
    streamingSources: [],
    whereToWatch: [
      { id: 'w-int-1', name: 'Prime Video', logo: '', type: 'flatrate', url: 'https://www.primevideo.com' },
      { id: 'w-int-2', name: 'Apple TV+', logo: '', type: 'rent', url: 'https://tv.apple.com' }
    ],
    createdAt: '2014-11-07T00:00:00Z',
    updatedAt: '2026-09-25T00:00:00Z'
  },

  // 8. OPPENHEIMER (2023)
  {
    id: 'otivo-oppenheimer',
    title: 'Oppenheimer',
    slug: 'oppenheimer',
    type: 'movie',
    tagline: 'The world forever changes.',
    overview: 'The story of J. Robert Oppenheimer\'s role in the development of the atomic bomb during World War II.',
    releaseDate: '2023-07-21',
    year: 2023,
    runtime: 180,
    rating: 8.9,
    voteCount: 680000,
    ageRating: 'R',
    poster: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/nb3xI8XI3EsdoLqlBSbgjhGhuqq.jpg',
    genres: ['Drama', 'History', 'Biography'],
    languages: ['English'],
    countries: ['USA'],
    trailerUrl: '',
    status: 'RELEASED',
    isFree: false,
    isTrending: true,
    isPopular: true,
    tmdbId: 872585,
    cast: [
      { id: 'opp-c1', name: 'Cillian Murphy', character: 'J. Robert Oppenheimer', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300', order: 1 },
      { id: 'opp-c2', name: 'Emily Blunt', character: 'Kitty Oppenheimer', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300', order: 2 }
    ],
    crew: [{ id: 'opp-cr1', name: 'Christopher Nolan', job: 'Director', department: 'Directing' }],
    streamingSources: [],
    whereToWatch: [
      { id: 'w-opp-1', name: 'Prime Video', logo: '', type: 'flatrate', url: 'https://www.primevideo.com' },
      { id: 'w-opp-2', name: 'Apple TV+', logo: '', type: 'rent', url: 'https://tv.apple.com' }
    ],
    createdAt: '2023-07-21T00:00:00Z',
    updatedAt: '2026-09-25T00:00:00Z'
  },

  // 9. THE SUPER MARIO BROS. MOVIE (2023)
  {
    id: 'otivo-super-mario',
    title: 'The Super Mario Bros. Movie',
    slug: 'the-super-mario-bros-movie',
    type: 'movie',
    tagline: 'Let\'s-a go!',
    overview: 'While working underground to fix a water main, Brooklyn plumbers Mario and brother Luigi are transported down a mysterious pipe and wander into a magical new world.',
    releaseDate: '2023-04-05',
    year: 2023,
    runtime: 92,
    rating: 7.7,
    voteCount: 410000,
    ageRating: 'PG',
    poster: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/9n2tJBplPbgR2ca05hS5CKXwP2c.jpg',
    genres: ['Animation', 'Family', 'Adventure', 'Fantasy', 'Comedy'],
    languages: ['English'],
    countries: ['USA', 'Japan'],
    trailerUrl: '',
    status: 'RELEASED',
    isFree: false,
    isTrending: true,
    isPopular: true,
    tmdbId: 502356,
    cast: [
      { id: 'mario-c1', name: 'Chris Pratt', character: 'Mario (voice)', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300', order: 1 },
      { id: 'mario-c2', name: 'Anya Taylor-Joy', character: 'Princess Peach (voice)', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300', order: 2 }
    ],
    crew: [{ id: 'mario-cr1', name: 'Aaron Horvath & Michael Jelenic', job: 'Director', department: 'Directing' }],
    streamingSources: [],
    whereToWatch: [
      { id: 'w-mario-1', name: 'Netflix', logo: '', type: 'flatrate', url: 'https://www.netflix.com' }
    ],
    createdAt: '2023-04-05T00:00:00Z',
    updatedAt: '2026-09-25T00:00:00Z'
  },

  // 10. TV SHOW: THE LAST OF US (2023)
  {
    id: 'otivo-the-last-of-us',
    title: 'The Last of Us',
    slug: 'the-last-of-us',
    type: 'tv',
    tagline: 'When you\'re lost in the darkness, look for the light.',
    overview: 'Twenty years after modern civilization has been destroyed, Joel, a hardened survivor, is hired to smuggle Ellie, a 14-year-old girl, out of an oppressive quarantine zone.',
    releaseDate: '2023-01-15',
    year: 2023,
    runtime: 58,
    rating: 8.8,
    voteCount: 540000,
    ageRating: 'TV-MA',
    poster: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/uKvVjHNqB5VmOrdxqAt2V7JMrRI.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/uDgy6hyPd82kOHh6I95FLtLnj6p.jpg',
    genres: ['Drama', 'Sci-Fi', 'Action'],
    languages: ['English'],
    countries: ['USA'],
    trailerUrl: '',
    status: 'RELEASED',
    isFree: false,
    isTrending: true,
    isPopular: true,
    tmdbId: 100088,
    cast: [
      { id: 'tlou-c1', name: 'Pedro Pascal', character: 'Joel Miller', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300', order: 1 },
      { id: 'tlou-c2', name: 'Bella Ramsey', character: 'Ellie Williams', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300', order: 2 }
    ],
    crew: [{ id: 'tlou-cr1', name: 'Craig Mazin & Neil Druckmann', job: 'Creator', department: 'Writing' }],
    streamingSources: [],
    whereToWatch: [
      { id: 'w-tlou-1', name: 'Max', logo: '', type: 'flatrate', url: 'https://www.max.com' }
    ],
    createdAt: '2023-01-15T00:00:00Z',
    updatedAt: '2026-09-25T00:00:00Z'
  },

  // 11. TV SHOW: STRANGER THINGS (2016)
  {
    id: 'otivo-stranger-things',
    title: 'Stranger Things',
    slug: 'stranger-things',
    type: 'tv',
    tagline: 'Every ending has a beginning.',
    overview: 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.',
    releaseDate: '2016-07-15',
    year: 2016,
    runtime: 55,
    rating: 8.6,
    voteCount: 1300000,
    ageRating: 'TV-14',
    poster: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/49WJfeN0moxb9IPfGn8AIqMGskD.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/56v2KjBlU4XaOv9rVYEQypROD7P.jpg',
    genres: ['Sci-Fi', 'Drama', 'Mystery'],
    languages: ['English'],
    countries: ['USA'],
    trailerUrl: '',
    status: 'RELEASED',
    isFree: false,
    isTrending: true,
    isPopular: true,
    tmdbId: 66732,
    cast: [
      { id: 'st-c1', name: 'Millie Bobby Brown', character: 'Eleven', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300', order: 1 },
      { id: 'st-c2', name: 'Finn Wolfhard', character: 'Mike Wheeler', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300', order: 2 }
    ],
    crew: [{ id: 'st-cr1', name: 'The Duffer Brothers', job: 'Creator', department: 'Directing' }],
    streamingSources: [],
    whereToWatch: [
      { id: 'w-st-1', name: 'Netflix', logo: '', type: 'flatrate', url: 'https://www.netflix.com' }
    ],
    createdAt: '2016-07-15T00:00:00Z',
    updatedAt: '2026-09-25T00:00:00Z'
  },

  // 12. TV SHOW: BREAKING BAD (2008)
  {
    id: 'otivo-breaking-bad',
    title: 'Breaking Bad',
    slug: 'breaking-bad',
    type: 'tv',
    tagline: 'Change the equation.',
    overview: 'A chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine with a former student in order to secure his family\'s future.',
    releaseDate: '2008-01-20',
    year: 2008,
    runtime: 47,
    rating: 9.5,
    voteCount: 2200000,
    ageRating: 'TV-MA',
    poster: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/tsRy63Mu5cu8etL1X7ZLyf7UP1M.jpg',
    genres: ['Drama', 'Crime', 'Thriller'],
    languages: ['English'],
    countries: ['USA'],
    trailerUrl: '',
    status: 'RELEASED',
    isFree: false,
    isTrending: true,
    isPopular: true,
    tmdbId: 1396,
    cast: [
      { id: 'bb-c1', name: 'Bryan Cranston', character: 'Walter White', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300', order: 1 },
      { id: 'bb-c2', name: 'Aaron Paul', character: 'Jesse Pinkman', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300', order: 2 }
    ],
    crew: [{ id: 'bb-cr1', name: 'Vince Gilligan', job: 'Creator', department: 'Writing' }],
    streamingSources: [],
    whereToWatch: [
      { id: 'w-bb-1', name: 'Netflix', logo: '', type: 'flatrate', url: 'https://www.netflix.com' }
    ],
    createdAt: '2008-01-20T00:00:00Z',
    updatedAt: '2026-09-25T00:00:00Z'
  },

  // 13. TV SHOW: THE BOYS (2019)
  {
    id: 'otivo-the-boys',
    title: 'The Boys',
    slug: 'the-boys',
    type: 'tv',
    tagline: 'Never meet your heroes.',
    overview: 'A fun and irreverent take on what happens when superheroes—who are as popular as celebrities, as influential as politicians, and as revered as gods—abuse their superpowers rather than use them for good.',
    releaseDate: '2019-07-26',
    year: 2019,
    runtime: 60,
    rating: 8.7,
    voteCount: 790000,
    ageRating: 'TV-MA',
    poster: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/2zmTngn1tYC1AvfnrFLhxeD82hz.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/n6bUvigpRFqSwmPp1m2YADdbRBc.jpg',
    genres: ['Action', 'Sci-Fi', 'Comedy', 'Drama'],
    languages: ['English'],
    countries: ['USA'],
    trailerUrl: '',
    status: 'RELEASED',
    isFree: false,
    isTrending: true,
    isPopular: true,
    tmdbId: 76479,
    cast: [
      { id: 'boys-c1', name: 'Karl Urban', character: 'Billy Butcher', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300', order: 1 },
      { id: 'boys-c2', name: 'Antony Starr', character: 'Homelander', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300', order: 2 }
    ],
    crew: [{ id: 'boys-cr1', name: 'Eric Kripke', job: 'Creator', department: 'Writing' }],
    streamingSources: [],
    whereToWatch: [
      { id: 'w-boys-1', name: 'Prime Video', logo: '', type: 'flatrate', url: 'https://www.primevideo.com' }
    ],
    createdAt: '2019-07-26T00:00:00Z',
    updatedAt: '2026-09-25T00:00:00Z'
  },

  // 14. TV SHOW: FALLOUT (2024)
  {
    id: 'otivo-fallout',
    title: 'Fallout',
    slug: 'fallout',
    type: 'tv',
    tagline: 'The end was just the beginning.',
    overview: 'In a future, post-apocalyptic Los Angeles brought about by nuclear decimation, citizens must live in underground bunkers to protect themselves from radiation, mutants and bandits.',
    releaseDate: '2024-04-10',
    year: 2024,
    runtime: 60,
    rating: 8.5,
    voteCount: 220000,
    ageRating: 'TV-MA',
    poster: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/AnsSKR99F0ZrZVPZrCw5KC898P.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/4HodYYKEIsGOdinkGi2Ucz6X9i0.jpg',
    genres: ['Sci-Fi', 'Action', 'Adventure'],
    languages: ['English'],
    countries: ['USA'],
    trailerUrl: '',
    status: 'RELEASED',
    isFree: false,
    isTrending: true,
    isPopular: true,
    tmdbId: 106379,
    cast: [
      { id: 'fo-c1', name: 'Ella Purnell', character: 'Lucy MacLean', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300', order: 1 },
      { id: 'fo-c2', name: 'Walton Goggins', character: 'The Ghoul', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300', order: 2 }
    ],
    crew: [{ id: 'fo-cr1', name: 'Jonathan Nolan & Lisa Joy', job: 'Creator', department: 'Directing' }],
    streamingSources: [],
    whereToWatch: [
      { id: 'w-fo-1', name: 'Prime Video', logo: '', type: 'flatrate', url: 'https://www.primevideo.com' }
    ],
    createdAt: '2024-04-10T00:00:00Z',
    updatedAt: '2026-09-25T00:00:00Z'
  },

  // 15. TV SHOW: SEVERANCE (2022)
  {
    id: 'otivo-severance',
    title: 'Severance',
    slug: 'severance',
    type: 'tv',
    tagline: 'Please do not adjust your screen.',
    overview: 'Mark leads a team of office workers whose memories have been surgically divided between their work and personal lives. When a mysterious colleague appears outside of work, it begins a journey to discover the truth about their jobs.',
    releaseDate: '2022-02-18',
    year: 2022,
    runtime: 55,
    rating: 8.7,
    voteCount: 210000,
    ageRating: 'TV-MA',
    poster: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/1WpWBwM5bCg0g9q9Kx7Qz5U1W1E.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/uDgy6hyPd82kOHh6I95FLtLnj6p.jpg',
    genres: ['Sci-Fi', 'Mystery', 'Drama', 'Thriller'],
    languages: ['English'],
    countries: ['USA'],
    trailerUrl: '',
    status: 'RELEASED',
    isFree: false,
    isTrending: true,
    isPopular: true,
    tmdbId: 93405,
    cast: [
      { id: 'sev-c1', name: 'Adam Scott', character: 'Mark Scout', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300', order: 1 },
      { id: 'sev-c2', name: 'Patricia Arquette', character: 'Harmony Cobel', photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300', order: 2 }
    ],
    crew: [{ id: 'sev-cr1', name: 'Ben Stiller', job: 'Director & Executive Producer', department: 'Directing' }],
    streamingSources: [],
    whereToWatch: [
      { id: 'w-sev-1', name: 'Apple TV+', logo: '', type: 'flatrate', url: 'https://tv.apple.com' }
    ],
    createdAt: '2022-02-18T00:00:00Z',
    updatedAt: '2026-09-25T00:00:00Z'
  },

  // 16. AUTHORIZED FULL STREAM: TEARS OF STEEL (2024 Remaster)
  {
    id: 'otivo-1',
    title: 'Tears of Steel',
    slug: 'tears-of-steel',
    type: 'movie',
    tagline: 'An apocalyptic sci-fi adventure in a ruined future Amsterdam.',
    overview: 'In a dystopian future, a group of soldiers and scientists gather at the Oude Kerk in Amsterdam to stage a desperate attempt to rescue the world from destructive mechanical robotics.',
    releaseDate: '2024-05-12',
    year: 2024,
    runtime: 82,
    rating: 8.8,
    voteCount: 18450,
    ageRating: 'PG-13',
    poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80',
    backdrop: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1600&auto=format&fit=crop&q=80',
    genres: ['Sci-Fi', 'Action', 'Thriller'],
    languages: ['English'],
    countries: ['Netherlands', 'USA'],
    trailerUrl: '',
    status: 'FREE_AVAILABLE',
    isFree: true,
    isFeatured: true,
    isTrending: true,
    isPopular: true,
    isNewRelease: true,
    tmdbId: 115210,
    imdbId: 'tt2285752',
    cast: [
      { id: 'c1', name: 'Derek de Lint', character: 'Old Thom', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300', order: 1 },
      { id: 'c2', name: 'Sergio Hasselbaink', character: 'Barley', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300', order: 2 }
    ],
    crew: [
      { id: 'cr1', name: 'Ian Hubert', job: 'Director', department: 'Directing' },
      { id: 'cr2', name: 'Ton Roosendaal', job: 'Producer', department: 'Production' }
    ],
    streamingSources: [
      {
        id: 'src-1',
        movieId: 'otivo-1',
        providerName: 'OTIVO Originals HD',
        provider: 'OTIVO Originals',
        sourceType: 'AUTHORIZED_FREE',
        streamUrl: '',
        type: 'MP4',
        quality: '1080p',
        isAuthorized: true,
        isVerified: true,
        isActive: true,
        licenseStatus: 'VALID',
        verificationStatus: 'VERIFIED',
        region: 'Global',
        language: 'English',
        isFree: true,
        verifiedAt: '2026-09-25T00:00:00Z'
      }
    ],
    whereToWatch: [
      { id: 'w1', name: 'OTIVO Free', logo: '', type: 'free', url: '#watch' }
    ],
    createdAt: '2024-05-12T00:00:00Z',
    updatedAt: '2026-09-25T00:00:00Z'
  },

  // 17. AUTHORIZED FULL STREAM: SINTEL (4K Open Movie)
  {
    id: 'otivo-2',
    title: 'Sintel',
    slug: 'sintel',
    type: 'movie',
    tagline: 'The search for a dragon becomes an unforgettable journey.',
    overview: 'A lonely young woman named Sintel helps and nurtures a wounded baby dragon, forming an affectionate bond. When an adult dragon swoops down and kidnaps her companion, Sintel embarks on an arduous and dangerous quest across barren wastelands to find him.',
    releaseDate: '2010-09-27',
    year: 2010,
    runtime: 52,
    rating: 8.7,
    voteCount: 24500,
    ageRating: 'PG',
    poster: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80',
    backdrop: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&auto=format&fit=crop&q=80',
    genres: ['Fantasy', 'Action', 'Animation'],
    languages: ['English'],
    countries: ['Netherlands'],
    trailerUrl: '',
    status: 'FREE_AVAILABLE',
    isFree: true,
    isFeatured: true,
    isTrending: true,
    isPopular: true,
    tmdbId: 45745,
    cast: [
      { id: 'c5', name: 'Halina Reijn', character: 'Sintel (voice)', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300', order: 1 }
    ],
    crew: [{ id: 'cr3', name: 'Colin Levy', job: 'Director', department: 'Directing' }],
    streamingSources: [
      {
        id: 'src-2',
        movieId: 'otivo-2',
        providerName: 'OTIVO Free 4K',
        provider: 'OTIVO Free',
        sourceType: 'AUTHORIZED_FREE',
        streamUrl: '',
        type: 'MP4',
        quality: '1080p',
        isAuthorized: true,
        isVerified: true,
        isActive: true,
        licenseStatus: 'VALID',
        verificationStatus: 'VERIFIED',
        region: 'Global',
        language: 'English',
        isFree: true,
        verifiedAt: '2026-09-25T00:00:00Z'
      }
    ],
    whereToWatch: [
      { id: 'w4', name: 'OTIVO Free', logo: '', type: 'free', url: '#watch' }
    ],
    createdAt: '2010-09-27T00:00:00Z',
    updatedAt: '2026-09-25T00:00:00Z'
  },

  // 18. AUTHORIZED FULL STREAM: BIG BUCK BUNNY (1080p HLS)
  {
    id: 'otivo-3',
    title: 'Big Buck Bunny',
    slug: 'big-buck-bunny',
    type: 'movie',
    tagline: 'A giant rabbit with a heart bigger than himself.',
    overview: 'A large and lovable rabbit deals with bullying forest creatures in this groundbreaking open-source animation masterpiece.',
    releaseDate: '2008-04-10',
    year: 2008,
    runtime: 30,
    rating: 8.2,
    voteCount: 31000,
    ageRating: 'G',
    poster: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=600&auto=format&fit=crop&q=80',
    backdrop: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600',
    genres: ['Animation', 'Comedy', 'Family'],
    languages: ['English'],
    countries: ['Netherlands'],
    trailerUrl: '',
    status: 'FREE_AVAILABLE',
    isFree: true,
    isTrending: false,
    isPopular: true,
    tmdbId: 10378,
    cast: [{ id: 'c8', name: 'Sacha Goedegebure', character: 'Bunny & Forest Animals', photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300', order: 1 }],
    crew: [{ id: 'cr4', name: 'Sacha Goedegebure', job: 'Director', department: 'Directing' }],
    streamingSources: [
      {
        id: 'src-3',
        movieId: 'otivo-3',
        providerName: 'OTIVO Family (Adaptive HLS)',
        provider: 'OTIVO Family',
        sourceType: 'AUTHORIZED_FREE',
        streamUrl: '',
        type: 'HLS',
        quality: '1080p',
        isAuthorized: true,
        isVerified: true,
        isActive: true,
        licenseStatus: 'VALID',
        verificationStatus: 'VERIFIED',
        region: 'Global',
        language: 'English',
        isFree: true,
        verifiedAt: '2026-09-25T00:00:00Z'
      }
    ],
    whereToWatch: [{ id: 'w6', name: 'OTIVO Free', logo: '', type: 'free', url: '#watch' }],
    createdAt: '2008-04-10T00:00:00Z',
    updatedAt: '2026-09-25T00:00:00Z'
  },

  // 19. PUBLIC DOMAIN CLASSIC: NIGHT OF THE LIVING DEAD (1968)
  {
    id: 'otivo-4',
    title: 'Night of the Living Dead',
    slug: 'night-of-the-living-dead',
    type: 'movie',
    tagline: 'They won\'t stay dead!',
    overview: 'A ragtag group of strangers barricades themselves inside a rural Pennsylvania farmhouse in a desperate effort to survive the night against an unexplainable horde of reanimated corpses.',
    releaseDate: '1968-10-01',
    year: 1968,
    runtime: 96,
    rating: 8.1,
    voteCount: 142000,
    ageRating: 'NR',
    poster: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=600&auto=format&fit=crop&q=80',
    backdrop: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=1600&auto=format&fit=crop&q=80',
    genres: ['Horror', 'Thriller', 'Classic'],
    languages: ['English'],
    countries: ['USA'],
    trailerUrl: 'https://archive.org/download/night_of_the_living_dead/night_of_the_living_dead_512kb.mp4',
    status: 'FREE_AVAILABLE',
    isFree: true,
    isTrending: false,
    isPopular: true,
    tmdbId: 10331,
    cast: [
      { id: 'c10', name: 'Duane Jones', character: 'Ben', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300', order: 1 }
    ],
    crew: [{ id: 'cr5', name: 'George A. Romero', job: 'Director', department: 'Directing' }],
    streamingSources: [
      {
        id: 'src-4',
        movieId: 'otivo-4',
        providerName: 'Public Domain Archive',
        provider: 'Archive.org',
        sourceType: 'PUBLIC_DOMAIN',
        streamUrl: 'https://archive.org/download/night_of_the_living_dead/night_of_the_living_dead_512kb.mp4',
        type: 'MP4',
        quality: '720p',
        isAuthorized: true,
        isVerified: true,
        isActive: true,
        licenseStatus: 'VALID',
        verificationStatus: 'VERIFIED',
        region: 'Global',
        language: 'English',
        isFree: true,
        verifiedAt: '2026-09-25T00:00:00Z'
      }
    ],
    whereToWatch: [{ id: 'w7', name: 'OTIVO Free', logo: '', type: 'free', url: '#watch' }],
    createdAt: '1968-10-01T00:00:00Z',
    updatedAt: '2026-09-25T00:00:00Z'
  },

  // 20. PUBLIC DOMAIN CLASSIC: CHARADE (1963)
  {
    id: 'otivo-5',
    title: 'Charade',
    slug: 'charade',
    type: 'movie',
    tagline: 'You can expect the unexpected when Audrey Hepburn and Cary Grant play Charade!',
    overview: 'Romance and suspense ensue in Paris as a young widow is pursued by several men who want a fortune her murdered husband stole, with only a mysterious stranger to help her.',
    releaseDate: '1963-12-05',
    year: 1963,
    runtime: 113,
    rating: 8.0,
    voteCount: 118000,
    ageRating: 'Approved',
    poster: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&auto=format&fit=crop&q=80',
    backdrop: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1600&auto=format&fit=crop&q=80',
    genres: ['Mystery', 'Romance', 'Comedy', 'Thriller'],
    languages: ['English', 'French'],
    countries: ['USA'],
    trailerUrl: 'https://archive.org/download/charade1963_201912/charade1963.mp4',
    status: 'FREE_AVAILABLE',
    isFree: true,
    isTrending: false,
    isPopular: true,
    tmdbId: 4808,
    cast: [
      { id: 'c12', name: 'Cary Grant', character: 'Peter Joshua', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300', order: 1 },
      { id: 'c13', name: 'Audrey Hepburn', character: 'Regina Lampert', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300', order: 2 }
    ],
    crew: [{ id: 'cr6', name: 'Stanley Donen', job: 'Director', department: 'Directing' }],
    streamingSources: [
      {
        id: 'src-5',
        movieId: 'otivo-5',
        providerName: 'Public Domain Cinema Archive',
        provider: 'Archive.org',
        sourceType: 'PUBLIC_DOMAIN',
        streamUrl: 'https://archive.org/download/charade1963_201912/charade1963.mp4',
        type: 'MP4',
        quality: '720p',
        isAuthorized: true,
        isVerified: true,
        isActive: true,
        licenseStatus: 'VALID',
        verificationStatus: 'VERIFIED',
        region: 'Global',
        language: 'English',
        isFree: true,
        verifiedAt: '2026-09-25T00:00:00Z'
      }
    ],
    whereToWatch: [{ id: 'w9', name: 'OTIVO Free', logo: '', type: 'free', url: '#watch' }],
    createdAt: '1963-12-05T00:00:00Z',
    updatedAt: '2026-09-25T00:00:00Z'
  }
];

export const INITIAL_GENRES = [
  'Action',
  'Sci-Fi',
  'Adventure',
  'Drama',
  'Comedy',
  'Thriller',
  'Animation',
  'Crime',
  'Mystery',
  'Fantasy',
  'Horror',
  'Family',
  'History',
  'Biography',
  'Classic'
];
