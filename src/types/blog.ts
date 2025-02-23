export interface Author {
  name: string;
  role: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  author: Author;
  featured?: boolean;
}

export interface Category {
  name: string;
  slug: string;
  count: number;
}