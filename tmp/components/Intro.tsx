
import React from 'react';
import { Github, MapPin, ArrowRight } from 'lucide-react';
import { BIO, DESCRIPTION, TWITTER_URL, GITHUB_URL, ID, NAME } from '../constants';

const Intro: React.FC = () => {
  return (
    <section className="pt-20 pb-32 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
      {/* Column 1: Profile Image - SQUARE */}
      <div className="relative group">
        <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-zinc-100 shadow-2xl transition-all duration-700 hover:shadow-blue-600/10">
          <img 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800" 
            alt={NAME}
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-40"></div>
        </div>
      </div>

      {/* Column 2: Profile Info */}
      <div className="flex flex-col justify-center">
        <div className="mb-6">
          <span className="text-[10px] mono-font text-zinc-400 lowercase block mb-1">about</span>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 rounded-full bg-blue-600"></div>
            <span className="text-[11px] font-black uppercase tracking-[0.4em] text-zinc-400">
              PROFILE
            </span>
          </div>
        </div>

        <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-zinc-900 mb-10 leading-none">
          {ID}
        </h2>
        
        <div className="mb-12">
          <span className="text-[10px] mono-font text-zinc-400 lowercase block mb-3">intro</span>
          <p className="text-xl md:text-2xl text-zinc-800 leading-relaxed font-bold">
            {BIO}
          </p>
        </div>

        <div className="mb-12">
          <span className="text-[10px] mono-font text-zinc-400 lowercase block mb-3">details</span>
          <p className="text-sm text-zinc-500 leading-relaxed font-medium max-w-lg">
            {DESCRIPTION}
          </p>
        </div>

        <div className="mb-12">
          <span className="text-[10px] mono-font text-zinc-400 lowercase block mb-3">area</span>
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
              <MapPin size={14} className="text-blue-600" />
            </div>
            <span className="text-sm font-bold text-zinc-900 tracking-tight italic">Tokyo / Remote ok</span>
          </div>
        </div>

        <div>
          <span className="text-[10px] mono-font text-zinc-400 lowercase block mb-3">social</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a 
              href={TWITTER_URL} 
              target="_blank" 
              className="flex items-center justify-between p-4 rounded-2xl border border-zinc-100 bg-white hover:border-zinc-900/30 transition-all duration-300 group shadow-sm"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-zinc-50 group-hover:bg-zinc-900 group-hover:text-white transition-all">
                  <span className="font-black text-lg text-inherit">X</span>
                </div>
                <span className="text-sm font-bold mono-font text-zinc-900 uppercase tracking-widest">X</span>
              </div>
              <ArrowRight size={14} className="text-zinc-300 group-hover:text-zinc-900 group-hover:translate-x-1 transition-all" />
            </a>
            
            <a 
              href={GITHUB_URL} 
              target="_blank" 
              className="flex items-center justify-between p-4 rounded-2xl border border-zinc-100 bg-white hover:border-zinc-900/30 transition-all duration-300 group shadow-sm"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-zinc-50 group-hover:bg-zinc-900 group-hover:text-white transition-all">
                  <Github size={18} />
                </div>
                <span className="text-sm font-bold mono-font text-zinc-900 uppercase tracking-widest">GitHub</span>
              </div>
              <ArrowRight size={14} className="text-zinc-300 group-hover:text-zinc-900 group-hover:translate-x-1 transition-all" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Intro;
