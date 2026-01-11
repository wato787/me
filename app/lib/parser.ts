import Image from 'next/image';
import Link from 'next/link';
import parse, { domToReact, type DOMNode, type HTMLReactParserOptions } from 'html-react-parser';
import type { Element } from 'domhandler';

import { optimizeImageUrl } from './images';

const DEFAULT_IMG_WIDTH = 1200;
const DEFAULT_IMG_HEIGHT = 675;

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

const isInternalHref = (href: string) => {
  if (!href) return false;
  if (href.startsWith('#')) return false;
  if (href.startsWith('mailto:')) return false;
  if (href.startsWith('tel:')) return false;
  if (href.startsWith('//')) return false; // protocol-relative
  return href.startsWith('/');
};

export const renderArticleHtml = (html: string) => {
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

        if (isInternalHref(href)) {
          return (
            <Link href={href} target={target} rel={safeRel} className={className}>
              {domToReact(el.children as DOMNode[], options)}
            </Link>
          );
        }

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

