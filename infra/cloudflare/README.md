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

## DNS レコードの import

既存の `wato787.com` CNAME を Terraform 管理に入れる場合、初回だけ DNS record を import します。

現在の目標状態は次の通りです。

```txt
wato787.com CNAME -> me.shantianlongxing20.workers.dev
proxied = true
```

DNS record ID は Cloudflare API で確認できます。

```bash
curl -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  "https://api.cloudflare.com/client/v4/zones/$CLOUDFLARE_ZONE_ID/dns_records?type=CNAME&name=wato787.com"
```

record ID が分かったら import します。

```bash
terraform import cloudflare_dns_record.site "$CLOUDFLARE_ZONE_ID/$DNS_RECORD_ID"
terraform plan
```

既存 record が Pages を向いている場合、`terraform plan` では `content` が `me-18t.pages.dev` から `me.shantianlongxing20.workers.dev` に変わる差分が出ます。

## デプロイ

Worker Static Assets の deploy は repo root から実行します。

```bash
mise run deploy
```

Astro は build 時に microCMS を読むため、`MICROCMS_SERVICE_DOMAIN` と `MICROCMS_API_KEY` は Worker runtime secret ではなく build environment に設定してください。

## 次に管理する候補

- Worker custom domain / route
- Web Analytics
- 将来の Worker runtime vars
