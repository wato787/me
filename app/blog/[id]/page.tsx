import './article-body.css';
import type { Metadata } from 'next';
import { getBlogs, getBlogById } from '../../lib/microcms';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { renderArticleHtml } from '../../lib/articleHtml';
import { formatDateYmd } from '../../lib/date';
import PrismHighlighter from '../../components/PrismHighlighter';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const blog = await getBlogById(id);
  const title = blog.title ?? 'Blog';
  const description =
    blog.description ?? (blog.content ? blog.content.replace(/<[^>]*>/g, '').slice(0, 160) + '...' : undefined);

  return {
    title: `${title} | wato787`,
    description: description ?? 'wato787のブログ記事です。',
    openGraph: {
      title,
      description: description ?? 'wato787のブログ記事です。',
      type: 'article',
      url: `/blog/${id}`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: description ?? 'wato787のブログ記事です。',
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { id } = await params;

  const blog = await getBlogById(id);

  const post = {
    ...blog,
    date: formatDateYmd(blog.createdAt),
  };

  return (
    <div className="min-h-screen bg-white selection:bg-blue-600 selection:text-white antialiased">
      <div className="max-w-4xl mx-auto px-0 md:px-6">
        <article className="py-20">
          <header className="mb-20">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-blue-600 transition-colors mb-12 mono-font"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              Back
            </Link>

            <div className="flex flex-col gap-6">
              <span className="text-sm mono-font font-bold text-blue-600">
                {post.date}
              </span>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-zinc-900 leading-tight">
                {post.title}
              </h1>
            </div>
          </header>

          <div className="blog-article-body max-w-md md:max-w-4xl" data-blog-article-body>
            <PrismHighlighter>
              {renderArticleHtml(post.content || post.description || '')}
            </PrismHighlighter>
          </div>

          <div className="mt-40 pt-20 border-t border-zinc-100 flex justify-between items-center">
            <Link
              href="/blog"
              className="text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-blue-600 transition-colors mono-font"
            >
              Back to list
            </Link>
            <span className="text-[10px] mono-font text-zinc-300 uppercase tracking-widest">
              End of entry
            </span>
          </div>
        </article>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const blogs = await getBlogs();

  return blogs.map((blog) => ({
    id: blog.id,
  }));
}
