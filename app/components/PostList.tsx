interface Post {
  date: string;
  title: string;
  url: string;
  description?: string;
}

const POSTS: Post[] = [
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

const PostList = () => {
  return (
    <section id="blog" className="mb-64">
      <div className="flex items-end justify-between mb-16">
        <h2 className="text-[10px] uppercase tracking-[0.6em] text-blue-600 font-black">
          LOG
        </h2>
      </div>
      
      <div className="space-y-0">
        {POSTS.map((post, index) => (
          <a 
            key={index} 
            href={post.url} 
            className="group flex flex-col md:flex-row md:items-baseline gap-2 md:gap-12 py-8 border-b border-zinc-100 first:border-t"
          >
            <span className="text-sm font-medium text-zinc-400 mono-font w-32 flex-shrink-0 transition-colors group-hover:text-zinc-500">
              {post.date}
            </span>
            <span className="text-xl md:text-2xl font-bold text-zinc-900 group-hover:text-blue-600 transition-colors duration-300">
              {post.title}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
};

export default PostList;

