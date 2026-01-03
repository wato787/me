import Header from './components/Header';
import Intro from './components/Intro';
import PostList from './components/PostList';
import TechStack from './components/TechStack';
import ProjectList from './components/ProjectList';
import Contact from './components/Contact';

const ID = "wato787";
const TWITTER_URL = "https://x.com/wato787";
const GITHUB_URL = "https://github.com/wato787";

export default function Home() {
  return (
    <div className="min-h-screen bg-white selection:bg-blue-600 selection:text-white antialiased">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <Header />
        
        <main className="animate-in fade-in slide-in-from-bottom-4 duration-1000 fill-mode-both">
          <Intro />

          <PostList />

          <TechStack />

          <ProjectList />

          <Contact />
        </main>

        <footer className="py-32 border-t border-zinc-100 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-sm font-black mono-font tracking-tighter uppercase text-zinc-900">
            {ID}
          </div>
          
          <div className="flex gap-12 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 items-center">
            <a href={TWITTER_URL} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">X</a>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">GitHub</a>
            <span className="w-1 h-1 bg-zinc-100 rounded-full"></span>
            <span className="text-zinc-300 cursor-default mono-font">
              &copy; {new Date().getFullYear()}
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
