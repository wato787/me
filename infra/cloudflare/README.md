# Cloudflare Infrastructure

Cloudflare の周辺設定を Terraform で管理するための置き場です。

このサイトの静的アセット本体は Terraform ではなく `wrangler deploy` でアップロードします。Terraform は DNS、custom domain、route などのクラウド設定を管理します。

## 初期化

```bash
cd infra/cloudflare
cp terraform.tfvars.example terraform.tfvars
terraform init
```

`terraform.tfvars` に account / zone / hostname を設定してください。API token は commit せず、環境変数で渡します。

```bash
export TF_VAR_cloudflare_api_token="..."
terraform plan
```

## デプロイ

Worker Static Assets の deploy は repo root から実行します。

```bash
bun run deploy
```

Astro は build 時に microCMS を読むため、`MICROCMS_SERVICE_DOMAIN` と `MICROCMS_API_KEY` は Worker runtime secret ではなく build environment に設定してください。

## 次に管理する候補

- DNS record
- Worker custom domain / route
- Web Analytics
- 将来の Worker runtime vars
