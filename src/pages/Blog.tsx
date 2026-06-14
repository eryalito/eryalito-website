import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getPostMetadata, type PostMeta } from '../lib/posts';

const palette = [
  '#fecaca', // red
  '#bbf7d0', // green
  '#bfdbfe', // blue
  '#fbcfe8', // pink
  '#fed7aa', // orange
  '#ddd6fe', // purple
  '#a5f3fc', // cyan
  '#fde68a', // yellow
];

const Blog = () => {
  const [posts, setPosts] = useState<PostMeta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPostMetadata().then((posts) => {
      setPosts(posts);
      setLoading(false);
    });
  }, []);

  const categoryColors = useMemo(() => {
    const uniqueCategories = [...new Set(posts.map(p => p.category))];
    const colors: Record<string, string> = {};
    uniqueCategories.forEach((cat, i) => {
      colors[cat] = palette[i % palette.length];
    });
    return colors;
  }, [posts]);

  return (
    <section id="blog" className="section">
      <div className="mx-auto px-4 py-10">
        <h1 className="mb-8 font-bold text-3xl tracking-wide text-center text-primary">Blog</h1>
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : posts.length === 0 ? (
          <p className="text-center">No posts yet. Coming soon...</p>
        ) : (
          <div className="flex flex-wrap justify-center gap-8">
            {posts.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="rounded-md px-6 py-4 w-96 max-w-full flex flex-col items-start"
                style={{ background: '#fef3c7', border: '1px solid #fde68a', boxShadow: '0 4px 16px 0 rgba(0,0,0,0.10)' }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span 
                    className="text-xs px-2 py-1 rounded font-semibold capitalize"
                    style={{ background: categoryColors[post.category] || '#e5e7eb', color: '#27272a' }}
                  >
                    {post.category}
                  </span>
                </div>
                <h2 className="text-xl mb-2" style={{ color: '#27272a' }}>{post.title}</h2>
                <p className="mb-4" style={{ color: '#52525b' }}>{post.description}</p>
                <span className="text-sm" style={{ color: '#71717a', marginTop: 'auto' }}>{post.date}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;