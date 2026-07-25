import Intro from './components/Intro';
import PostList from './components/PostList';
import TechStack from './components/TechStack';
import ProjectList from './components/ProjectList';
import Contact from './components/Contact';

import styles from './page.module.css';

export default async function Home() {
  return (
    <main className={styles.main}>
      <Intro />
      <PostList />
      <TechStack />
      <ProjectList />
      <Contact />
    </main>
  );
}
