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

## DNS レコードの初回適用

`cloudflare_dns_record.site` は `wato787.com` の CNAME を新規作成する前提です。既存の Pages 向け CNAME は import せず、Cloudflare Dashboard で削除してから Terraform で作成します。

現在の目標状態は次の通りです。

```txt
wato787.com CNAME -> me.shantianlongxing20.workers.dev
proxied = true
```

まず plan で、`cloudflare_dns_record.site` が 1 件だけ作成されることを確認します。

```bash
terraform plan
```

期待する主な差分:

```txt
+ cloudflare_dns_record.site
  name    = "wato787.com"
  type    = "CNAME"
  content = "me.shantianlongxing20.workers.dev"
  proxied = true
```

問題なければ、Cloudflare Dashboard で既存の CNAME を削除します。

```txt
wato787.com CNAME -> me-18t.pages.dev
```

削除後、すぐに Terraform で作成します。

```bash
terraform apply
```

適用後、Terraform state と本番 URL を確認します。

```bash
terraform state list
curl -I https://wato787.com/
curl -I https://wato787.com/blog/
```

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
