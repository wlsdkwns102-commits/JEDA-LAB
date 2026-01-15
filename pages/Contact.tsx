
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getCategories } from '../store';

export default function Contact() {
  const [searchParams] = useSearchParams();
  const initialService = searchParams.get('service') || '';
  
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categoriesList, setCategoriesList] = useState<string[]>([]);

  useEffect(() => {
    const dynamicCats = getCategories().map(c => c.name);
    setCategoriesList(dynamicCats);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
        setLoading(false);
        setSubmitted(true);
        window.scrollTo(0, 0);
    }, 1500);
  };

  if (submitted) {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-6">
            <div className="max-w-xl text-center fade-in">
                <span className="text-6xl font-serif italic text-black block mb-8">Thank you.</span>
                <h2 className="text-3xl font-bold mb-6">성공적으로 접수되었습니다!</h2>
                <p className="text-gray-600 leading-relaxed mb-12">
                    작성해 주신 내용을 검토 후, 영업일 기준 24시간 이내에 담당자가 연락드리겠습니다. 
                    혹시 그 전에 준비해야 할 자료가 있다면 리스트업하여 이메일로 가이드라인을 먼저 보내드리겠습니다.
                </p>
                <div className="flex flex-col gap-4">
                    <button onClick={() => window.location.href='/'} className="bg-black text-white px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition">
                        메인으로 이동
                    </button>
                </div>
            </div>
        </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-24">
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-5">
            <h1 className="text-8xl font-serif font-bold tracking-tight mb-8">Say <br /> <span className="italic">Hello.</span></h1>
            <p className="max-w-md text-gray-600 text-lg leading-relaxed mb-16">
              프로젝트에 대해 궁금한 점이 있으신가요? <br />
              간단한 내용만 남겨주시면 전문가가 바로 진단해 드립니다.
            </p>
            
            <div className="space-y-12">
                <div>
                    <h4 className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-4">Direct Inquiry</h4>
                    <p className="text-lg font-bold">info@jdealab.design</p>
                    <p className="text-sm text-gray-500">02-1234-5678</p>
                </div>
                <div>
                    <h4 className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-4">Working Hours</h4>
                    <p className="text-sm text-gray-500">Mon - Fri, 10:00 AM - 07:00 PM</p>
                </div>
                <div className="bg-zinc-50 p-8 border border-gray-100">
                    <p className="text-xs font-medium italic text-gray-600 leading-relaxed">
                        "상담 신청 후 24시간 내에 회신을 원칙으로 합니다. <br /> 
                        미팅 전에 필요한 체크리스트를 미리 발송해 드립니다."
                    </p>
                </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="flex flex-col space-y-3">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Name / Company *</label>
                  <input required type="text" className="border-b border-gray-200 py-3 focus:outline-none focus:border-black transition" placeholder="성함 또는 기업명" />
                </div>
                <div className="flex flex-col space-y-3">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Contact Number *</label>
                  <input required type="tel" className="border-b border-gray-200 py-3 focus:outline-none focus:border-black transition" placeholder="010-0000-0000" />
                </div>
              </div>

              <div className="flex flex-col space-y-3">
                <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Project Type *</label>
                <select defaultValue={initialService} className="border-b border-gray-200 py-3 focus:outline-none focus:border-black transition bg-transparent">
                  <option value="">유형을 선택해주세요</option>
                  {categoriesList.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                  <option value="other">기타 문의</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="flex flex-col space-y-3">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Estimated Timeline</label>
                  <select className="border-b border-gray-200 py-3 focus:outline-none focus:border-black transition bg-transparent">
                    <option value="">일정을 선택해주세요</option>
                    <option value="asap">ASAP (한달 이내)</option>
                    <option value="1-3">1 ~ 3개월 이내</option>
                    <option value="flexible">유동적임</option>
                  </select>
                </div>
                <div className="flex flex-col space-y-3">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Budget Range</label>
                  <select className="border-b border-gray-200 py-3 focus:outline-none focus:border-black transition bg-transparent">
                    <option value="">예산 범위를 선택해주세요</option>
                    <option value="low">500만원 이하</option>
                    <option value="mid">500 ~ 2,000만원</option>
                    <option value="high">2,000만원 이상</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col space-y-3">
                <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Message *</label>
                <textarea required rows={4} className="border-b border-gray-200 py-3 focus:outline-none focus:border-black transition resize-none" placeholder="프로젝트 목표나 궁금하신 점을 자유롭게 남겨주세요." />
              </div>

              <div className="flex flex-col space-y-3">
                 <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Reference Link (Optional)</label>
                 <input type="url" className="border-b border-gray-200 py-3 focus:outline-none focus:border-black transition" placeholder="https://..." />
              </div>

              <div className="pt-10">
                <button 
                    disabled={loading}
                    type="submit" 
                    className="w-full bg-black text-white py-6 text-sm font-bold uppercase tracking-widest hover:bg-zinc-800 transition disabled:bg-gray-400"
                >
                  {loading ? 'Sending...' : 'Start Project Consultation'}
                </button>
                <p className="mt-6 text-[10px] text-center text-gray-400 uppercase tracking-widest">
                  본 상담 신청은 무료이며 어떠한 결제도 발생하지 않습니다.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
