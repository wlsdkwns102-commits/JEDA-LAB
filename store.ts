
import { PortfolioItem, Category } from './types';
import { INITIAL_PORTFOLIO } from './constants';

const DB_KEY = 'portfolio_db_v1';
const CATEGORIES_KEY = 'portfolio_categories_v2'; // 버전 업그레이드
const LAYOUT_KEY = 'portfolio_layout_v1';

const DEFAULT_CATEGORIES: Category[] = [
  { id: 'cat_1', name: '웹사이트' },
  { id: 'cat_2', name: '상세페이지' },
  { id: 'cat_3', name: 'UI 리디자인' },
  { id: 'cat_4', name: '브랜드' },
  { id: 'cat_5', name: '운영디자인' }
];

export const getPortfolioData = (): PortfolioItem[] => {
  const data = localStorage.getItem(DB_KEY);
  if (!data) {
    localStorage.setItem(DB_KEY, JSON.stringify(INITIAL_PORTFOLIO));
    return INITIAL_PORTFOLIO;
  }
  return JSON.parse(data);
};

export const savePortfolioData = (items: PortfolioItem[]) => {
  localStorage.setItem(DB_KEY, JSON.stringify(items));
};

export const getCategories = (): Category[] => {
  const data = localStorage.getItem(CATEGORIES_KEY);
  if (!data) {
    // 이전 버전(v1) 데이터가 있는지 확인하고 마이그레이션 시도
    const oldData = localStorage.getItem('portfolio_categories_v1');
    if (oldData) {
      const oldCats: string[] = JSON.parse(oldData);
      const migrated: Category[] = oldCats.map((name, i) => ({ id: `mig_${Date.now()}_${i}`, name }));
      saveCategories(migrated);
      return migrated;
    }
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(DEFAULT_CATEGORIES));
    return DEFAULT_CATEGORIES;
  }
  return JSON.parse(data);
};

export const saveCategories = (categories: Category[]) => {
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
};

export const getGalleryLayout = (): number => {
  const layout = localStorage.getItem(LAYOUT_KEY);
  return layout ? parseInt(layout, 10) : 3; // Default is 3 columns
};

export const saveGalleryLayout = (columns: number) => {
  localStorage.setItem(LAYOUT_KEY, columns.toString());
};

export const addPortfolioItem = (item: PortfolioItem) => {
  const current = getPortfolioData();
  savePortfolioData([...current, item]);
};

export const updatePortfolioItem = (id: string, updatedItem: PortfolioItem) => {
  const current = getPortfolioData();
  savePortfolioData(current.map(item => item.id === id ? updatedItem : item));
};

export const deletePortfolioItem = (id: string) => {
  const current = getPortfolioData();
  savePortfolioData(current.filter(item => item.id !== id));
};
