
export interface Post {
  date: string;
  title: string;
  url: string;
  description?: string;
}

export interface Project {
  name: string;
  githubUrl: string;
}

export interface TechItem {
  name: string;
}
