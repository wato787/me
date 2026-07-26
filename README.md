# Portfolio

個人サイトです。

## Tech Stack

- Astro
- TypeScript
- microCMS

## Getting Started

```bash
npm run dev
# or
bun dev
```

Open [http://localhost:4321](http://localhost:4321) with your browser to see the result.

## Deploy

This site is built with Astro and deployed as Cloudflare Workers Static Assets.

```bash
bun run deploy
```

`MICROCMS_SERVICE_DOMAIN` and `MICROCMS_API_KEY` are required at build time.

Cloudflare infrastructure notes live in [infra/cloudflare](infra/cloudflare).
