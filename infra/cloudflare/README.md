# Cloudflare Infrastructure

Cloudflare の周辺設定を Terraform で管理するための置き場です。

このサイトの静的アセット本体と production hostname は `wrangler deploy` で管理します。Terraform は今後 Cloudflare 側の追加設定を IaC したくなったときの置き場です。

Production hostname は Worker の Custom Domain として `wrangler.toml` に定義しています。

```toml
[[routes]]
pattern = "wato787.com"
custom_domain = true
```

## 初期化

```bash
cd infra/cloudflare
terraform init
```

管理対象 resource を追加するときは、Cloudflare provider と必要な variables を同じ PR で追加してください。API token は commit せず、環境変数で渡します。

```bash
export TF_VAR_cloudflare_api_token="..."
terraform plan
```

## デプロイ

Worker Static Assets の deploy は repo root から実行します。

```bash
mise run deploy
```

Astro は build 時に microCMS を読むため、`MICROCMS_SERVICE_DOMAIN` と `MICROCMS_API_KEY` は Worker runtime secret ではなく build environment に設定してください。

初回の Custom Domain 作成前に、同じ hostname の既存 DNS record や Pages custom domain が残っている場合は Cloudflare Dashboard で削除してください。

## 自動デプロイ

Cloudflare Workers Builds で GitHub repository を Worker `me` に接続しています。`main` への push/merge を production deploy のトリガーにします。

Build / deploy の設定は Cloudflare Dashboard の `Workers & Pages > me > Settings > Builds` で管理します。

```txt
Production branch: main
Build command: bun install && bun run build
Deploy command: bunx wrangler deploy
```

Build environment には次の値を設定します。値そのものは repository に commit しません。

```txt
MICROCMS_SERVICE_DOMAIN
MICROCMS_API_KEY
PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN
```

PR や main 以外の branch で preview build を使う場合も、microCMS を読むために同じ build environment が必要です。

## microCMS Webhook

microCMS のコンテンツ更新時は Cloudflare Workers Deploy Hook を呼び出して rebuild します。Deploy Hook は Cloudflare Dashboard の `Workers & Pages > me > Settings > Builds > Deploy Hooks` で作成します。

```txt
Hook target branch: main
HTTP method: POST
```

Deploy Hook URL は secret として扱います。repository や公開ドキュメントには貼り付けません。

## Web Analytics

Cloudflare Web Analytics は `src/layouts/BaseLayout.astro` で全ページに beacon script を埋め込みます。`PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN` が未設定の場合は script を出力しません。

Site token は Cloudflare Dashboard の Web Analytics で作成し、Workers Builds の build environment に設定します。この token はブラウザに配信される公開値ですが、環境ごとに差し替えられるよう repository には直書きしません。

## 次に管理する候補

- 将来の Worker runtime vars
