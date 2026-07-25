import type { Metadata } from 'next';
import { getBlogs, getBlogById } from '../../lib/microcms';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ArticleBody from '../../components/ArticleBody/ArticleBody';
import { renderArticleHtml } from '../../lib/articleHtml';
import { formatDateYmd } from '../../lib/date';

import styles from './page.module.css';

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
    <div className={styles.page}>
      <div className={styles.container}>
        <article className={styles.article}>
          <header className={styles.header}>
            <Link href="/blog" className={`${styles.backLink} mono-font`}>
              <ArrowLeft size={14} className={styles.backIcon} />
              Back
            </Link>

            <div className={styles.meta}>
              <span className={`${styles.date} mono-font`}>{post.date}</span>
              <h1 className={styles.title}>{post.title}</h1>
            </div>
          </header>

          <ArticleBody>
            {renderArticleHtml(post.content || post.description || '')}
          </ArticleBody>

          <div className={styles.footer}>
            <Link href="/blog" className={`${styles.footerLink} mono-font`}>
              Back to list
            </Link>
            <span className={`${styles.footerNote} mono-font`}>End of entry</span>
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
