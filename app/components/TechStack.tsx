interface TechItem {
  name: string;
}

const TECH_STACK: TechItem[] = [
  { name: "Go" },
  { name: "TypeScript" },
  { name: "Next.js" },
  { name: "React" },
  { name: "Cloudflare" },
  { name: "PostgreSQL" },
  { name: "Tailwind CSS" },
  { name: "Docker" },
  { name: "Figma" },
];

const ColorMap: Record<string, string> = {
  "Go": "#00ADD8",
  "TypeScript": "#3178C6",
  "Next.js": "#000000",
  "React": "#61DAFB",
  "Cloudflare": "#F38020",
  "PostgreSQL": "#4169E1",
  "Tailwind CSS": "#06B6D4",
  "Docker": "#2496ED",
  "Figma": "#F24E1E",
};

const TechStack = () => {
  return (
    <section className="mb-64">
      <h2 className="text-[10px] uppercase tracking-[0.6em] text-blue-600 mb-16 font-black">
        SKILLS
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-y-10 gap-x-8">
        {TECH_STACK.map((tech, index) => (
          <div 
            key={index} 
            className="flex items-center gap-4 group cursor-default"
          >
            <div 
              className="w-2 h-2 rounded-full transition-transform duration-300 group-hover:scale-150 shadow-[0_0_0_0px_rgba(0,0,0,0)] group-hover:shadow-[0_0_8px_rgba(0,0,0,0.1)]"
              style={{ backgroundColor: ColorMap[tech.name] || '#d4d4d8' }}
            />
            <span className="text-sm font-bold text-zinc-900 mono-font tracking-tight group-hover:text-blue-600 transition-colors duration-300">
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechStack;
