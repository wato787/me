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

## GitHub Actions

Set these repository secrets before running the workflows:

- `MICROCMS_SERVICE_DOMAIN`
- `MICROCMS_API_KEY`
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_ZONE_ID`

`Deploy Worker` runs on pushes to `main` and can also be started manually.

`Terraform DNS` is manual-only. Run it with `apply=false` first to review the plan, then run it again with `apply=true` to switch `wato787.com` to the Worker.
The workflow uses an ephemeral GitHub Actions runner and imports the existing DNS record on each run before planning.
