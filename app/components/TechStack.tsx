import { getSkills } from '../lib/microcms';

const TechStack = async () => {
  const skills = await getSkills();
  return (
    <section className="mb-64">
      <h2 className="text-[10px] uppercase tracking-[0.6em] text-blue-600 mb-16 font-black">
        SKILLS
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-y-10 gap-x-8">
        {skills.map((skill) => (
          <div 
            key={skill.id} 
            className="flex items-center gap-4 group cursor-default"
          >
            <div 
              className="w-2 h-2 rounded-full transition-transform duration-300 group-hover:scale-150 shadow-[0_0_0_0px_rgba(0,0,0,0)] group-hover:shadow-[0_0_8px_rgba(0,0,0,0.1)]"
              style={{ backgroundColor: skill.color || '#d4d4d8' }}
            />
            <span className="text-sm font-bold text-zinc-900 mono-font tracking-tight group-hover:text-blue-600 transition-colors duration-300">
              {skill.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechStack;
