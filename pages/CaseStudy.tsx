import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getPortfolioData } from '../store';
import { PortfolioItem } from '../types';

export default function CaseStudy() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [item, setItem] = useState<PortfolioItem | null>(null);

  useEffect(() => {
    const data = getPortfolioData();
    const found = data.find(i => i.id === id);
    if (!found) {
      navigate('/work');
    } else {
      setItem(found);
    }
    window.scrollTo(0, 0);
  }, [id, navigate]);

  if (!item) return null;

  return (
    <div className="bg-white min-h-screen">
      {/* Editorial Header */}
      <div className="pt-40 pb-20 px-6 sm:px-12">
        <div className="max-w-[1800px] mx-auto">
          <Link to="/" className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-300 hover:text-black transition mb-20 inline-block">← Return to index</Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            <div className="lg:col-span-8 space-y-12">
              <span className="inline-block text-[9px] font-bold uppercase tracking-[0.5em] text-zinc-300">{item.category}</span>
              <h1 className="text-6xl sm:text-[8vw] font-serif font-black leading-[0.9] tracking-tighter editorial-spacing">{item.title}</h1>
              <p className="text-2xl sm:text-3xl text-zinc-400 font-light leading-relaxed max-w-3xl italic font-serif">
                "{item.summary}"
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col justify-end space-y-16 border-l border-zinc-100 pl-12 lg:pl-20">
               <div>
                 <h4 className="text-[9px] font-bold uppercase tracking-[0.4em] text-zinc-300 mb-4">Client</h4>
                 <p className="text-xl font-bold">{item.client || 'N/A'}</p>
               </div>
               <div>
                 <h4 className="text-[9px] font-bold uppercase tracking-[0.4em] text-zinc-300 mb-4">Timeline</h4>
                 <p className="text-xl font-bold">{item.duration || 'N/A'}</p>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Visual */}
      <section className="px-6 sm:px-12 mb-40">
        <div className="max-w-[1200px] mx-auto aspect-[16/9] overflow-hidden bg-zinc-50">
          <img src={item.thumbnail} alt="Cover" className="w-full h-full object-cover" />
        </div>
      </section>

      {/* Narrative Section */}
      <section className="py-40 bg-zinc-50 px-6 sm:px-12">
        <div className="max-w-[1200px] mx-auto">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
              <div className="lg:col-span-4">
                  <h2 className="editorial-caps text-[10px] font-bold text-zinc-300 mb-8">Solution Strategy</h2>
                  <h3 className="text-4xl font-serif italic">The Core Concept.</h3>
              </div>
              <div className="lg:col-span-8 space-y-20">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                      <div className="space-y-6">
                          <h4 className="text-[10px] font-bold uppercase tracking-widest">Problem Definition</h4>
                          <p className="text-zinc-500 text-sm leading-loose font-light">{item.problem || "사용자 경험에서의 마찰을 줄이고 브랜드의 고유한 가치를 전달하는 데 집중했습니다."}</p>
                      </div>
                      <div className="space-y-6">
                          <h4 className="text-[10px] font-bold uppercase tracking-widest">Design Strategy</h4>
                          <p className="text-zinc-500 text-sm leading-loose font-light">{item.strategy || "미니멀리즘과 강력한 타이포그래피를 활용하여 직관적인 정보 전달 체계를 구축했습니다."}</p>
                      </div>
                  </div>
              </div>
           </div>
        </div>
      </section>

      {/* Visual Gallery */}
      <section className="py-40 px-6 sm:px-12 space-y-px bg-zinc-100">
        {item.images.map((img, idx) => (
          <div key={idx} className="max-w-[1200px] mx-auto bg-white p-12 sm:p-24 overflow-hidden">
            <img src={img} alt={`Slide ${idx}`} className="w-full h-auto object-contain" />
          </div>
        ))}
      </section>

      {/* Footer CTA */}
      <section className="py-60 px-6 text-center border-t border-zinc-100">
        <div className="max-w-4xl mx-auto space-y-12">
            <h3 className="text-6xl font-serif font-black editorial-spacing">Let's build <br /><span className="italic">together.</span></h3>
            <p className="text-zinc-400 text-lg font-light leading-relaxed max-w-xl mx-auto">
              우리는 모든 프로젝트에 고유한 숨을 불어넣습니다. <br />
              당신의 비즈니스에 필요한 혁신적인 디자인을 제안합니다.
            </p>
            <div className="pt-8">
              <Link to="/" className="text-[10px] font-bold uppercase tracking-[0.5em] border border-black px-16 py-6 hover:bg-black hover:text-white transition-all duration-500 inline-block">Start Consultation</Link>
            </div>
        </div>
      </section>
    </div>
  );
}