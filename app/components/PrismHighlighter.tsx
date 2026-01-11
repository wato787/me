 'use client';
 
 import { useEffect, type ReactNode } from 'react';
 
 type Props = {
   children: ReactNode;
 };
 
 export default function PrismHighlighter({ children }: Props) {
   useEffect(() => {
     let cancelled = false;
 
     const run = async () => {
       // Prism はブラウザ側でのみ実行する
       const prismModule = await import('prismjs');
       // prismjs のエクスポート形態差を吸収
       const Prism = (prismModule as unknown as { default?: any }).default ?? prismModule;
 
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
       Prism.highlightAll();
     };
 
     void run();
 
     return () => {
       cancelled = true;
     };
   }, []);
 
   return children;
 }

