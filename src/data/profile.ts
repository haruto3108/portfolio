/**
 * プロフィール。サイトに出る「自分の情報」はすべてここだけを直せば反映される。
 *
 * 公開リポジトリなので、載せたくない情報は無理に埋めなくてよい。
 * 空文字にすればその項目は表示されない作りにしてある（メール・X・Zenn など）。
 */

export const profile = {
  // 表示名。本名は出さずハンドル名で通す方針。GitHub と同じIDに揃えている
  name: 'haruto3108',
  // 名前に添える英字表記。ハンドル名と重複するので空にしてある（空なら表示されない）
  nameLatin: '',
  // ヒーローのアイコン。public/ 直下に置いた画像を指す。
  // ドット絵なので Astro の画像最適化には通していない（再エンコードでぼやけるため）
  avatar: 'avatar.png',
  // ヒーローでハンドル名の下に出す一行。肩書きは置かず、所属だけに留めている
  intro: '鈴鹿工業高等専門学校4年 電子情報工学科',

  /**
   * ページの説明文。検索結果とSNSカードに出る。
   * ヒーローには出していない（ヒーローは intro だけ）ので、ここを直しても見た目は変わらない。
   * TODO: 来場者数などの数字を入れられると強い（確認できた数字だけ書くこと）
   */
  summary:
    '鈴鹿工業高等専門学校の学生です。高専祭の公式サイトを Astro で設計・運用し、' +
    '文化祭の展示用に Unity で4人対戦のマルチプレイゲームを個人開発しました。' +
    '動くものを最後まで仕上げて、人に使ってもらうところまでやるのが好きです。',

  // About セクションの本文。説明文（summary）が「何を作ったか」なので、
  // こちらは「どう作るか（仕事の進め方）」を書いて重複を避ける
  about:
    'Web とゲームの両方を触っていますが、どちらでも気をつけているのは' +
    '「あとから読む人が分かる状態で残すこと」です。' +
    '要件とデザインの決めごとを先にドキュメントにしてから実装に入り、' +
    'コードのコメントには何をしているかではなく、なぜそうしたかを書くようにしています。' +
    '翌年の代に引き継ぐ前提のサイトや、初めて触る人がその場で遊ぶゲームを作るなかで、この進め方になりました。',

  // 就活でよく聞かれる基本情報。空文字にすると非表示
  school: '鈴鹿工業高等専門学校',
  department: '電子情報工学科（I科） 本科4年',
  location: '三重県鈴鹿市',

  // 連絡先。空文字にするとその行は出ない。
  // メールは公開しない方針（公開サイトに生のアドレスを置くと迷惑メールの的になるため）。
  // 載せたくなったら email に書けば Contact に行が増える
  links: {
    github: 'https://github.com/haruto3108',
    email: '', // 例: 'you@example.com'
    x: '', // 例: 'https://x.com/xxxx'
    zenn: '',
  },

  /**
   * できること。レベルは3段階。
   *  'main'     … 実務/長期の制作で主に使った。人に説明できる
   *  'used'     … 制作で使ったことがある
   *  'learning' … 学習中・授業で触った
   * 実態に合わせて増減させること。盛らない（面接で詰められるのは level が高い項目）
   */
  skills: [
    { group: 'フロントエンド', items: [
      { name: 'TypeScript', level: 'main' },
      { name: 'Astro', level: 'main' },
      { name: 'React', level: 'used' },
      { name: 'HTML / CSS', level: 'main' },
    ] },
    { group: 'ゲーム開発', items: [
      { name: 'Unity (URP)', level: 'main' },
      { name: 'C#', level: 'main' },
      { name: 'Mirror / ネットワーク同期', level: 'used' },
      { name: 'Blender', level: 'used' },
    ] },
    { group: 'その他', items: [
      { name: 'Git / GitHub Actions', level: 'main' },
      { name: 'Cloudflare Pages', level: 'used' },
      { name: 'Python', level: 'used' },
    ] },
  ],
} as const;

/** レベルの表示名。skills の level と対応させる */
export const skillLevelLabel = {
  main: '主に使った',
  used: '使ったことがある',
  learning: '学習中',
} as const;

export type SkillLevel = keyof typeof skillLevelLabel;
