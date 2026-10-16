/**
 * サイト内リンクに base（GitHub Pages のサブパス）を付ける。
 *
 * astro.config.mjs の base を '/portfolio' から '/' に変えても
 * 各ページを直さずに済むよう、URLの組み立てはここ一箇所に閉じている。
 * `<a href={href('/works/foo')}>` のように使う。
 */
export function href(path: string): string {
  // BASE_URL は末尾スラッシュが付く場合と付かない場合がある（設定とバージョン次第）。
  // どちらでも同じ結果になるよう、一度落としてから付け直す
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  if (path === '/') return `${base}/`;
  return `${base}${path}`;
}
