import { Terminal } from 'lucide-react';
import { getProfile } from '../lib/microcms';
import Link from 'next/link';

const Header = async () => {
  const profile = await getProfile();
  
  return (
    <header className="sticky top-0 z-50 flex justify-between items-center py-8 bg-white/80 backdrop-blur-md">
      <Link href="/" className="flex items-center space-x-3">
        <Terminal size={18} className="text-blue-600" />
        <span className="text-sm font-black tracking-tighter uppercase leading-none mono-font">{profile.name}</span>
      </Link>
      <nav>
        <ul className="flex space-x-6 text-[11px] font-bold uppercase tracking-[0.1em] text-zinc-500">
          <Link href="/blog" className="hover:text-black transition-colors">Blog</Link>
          {/* <li>
            <a href="#works" className="hover:text-black transition-colors">Works</a>
          </li> */}
        </ul>
      </nav>
    </header>
  );
};

export default Header;

