# Portfolio

個人サイトです。

## Tech Stack

- Astro
- TypeScript
- microCMS

## Getting Started

```bash
mise run dev
```

ブラウザで [http://localhost:4321](http://localhost:4321) を開いて確認します。

## Tasks

```bash
mise tasks
mise run check
mise run build
mise run verify
```

## デプロイ

このサイトは Astro で静的ビルドし、Cloudflare Workers Static Assets にデプロイします。

```bash
mise run deploy
```

Astro は build 時に microCMS を読むため、`MICROCMS_SERVICE_DOMAIN` と `MICROCMS_API_KEY` が build environment に必要です。Worker runtime secret ではありません。

Cloudflare Web Analytics を有効にする場合は、Cloudflare Dashboard で取得した site token を `PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN` として build environment に設定します。この値はブラウザに公開される前提の token です。

本番運用では Cloudflare Workers Builds を使い、`main` への push/merge で自動デプロイします。microCMS の記事更新は Cloudflare Workers Deploy Hook に webhook で接続し、content 変更時に rebuild します。

Cloudflare 側の設定メモは [infra/cloudflare](infra/cloudflare) にあります。
