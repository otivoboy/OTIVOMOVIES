import { Movie } from '../types/movie';

export const INITIAL_MOVIES: Movie[] = [
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
    backdrop: '/src/assets/images/otivo_hero_scifi_1790344896895.jpg',
    genres: ['Sci-Fi', 'Action', 'Thriller'],
    languages: ['English'],
    countries: ['Netherlands', 'USA'],
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    status: 'FREE_AVAILABLE',
    isFree: true,
    isFeatured: true,
    isTrending: true,
    isPopular: true,
    isNewRelease: true,
    tmdbId: 115210,
    imdbId: 'tt2285752',
    cast: [
      { id: 'c1', name: 'Derek de Lint', character: 'Old Thom', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80', order: 1 },
      { id: 'c2', name: 'Sergio Hasselbaink', character: 'Barley', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80', order: 2 },
      { id: 'c3', name: 'Rogelio de la Rosa', character: 'Captain Cael', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80', order: 3 },
      { id: 'c4', name: 'Denise Rebergen', character: 'Celia', photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80', order: 4 }
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
        providerLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80',
        sourceType: 'AUTHORIZED_FREE',
        streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
        licenseStatus: 'VALID',
        verificationStatus: 'VERIFIED',
        region: 'Global',
        language: 'English',
        isFree: true,
        requiresAccount: false,
        allowsEmbedding: true,
        verifiedAt: '2026-09-25T00:00:00Z'
      }
    ],
    whereToWatch: [
      { id: 'w1', name: 'OTIVO Free', logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100', type: 'free', url: '#watch' },
      { id: 'w2', name: 'Tubi TV', logo: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=100', type: 'ads', url: 'https://tubitv.com' },
      { id: 'w3', name: 'YouTube Movies', logo: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=100', type: 'free', url: 'https://youtube.com' }
    ],
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-09-25T00:00:00Z'
  },
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
    backdrop: '/src/assets/images/otivo_hero_action_1790344912259.jpg',
    genres: ['Fantasy', 'Action', 'Animation'],
    languages: ['English', 'Dutch'],
    countries: ['Netherlands'],
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    status: 'FREE_AVAILABLE',
    isFree: true,
    isFeatured: true,
    isTrending: true,
    isPopular: true,
    isNewRelease: false,
    tmdbId: 45745,
    imdbId: 'tt1727587',
    cast: [
      { id: 'c5', name: 'Halina Reijn', character: 'Sintel (voice)', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80', order: 1 },
      { id: 'c6', name: 'Thom Hoffman', character: 'Shaman (voice)', photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80', order: 2 }
    ],
    crew: [
      { id: 'cr3', name: 'Colin Levy', job: 'Director', department: 'Directing' },
      { id: 'cr3b', name: 'Ton Roosendaal', job: 'Producer', department: 'Production' }
    ],
    streamingSources: [
      {
        id: 'src-2',
        movieId: 'otivo-2',
        providerName: 'OTIVO Cinema Stream',
        providerLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100',
        sourceType: 'AUTHORIZED_FREE',
        streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
        licenseStatus: 'VALID',
        verificationStatus: 'VERIFIED',
        region: 'Global',
        language: 'English',
        isFree: true,
        requiresAccount: false,
        allowsEmbedding: true,
        verifiedAt: '2026-09-25T00:00:00Z'
      }
    ],
    whereToWatch: [
      { id: 'w4', name: 'OTIVO Free', logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100', type: 'free', url: '#watch' },
      { id: 'w5', name: 'Blender Open Movies', logo: '', type: 'free', url: 'https://durian.blender.org' }
    ],
    createdAt: '2010-09-27T00:00:00Z',
    updatedAt: '2026-09-25T00:00:00Z'
  },
  {
    id: 'otivo-3',
    title: 'Big Buck Bunny',
    slug: 'big-buck-bunny',
    type: 'movie',
    tagline: 'A large and lovable rabbit teaches bullies a hilarious lesson.',
    overview: 'Follow a day in the life of Big Buck Bunny when he meets three bullying rodents: Frank the flying squirrel, Rinky the red squirrel, and Gimera the chinchilla. When they heartlessly harass forest butterflies, Bunny decides to fight back with an ingenious forest ambush.',
    releaseDate: '2008-04-10',
    year: 2008,
    runtime: 30,
    rating: 8.5,
    voteCount: 31000,
    ageRating: 'G',
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
    backdrop: '/src/assets/images/otivo_hero_fantasy_1790344922771.jpg',
    genres: ['Animation', 'Comedy', 'Family'],
    languages: ['English'],
    countries: ['Netherlands'],
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    status: 'FREE_AVAILABLE',
    isFree: true,
    isFeatured: true,
    isTrending: true,
    isPopular: true,
    isNewRelease: false,
    tmdbId: 10378,
    imdbId: 'tt1254207',
    cast: [
      { id: 'c8', name: 'Sacha Goedegebure', character: 'Bunny & Forest Animals', photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80', order: 1 }
    ],
    crew: [
      { id: 'cr4', name: 'Sacha Goedegebure', job: 'Director', department: 'Directing' },
      { id: 'cr4b', name: 'Ton Roosendaal', job: 'Producer', department: 'Production' }
    ],
    streamingSources: [
      {
        id: 'src-3',
        movieId: 'otivo-3',
        providerName: 'OTIVO Family HD',
        sourceType: 'AUTHORIZED_FREE',
        streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        licenseStatus: 'VALID',
        verificationStatus: 'VERIFIED',
        region: 'Global',
        language: 'English',
        isFree: true,
        requiresAccount: false,
        allowsEmbedding: true,
        verifiedAt: '2026-09-25T00:00:00Z'
      }
    ],
    whereToWatch: [
      { id: 'w6', name: 'OTIVO Free', logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100', type: 'free', url: '#watch' }
    ],
    createdAt: '2008-04-10T00:00:00Z',
    updatedAt: '2026-09-25T00:00:00Z'
  },
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
    isFeatured: false,
    isTrending: true,
    isPopular: true,
    isNewRelease: false,
    tmdbId: 10331,
    imdbId: 'tt0063350',
    cast: [
      { id: 'c10', name: 'Duane Jones', character: 'Ben', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300', order: 1 },
      { id: 'c11', name: 'Judith O\'Dea', character: 'Barbra', photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300', order: 2 }
    ],
    crew: [
      { id: 'cr5', name: 'George A. Romero', job: 'Director', department: 'Directing' }
    ],
    streamingSources: [
      {
        id: 'src-4',
        movieId: 'otivo-4',
        providerName: 'Public Domain Archive (Global)',
        sourceType: 'PUBLIC_DOMAIN',
        streamUrl: 'https://archive.org/download/night_of_the_living_dead/night_of_the_living_dead_512kb.mp4',
        licenseStatus: 'VALID',
        verificationStatus: 'VERIFIED',
        region: 'Global',
        language: 'English',
        isFree: true,
        requiresAccount: false,
        allowsEmbedding: true,
        verifiedAt: '2026-09-25T00:00:00Z'
      }
    ],
    whereToWatch: [
      { id: 'w7', name: 'OTIVO Free', logo: '', type: 'free', url: '#watch' },
      { id: 'w8', name: 'Internet Archive', logo: '', type: 'free', url: 'https://archive.org' }
    ],
    createdAt: '1968-10-01T00:00:00Z',
    updatedAt: '2026-09-25T00:00:00Z'
  },
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
    rating: 7.9,
    voteCount: 88500,
    ageRating: 'PG',
    poster: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=600&auto=format&fit=crop&q=80',
    backdrop: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1600&auto=format&fit=crop&q=80',
    genres: ['Romance', 'Mystery', 'Comedy', 'Thriller'],
    languages: ['English', 'French'],
    countries: ['USA'],
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    status: 'FREE_AVAILABLE',
    isFree: true,
    isFeatured: false,
    isTrending: false,
    isPopular: true,
    isNewRelease: false,
    tmdbId: 4808,
    imdbId: 'tt0056923',
    cast: [
      { id: 'c12', name: 'Cary Grant', character: 'Peter Joshua', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300', order: 1 },
      { id: 'c13', name: 'Audrey Hepburn', character: 'Regina Lampert', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300', order: 2 }
    ],
    crew: [
      { id: 'cr6', name: 'Stanley Donen', job: 'Director', department: 'Directing' }
    ],
    streamingSources: [
      {
        id: 'src-5',
        movieId: 'otivo-5',
        providerName: 'Public Domain Classics',
        sourceType: 'PUBLIC_DOMAIN',
        streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        licenseStatus: 'VALID',
        verificationStatus: 'VERIFIED',
        region: 'Global',
        language: 'English',
        isFree: true,
        requiresAccount: false,
        allowsEmbedding: true,
        verifiedAt: '2026-09-25T00:00:00Z'
      }
    ],
    whereToWatch: [
      { id: 'w9', name: 'OTIVO Free', logo: '', type: 'free', url: '#watch' }
    ],
    createdAt: '1963-12-05T00:00:00Z',
    updatedAt: '2026-09-25T00:00:00Z'
  },
  {
    id: 'otivo-6',
    title: 'Dune: Part Two',
    slug: 'dune-part-two',
    type: 'movie',
    tagline: 'Long live the fighters.',
    overview: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, he endeavors to prevent a terrible future only he can foresee.',
    releaseDate: '2024-03-01',
    year: 2024,
    runtime: 166,
    rating: 8.9,
    voteCount: 482000,
    ageRating: 'PG-13',
    poster: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80',
    backdrop: '/src/assets/images/otivo_hero_scifi_1790344896895.jpg',
    genres: ['Sci-Fi', 'Adventure', 'Drama'],
    languages: ['English'],
    countries: ['USA', 'Canada'],
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    status: 'RELEASED',
    isFree: false,
    isFeatured: true,
    isTrending: true,
    isPopular: true,
    isUpcoming: false,
    tmdbId: 693134,
    imdbId: 'tt15239678',
    cast: [
      { id: 'c14', name: 'Timothée Chalamet', character: 'Paul Atreides', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300', order: 1 },
      { id: 'c15', name: 'Zendaya', character: 'Chani', photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300', order: 2 },
      { id: 'c16', name: 'Florence Pugh', character: 'Princess Irulan', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300', order: 3 }
    ],
    crew: [
      { id: 'cr7', name: 'Denis Villeneuve', job: 'Director', department: 'Directing' }
    ],
    streamingSources: [],
    whereToWatch: [
      { id: 'w10', name: 'Max', logo: '', type: 'flatrate', url: 'https://max.com' },
      { id: 'w11', name: 'Apple TV', logo: '', type: 'rent', url: 'https://tv.apple.com' }
    ],
    createdAt: '2024-03-01T00:00:00Z',
    updatedAt: '2026-09-25T00:00:00Z'
  },
  {
    id: 'otivo-7',
    title: 'Project Hail Mary',
    slug: 'project-hail-mary',
    type: 'movie',
    tagline: 'An isolated astronaut must solve a solar extinction crisis alone in deep space.',
    overview: 'Ryland Grace wakes up on an interstellar ship with no memory of his identity or mission, only to discover he is humanity\'s sole survivor tasked with preventing the sun from dying.',
    releaseDate: '2026-03-20',
    year: 2026,
    runtime: 142,
    rating: 8.9,
    voteCount: 15400,
    ageRating: 'PG-13',
    poster: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80',
    backdrop: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&auto=format&fit=crop&q=80',
    genres: ['Sci-Fi', 'Drama', 'Adventure'],
    languages: ['English'],
    countries: ['USA'],
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnTheLakeside.mp4',
    status: 'COMING_THIS_MONTH',
    isFree: false,
    isFeatured: true,
    isTrending: true,
    isPopular: true,
    isUpcoming: true,
    tmdbId: 872585,
    imdbId: 'tt12042730',
    cast: [
      { id: 'c17', name: 'Ryan Gosling', character: 'Ryland Grace', photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300', order: 1 },
      { id: 'c18', name: 'Sandra Hüller', character: 'Eva Stratt', photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300', order: 2 }
    ],
    crew: [
      { id: 'cr8', name: 'Phil Lord & Christopher Miller', job: 'Director', department: 'Directing' }
    ],
    streamingSources: [],
    whereToWatch: [
      { id: 'w12', name: 'Prime Video (Exclusive)', logo: '', type: 'flatrate', url: 'https://primevideo.com' }
    ],
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-09-25T00:00:00Z'
  },
  {
    id: 'otivo-8',
    title: 'Stranger Things',
    slug: 'stranger-things',
    type: 'tv',
    tagline: 'Every ending has a beginning.',
    overview: 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.',
    releaseDate: '2016-07-15',
    year: 2016,
    runtime: 55,
    rating: 8.6,
    voteCount: 1350000,
    ageRating: 'TV-14',
    poster: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=600&auto=format&fit=crop&q=80',
    backdrop: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=1600&auto=format&fit=crop&q=80',
    genres: ['Sci-Fi', 'Drama', 'Mystery'],
    languages: ['English'],
    countries: ['USA'],
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    status: 'RELEASED',
    isFree: false,
    isFeatured: true,
    isTrending: true,
    isPopular: true,
    isNewRelease: false,
    tmdbId: 66732,
    imdbId: 'tt4574334',
    cast: [
      { id: 'c19', name: 'Millie Bobby Brown', character: 'Eleven', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300', order: 1 },
      { id: 'c20', name: 'Winona Ryder', character: 'Joyce Byers', photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300', order: 2 },
      { id: 'c20b', name: 'David Harbour', character: 'Jim Hopper', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300', order: 3 }
    ],
    crew: [
      { id: 'cr9', name: 'The Duffer Brothers', job: 'Creator', department: 'Writing' }
    ],
    seasons: [
      {
        id: 's1',
        showId: 'otivo-8',
        seasonNumber: 1,
        title: 'Season 1',
        overview: 'A strange little girl with telekinetic powers emerges from a secret government lab as the search for Will Byers unfolds in Hawkins.',
        poster: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=600',
        episodes: [
          {
            id: 's1e1',
            showId: 'otivo-8',
            seasonNumber: 1,
            episodeNumber: 1,
            title: '1. Chapter One: The Vanishing of Will Byers',
            overview: 'On his way home from a friend\'s house, young Will sees something terrifying. Nearby, a sinister secret lurks in the depths of a government laboratory.',
            airDate: '2016-07-15',
            runtime: 48,
            stillImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600',
            streamingSources: []
          },
          {
            id: 's1e2',
            showId: 'otivo-8',
            seasonNumber: 1,
            episodeNumber: 2,
            title: '2. Chapter Two: The Weirdo on Maple Street',
            overview: 'Lucas, Mike and Dustin try to talk to the girl they found in the woods. Hopper questions an anxious Joyce about a suspicious phone call.',
            airDate: '2016-07-15',
            runtime: 55,
            stillImage: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=600',
            streamingSources: []
          }
        ]
      }
    ],
    streamingSources: [],
    whereToWatch: [
      { id: 'w13', name: 'Netflix', logo: '', type: 'flatrate', url: 'https://netflix.com' }
    ],
    createdAt: '2016-07-15T00:00:00Z',
    updatedAt: '2026-09-25T00:00:00Z'
  },
  {
    id: 'otivo-9',
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
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
    backdrop: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&auto=format&fit=crop&q=80',
    genres: ['Sci-Fi', 'Action', 'Adventure'],
    languages: ['English'],
    countries: ['USA'],
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    status: 'RELEASED',
    isFree: false,
    isFeatured: false,
    isTrending: true,
    isPopular: true,
    isNewRelease: true,
    tmdbId: 106379,
    imdbId: 'tt12637874',
    cast: [
      { id: 'c21', name: 'Ella Purnell', character: 'Lucy MacLean', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300', order: 1 },
      { id: 'c21b', name: 'Walton Goggins', character: 'The Ghoul / Cooper Howard', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300', order: 2 }
    ],
    crew: [
      { id: 'cr10', name: 'Jonathan Nolan & Lisa Joy', job: 'Creator', department: 'Directing' }
    ],
    seasons: [
      {
        id: 's2',
        showId: 'otivo-9',
        seasonNumber: 1,
        title: 'Season 1',
        overview: 'Lucy ventures out of Vault 33 into the dangerous wasteland of post-apocalyptic Los Angeles.',
        episodes: [
          {
            id: 's2e1',
            showId: 'otivo-9',
            seasonNumber: 1,
            episodeNumber: 1,
            title: '1. The End',
            overview: 'Lucy enters the irradiated surface world when her peaceful underground vault is raided.',
            airDate: '2024-04-10',
            runtime: 65,
            stillImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600',
            streamingSources: []
          }
        ]
      }
    ],
    streamingSources: [],
    whereToWatch: [
      { id: 'w14', name: 'Prime Video', logo: '', type: 'flatrate', url: 'https://primevideo.com' }
    ],
    createdAt: '2024-04-10T00:00:00Z',
    updatedAt: '2026-09-25T00:00:00Z'
  },
  {
    id: 'otivo-10',
    title: 'The Last of Us',
    slug: 'the-last-of-us',
    type: 'tv',
    tagline: 'When you\'re lost in the darkness, look for the light.',
    overview: 'Twenty years after modern civilization has been destroyed, Joel, a hardened survivor, is hired to smuggle Ellie, a 14-year-old girl, out of an oppressive quarantine zone. What starts as a small job soon becomes a brutal, heartbreaking journey.',
    releaseDate: '2023-01-15',
    year: 2023,
    runtime: 58,
    rating: 8.8,
    voteCount: 540000,
    ageRating: 'TV-MA',
    poster: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&auto=format&fit=crop&q=80',
    backdrop: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1600&auto=format&fit=crop&q=80',
    genres: ['Drama', 'Sci-Fi', 'Action'],
    languages: ['English'],
    countries: ['USA'],
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    status: 'RELEASED',
    isFree: false,
    isFeatured: false,
    isTrending: true,
    isPopular: true,
    isNewRelease: false,
    tmdbId: 100088,
    imdbId: 'tt3581920',
    cast: [
      { id: 'c22', name: 'Pedro Pascal', character: 'Joel Miller', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300', order: 1 },
      { id: 'c22b', name: 'Bella Ramsey', character: 'Ellie Williams', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300', order: 2 }
    ],
    crew: [
      { id: 'cr11', name: 'Craig Mazin & Neil Druckmann', job: 'Creator', department: 'Writing' }
    ],
    seasons: [
      {
        id: 's3',
        showId: 'otivo-10',
        seasonNumber: 1,
        title: 'Season 1',
        overview: 'Joel and Ellie travel across a ruined America ravaged by a fungal pandemic.',
        episodes: [
          {
            id: 's3e1',
            showId: 'otivo-10',
            seasonNumber: 1,
            episodeNumber: 1,
            title: '1. When You\'re Lost in the Darkness',
            overview: 'Twenty years after a fungal outbreak ravages the planet, survivors Joel and Tess are tasked with a mission that could change everything.',
            airDate: '2023-01-15',
            runtime: 81,
            stillImage: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600',
            streamingSources: []
          }
        ]
      }
    ],
    streamingSources: [],
    whereToWatch: [
      { id: 'w15', name: 'Max', logo: '', type: 'flatrate', url: 'https://max.com' }
    ],
    createdAt: '2023-01-15T00:00:00Z',
    updatedAt: '2026-09-25T00:00:00Z'
  },
  {
    id: 'otivo-11',
    title: 'His Girl Friday',
    slug: 'his-girl-friday',
    type: 'movie',
    tagline: 'She was the only girl reporter who could out-write, out-talk, and out-smart the men!',
    overview: 'A newspaper editor uses every trick in the book to keep his ace reporter ex-wife from remarrying and settling down into domestic bliss.',
    releaseDate: '1940-01-18',
    year: 1940,
    runtime: 92,
    rating: 7.8,
    voteCount: 61000,
    ageRating: 'Passed',
    poster: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=600&auto=format&fit=crop&q=80',
    backdrop: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=1600&auto=format&fit=crop&q=80',
    genres: ['Comedy', 'Romance', 'Classic'],
    languages: ['English'],
    countries: ['USA'],
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    status: 'FREE_AVAILABLE',
    isFree: true,
    isFeatured: false,
    isTrending: false,
    isPopular: true,
    isNewRelease: false,
    tmdbId: 3085,
    imdbId: 'tt0032599',
    cast: [
      { id: 'c23', name: 'Cary Grant', character: 'Walter Burns', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300', order: 1 },
      { id: 'c24', name: 'Rosalind Russell', character: 'Hildy Johnson', photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300', order: 2 }
    ],
    crew: [
      { id: 'cr12', name: 'Howard Hawks', job: 'Director', department: 'Directing' }
    ],
    streamingSources: [
      {
        id: 'src-11',
        movieId: 'otivo-11',
        providerName: 'Public Domain Vault',
        sourceType: 'PUBLIC_DOMAIN',
        streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        licenseStatus: 'VALID',
        verificationStatus: 'VERIFIED',
        region: 'Global',
        language: 'English',
        isFree: true,
        requiresAccount: false,
        allowsEmbedding: true,
        verifiedAt: '2026-09-25T00:00:00Z'
      }
    ],
    whereToWatch: [
      { id: 'w16', name: 'OTIVO Free', logo: '', type: 'free', url: '#watch' }
    ],
    createdAt: '1940-01-18T00:00:00Z',
    updatedAt: '2026-09-25T00:00:00Z'
  },
  {
    id: 'otivo-12',
    title: 'The Batman Part II',
    slug: 'the-batman-part-ii',
    type: 'movie',
    tagline: 'Gotham burns colder than ever.',
    overview: 'Bruce Wayne delves deeper into the rotting corruption of Gotham City as a frozen winter storm paralyzes the metropolis and unleashes new villainy.',
    releaseDate: '2026-10-02',
    year: 2026,
    runtime: 160,
    rating: 9.1,
    voteCount: 8900,
    ageRating: 'PG-13',
    poster: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80',
    backdrop: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1600&auto=format&fit=crop&q=80',
    genres: ['Action', 'Crime', 'Drama'],
    languages: ['English'],
    countries: ['USA'],
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    status: 'COMING_THIS_MONTH',
    isFree: false,
    isFeatured: true,
    isTrending: true,
    isPopular: true,
    isUpcoming: true,
    tmdbId: 414906,
    imdbId: 'tt18778306',
    cast: [
      { id: 'c25', name: 'Robert Pattinson', character: 'Bruce Wayne / Batman', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300', order: 1 },
      { id: 'c26', name: 'Zoë Kravitz', character: 'Selina Kyle', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300', order: 2 }
    ],
    crew: [
      { id: 'cr13', name: 'Matt Reeves', job: 'Director', department: 'Directing' }
    ],
    streamingSources: [],
    whereToWatch: [
      { id: 'w17', name: 'Max', logo: '', type: 'flatrate', url: 'https://max.com' },
      { id: 'w18', name: 'Theatres Oct 2026', logo: '', type: 'rent', url: '' }
    ],
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-09-25T00:00:00Z'
  },
  {
    id: 'otivo-13',
    title: 'Elephants Dream',
    slug: 'elephants-dream',
    type: 'movie',
    tagline: 'Step into the infinite mechanical labyrinth of the mind.',
    overview: 'The world\'s first open-source computer generated short film. Follow Proog and Emo as they navigate a gigantic, surreal mechanical world governed by conflicting perspectives and bizarre automated mechanisms.',
    releaseDate: '2006-03-24',
    year: 2006,
    runtime: 11,
    rating: 7.7,
    voteCount: 12000,
    ageRating: 'PG',
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
    backdrop: '/src/assets/images/otivo_hero_scifi_1790344896895.jpg',
    genres: ['Sci-Fi', 'Animation', 'Drama'],
    languages: ['English', 'Dutch'],
    countries: ['Netherlands'],
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    status: 'FREE_AVAILABLE',
    isFree: true,
    isFeatured: false,
    isTrending: false,
    isPopular: true,
    isNewRelease: false,
    tmdbId: 11134,
    imdbId: 'tt0807840',
    cast: [
      { id: 'c27', name: 'Tygo Gernandt', character: 'Proog (voice)', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300', order: 1 },
      { id: 'c28', name: 'Cas Jansen', character: 'Emo (voice)', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300', order: 2 }
    ],
    crew: [
      { id: 'cr14', name: 'Bassam Kurdali', job: 'Director', department: 'Directing' },
      { id: 'cr14b', name: 'Ton Roosendaal', job: 'Producer', department: 'Production' }
    ],
    streamingSources: [
      {
        id: 'src-13',
        movieId: 'otivo-13',
        providerName: 'OTIVO Classics HD',
        sourceType: 'AUTHORIZED_FREE',
        streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        licenseStatus: 'VALID',
        verificationStatus: 'VERIFIED',
        region: 'Global',
        language: 'English',
        isFree: true,
        requiresAccount: false,
        allowsEmbedding: true,
        verifiedAt: '2026-09-25T00:00:00Z'
      }
    ],
    whereToWatch: [
      { id: 'w19', name: 'OTIVO Free', logo: '', type: 'free', url: '#watch' }
    ],
    createdAt: '2006-03-24T00:00:00Z',
    updatedAt: '2026-09-25T00:00:00Z'
  },
  {
    id: 'otivo-14',
    title: 'Severance',
    slug: 'severance',
    type: 'tv',
    tagline: 'Please do not attempt to adjust your memory.',
    overview: 'Mark Scout leads a team at Lumon Industries, whose employees have undergone a severance procedure, which surgically divides their memories between their work and personal lives.',
    releaseDate: '2022-02-18',
    year: 2022,
    runtime: 55,
    rating: 8.7,
    voteCount: 320000,
    ageRating: 'TV-MA',
    poster: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80',
    backdrop: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&auto=format&fit=crop&q=80',
    genres: ['Sci-Fi', 'Thriller', 'Drama'],
    languages: ['English'],
    countries: ['USA'],
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    status: 'RELEASED',
    isFree: false,
    isFeatured: true,
    isTrending: true,
    isPopular: true,
    isNewRelease: false,
    tmdbId: 93405,
    imdbId: 'tt11280740',
    cast: [
      { id: 'c29', name: 'Adam Scott', character: 'Mark Scout', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300', order: 1 },
      { id: 'c30', name: 'Patricia Arquette', character: 'Harmony Cobel', photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300', order: 2 }
    ],
    crew: [
      { id: 'cr15', name: 'Dan Erickson', job: 'Creator', department: 'Writing' },
      { id: 'cr15b', name: 'Ben Stiller', job: 'Director', department: 'Directing' }
    ],
    seasons: [
      {
        id: 's4',
        showId: 'otivo-14',
        seasonNumber: 1,
        title: 'Season 1',
        overview: 'Mark uncovers a web of conspiracy at Lumon Industries as the barrier between his severed selves begins to crack.',
        episodes: [
          {
            id: 's4e1',
            showId: 'otivo-14',
            seasonNumber: 1,
            episodeNumber: 1,
            title: '1. Good News About Hell',
            overview: 'Mark Scout leads a team of severed workers whose work memories are separated from their home memories.',
            airDate: '2022-02-18',
            runtime: 57,
            stillImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600',
            streamingSources: []
          }
        ]
      }
    ],
    streamingSources: [],
    whereToWatch: [
      { id: 'w20', name: 'Apple TV+', logo: '', type: 'flatrate', url: 'https://tv.apple.com' }
    ],
    createdAt: '2022-02-18T00:00:00Z',
    updatedAt: '2026-09-25T00:00:00Z'
  }
];

export const INITIAL_GENRES = [
  'Action',
  'Sci-Fi',
  'Thriller',
  'Fantasy',
  'Adventure',
  'Horror',
  'Romance',
  'Comedy',
  'Mystery',
  'Drama',
  'Animation',
  'Documentary',
  'Family',
  'Classic'
];
