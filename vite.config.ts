// @ts-nocheck

import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    preact(),
    VitePWA({
      manifest: {
        name: 'PWA Personal Assistant',
        short_name: 'PWA Personal Assistant',
        description: 'An offline-capable PWA personal assistant',
        permissions: {
          'audio-capture': {
            description: 'Audio capture',
          },
          'speech-recognition': {
            description: 'Speech recognition',
          },
        },
      },
    }),
  ],
});
