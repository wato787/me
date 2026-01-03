
import React from 'react';
import { Terminal } from 'lucide-react';
import { ID } from '../constants';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 flex justify-between items-center py-8 bg-white/80 backdrop-blur-md">
      <div className="flex items-center space-x-3">
        <Terminal size={18} className="text-blue-600" />
        <span className="text-sm font-black tracking-tighter uppercase leading-none mono-font">{ID}</span>
      </div>
      <nav>
        <ul className="flex space-x-6 text-[11px] font-bold uppercase tracking-[0.1em] text-zinc-400">
          <li>
            <a href="#blog" className="hover:text-black transition-colors">Blog</a>
          </li>
          <li>
            <a href="#works" className="hover:text-black transition-colors">Works</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
