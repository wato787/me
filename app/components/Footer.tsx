import Link from 'next/link';
import { getProfile } from '../lib/microcms';

const Footer = async () => {
  const profile = await getProfile();

  return (
      <footer className="py-32 border-t border-zinc-100 flex flex-col md:flex-row justify-between items-center gap-8">
          <Link href="/" className="text-sm font-black mono-font tracking-tighter uppercase text-zinc-900">
            {profile.name}
          </Link>
          
          <div className="flex gap-12 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 items-center">
            <a href={profile.xUrl} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">X</a>
            <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">GitHub</a>
            <span className="w-1 h-1 bg-zinc-100 rounded-full"></span>
            <span className="text-zinc-300 cursor-default mono-font">
              &copy; {new Date().getFullYear()}
            </span>
          </div>
        </footer>
  );
};

export default Footer;