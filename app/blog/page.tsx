import { ChevronRight } from 'lucide-react';
import { getBlogs } from '../lib/microcms';
import { formatDateMdDot } from '../lib/date';

import styles from './page.module.css';

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
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>LOG</h1>
          <p className={styles.subtitle}>これまでに書いた記事の一覧です。</p>
        </header>

        <div className={styles.years}>
          {Object.entries(groupedBlogs)
            .sort(([yearA], [yearB]) => parseInt(yearB) - parseInt(yearA))
            .map(([year, yearBlogs]) => (
              <section key={year}>
                <div className={styles.yearHeader}>
                  <span className={`${styles.yearLabel} mono-font`}>{year}</span>
                  <div className={styles.yearLine} />
                </div>

                <div className={styles.articles}>
                  {yearBlogs.map((blog) => (
                    <article key={blog.id} className={styles.article}>
                      <div className={styles.articleRow}>
                        <div className={styles.dateCol}>
                          <span className={`${styles.date} mono-font`}>
                            {formatDateMdDot(blog.createdAt)}
                          </span>
                        </div>

                        <div className={styles.contentCol}>
                          <a href={`/blog/${blog.id}`} className={styles.titleLink}>
                            <h2 className={styles.articleTitle}>{blog.title}</h2>
                          </a>

                          {blog.description && (
                            <p className={styles.description}>{blog.description}</p>
                          )}

                          <div className={styles.readMoreWrap}>
                            <a
                              href={`/blog/${blog.id}`}
                              className={`${styles.readMore} mono-font`}
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

        <div className={styles.eof}>
          <span className={styles.eofLine} />
          <p className={`${styles.eofText} mono-font`}>EOF</p>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
