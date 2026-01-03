
import { Post, Project, TechItem } from './types';

export const NAME = "wato787";
export const ID = "wato787";
export const ROLE = "Product Engineer";
export const EMAIL = "hello@wato787.dev";
export const TWITTER_URL = "https://x.com/wato787";
export const GITHUB_URL = "https://github.com/wato787";

export const BIO = "Go / TypeScript / Cloudflare. 削ぎ落とし、本質を実装する。";

export const POSTS: Post[] = [
  { 
    date: "2026.01.03", 
    title: "Designing for Scale: Next.js on Cloudflare Pages", 
    url: "#",
    description: "エッジコンピューティング環境でのパフォーマンス最適化と、グローバル配信を前提としたアーキテクチャ設計。" 
  },
  { 
    date: "2025.12.20", 
    title: "Type-Safe Everything with TypeScript & Go", 
    url: "#",
    description: "フロントエンドとバックエンドの境界を越える型安全性の確保。スキーマ駆動開発の実践。"
  },
  { 
    date: "2025.11.15", 
    title: "Modern UI Architecture with Headless CMS", 
    url: "#",
    description: "コンテンツとプレゼンテーションの分離。microCMSを核とした柔軟なコンテンツ管理システムの構築。"
  }
];

export const TECH_STACK: TechItem[] = [
  { name: "Go" },
  { name: "TypeScript" },
  { name: "Next.js" },
  { name: "React" },
  { name: "Cloudflare" },
  { name: "PostgreSQL" },
  { name: "Tailwind CSS" },
  { name: "Docker" },
  { name: "Figma" },
];

export const PROJECTS: Project[] = [
  { name: "Nexus Design System", githubUrl: "https://github.com/wato787/nexus" },
  { name: "Aura Motion Engine", githubUrl: "https://github.com/wato787/aura" },
  { name: "Zenith API Gateway", githubUrl: "https://github.com/wato787/zenith" },
];
