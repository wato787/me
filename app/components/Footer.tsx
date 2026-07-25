import Link from 'next/link';
import { getProfile } from '../lib/microcms';

import styles from './Footer.module.css';

const Footer = async () => {
  const profile = await getProfile();

  return (
    <footer className={styles.footer}>
      <Link href="/" className={`${styles.brand} mono-font`}>
        {profile.name}
      </Link>

      <div className={styles.links}>
        <a href={profile.xUrl} target="_blank" rel="noopener noreferrer" className={styles.link}>X</a>
        <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className={styles.link}>GitHub</a>
        <span className={styles.divider} />
        <span className={`${styles.copyright} mono-font`}>
          &copy; {new Date().getFullYear()}
        </span>
      </div>
    </footer>
  );
};

export default Footer;
