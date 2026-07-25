import { ArrowUpRight } from 'lucide-react';
import { getProfile } from '../lib/microcms';

import styles from './Contact.module.css';

const Contact = async () => {
  const profile = await getProfile();
  
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div>
          <h2 className={styles.heading}>CONTACT</h2>
          <p className={styles.message}>
            お仕事のご相談は{' '}
            <a href={profile.xUrl} target="_blank" rel="noopener noreferrer" className={styles.inlineLink}>
              X
            </a>{' '}
            のDMまで。
          </p>
        </div>
        
        <a 
          href={profile.xUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.button}
        >
          <span>DMを送る</span>
          <ArrowUpRight size={18} />
        </a>
      </div>
    </section>
  );
};

export default Contact;
