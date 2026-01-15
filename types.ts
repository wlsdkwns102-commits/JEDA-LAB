
export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  summary: string;
  overview: string;
  problem: string;
  strategy: string;
  images: string[];
  client?: string;
  duration?: string;
  featured?: boolean;
}

export interface Category {
  id: string;
  name: string;
}

export interface ServicePackage {
  id: string;
  title: string;
  description: string;
  recommendedFor: string[];
  includes: string[];
  process: string;
  timeline: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export enum ProjectCategory {
  WEBSITE = '웹사이트',
  LANDING = '상세페이지',
  UI_UX = 'UI 리디자인',
  BRANDING = '브랜드',
  OPERATIONS = '운영디자인'
}
