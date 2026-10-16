// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // GitHub Pages の「プロジェクトページ」として公開する前提。
  // リポジトリ名がURLに入るので base が必要（https://haruto3108.github.io/portfolio/）。
  // リポジトリを haruto3108.github.io に改名するとルート公開になり、base は '/' に変えるだけでよい。
  // サイト内リンクは src/lib/url.ts の href() を通しているので、base を変えてもコードは直さなくて済む。
  site: 'https://haruto3108.github.io',
  base: '/portfolio',

  // ページ数が少なく1枚あたりのHTMLも軽いので、リンクは全部まとめて先読みしておく。
  // 既定はホバー時。スマホはホバーが無いため、作品カードだけ画面に入った時点で読む
  // （index.astro 側で data-astro-prefetch="viewport" を付けている）。
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },

  integrations: [sitemap()],
});
