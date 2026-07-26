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

Open [http://localhost:4321](http://localhost:4321) with your browser to see the result.

## Tasks

```bash
mise tasks
mise run check
mise run build
mise run verify
```

## Deploy

This site is built with Astro and deployed as Cloudflare Workers Static Assets.

```bash
mise run deploy
```

`MICROCMS_SERVICE_DOMAIN` and `MICROCMS_API_KEY` are required at build time.

Cloudflare infrastructure notes live in [infra/cloudflare](infra/cloudflare).
