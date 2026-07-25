import { getSkills } from '../lib/microcms';

import styles from './TechStack.module.css';

const TechStack = async () => {
  const skills = await getSkills();
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>SKILLS</h2>
      <div className={styles.grid}>
        {skills.map((skill) => (
          <div key={skill.id} className={styles.item}>
            <div 
              className={styles.dot}
              style={{ backgroundColor: skill.color || '#d4d4d8' }}
            />
            <span className={`${styles.name} mono-font`}>{skill.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechStack;
