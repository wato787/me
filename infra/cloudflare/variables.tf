variable "cloudflare_api_token" {
  description = "Cloudflare API token used by Terraform. Prefer TF_VAR_cloudflare_api_token."
  type        = string
  sensitive   = true
}

variable "cloudflare_account_id" {
  description = "Cloudflare account ID that owns the Worker."
  type        = string
}

variable "cloudflare_zone_id" {
  description = "Cloudflare zone ID for the production hostname."
  type        = string
}

variable "site_hostname" {
  description = "Production hostname to route to this site, for example example.com or www.example.com."
  type        = string
}

variable "workers_dev_hostname" {
  description = "Workers.dev hostname for the deployed site."
  type        = string
}

variable "worker_name" {
  description = "Worker name managed by wrangler."
  type        = string
  default     = "me"
}
