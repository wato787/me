import { ChevronRight } from 'lucide-react';
import { getBlogs } from '../lib/microcms';
import { formatDateMdDot } from '../lib/date';

const groupBlogsByYear = (blogs: Awaited<ReturnType<typeof getBlogs>>) => {
  const grouped: Record<string, typeof blogs> = {};
  blogs.forEach((blog) => {
    const year = new Date(blog.createdAt).getFullYear().toString();
    if (!grouped[year]) {
      grouped[year] = [];
    }
    grouped[year].push(blog);
  });
  return grouped;
};

const BlogPage = async () => {
  const blogs = await getBlogs();
  const groupedBlogs = groupBlogsByYear(blogs);
  return (
    <div className="min-h-screen bg-white selection:bg-blue-600 selection:text-white antialiased">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <header className="mb-32">
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-zinc-900 leading-none mb-6">
          LOG
        </h1>
        <p className="text-zinc-500 text-sm font-medium">
          これまでに書いた記事の一覧です。
        </p>
      </header>

      <div className="space-y-32">
        {Object.entries(groupedBlogs)
          .sort(([yearA], [yearB]) => parseInt(yearB) - parseInt(yearA))
          .map(([year, yearBlogs]) => (
            <section key={year}>
              <div className="flex items-center gap-4 mb-16">
                <span className="text-xs mono-font font-black text-blue-600">{year}</span>
                <div className="h-px flex-grow bg-zinc-100"></div>
              </div>

              <div className="space-y-20">
                {yearBlogs.map((blog) => (
                  <article key={blog.id} className="group relative">
                    <div className="flex flex-col md:flex-row gap-4 md:gap-16">
                      <div className="md:w-32 flex-shrink-0">
                        <span className="text-sm mono-font font-bold text-zinc-300 group-hover:text-blue-600 transition-colors">
                          {formatDateMdDot(blog.createdAt)}
                        </span>
                      </div>
                      
                      <div className="flex-grow">
                        <a href={`/blog/${blog.id}`} className="block group-hover:translate-x-1 transition-transform duration-300">
                          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                            {blog.title}
                          </h2>
                        </a>
                        
                        {blog.description && (
                          <p className="mt-4 text-zinc-500 text-sm leading-relaxed max-w-2xl">
                            {blog.description}
                          </p>
                        )}
                        
                        <div className="mt-6">
                          <a 
                            href={`/blog/${blog.id}`}
                            className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-zinc-300 group-hover:text-blue-600 transition-colors mono-font"
                          >
                            Open <ChevronRight size={12} />
                          </a>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
      </div>

        <div className="mt-64 text-center">
          <span className="inline-block w-8 h-px bg-zinc-100 mb-8"></span>
          <p className="text-[9px] mono-font text-zinc-300 uppercase tracking-[0.3em]">EOF</p>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
