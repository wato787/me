# デザイン調査ノート

2026-11-17確認。公式のトレンド記事は編集者・ベンダーの見解であり、市場全体の統計ではない。以下は出典からの要約と、このrepoへの提案を区別して記載する。価格・利用枠は比較対象にせず、採用時に再確認する。

## 1. 最近の動きと採用の判断

Figmaの[2026年トレンド](https://www.figma.com/resource-library/web-design-trends/)には、大胆な文字、鮮やかな配色、動き、3D、コラージュなど多様な方向が並ぶ。単一の「2026風」があるわけではない。Squarespaceの[2026年の整理](https://pros.squarespace.com/blog/design-trends)は、Archival Index、Glassmorphism、Creative Process、Motion Narrative、Card Playの5つを挙げる。

| 方向 | 何が特徴か | このサイトで試せること | 採用判断 |
| --- | --- | --- | --- |
| 文字を主役にする | 大きさ・組み合わせ・組版で印象を作る | 名前、短い自己紹介、記事タイトルの対比 | 優先。日本語の長いタイトルでも検証 |
| Archival Index | 索引・ラベル・分類で情報を見せる | 日付、分野、選んだ記事、年月の整理 | 有力。空の分類を増やさない |
| Creative Process | 完成品だけでなく制作過程を見せる | 実在するメモ、図、スクリーンショット | 素材がある場合に強い |
| Card Play / Bento | 大小の区画で複数情報を並べる | プロフィール、制作物、最近の記事 | 全要素をカード化すると優先度が消える |
| 鮮やかな配色 | 印象的な組み合わせ | アクセント1色や写真の色を起点にする | 配色の根拠を本人の素材に置く |
| Glassmorphism | 透過・ぼかし・奥行き | 小さなナビなど限定箇所 | 記事本文の背景には使わない案が妥当 |
| Motion Narrative | 動きで順序や変化を伝える | ページ遷移、開閉、選択の応答 | 低速端末・動きを減らす設定で成立させる |
| 3D / 実験的ナビ | 空間体験や操作自体が見せ場 | 実験作品を別枠で紹介 | 読む導線の必須操作にはしない |
| コラージュ・手触り | 写真や手描きの不揃いさ | 本人の写真やノートを編集 | 意味のないノイズの重ね過ぎを避ける |
| ダークテーマ | 暗い面で情報の階層を作る | ライト案との比較対象 | 暗ければ読みやすいとは限らない |

上の採用判断はこのrepoに対する提案。人気順のランキングではない。

## 2. 流行より先に設計すること

### 情報の階層

最初の画面で「誰」「何に取り組んでいる」「次に何を見られる」を把握できるようにする。全記事を同じ重さで出すより、選んだ記事と新着を分ける案を比較する。スキル名の羅列を実績の代わりにしない。公開可能な制作物があれば、目的・自分の役割・結果を短く添える。

### 日本語タイポグラフィ

[デジタル庁のタイポグラフィ](https://design.digital.go.jp/dads/foundations/typography/)と[テキストスタイル](https://design.digital.go.jp/dads/foundations/typography/text-style/)が有用。標準的な文字サイズを小さくし過ぎず、日本語の擬似イタリックを乱用しないという基準が参考になる。

このサイトの初期試案は本文16–18px、行高1.8前後、記事幅34–42remから比較する。これは規格の指定値ではなく実際の記事で調整する開始値。欧文の文字数ルールを日本語に直訳しない。漢字の密度、英数字、コード、長いURL、句読点、見出しの折り返しを見る。フォントは1–2系統を基本に、和文の必要ウェイト・配信量・ライセンスを確認する。

### 配色と形

背景、本文、補助文字、境界、アクセント、フォーカスを役割で定義する。色名だけでなく用途を保存する。角丸と影は意味のあるまとまりに使う。装飾を減らす案でも、情報の優先順位まで平坦にしない。

### 操作とアクセシビリティ

[WCAG 2.2](https://www.w3.org/TR/WCAG22/)を基準に、通常文字のコントラスト4.5:1、大きい文字3:1、UIの必要な視覚情報3:1を確認する。ポインター対象の最低24×24 CSS pxには例外があり、すべてのリンクを無条件で24pxとする規定ではない。実装の目安としてモバイルの操作領域44pxも使う。[Vercelのガイド](https://vercel.com/design/guidelines)はキーボード、フォーカス、タップ領域など具体的なレビューに向く。

[reduced motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40media/prefers-reduced-motion)を尊重する。動きを止めても本文が隠れたままにならないこと。hoverだけでリンクの存在や情報を伝えない。

## 3. 参考を探す場所と使い方

| 参照先 | 調べる対象 | 観察して保存する項目 |
| --- | --- | --- |
| [SiteInspire](https://www.siteinspire.com/) | タイポグラフィ、ミニマル、グリッド、個人サイト | 情報の優先度、見出し、余白 |
| [Hoverstat.es](https://www.hoverstat.es/) | 実験的・独立系のWeb表現 | 記憶に残る仕掛けと通常操作の関係 |
| [Land-book](https://land-book.com/) | ランディングページの構図 | 最初の画面、色面、写真の比率 |
| [Typewolf](https://www.typewolf.com/) | 書体と組み合わせの実例 | 見出しと本文の関係。和文は別途確認 |
| [Realtime Colors](https://www.realtimecolors.com/) | UI上での配色の試行 | 背景・文字・アクセントの役割 |
| [デジタル庁デザインシステム](https://design.digital.go.jp/) | 日本語の文字・操作・情報整理 | 読みやすさの基準 |
| [Vercel Design](https://vercel.com/design) | 技術系の視覚的一貫性 | 状態、境界、余白、フォーカス |
| [Awwwards Portfolio](https://www.awwwards.com/websites/portfolio/) | 演出的なポートフォリオ | 探索用リンク。今回の直接取得はタイムアウト |

トップページの取得確認と実サイトの精査は別物。今回、掲載作品をブラウザーで操作・採点したわけではない。スクリーンショットを採用するときは元URLと確認日、「文字だけ参考」「配置だけ参考」など理由を残す。

集め方の提案: 12件ほど集め、文字・構成・色・動きの4軸で分類し、最後に各方向3件へ絞る。海外の欧文だけの見栄えをそのまま和文へ移さない。完成画像を模写するだけでなく、モバイル、記事ページ、長文の状態を見る。

## 4. AIでデザインする方法

| 手段 | 得意な用途 | このrepoでの使いどころ | 注意点 |
| --- | --- | --- | --- |
| 既存コードを読めるAI + ブラウザー | Astroの構造を維持した試作と修正 | 最も直接的な実装経路 | 実機画面を見て直す工程が必要 |
| 画像生成 | 大きく異なる視覚方向の探索、固有の素材 | 3方向のムード比較 | 画像内の文字・操作・レスポンシブは未検証 |
| Figma Make | 参照デザインから対話的なプロトタイプ | 方向の比較、共同での調整 | 出力コードのAstro適合は別途判断 |
| Google Stitch | 自然言語からUIの探索・反復 | 既存案に縛られない比較 | 生成画面の品質と本番実装を分けて評価 |
| v0 | コードを伴うUI試作、ルールの再利用 | 見た目や部品の検討 | React前提の出力を丸ごと移植しない |
| Figma Design + コードへの引き継ぎ | 厳密なレイアウトと部品設計 | 確定後の仕様管理 | デザインとコードのトークンを一致させる |

公式資料:

- [Figma Makeの紹介](https://www.figma.com/blog/introducing-figma-make/): プロンプトから対話的に試作する位置づけ。
- [Makeファイルの作成](https://help.figma.com/hc/en-us/articles/31304485164695-Create-a-Figma-Make-file): 画像やFigmaデザインの入力、機能条件。
- [Makeを使う8つのヒント](https://www.figma.com/blog/8-ways-to-build-with-figma-make/): 参照と既存部品を文脈として渡す方法。
- [StitchのUIデザイン](https://blog.google/innovation-and-ai/models-and-research/google-labs/stitch-ai-ui-design/): 目的や感じてほしい印象から探索する方法。
- [Stitchのリアルタイム設計](https://blog.google/innovation-and-ai/models-and-research/google-labs/stitch-updates/): 入力と反復の紹介。
- [StitchのDESIGN.md](https://blog.google/innovation-and-ai/models-and-research/google-labs/stitch-design-md/): 意図をテキストとして運ぶアプローチ。
- [v0 Design Systems 2.0](https://v0.app/docs/design-systems-2): コンポーネント、トークン、規約を共有する仕組み。
- [v0 Design mode](https://v0.app/docs/design-mode): プレビュー上での調整。
- [Anthropicのプロンプト指針](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/prompt-templates-and-variables): 具体的な視覚指示で定型出力を減らす考え方。
- [Anthropicの評価・反復の実験](https://www.anthropic.com/engineering/harness-design-long-running-apps): 評価基準が出力の傾向に影響する点が参考になる。

AI制作で効くのは、候補を増やすだけでなく評価を固定すること。「読みやすさ」「本人らしさ」「内容への到達」「モバイル」「実装負荷」を別々に評価する。AI自身の点数だけで採用を決めない。画像の豪華さ、Lighthouseの点数、使いやすさは別の尺度。

## 5. このサイトの方向性（提案）

### A. 個人の編集室 / 技術のアーカイブ

人物紹介は短く、選んだ記事を主役にする。見出しの大小、控えめな罫線、日付の並びで構造を作る。白系や紙色は候補だが、配色自体をアイデンティティとしない。記事の導入文、本人の言葉、図解の編集が固有性を作る。

向く目的: 記事を読んでもらう、考え方を知ってもらう。懸念: よくある「クリーム色＋セリフ＋細罫線」に寄ると再びテンプレート化する。

### B. 実験の作業机

写真・図・コード断片・公開可能な制作物を、作業の痕跡として編集する。均等なカードではなく主従をつけ、ひとつの実験だけ操作できる構成を検討する。

向く目的: 作る人として記憶してもらう。懸念: 素材が足りないと装飾頼みになる。架空のプロジェクトを補わない。

### C. 道具としての個人サイト

コンパクトなプロフィールと高速な記事索引。キーボード、日付、分類、読みやすい記事を丁寧に設計する。技術者らしさを端末風装飾だけに頼らず、操作と情報の正確さで示す。

向く目的: 繰り返し読む、記事を探す。懸念: 地味になりやすいので、本人の視点が分かる導入や小さな固有表現が必要。

推奨はAを中心にBの実在素材を少量組み合わせること。これは読者と目的が未確定な段階の仮説であり、採用決定ではない。

## 6. スキルの選定

[skills.sh](https://skills.sh/)で候補を探し、公式リポジトリの本文を確認した。確認時表示はfrontend-design約1.1M、web-design-guidelines約872K installs。動的な集計であり品質保証ではない。

| スキル | 選んだ理由 | 適用範囲 |
| --- | --- | --- |
| [Anthropic frontend-design](https://github.com/anthropics/skills/tree/main/skills/frontend-design) | 固有の題材、文字、配色、構造、自己批評を扱う | デザイン探索・制作 |
| [Vercel web-design-guidelines](https://github.com/vercel-labs/agent-skills) | 操作とアクセシビリティを含めた具体的レビュー | 実装後の検証 |

`.agents/skills/`にrepoローカルのコピーを導入。取得コミットは各SOURCE.md、Anthropic版のライセンスはLICENSE.txtに同梱。Vercel版は取得時にライセンスファイルが見つからず、その事実をSOURCE.mdに記録した。frontend-designは取得時の本文をそのまま保持する。web-design-guidelinesはレビュー時に最新の外部ルールを取得するため、そのルールは固定されない。Vercelリポジトリの公開ライセンス表記は取得結果に従って記録する。

Reactの最適化スキルは現環境にあるが、このサイトの静的なAstro主体のリデザインには主役ではない。Next.jsへの移行、UIライブラリーの全面導入、アニメーション用依存の追加は今回行わない。

## 7. 実装品質の基準

- ホームだけでなく、ブログ一覧・長文記事・空状態まで一貫する。
- 360 / 390 / 768 / 1440pxで確認し、長い日本語タイトル、画像なし、コード、表を試す。
- キーボード操作、フォーカス、200%拡大、動きを減らす設定で確認する。
- [Core Web Vitals](https://web.dev/articles/defining-core-web-vitals-thresholds)の良好目安はLCP 2.5秒以下、INP 200ms以下、CLS 0.1以下。実ユーザーの75パーセンタイルで見る基準で、ローカルの1回の測定とは区別する。
- [測定方法](https://web.dev/articles/vitals-measurement-getting-started)に沿って、Lighthouseの実験室測定とフィールドデータを混同しない。
- CSSの新機能は[Chromeのアニメーション解説](https://developer.chrome.com/blog/scroll-triggered-animations)などで仕様・対応を確認し、内容の表示は未対応でも成立させる。

## 未実施

実サイトの画面監査、個別の参考サイトの操作検証、各AIサービスのアカウント内での試作、デザイン案の画像生成、実装、性能測定は未実施。今回の成果は調査・制作手順・スキル整備。
