import { ArrowUpRight } from 'lucide-react';

interface Project {
  name: string;
  githubUrl: string;
}

const PROJECTS: Project[] = [
  { name: "Nexus Design System", githubUrl: "https://github.com/wato787/nexus" },
  { name: "Aura Motion Engine", githubUrl: "https://github.com/wato787/aura" },
  { name: "Zenith API Gateway", githubUrl: "https://github.com/wato787/zenith" },
];

const ProjectList = () => {
  return (
    <section id="works" className="mb-64">
      <h2 className="text-[10px] uppercase tracking-[0.6em] text-blue-600 mb-16 font-black">
        WORKS
      </h2>
      <div className="space-y-0">
        {PROJECTS.map((project, index) => (
          <div key={index} className="group border-b border-zinc-100 py-10 flex justify-between items-center first:border-t">
            <h3 className="text-2xl md:text-3xl font-black text-zinc-900 group-hover:text-blue-600 transition-colors duration-300 tracking-tighter">
              {project.name}
            </h3>
            <a 
              href={project.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[10px] font-black text-zinc-300 group-hover:text-blue-600 transition-all mono-font uppercase tracking-widest"
            >
              GitHub <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectList;

