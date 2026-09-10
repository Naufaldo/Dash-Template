import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

// Refrigeration Monitoring Platform: Industrial SCADA Dashboard Node.js production server
/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({ out: 'build' }),
    alias: {
      '$lib': 'src/lib'
    }
  }
};

export default config;
