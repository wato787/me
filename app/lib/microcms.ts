import { createClient } from 'microcms-js-sdk';
export { optimizeImageUrl } from './images';

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN!,
  apiKey: process.env.MICROCMS_API_KEY!,
});

export interface Profile {
  name: string;
  introduction: string;
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
  const data = await client.get<Profile>({
    endpoint: 'profile',
  });
  return data;
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
  const data = await client.get<Blog>({
    endpoint: 'blogs',
    contentId: id,
  });
  return data;
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

