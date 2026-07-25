import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import parse, { domToReact, type DOMNode, type HTMLReactParserOptions } from 'html-react-parser';
import type { Element } from 'domhandler';

import styles from '../components/ArticleBody/articleContent.module.css';
import { optimizeImageUrl } from './microcms';

const DEFAULT_CONTENT_IMAGE_WIDTH = 1200;

function toInt(value: string | undefined): number | undefined {
  if (!value) return undefined;
  const n = Number.parseInt(value, 10);
  return Number.isFinite(n) ? n : undefined;
}

function isExternalHref(href: string): boolean {
  return href.startsWith('http://') || href.startsWith('https://') || href.startsWith('//');
}

function isInternalHref(href: string): boolean {
  return href.startsWith('/') && !href.startsWith('//');
}

function ensureSafeRel(rel: string | undefined, { href, target }: { href: string; target?: string }): string | undefined {
  const needsNoopener = target === '_blank' || isExternalHref(href);
  if (!needsNoopener) return rel;

  const tokens = new Set((rel ?? '').split(/\s+/).filter(Boolean));
  tokens.add('noopener');
  tokens.add('noreferrer');
  return Array.from(tokens).join(' ');
}

function optimizeContentImageSrc(src: string, width?: number, height?: number): string {
  if (src.includes('images.microcms-assets.io')) {
    return optimizeImageUrl(src, width ?? DEFAULT_CONTENT_IMAGE_WIDTH, height, 'webp');
  }
  return src;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function isAllowedHref(url: string): boolean {
  const t = url.trim();
  return (
    t.startsWith('https://') ||
    t.startsWith('http://') ||
    t.startsWith('/') ||
    t.startsWith('mailto:') ||
    t.startsWith('#')
  );
}

function preprocessMarkdownInline(html: string): string {
  return html
    .replace(/\[([^\]]*)\]\s*\(\s*([^)]+)\s*\)/g, (_, text: string, url: string) => {
      const u = url.trim();
      if (!isAllowedHref(u)) return _;
      return `<a href="${escapeHtml(u)}">${escapeHtml(text)}</a>`;
    })
    .replace(/`([^`]+)`/g, (_, code: string) => `<code>${escapeHtml(code)}</code>`);
}

export function renderArticleHtml(html: string): ReactNode {
  if (!html) return null;

  const options: HTMLReactParserOptions = {
    replace: (node) => {
      if (node.type !== 'tag') return;
      const el = node as unknown as Element;

      if (el.name === 'script' || el.name === 'style') {
        return null;
      }

      if (el.name === 'img') {
        const src = el.attribs?.src;
        if (!src) return null;

        const alt = el.attribs?.alt ?? '';
        const width = toInt(el.attribs?.width);
        const height = toInt(el.attribs?.height);

        const optimizedSrc = optimizeContentImageSrc(src, width, height);

        if (width && height) {
          return (
            <span className={styles.mediaWrap}>
              <Image
                src={optimizedSrc}
                alt={alt}
                width={width}
                height={height}
                sizes="(max-width: 768px) 100vw, 768px"
                className={styles.mediaImage}
              />
            </span>
          );
        }

        return (
          <span className={styles.mediaWrapAspect}>
            <Image
              src={optimizedSrc}
              alt={alt}
              fill
              sizes="100vw"
              className={styles.mediaImageFill}
            />
          </span>
        );
      }

      if (el.name === 'a') {
        const href = el.attribs?.href;
        if (!href) return;

        const className = el.attribs?.class;
        const target = el.attribs?.target;
        const rel = ensureSafeRel(el.attribs?.rel, { href, target });
        const title = el.attribs?.title;
        const children = domToReact(el.children as DOMNode[], options);

        if (isInternalHref(href)) {
          return (
            <Link href={href} className={className} target={target} rel={rel} title={title}>
              {children}
            </Link>
          );
        }

        return (
          <a href={href} className={className} target={target} rel={rel} title={title}>
            {children}
          </a>
        );
      }

      if (el.name === 'iframe') {
        const src = el.attribs?.src;
        if (!src) return null;

        const title = el.attribs?.title ?? 'embedded';
        const allow = el.attribs?.allow;

        return (
          <div className={styles.embed}>
            <iframe
              src={src}
              title={title}
              loading="lazy"
              allow={allow}
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              className={styles.embedFrame}
            />
          </div>
        );
      }

      if (el.name === 'code') {
        const className = [el.attribs?.class, 'mono-font'].filter(Boolean).join(' ');
        const children = domToReact(el.children as DOMNode[], options);
        return <code className={className}>{children}</code>;
      }

      if (el.name === 'pre') {
        const firstCode = (el.children ?? []).find(
          (c): c is Element => {
            const maybeEl = c as unknown as Element;
            return maybeEl.type === 'tag' && maybeEl.name === 'code';
          },
        );
        const codeClass = firstCode?.attribs?.class ?? '';
        const languageClass = codeClass
          .split(/\s+/)
          .find((token) => token.startsWith('language-'));

        const children = domToReact(el.children as DOMNode[], options);
        return (
          <pre
            className={[styles.codeBlock, languageClass].filter(Boolean).join(' ')}
          >
            {children}
          </pre>
        );
      }
    },
  };

  return parse(preprocessMarkdownInline(html), options);
}
