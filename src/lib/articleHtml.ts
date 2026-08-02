import { highlightCodeBlock } from './highlight';
import { optimizeImageUrl } from './microcms';

const DEFAULT_CONTENT_IMAGE_WIDTH = 1200;

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function decodeHtmlEntities(s: string): string {
  return s
    .replace(/&#(\d+);/g, (_entity, code: string) => String.fromCodePoint(Number.parseInt(code, 10)))
    .replace(/&#x([\da-f]+);/gi, (_entity, code: string) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
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

function isExternalHref(href: string): boolean {
  return href.startsWith('http://') || href.startsWith('https://') || href.startsWith('//');
}

function ensureSafeRel(attributes: string, href: string): string {
  if (!isExternalHref(href) && !attributes.includes('target="_blank"')) return attributes;
  if (/\srel=(["']).*?\1/i.test(attributes)) {
    return attributes.replace(/\srel=(["']).*?\1/i, ' rel="noopener noreferrer"');
  }
  return `${attributes} rel="noopener noreferrer"`;
}

function getAttribute(attributes: string, name: string): string | undefined {
  const match = attributes.match(new RegExp(`\\s${name}=(["'])(.*?)\\1`, 'i'));
  return match?.[2];
}

function toInt(value: string | undefined): number | undefined {
  if (!value) return undefined;
  const n = Number.parseInt(value, 10);
  return Number.isFinite(n) ? n : undefined;
}

function optimizeContentImageSrc(src: string, width?: number, height?: number): string {
  if (src.includes('images.microcms-assets.io')) {
    return optimizeImageUrl(src, width ?? DEFAULT_CONTENT_IMAGE_WIDTH, height, 'webp');
  }
  return src;
}

function renderCodeBlock(preAttributes: string, codeAttributes: string, codeHtml: string): string {
  const codeClassName = getAttribute(codeAttributes, 'class') ?? '';
  const languageClass = codeClassName.split(/\s+/).find((token) => token.startsWith('language-'));
  const language = languageClass?.replace(/^language-/, '');
  const highlightedHtml = highlightCodeBlock(decodeHtmlEntities(codeHtml), language);
  const preClassName = getAttribute(preAttributes, 'class');

  if (!preClassName) return highlightedHtml.replace('<pre class="', '<pre class="codeBlock ');

  const cleanPreClassName = preClassName
    .split(/\s+/)
    .filter((token) => token && token !== 'codeBlock')
    .join(' ');
  const className = cleanPreClassName ? `codeBlock ${cleanPreClassName}` : 'codeBlock';

  return highlightedHtml.replace('<pre class="', `<pre class="${className} `);
}

function preprocessMarkdownInline(html: string): string {
  return html
    .replace(/\[([^\]]*)\]\s*\(\s*([^)]+)\s*\)/g, (original, text: string, url: string) => {
      const href = url.trim();
      if (!isAllowedHref(href)) return original;
      return `<a href="${escapeHtml(href)}">${escapeHtml(text)}</a>`;
    })
    .replace(/`([^`]+)`/g, (_, code: string) => `<code>${escapeHtml(code)}</code>`)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
}

export function renderArticleHtml(html: string): string {
  if (!html) return '';

  return preprocessMarkdownInline(html)
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<img\b([^>]*)>/gi, (_tag, attributes: string) => {
      const src = getAttribute(attributes, 'src');
      if (!src) return '';
      const alt = getAttribute(attributes, 'alt') ?? '';
      const width = toInt(getAttribute(attributes, 'width'));
      const height = toInt(getAttribute(attributes, 'height'));
      const optimizedSrc = optimizeContentImageSrc(src, width, height);
      const dimensionAttrs = width && height ? ` width="${width}" height="${height}"` : '';
      const className = width && height ? 'mediaImage' : 'mediaImageFill';
      const wrapperClassName = width && height ? 'mediaWrap' : 'mediaWrapAspect';

      return `<span class="${wrapperClassName}"><img src="${escapeHtml(optimizedSrc)}" alt="${escapeHtml(alt)}"${dimensionAttrs} loading="lazy" decoding="async" class="${className}" /></span>`;
    })
    .replace(/<iframe\b([^>]*)><\/iframe>/gi, (_tag, attributes: string) => {
      const src = getAttribute(attributes, 'src');
      if (!src) return '';
      const title = getAttribute(attributes, 'title') ?? 'embedded';
      const allow = getAttribute(attributes, 'allow');
      const allowAttr = allow ? ` allow="${escapeHtml(allow)}"` : '';

      return `<div class="embed"><iframe src="${escapeHtml(src)}" title="${escapeHtml(title)}" loading="lazy"${allowAttr} allowfullscreen referrerpolicy="strict-origin-when-cross-origin" class="embedFrame"></iframe></div>`;
    })
    .replace(/<a\b([^>]*)>/gi, (tag, attributes: string) => {
      const href = getAttribute(attributes, 'href');
      if (!href) return tag;
      return `<a${ensureSafeRel(attributes, href)}>`;
    })
    .replace(
      /<pre\b([^>]*)>\s*<code\b([^>]*)>([\s\S]*?)<\/code>\s*<\/pre>/gi,
      (_tag, preAttributes: string, codeAttributes: string, codeHtml: string) =>
        renderCodeBlock(preAttributes, codeAttributes, codeHtml),
    )
    .replace(/<code\b([^>]*)>/gi, (_tag, attributes: string) => {
      const className = getAttribute(attributes, 'class');
      const nextClassName = className ? `${className} mono-font` : 'mono-font';
      const cleanAttributes = attributes.replace(/\sclass=(["']).*?\1/i, '');
      return `<code${cleanAttributes} class="${nextClassName}">`;
    });
}
