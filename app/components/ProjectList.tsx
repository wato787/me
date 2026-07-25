import { ArrowUpRight } from 'lucide-react';

import styles from './ProjectList.module.css';

interface Project {
  name: string;
  githubUrl: string;
}

const PROJECTS: Project[] = [];

const ProjectList = () => {
  if (PROJECTS.length === 0) {
    return null;
  }

  return (
    <section id="works" className={styles.section}>
      <h2 className={styles.heading}>WORKS</h2>
      <div className={styles.list}>
        {PROJECTS.map((project, index) => (
          <div key={index} className={styles.item}>
            <h3 className={styles.title}>{project.name}</h3>
            <a 
              href={project.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`${styles.link} mono-font`}
            >
              GitHub <ArrowUpRight size={14} className={styles.linkIcon} />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectList;
