import { renderArticleHtml } from './articleHtml';

const EMPTY_BLOCK_PATTERN = /^(?:\s|<p>(?:\s|<br\s*\/?>|&nbsp;)*<\/p>)+$/i;

function isEmptySlideHtml(html: string): boolean {
  const trimmed = html.trim();
  if (!trimmed) return true;
  return EMPTY_BLOCK_PATTERN.test(trimmed);
}

export function splitSlideHtml(html: string): string[] {
  if (!html) return [];

  return html
    .split(/<hr\b[^>]*>/i)
    .map((chunk) => chunk.trim())
    .filter((chunk) => !isEmptySlideHtml(chunk));
}

export function renderSlideHtml(html: string): string[] {
  return splitSlideHtml(html).map(renderArticleHtml).filter((chunk) => !isEmptySlideHtml(chunk));
}
