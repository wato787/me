import { createClient } from 'microcms-js-sdk';

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN!,
  apiKey: process.env.MICROCMS_API_KEY!,
});

export interface Profile {
  name: string;
  introduction: string;
  area: string;
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

