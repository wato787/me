 'use client';
 
 import { useEffect, type ReactNode } from 'react';
 
 type Props = {
   children: ReactNode;
 };
 
 function isPrismLike(value: unknown): value is { highlightAll: () => void } {
   if (!value || typeof value !== 'object') return false;
   return typeof (value as { highlightAll?: unknown }).highlightAll === 'function';
 }
 
 export default function PrismHighlighter({ children }: Props) {
   useEffect(() => {
     let cancelled = false;
 
     const run = async () => {
       // Prism はブラウザ側でのみ実行する
       const prismModule = (await import('prismjs')) as unknown;
       // prismjs のエクスポート形態差を吸収
       const Prism =
         prismModule &&
         typeof prismModule === 'object' &&
         'default' in prismModule &&
         (prismModule as { default?: unknown }).default
           ? (prismModule as { default: unknown }).default
           : prismModule;
 
       // よく使う言語を追加（必要に応じて増やせます）
       await Promise.all([
         import('prismjs/components/prism-markup'),
         import('prismjs/components/prism-css'),
         import('prismjs/components/prism-javascript'),
         import('prismjs/components/prism-typescript'),
         import('prismjs/components/prism-jsx'),
         import('prismjs/components/prism-tsx'),
         import('prismjs/components/prism-bash'),
         import('prismjs/components/prism-json'),
         import('prismjs/components/prism-yaml'),
       ]);
 
       if (cancelled) return;
       if (!isPrismLike(Prism)) return;
       Prism.highlightAll();
     };
 
     void run();
 
     return () => {
       cancelled = true;
     };
   }, []);
 
   return children;
 }

