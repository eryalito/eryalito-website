import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { getPostBySlug } from '../lib/posts';
import remarkGfm from 'remark-gfm';

interface PostWithDate {
  date: string;
  category: string;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [content, setContent] = useState<string>('');
  const [postMeta, setPostMeta] = useState<PostWithDate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!slug) return;

    getPostBySlug(slug).then((post) => {
      if (!post) {
        setError(true);
        setLoading(false);
        return;
      }

      setPostMeta({ date: post.date, category: post.category });

      fetch(post.path)
        .then((res) => {
          if (!res.ok) throw new Error('Not found');
          return res.text();
        })
        .then((text) => {
          setContent(text);
          setLoading(false);
        })
        .catch(() => {
          setError(true);
          setLoading(false);
        });
    });
  }, [slug]);

  if (loading) {
    return (
      <div className="mx-auto px-4 py-10">
        <p className="text-center">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto px-4 py-10">
        <p className="text-center">Post not found</p>
        <Link to="/blog" className="block text-center mt-4">Back to Blog</Link>
      </div>
    );
  }

  return (
    <article className="mx-auto px-4 py-10 pb-40 max-w-3xl">
      <Link to="/blog" className="inline-block mb-4 text-zinc-400 hover:text-white">&larr; Back to Blog</Link>
      {postMeta && (
        <div className="mb-6 text-zinc-400 text-sm">
          <span>{postMeta.date}</span>
          <span className="mx-2">·</span>
          <span className="capitalize">{postMeta.category}</span>
        </div>
      )}
      <div className="prose prose-invert max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </div>
    </article>
  );
};

export default BlogPost;