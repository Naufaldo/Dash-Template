import adapterNode from '@sveltejs/adapter-node';
import adapterStatic from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const isStatic = process.env.ADAPTER === 'static' || process.env.GITHUB_PAGES === 'true';

// Refrigeration Monitoring Platform: Industrial SCADA Dashboard
/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: isStatic
      ? adapterStatic({
          pages: 'build',
          assets: 'build',
          fallback: '404.html',
          precompress: false,
          strict: false
        })
      : adapterNode({ out: 'build' }),
    paths: {
      base: process.env.BASE_PATH || ''
    },
    alias: {
      '$lib': 'src/lib'
    }
  }
};

export default config;
