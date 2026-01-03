
import React from 'react';
import { 
  Terminal, 
  Code2, 
  Globe, 
  Atom, 
  Cloud, 
  Database, 
  Layers, 
  Box, 
  Figma 
} from 'lucide-react';
import { TECH_STACK } from '../../constants';

const IconMap: Record<string, React.ReactNode> = {
  "Go": <Terminal size={18} />,
  "TypeScript": <Code2 size={18} />,
  "Next.js": <Globe size={18} />,
  "React": <Atom size={18} />,
  "Cloudflare": <Cloud size={18} />,
  "PostgreSQL": <Database size={18} />,
  "Tailwind CSS": <Layers size={18} />,
  "Docker": <Box size={18} />,
  "Figma": <Figma size={18} />,
};

const TechStack: React.FC = () => {
  return (
    <section className="mb-64">
      <h2 className="text-[10px] uppercase tracking-[0.6em] text-blue-600 mb-16 font-black">
        SKILLS
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-y-12 gap-x-8">
        {TECH_STACK.map((tech, index) => (
          <div 
            key={index} 
            className="flex items-center gap-6 group"
          >
            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-zinc-50 border border-zinc-100 text-zinc-300 group-hover:text-blue-600 group-hover:border-blue-100 group-hover:bg-blue-50/30 transition-all duration-300">
              {IconMap[tech.name] || <Terminal size={18} />}
            </div>
            <span className="text-base font-bold text-zinc-900 mono-font tracking-tight group-hover:translate-x-1 transition-transform">
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechStack;
