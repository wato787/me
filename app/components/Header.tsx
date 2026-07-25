import { Terminal } from 'lucide-react';
import { getProfile } from '../lib/microcms';
import Link from 'next/link';

import styles from './Header.module.css';

const Header = async () => {
  const profile = await getProfile();
  
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logoLink}>
        <Terminal size={18} className={styles.logoIcon} />
        <span className={`${styles.logoText} mono-font`}>{profile.name}</span>
      </Link>
      <nav>
        <ul className={styles.navList}>
          <li>
            <Link href="/blog" className={styles.navLink}>Blog</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
