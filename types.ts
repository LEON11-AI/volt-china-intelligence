export interface NavLink {
  label: string;
  href: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

export interface ResearchReport {
  title: string;
  description: string;
  pages: string;
  link: string;
  imageUrl: string;
  isFeatured?: boolean;
}