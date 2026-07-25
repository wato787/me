import type { ReactNode } from 'react';

import PrismHighlighter from '../PrismHighlighter';

import styles from './articleContent.module.css';

type Props = {
  children: ReactNode;
};

export default function ArticleBody({ children }: Props) {
  return (
    <div className={styles.root}>
      <PrismHighlighter>{children}</PrismHighlighter>
    </div>
  );
}
