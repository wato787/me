import { getBlogs } from '../lib/microcms';

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
};

const PostList = async () => {
  const blogs = await getBlogs();
  return (
    <section id="blog" className="mb-64">
      <div className="flex items-end justify-between mb-16">
        <h2 className="text-[10px] uppercase tracking-[0.6em] text-blue-600 font-black">
          LOG
        </h2>
      </div>
      
      <div className="space-y-0">
        {blogs.map((blog) => (
          <a 
            key={blog.id} 
            href={`/blog/${blog.id}`}
            className="group flex flex-col md:flex-row md:items-baseline gap-2 md:gap-12 py-8 border-b border-zinc-100 first:border-t"
          >
            <span className="text-sm font-medium text-zinc-400 mono-font w-32 flex-shrink-0 transition-colors group-hover:text-zinc-500">
              {formatDate(blog.createdAt)}
            </span>
            <span className="text-xl md:text-2xl font-bold text-zinc-900 group-hover:text-blue-600 transition-colors duration-300">
              {blog.title}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
};

export default PostList;

