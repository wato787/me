
import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { TWITTER_URL } from '../../constants';

const Contact: React.FC = () => {
  return (
    <section className="mb-40 pt-20 border-t border-zinc-100">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <h2 className="text-[11px] font-black uppercase tracking-[0.5em] text-blue-600 mb-4">CONTACT</h2>
          <p className="text-3xl font-black tracking-tighter text-zinc-900">
            お仕事のご相談は <a href={TWITTER_URL} target="_blank" className="text-blue-600 hover:underline">X</a> のDMまで。
          </p>
        </div>
        
        <a 
          href={TWITTER_URL}
          target="_blank"
          className="inline-flex items-center space-x-4 bg-zinc-900 hover:bg-blue-600 text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest transition-all duration-300 shadow-md"
        >
          <span>DMを送る</span>
          <ArrowUpRight size={18} />
        </a>
      </div>
    </section>
  );
};

export default Contact;
