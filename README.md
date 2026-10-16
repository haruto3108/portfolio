# ポートフォリオサイト

就職活動用のポートフォリオ。Astro で静的生成し、GitHub Pages で公開している。

- 本番: https://haruto3108.github.io/portfolio/

## ディレクトリ構成

| パス | 内容 |
|---|---|
| `src/data/profile.ts` | **名前・肩書き・スキル・連絡先**。自分の情報を直すのはここだけ |
| `src/content/works/` | **作品1件 = Markdown 1枚**。ファイルを足すだけで一覧と詳細ページに出る |
| `src/content.config.ts` | 作品の frontmatter の定義（必須項目・型） |
| `src/pages/index.astro` | トップページ（Hero / Works / About / Contact） |
| `src/pages/works/[...id].astro` | 作品の詳細ページ |
| `src/styles/global.css` | 色・余白・文字のトークン。**色の直書きはここ以外でしない** |
| `src/layouts/`, `src/components/` | 共通の外枠と部品 |
| `public/avatar.png` | ヒーローのアイコン。GitHub のアバターを複製したもの |

### アイコンを差し替えるとき

`public/avatar.png` を置き換える。GitHub 側でアバターを変えても**自動では反映されない**ので、変えたら取り直す。

```sh
curl -sSL -o public/avatar.png "https://github.com/haruto3108.png?size=460"
```

ドット絵なので `public/` に置いて無加工で配信し、CSS 側で原寸の半分（160px）に固定して `image-rendering: pixelated` を当てている。
Astro の画像最適化（`src/assets/` + `<Image>`）に通すと再エンコードでぼやけるため、あえて使っていない。
写真など普通の画像に差し替えるなら、`src/assets/` へ移して `<Image>` を使うほうがよい。

## 開発

Node のバージョンは `.node-version`（24.19.0）に固定している。

```sh
npm install
npm run dev      # http://localhost:4321/portfolio/
npm run build    # dist/ に出力
npm run preview  # ビルド結果を確認
npm run check    # 型チェック
```

## 作品を追加する

`src/content/works/` に Markdown を1枚足す。

```markdown
---
title: 作品名
tagline: 一行での説明（40字くらいまで）
period: 2026-04 〜 2026-08
role: 自分が担当したこと（採用側がいちばん見るので具体的に）
team: 個人開発 / 3人チーム など（省略可）
tags: ['Unity', 'C#']
links:
  - label: GitHub
    url: https://github.com/...
cover: ./images/xxx.webp   # 省略するとプレースホルダが出る
order: 3                   # 小さいほど一覧の先に出る
draft: false               # true の間は本番に出ない（dev では見える）
---

## どんなものか
...
```

書く順番は「**何を作ったか → 自分が担当したこと → 技術的に難しかったところとその解決 → 学んだこと**」を基本にしている。
難しかったところをどう解決したかがいちばん読まれるので、ここを厚く書く。

### 画像の置き場所

`src/content/works/images/` に置いて、frontmatter の `cover` から相対パスで指定する。
`src/` の中に置くと Astro が自動でリサイズ・WebP 化してくれる（`public/` に置くとこれが効かない）。

## デプロイ

`main` に push すると GitHub Actions が自動で公開する（`.github/workflows/deploy.yml`）。

初回だけ GitHub 側の設定が必要:
**Settings → Pages → Build and deployment → Source** を「GitHub Actions」にする。

### 公開URLを変えたいとき

いまは「プロジェクトページ」なので URL に `/portfolio` が付く。
リポジトリ名を `haruto3108.github.io` に改名すると `https://haruto3108.github.io/` で公開できる。
その場合は `astro.config.mjs` の `base` を `'/'` に変えるだけでよい
（サイト内リンクは `src/lib/url.ts` の `href()` を通しているので、他は直さなくて済む）。
