import { createHighlighter } from '@tanstack/highlight/core';
import { css } from '@tanstack/highlight/languages/css';
import { html } from '@tanstack/highlight/languages/html';
import { js } from '@tanstack/highlight/languages/js';
import { json } from '@tanstack/highlight/languages/json';
import { shell } from '@tanstack/highlight/languages/shell';
import { ts } from '@tanstack/highlight/languages/ts';
import { tsx } from '@tanstack/highlight/languages/tsx';
import { yaml } from '@tanstack/highlight/languages/yaml';

const highlighter = createHighlighter({
  languages: [css, html, js, json, shell, ts, tsx, yaml],
});

const languageAliases: Record<string, string> = {
  bash: 'shell',
  markup: 'html',
  sh: 'shell',
  zsh: 'shell',
  javascript: 'js',
  typescript: 'ts',
  yml: 'yaml',
};

export function highlightCodeBlock(code: string, language?: string): string {
  const normalizedLanguage = language ? languageAliases[language] ?? language : undefined;
  return highlighter.highlightToHtml(code, { lang: normalizedLanguage });
}
