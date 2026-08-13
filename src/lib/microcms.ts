import { createClient } from 'microcms-js-sdk';

export const client = createClient({
  serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: import.meta.env.MICROCMS_API_KEY,
});

export interface Profile {
  name: string;
  area: string;
  description?: string;
  image?: {
    url: string;
    width: number;
    height: number;
  };
  xUrl: string;
  githubUrl: string;
}

export async function getProfile(): Promise<Profile> {
  return client.get<Profile>({
    endpoint: 'profile',
  });
}

export function optimizeImageUrl(
  url: string,
  width?: number,
  height?: number,
  format: 'webp' | 'jpg' | 'png' = 'webp',
): string {
  try {
    const u = new URL(url);
    if (width) u.searchParams.set('w', width.toString());
    if (height) u.searchParams.set('h', height.toString());
    u.searchParams.set('f', format);
    u.searchParams.set('q', '80');
    return u.toString();
  } catch {
    const params = new URLSearchParams();
    if (width) params.set('w', width.toString());
    if (height) params.set('h', height.toString());
    params.set('f', format);
    params.set('q', '80');

    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}${params.toString()}`;
  }
}

export interface Blog {
  id: string;
  title: string;
  description?: string;
  content?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export async function getBlogs(): Promise<Blog[]> {
  const data = await client.getList<Blog>({
    endpoint: 'blogs',
    queries: {
      orders: '-createdAt',
    },
  });
  return data.contents;
}

export async function getBlogById(id: string): Promise<Blog> {
  return client.get<Blog>({
    endpoint: 'blogs',
    contentId: id,
    queries: { richEditorFormat: 'html' },
  });
}

export interface Slide {
  id: string;
  title: string;
  content?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export async function getSlides(): Promise<Slide[]> {
  const data = await client.getList<Slide>({
    endpoint: 'slides',
    queries: {
      orders: '-createdAt',
      fields: 'id,title,createdAt,updatedAt,publishedAt',
    },
  });
  return data.contents;
}

export async function getSlideById(id: string): Promise<Slide> {
  return client.get<Slide>({
    endpoint: 'slides',
    contentId: id,
    queries: { richEditorFormat: 'html' },
  });
}

export interface Skill {
  id: string;
  name: string;
  color?: string;
}

export async function getSkills(): Promise<Skill[]> {
  const data = await client.getList<Skill>({
    endpoint: 'skills',
  });
  return data.contents;
}
