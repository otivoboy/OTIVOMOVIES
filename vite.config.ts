import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';
import {VitePWA} from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const tmdbKey = env.VITE_TMDB_API_KEY || env.TMDB_API_KEY || process.env.VITE_TMDB_API_KEY || process.env.TMDB_API_KEY || '';
  const watchmodeKey = env.VITE_WATCHMODE_API_KEY || env.WATCHMODE_API_KEY || process.env.VITE_WATCHMODE_API_KEY || process.env.WATCHMODE_API_KEY || '';
  const adminEmail = env.ADMIN_EMAIL || process.env.ADMIN_EMAIL || 'otivoai@gmail.com';

  return {
    define: {
      'process.env.TMDB_API_KEY': JSON.stringify(tmdbKey),
      'process.env.VITE_TMDB_API_KEY': JSON.stringify(tmdbKey),
      'process.env.WATCHMODE_API_KEY': JSON.stringify(watchmodeKey),
      'process.env.VITE_WATCHMODE_API_KEY': JSON.stringify(watchmodeKey),
      'process.env.ADMIN_EMAIL': JSON.stringify(adminEmail),
    },
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.svg', 'pwa-192x192.png', 'pwa-512x512.png'],
        manifest: {
          id: '/',
          name: 'OTIVO MOVIES',
          short_name: 'OTIVO',
          description: 'Discover, explore, and watch authorized free movies and TV shows.',
          theme_color: '#090d16',
          background_color: '#090d16',
          display: 'standalone',
          start_url: '/',
          scope: '/',
          icons: [
            {
              src: '/favicon.svg',
              sizes: '512x512',
              type: 'image/svg+xml',
              purpose: 'any',
            },
          ],
        },
        devOptions: {
          enabled: true,
          type: 'module',
        },
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
