import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import parse, { domToReact, type DOMNode, type HTMLReactParserOptions } from 'html-react-parser';
import type { Element } from 'domhandler';

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
  // microCMS の画像配信に最適化パラメータを付与（既存パラメータは上書き）
  if (src.includes('images.microcms-assets.io')) {
    return optimizeImageUrl(src, width ?? DEFAULT_CONTENT_IMAGE_WIDTH, height, 'webp');
  }
  return src;
}

/**
 * microCMSの本文HTMLを React Node に変換する
 * - img -> next/image に置換
 * - a   -> 内部リンクは next/link、外部は rel を安全に補強
 * - script/style は除去
 * - iframe はレスポンシブ枠でラップ
 */
export function renderArticleHtml(html: string): ReactNode {
  if (!html) return null;

  const options: HTMLReactParserOptions = {
    replace: (node) => {
      if (node.type !== 'tag') return;
      const el = node as unknown as Element;

      // XSS/崩れ防止（microCMS側で管理していても念のため）
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

        // width/height が取れないHTMLもあるため、フォールバックを用意
        if (width && height) {
          return (
            <span className="block my-10">
              <Image
                src={optimizedSrc}
                alt={alt}
                width={width}
                height={height}
                sizes="(max-width: 768px) 100vw, 768px"
                className="h-auto w-full rounded-lg border border-zinc-100"
              />
            </span>
          );
        }

        return (
          <span className="block relative my-10 w-full aspect-[16/9]">
            <Image
              src={optimizedSrc}
              alt={alt}
              fill
              sizes="100vw"
              className="rounded-lg border border-zinc-100 object-contain"
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
          <div className="relative my-10 w-full aspect-video">
            <iframe
              src={src}
              title={title}
              loading="lazy"
              allow={allow}
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              className="absolute inset-0 h-full w-full rounded-lg border border-zinc-100"
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
        // Prism のテーマCSSは pre/code の language-* クラスに紐づくため、
        // 子の <code class="language-xxx"> があれば pre 側にも付与する。
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
            className={[
              'my-10 overflow-x-auto rounded-lg border border-zinc-100 bg-zinc-50 p-4 text-sm mono-font',
              languageClass,
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {children}
          </pre>
        );
      }
    },
  };

  return parse(html, options);
}

