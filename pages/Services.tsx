import React from 'react';
import { Link } from 'react-router-dom';
import { SERVICES } from '../constants';

export default function Services() {
  return (
    <div className="bg-white min-h-screen pb-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto pt-24 md:pt-32 pb-20">
        <h1 className="text-6xl sm:text-7xl md:text-8xl font-serif font-bold tracking-tight mb-8 md:mb-10 leading-none">
          Our <br /> <span className="italic">Expertise</span>
        </h1>
        <p className="max-w-xl text-gray-500 text-base md:text-lg leading-relaxed mb-20 md:mb-24">
          우리는 '예쁜 것' 이상의 가치를 설계합니다. 비즈니스 성격과 사용자 환경에 최적화된 패키지 구성을 제안합니다.
        </p>

        <div className="space-y-24 md:space-y-40">
          {SERVICES.map((service, idx) => (
            <div key={service.id} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 border-t border-gray-100 pt-16 group">
              <div className="lg:col-span-5">
                <span className="text-4xl md:text-5xl font-serif italic text-gray-200 group-hover:text-black transition mb-8 block">0{idx + 1}</span>
                <h3 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">{service.title}</h3>
                <p className="text-gray-500 text-base md:text-lg leading-relaxed mb-10">{service.description}</p>
                <div className="flex items-center space-x-4 mb-12">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">평균 작업 기간:</span>
                    <span className="text-sm font-bold border-b border-black pb-0.5">{service.timeline}</span>
                </div>
                <Link to={`/contact?service=${service.id}`} className="bg-black text-white px-8 py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-800 transition inline-block">
                  이 서비스로 상담하기
                </Link>
              </div>
              
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-12">
                <div className="space-y-6">
                   <h4 className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">추천 대상</h4>
                   <ul className="space-y-4">
                     {service.recommendedFor.map((rec, i) => (
                       <li key={i} className="flex items-start space-x-3 text-sm text-gray-600 leading-relaxed">
                         <span className="text-black font-bold text-xs mt-0.5">✓</span>
                         <span>{rec}</span>
                       </li>
                     ))}
                   </ul>
                </div>
                <div className="space-y-6">
                   <h4 className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">제공 범위</h4>
                   <ul className="space-y-4">
                     {service.includes.map((item, i) => (
                       <li key={i} className="flex items-start space-x-3 text-sm text-gray-600 leading-relaxed">
                         <span className="text-gray-300 font-bold text-xs mt-0.5">●</span>
                         <span>{item}</span>
                       </li>
                     ))}
                   </ul>
                </div>
                <div className="sm:col-span-2 pt-10 mt-4 border-t border-gray-50">
                    <h4 className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-6">진행 프로세스</h4>
                    <p className="text-sm text-gray-500 italic leading-relaxed font-serif">{service.process}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <section className="mt-40 bg-zinc-950 py-24 md:py-32 text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
              <h2 className="text-3xl md:text-5xl font-serif mb-8 italic">"더 세밀한 맞춤형 서비스가 필요하신가요?"</h2>
              <p className="text-zinc-400 mb-12 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
                상기 패키지 외에도 디자인 시스템 구축, 운영 대행, 브랜드 리뉴얼 등 <br className="hidden sm:block" />
                귀사의 상황에 맞는 별도의 커스텀 제안이 가능합니다.
              </p>
              <Link to="/contact" className="border border-white/20 hover:border-white px-10 py-5 text-[10px] font-bold uppercase tracking-widest transition inline-block">
                Request Custom Proposal
              </Link>
          </div>
      </section>
    </div>
  );
}