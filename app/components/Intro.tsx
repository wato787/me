import Image from 'next/image';
import { Code, MapPin, ArrowRight } from 'lucide-react';
import { getProfile, optimizeImageUrl } from '../lib/microcms';

import styles from './Intro.module.css';

const Intro = async () => {
  const profile = await getProfile();
  const imageUrl = profile.image?.url 
    ? optimizeImageUrl(profile.image.url, 800, 800, 'webp')
    : null;
  
  return (
    <section className={styles.section}>
      {imageUrl && (
        <div className={styles.imageGroup}>
          <div className={styles.imageFrame}>
            <Image 
              src={imageUrl}
              alt={profile.name}
              width={800}
              height={800}
              className={styles.profileImage}
            />
            <div className={styles.imageOverlay} />
          </div>
        </div>
      )}

      <div className={styles.content}>
        <div className={styles.labelRow}>
          <div className={styles.labelDot} />
          <span className={styles.label}>PROFILE</span>
        </div>

        <h2 className={styles.name}>{profile.name}</h2>
        
        <div className={styles.descriptionWrap}>
          <p className={styles.description}>{profile.description}</p>
        </div>

        <div className={styles.locationWrap}>
          <div className={styles.locationRow}>
            <div className={styles.locationIconWrap}>
              <MapPin size={14} className={styles.locationIcon} />
            </div>
            <span className={styles.locationText}>{profile.area}</span>
          </div>
        </div>

        <div className={styles.socialGrid}>
          <a 
            href={profile.xUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.card}
          >
            <div className={styles.cardInner}>
              <div className={styles.cardIcon}>
                <span className={styles.cardX}>X</span>
              </div>
              <span className={`${styles.cardLabel} mono-font`}>X</span>
            </div>
            <ArrowRight size={14} className={styles.cardArrow} />
          </a>
          
          <a 
            href={profile.githubUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.card}
          >
            <div className={styles.cardInner}>
              <div className={styles.cardIcon}>
                <Code size={18} />
              </div>
              <span className={`${styles.cardLabel} mono-font`}>GitHub</span>
            </div>
            <ArrowRight size={14} className={styles.cardArrow} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Intro;
