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

## 次に管理する候補

- Web Analytics
- 将来の Worker runtime vars
