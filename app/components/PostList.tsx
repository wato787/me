import { getBlogs } from '../lib/microcms';

import styles from './PostList.module.css';

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
    <section id="blog" className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.heading}>LOG</h2>
      </div>
      
      <div className={styles.list}>
        {blogs.map((blog) => (
          <a 
            key={blog.id} 
            href={`/blog/${blog.id}`}
            className={styles.item}
          >
            <span className={`${styles.date} mono-font`}>
              {formatDate(blog.createdAt)}
            </span>
            <span className={styles.title}>{blog.title}</span>
          </a>
        ))}
      </div>
    </section>
  );
};

export default PostList;
