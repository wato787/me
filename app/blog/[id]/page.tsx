
import { getBlogs, getBlogById, optimizeImageUrl } from '../../lib/microcms';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import parse, { domToReact, type DOMNode, type HTMLReactParserOptions } from 'html-react-parser';
import type { Element } from 'domhandler';

interface PageProps {
  params: Promise<{ id: string }>;
}

const DEFAULT_IMG_WIDTH = 1200;
const DEFAULT_IMG_HEIGHT = 675;

const formatDateForDisplay = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const parseNumberAttr = (value?: string): number | undefined => {
  if (!value) return undefined;
  const n = Number.parseInt(value, 10);
  return Number.isFinite(n) && n > 0 ? n : undefined;
};

const mergeRel = (existing: string | undefined, tokens: string[]) => {
  const set = new Set((existing ?? '').split(/\s+/).filter(Boolean));
  for (const t of tokens) set.add(t);
  return Array.from(set).join(' ');
};

const renderArticleHtml = (html: string) => {
  let imageIndex = 0;

  const options: HTMLReactParserOptions = {
    replace(node) {
      if (node.type !== 'tag') return;
      const el = node as Element;

      if (el.name === 'img') {
        const src = el.attribs?.src ?? '';
        if (!src) return;

        const alt = el.attribs?.alt ?? '';
        const width = parseNumberAttr(el.attribs?.width) ?? DEFAULT_IMG_WIDTH;
        const height = parseNumberAttr(el.attribs?.height) ?? DEFAULT_IMG_HEIGHT;

        const isMicroCmsAsset = src.includes('images.microcms-assets.io');
        const optimizedSrc = isMicroCmsAsset ? optimizeImageUrl(src, width, height, 'webp') : src;

        const isFirstImage = imageIndex === 0;
        imageIndex += 1;

        return (
          <span className="block my-10">
            <Image
              src={optimizedSrc}
              alt={alt}
              width={width}
              height={height}
              sizes="(max-width: 768px) 100vw, 768px"
              style={{ width: '100%', height: 'auto' }}
              priority={isFirstImage}
            />
          </span>
        );
      }

      if (el.name === 'a') {
        const href = el.attribs?.href ?? '';
        const target = el.attribs?.target;
        const rel = el.attribs?.rel;
        const className = el.attribs?.class;

        const isBlank = target === '_blank';
        const safeRel = isBlank ? mergeRel(rel, ['noopener', 'noreferrer']) : rel;

        return (
          <a href={href} target={target} rel={safeRel} className={className}>
            {domToReact(el.children as DOMNode[], options)}
          </a>
        );
      }

      if (el.name === 'pre') {
        const className = el.attribs?.class;
        return (
          <pre className={['overflow-x-auto rounded-lg bg-zinc-50 p-4', className].filter(Boolean).join(' ')}>
            {domToReact(el.children as DOMNode[], options)}
          </pre>
        );
      }

      if (el.name === 'iframe') {
        const src = el.attribs?.src;
        if (!src) return;
        const title = el.attribs?.title ?? 'embedded content';

        return (
          <div className="my-10 w-full aspect-video">
            <iframe
              src={src}
              title={title}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              className="w-full h-full"
              allowFullScreen
            />
          </div>
        );
      }
    },
  };

  return parse(html, options);
};

export default async function BlogPostPage({ params }: PageProps) {
  const { id } = await params;

  const blog = await getBlogById(id);

  const post = {
    ...blog,
    date: formatDateForDisplay(blog.createdAt),
  };

  const contentHtml = post.content || post.description || '';

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

          <div className="prose prose-zinc max-w-md md:max-w-2xl">
            <div className="text-zinc-800 leading-[1.8] text-lg font-medium">
              {renderArticleHtml(contentHtml)}
            </div>
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
