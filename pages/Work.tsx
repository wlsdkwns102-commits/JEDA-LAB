
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPortfolioData, getCategories } from '../store';
import { PortfolioItem } from '../types';

export default function Work() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [filter, setFilter] = useState<string>('ALL');
  const [categories, setCategories] = useState<string[]>(['ALL']);

  useEffect(() => {
    setItems(getPortfolioData());
    const dynamicCats = getCategories().map(c => c.name);
    setCategories(['ALL', ...dynamicCats]);
  }, []);

  const filteredItems = filter === 'ALL' 
    ? items 
    : items.filter(item => item.category === filter);

  return (
    <div className="min-h-screen bg-white pb-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto pt-24 md:pt-32 pb-16 md:pb-20">
        <h1 className="text-6xl sm:text-7xl md:text-8xl font-serif font-bold tracking-tight mb-8 md:mb-10 leading-none">
          Selected <br /> <span className="italic">Works</span>
        </h1>
        <p className="max-w-xl text-gray-500 text-base md:text-lg leading-relaxed mb-16 md:mb-20">
          우리는 디자인이 비즈니스 문제를 해결하고 사용자의 행동을 변화시키는 과정을 기록합니다. 단순한 작업물이 아닌, 전략과 결과의 기록입니다.
        </p>
        
        <div className="flex flex-wrap gap-x-6 md:gap-x-10 gap-y-4 border-b border-gray-100 pb-8 overflow-x-auto no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`text-[10px] font-bold uppercase tracking-widest pb-1 transition-all border-b-2 whitespace-nowrap ${filter === cat ? 'border-black text-black' : 'border-transparent text-gray-300 hover:text-black'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 lg:gap-32">
          {filteredItems.map((item) => (
            <div key={item.id} className="group flex flex-col">
              <Link to={`/work/${item.id}`} className="block overflow-hidden bg-gray-100 mb-8 aspect-[4/3]">
                <img 
                  src={item.thumbnail} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-all duration-1000 transform group-hover:scale-105"
                />
              </Link>
              <div className="space-y-4">
                <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400 block">{item.category}</span>
                <h3 className="text-2xl md:text-3xl font-serif leading-tight group-hover:italic transition-all">{item.title}</h3>
                <p className="text-gray-500 text-sm md:text-base leading-relaxed line-clamp-2">{item.summary}</p>
                <div className="pt-2">
                  <Link to={`/work/${item.id}`} className="text-[10px] font-bold uppercase tracking-widest border-b border-black pb-1 hover:opacity-50 transition">Read Case Study</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredItems.length === 0 && (
          <div className="py-40 text-center">
            <p className="text-gray-400 italic">현재 선택한 카테고리의 프로젝트가 없습니다.</p>
          </div>
        )}
      </div>

      <section className="mt-40 py-24 md:py-32 bg-zinc-50 px-6">
          <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-3xl md:text-4xl font-serif mb-6 md:mb-8">비슷한 문제로 고민 중이신가요?</h3>
              <p className="text-gray-600 mb-12 text-sm md:text-base leading-relaxed">
                각 프로젝트마다 최적의 해결 방안이 다릅니다. 귀사의 상황에 맞는 맞춤형 상담을 제안해 드립니다.
              </p>
              <Link to="/contact" className="bg-black text-white px-10 py-5 text-[11px] font-bold uppercase tracking-widest hover:bg-zinc-800 transition inline-block">
                Start Consultation
              </Link>
          </div>
      </section>
    </div>
  );
}
