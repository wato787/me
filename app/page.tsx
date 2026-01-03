
import Intro from './components/Intro';
import PostList from './components/PostList';
import TechStack from './components/TechStack';
import ProjectList from './components/ProjectList';
import Contact from './components/Contact';


export default async function Home() {
  return (

        <main className="animate-in fade-in slide-in-from-bottom-4 duration-1000 fill-mode-both">
          <Intro />
          <PostList />
          <TechStack />
          <ProjectList />
          <Contact />
        </main>
 

  );
}