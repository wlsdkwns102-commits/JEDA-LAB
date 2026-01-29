import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PortfolioItem } from '../types';
import { getPortfolioData, getCategories, getGalleryLayout } from '../store';

const Hero: React.FC = () => (
  <section id="hero" className="relative min-h-screen flex items-center bg-white px-6 sm:px-12 pt-20">
    <div className="max-w-[1800px] mx-auto w-full">
      <div className="space-y-12">
        <div className="overflow-hidden">
           <span className="editorial-caps text-[10px] font-bold text-zinc-300 block mb-6 animate-slide-up">EST. 2024 / DESIGN STUDIO</span>
        </div>
        <h1 className="text-[12vw] sm:text-[10vw] font-serif font-black leading-[0.85] editorial-spacing tracking-tighter">
          Visual <br />
          <span className="italic font-normal ml-[5vw]">Intelligence.</span>
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-20 items-end">
           <div className="lg:col-span-5">
              <p className="text-xl sm:text-2xl text-zinc-500 font-light leading-relaxed max-w-lg">
                우리는 단순한 '아름다움'을 넘어, 비즈니스의 본질을 꿰뚫는 전략적 디자인을 통해 복잡한 문제를 명쾌한 시각적 솔루션으로 풀어냅니다.
              </p>
           </div>
           <div className="lg:col-span-7 flex justify-end">
              <div className="flex flex-col sm:flex-row gap-12">
                 <button
                  onClick={() => document.getElementById('work')?.scrollIntoView({behavior: 'smooth'})}
                  className="group relative overflow-hidden"
                 >
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] block border-b border-black pb-2 group-hover:text-zinc-400 group-hover:border-zinc-300 transition-all duration-500">Selected Work</span>
                 </button>
                 <button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})}
                  className="group relative overflow-hidden"
                 >
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] block border-b border-black pb-2 group-hover:text-zinc-400 group-hover:border-zinc-300 transition-all duration-500">Contact Us</span>
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  </section>
);

const Problems: React.FC = () => (
  <section className="py-40 bg-white px-6 sm:px-12 border-y border-zinc-100">
    <div className="max-w-[1800px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
        <div className="lg:col-span-4">
           <h2 className="editorial-caps text-[10px] font-bold text-zinc-300 mb-8">What we solve</h2>
           <h3 className="text-5xl font-serif font-bold italic leading-tight">Design is <br /> Problem Solving.</h3>
        </div>
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-32">
           {[
             { title: "Strategic Positioning", desc: "브랜드가 시장에서 가져야 할 고유한 목소리를 디자인으로 치환합니다." },
             { title: "Conversion Optimized", desc: "사용자의 심리를 분석하여 목표한 행동을 유도하는 인터페이스를 설계합니다." },
             { title: "Systemic Thinking", desc: "단발성 작업이 아닌, 성장을 지속할 수 있는 확장 가능한 시스템을 구축합니다." },
             { title: "Seamless Collaboration", desc: "개발 효율성을 극대화하는 완벽한 가이드와 소통 체계를 지향합니다." }
           ].map((item, idx) => (
             <div key={idx} className="space-y-6">
                <span className="text-[10px] font-mono text-zinc-300">0{idx + 1}</span>
                <h4 className="text-xl font-bold">{item.title}</h4>
                <p className="text-zinc-600 text-lg leading-relaxed font-light">{item.desc}</p>
             </div>
           ))}
        </div>
      </div>
    </div>
  </section>
);

const GallerySection: React.FC<{ items: PortfolioItem[] }> = ({ items }) => {
  const [filter, setFilter] = useState<string>('ALL');
  const [columns, setColumns] = useState<number>(3);
  const [limit, setLimit] = useState<number>(9);
  const [categoriesList, setCategoriesList] = useState<string[]>([]);

  useEffect(() => {
    const dynamicCats = getCategories().map(c => c.name);
    setCategoriesList(['ALL', ...dynamicCats]);

    const layoutCols = getGalleryLayout();
    setColumns(layoutCols);
    setLimit(layoutCols === 2 ? 8 : 9);
  }, []);

  const filteredItems = filter === 'ALL'
    ? items
    : items.filter(item => item.category === filter);

  const displayItems = filteredItems.slice(0, limit);
  const showMoreButton = filteredItems.length > limit;

  const gridColsClass = columns === 2
    ? "grid-cols-1 sm:grid-cols-2"
    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  const defaultStep = columns === 2 ? 8 : 9;

  return (
    <section id="work" className="py-40 bg-white px-6 sm:px-12">
      <div className="max-w-[1800px] mx-auto">
        <div className="flex flex-col lg:flex-row justify-between lg:items-end mb-24 space-y-12 lg:space-y-0">
          <div>
            <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-300 mb-6">Works Index</h2>
            <h3 className="text-7xl font-serif font-black editorial-spacing">Selected.</h3>
          </div>
          <div className="flex flex-wrap gap-x-12 gap-y-6 overflow-x-auto no-scrollbar">
            {categoriesList.map(cat => (
              <button
                key={cat}
                onClick={() => { setFilter(cat); setLimit(defaultStep); }}
                className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-all pb-2 border-b-2 ${filter === cat ? 'border-black text-black' : 'border-transparent text-zinc-300 hover:text-black'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className={`grid ${gridColsClass} gap-px bg-white border-zinc-100 border-x-px border-t-px`}>
          {displayItems.map((item) => (
            <div key={item.id} className="group bg-white p-8 sm:p-14 hover-lift border-b border-zinc-100">
              <div className="space-y-6 mb-12">
                <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-zinc-300 block">{item.category}</span>
                <h3 className="text-3xl font-serif font-bold leading-tight group-hover:italic transition-all max-w-sm">{item.title}</h3>
                <Link to={`/work/${item.id}`} className="inline-block text-[9px] font-bold uppercase tracking-[0.3em] border-b border-black pb-1 pt-2">Discover</Link>
              </div>

              <Link to={`/work/${item.id}`} className="block overflow-hidden aspect-[4/3] bg-white">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                />
              </Link>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="py-40 text-center">
            <p className="text-zinc-400 italic font-serif">Empty portfolio index.</p>
          </div>
        )}

        {showMoreButton && (
          <div className="mt-40 text-center">
            <button
              onClick={() => setLimit(prev => prev + defaultStep)}
              className="text-[10px] font-bold uppercase tracking-[0.4em] border border-zinc-200 px-16 py-6 hover:bg-black hover:text-white transition-all duration-500"
            >
              Expand List
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

const Process: React.FC = () => (
  <section className="py-40 bg-zinc-950 text-white px-6 sm:px-12">
    <div className="max-w-[1800px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 mb-32">
         <div className="lg:col-span-5">
            <h2 className="editorial-caps text-[10px] font-bold text-zinc-700 mb-8">Methodology</h2>
            <h3 className="text-6xl font-serif leading-tight">Structured <br /> <span className="italic">Execution.</span></h3>
         </div>
         <div className="lg:col-span-7 flex items-end">
            <p className="text-zinc-500 text-lg font-light leading-relaxed max-w-md">
               우리는 모든 단계를 데이터와 논리에 근거하여 진행합니다.
               투명한 프로세스는 클라이언트와 우리 사이의 가장 단단한 신뢰가 됩니다.
            </p>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-px bg-zinc-900">
        {[
          { step: "01", title: "Discovery", desc: "요구사항 분석 및 비즈니스 정렬" },
          { step: "02", title: "Structure", desc: "사용자 중심의 IA 및 골격 설계" },
          { step: "03", title: "Design", desc: "시각적 전략 및 시스템 구축" },
          { step: "04", title: "Development", desc: "고성능 퍼블리싱 및 검수" },
          { step: "05", title: "Expansion", desc: "런칭 후 지속적 성장을 위한 지원" }
        ].map((item, idx) => (
          <div key={idx} className="bg-zinc-950 p-12 space-y-12 hover:bg-zinc-900 transition-all duration-700">
            <span className="block text-4xl font-serif italic text-zinc-800">{item.step}</span>
            <div className="space-y-4">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.3em]">{item.title}</h4>
                <p className="text-zinc-500 text-xs leading-relaxed font-light">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ContactSection: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
        setLoading(false);
        setSubmitted(true);
    }, 1500);
  };

  if (submitted) {
    return (
        <section id="contact" className="py-60 bg-white flex items-center justify-center px-6">
            <div className="max-w-xl text-center">
                <h2 className="text-8xl font-serif italic editorial-spacing mb-8">Confirmed.</h2>
                <p className="text-zinc-500 text-lg font-light leading-relaxed mb-12">
                    문의가 성공적으로 접수되었습니다. <br />
                    24시간 내에 전문 디렉터가 연락드리겠습니다.
                </p>
                <button onClick={() => setSubmitted(false)} className="text-[10px] font-bold uppercase tracking-[0.3em] border-b border-black pb-2">Send Another</button>
            </div>
        </section>
    );
  }

  return (
    <section id="contact" className="py-40 bg-white px-6 sm:px-12">
      <div className="max-w-[1800px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-32">
          <div className="lg:col-span-5 space-y-16">
            <h1 className="text-8xl sm:text-[10vw] font-serif font-black leading-[0.85] tracking-tighter">Start a <br /><span className="italic font-normal">Project.</span></h1>
            <div className="space-y-12">
                <div>
                    <h4 className="text-[10px] uppercase font-bold text-zinc-300 tracking-[0.4em] mb-4">Email</h4>
                    <p className="text-2xl font-serif italic">hello@jdealab.design</p>
                </div>
            </div>
          </div>

          <div className="lg:col-span-7 flex justify-end">
            <form onSubmit={handleSubmit} className="space-y-16 w-full max-w-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-16">
                <div className="flex flex-col space-y-4">
                  <label className="text-[9px] uppercase font-bold tracking-[0.3em] text-zinc-300">Information</label>
                  <input required type="text" className="bg-transparent border-b border-zinc-200 py-4 focus:outline-none focus:border-black transition text-lg placeholder:text-zinc-200" placeholder="성함 또는 기업명" />
                </div>
                <div className="flex flex-col space-y-4">
                  <label className="text-[9px] uppercase font-bold tracking-[0.3em] text-zinc-300">Connection</label>
                  <input required type="tel" className="bg-transparent border-b border-zinc-200 py-4 focus:outline-none focus:border-black transition text-lg placeholder:text-zinc-200" placeholder="전화번호 또는 이메일" />
                </div>
              </div>
              <div className="flex flex-col space-y-4">
                <label className="text-[9px] uppercase font-bold tracking-[0.3em] text-zinc-300">Brief</label>
                <textarea required rows={4} className="bg-transparent border-b border-zinc-200 py-4 focus:outline-none focus:border-black transition text-lg resize-none placeholder:text-zinc-200" placeholder="진행하시려는 프로젝트에 대해 자유롭게 들려주세요." />
              </div>
              <div className="pt-10">
                <button
                    disabled={loading}
                    type="submit"
                    className="w-full bg-black text-white py-8 text-[11px] font-bold uppercase tracking-[0.5em] hover:bg-zinc-800 transition-all duration-500 disabled:bg-zinc-200"
                >
                  {loading ? 'Initializing...' : 'Dispatch Request'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  const [items, setItems] = useState<PortfolioItem[]>([]);

  useEffect(() => {
    setItems(getPortfolioData());
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="fade-in scroll-smooth">
      <Hero />
      <Problems />
      <GallerySection items={items} />
      <Process />
      <ContactSection />
    </div>
  );
}
