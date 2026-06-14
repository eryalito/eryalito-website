export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  path: string;
}

export const getPostMetadata = async (): Promise<PostMeta[]> => {
  try {
    const response = await fetch('/posts/index.json');
    if (!response.ok) throw new Error('Failed to fetch');
    const posts = await response.json();
    return posts.sort((a: PostMeta, b: PostMeta) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch {
    return [];
  }
};

export const getPostBySlug = async (slug: string): Promise<PostMeta | null> => {
  const posts = await getPostMetadata();
  return posts.find(p => p.slug === slug) || null;
};
