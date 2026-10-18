import { defineCollection } from 'astro:content';
import { z } from 'zod';
import { glob } from 'astro/loaders';

/**
 * 作品。1作品 = src/content/works の Markdown 1枚。
 *
 * 就活中に作品が増えていくので、ファイルを足すだけで
 * 一覧と詳細ページの両方に出るようにしている（ページ側のコードは触らない）。
 */
const works = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/works' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      // 一覧カードに出る一行説明。長いと折り返して崩れるので40字程度まで
      tagline: z.string(),
      // 技術スタック。一覧カードにも出る
      tags: z.array(z.string()),
      // 外部リンク（GitHub / 公開サイト / 動画など）。
      // `links:` と書いて中身を空にすると YAML では null になるため、
      // 空配列として受け取れるようにしておく（書きかけでビルドが止まらないように）
      links: z
        .array(z.object({ label: z.string(), url: z.url() }))
        .nullish()
        .transform((v) => v ?? []),
      // カード画像。src/content/works からの相対パスで置く。
      // 未設定のうちはプレースホルダが出る
      cover: image().optional(),
      coverAlt: z.string().optional(),
      // 紹介動画。public/ 直下からのパスで書く（例: '/video/xxx.mp4'）。
      // 設定すると詳細ページの先頭が画像ではなく動画になり、cover はその静止画として使われる
      video: z.string().optional(),
      // 一覧での並び順（小さいほど先）。見せたい順に手で決める
      order: z.number().default(99),
      // 下書き。true の間は本番ビルドに出さない
      draft: z.boolean().default(false),
    }),
});

export const collections = { works };
