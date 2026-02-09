import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { PortfolioItem } from '../types';

// ✅ 로컬 이미지 import (Vite/CRA 모두 안전한 방식)
//상세페이
import detail001m from '../assets/images/detail-001-m.webp';
import detail001s from '../assets/images/detail-001-s.webp';

import detail002m from '../assets/images/detail-002-m.webp';
import detail002s from '../assets/images/detail-002-s.webp';

import detail003m from '../assets/images/detail-003-m.webp';
import detail003s from '../assets/images/detail-003-s.webp';

//유지보수
import detail100m from '../assets/images/detail-100-m.webp';
import detail100s from '../assets/images/detail-100-s.webp';

import detail101m from '../assets/images/detail-101-m.webp';
import detail101s from '../assets/images/detail-101-s.webp';

import detail102m from '../assets/images/detail-102-m.webp';
import detail102s from '../assets/images/detail-102-s.webp';

import detail103m from '../assets/images/detail-103-m.webp';
import detail103s from '../assets/images/detail-103-s.webp';

import detail104m from '../assets/images/detail-104-m.webp';
import detail104s from '../assets/images/detail-104-s.webp';

import detail105m from '../assets/images/detail-105-m.webp';
import detail105s from '../assets/images/detail-105-s.webp';

//웹사이트
import detail200m from '../assets/images/detail-200-m.webp';
import detail200s from '../assets/images/detail-200-s.webp';

import detail201m from '../assets/images/detail-201-m.webp';
import detail201s from '../assets/images/detail-201-s.webp';

import detail202m from '../assets/images/detail-202-m.webp';
import detail202s from '../assets/images/detail-202-s.webp';

//프레젠테이션
import detail300m from '../assets/images/detail-300-m.webp';
import detail300s from '../assets/images/detail-300-s.webp';




// ✅ 팀 프로필 로컬 이미지 import (추가!)
import user01 from '../assets/images/user-01.webp';
import user02 from '../assets/images/user-02.webp';
import user03 from '../assets/images/user-03.webp';

/**
 * ✅ 디자이너가 바로 수정하는 하드코딩 영역
 * - 탭 이름: WORK_CATEGORIES
 * - 포트폴리오 목록: PORTFOLIO_ITEMS
 */
// const WORK_CATEGORIES = ['ALL', '웹사이트', '상세페이지', '운영유지보수'] as const;
const WORK_CATEGORIES = ['ALL', '웹사이트', '상세페이지', '운영디자인', '제안서·프레젠테이션'] as const;

// ✅ (옵션) 기본 썸네일 URL (다른 항목용)
const THUMBNAIL_URL = 'https://images.pexels.com/photos/35571707/pexels-photo-35571707.jpeg';

/**
 * ✅ 썸네일/모달 이미지 분리
 * - thumbnail: 카드에 보이는 썸네일 (m)
 * - preview: 모달에서 보이는 큰 이미지 (s)
 * - titleKr: 모달 상단에 표시할 한글 타이틀(프리텐다드)
 */
const PORTFOLIO_ITEMS: (PortfolioItem & { preview?: string; titleKr?: string })[] = [
  {
    id: 'detail-001',
    title: 'Travel Tour Detail Page Design',
    titleKr: '여행사 투어 상세페이지 기획/디자인',
    category: '상세페이지',
    thumbnail: detail001m,
    preview: detail001s,
  },
  {
    id: 'detail-002',
    title: 'Household Product Detail Page Design',
    titleKr: '뉴셀클리너 하수구트랩 상세페이지 기획/디자인',
    category: '상세페이지',
    thumbnail: detail002m,
    preview: detail002s,
  },
  {
    id: 'detail-003',
    title: 'OSTO Furniture Detail Page Design',
    titleKr: 'OSTO 가구 상세페이지 기획 및 디자인',
    category: '상세페이지',
    thumbnail: detail003m,
    preview: detail003s,
  },
  {
    id: 'ops-001',
    title: 'HYUNDAI LNG SHIPPING Additional Page Design & Publishing',
    titleKr: '현대 LNG 해운 웹사이트 추가 페이지 디자인 및 퍼블리싱',
    category: '운영디자인',
    thumbnail: detail100m,
    preview: detail100s,
  },
  {
    id: 'ops-002',
    title: 'Lunit Website Operation, Design & Publishing',
    titleKr: '루닛 웹사이트 유지보수 운영 디자인 및 퍼블리싱',
    category: '운영디자인',
    thumbnail: detail101m,
    preview: detail101s,
  },
  {
    id: 'ops-003',
    title: 'b.stage Website Operation, Design & Publishing',
    titleKr: '비스테이지 웹사이트 유지보수 운영 디자인 및 퍼블리싱',
    category: '운영디자인',
    thumbnail: detail102m,
    preview: detail102s,
  },
  {
    id: 'ops-004',
    title: 'Galaxy To Go Service Website Operation & Publishing',
    titleKr: '갤럭시투고서비스 유지보수 운영 및 퍼블리싱',
    category: '운영디자인',
    thumbnail: detail103m,
    preview: detail103s,
  },
  {
    id: 'ops-005',
    title: 'HYBE INSIGHT Website Operation, Design & Publishing',
    titleKr: '하이브 인사이트 웹사이트 유지보수 운영 디자인 및 퍼블리싱',
    category: '운영디자인',
    thumbnail: detail104m,
    preview: detail104s,
  },
  {
    id: 'ops-006',
    title: 'Samsung Mobile Press Website Operation, Design & Publishing',
    titleKr: '모바일 프레스 운영 디자인 및 퍼블리싱',
    category: '운영디자인',
    thumbnail: detail105m,
    preview: detail105s,
  },
  {
    id: 'web-001',
    title: 'AI Parking Space Sharing Dashboard',
    titleKr: '자투리 주차장을 위한 인공지능 주차면 공유 시스템',
    category: '웹사이트',
    thumbnail: detail200m,
    preview: detail200s,
  },
  {
    id: 'web-002',
    title: 'bemyfriends Admin',
    titleKr: '비마이프렌즈 어드민',
    category: '웹사이트',
    thumbnail: detail201m,
    preview: detail201s,
  },
  {
    id: 'web-003',
    title: 'MR Metaverse Developers',
    titleKr: '인천 XR 메타버스',
    category: '웹사이트',
    thumbnail: detail202m,
    preview: detail202s,
  },
  {
    id: 'ppt-001',
    title: 'KIRBY Korea Business Proposal Design',
    titleKr: '컬비 코리아 제안서 디자인',
    category: '제안서·프레젠테이션',
    thumbnail: detail300m,
    preview: detail300s,
  },
];

type ModalData = {
  title: string; // 영문
  titleKr?: string; // 한글(프리텐다드)
  imageUrl: string;
};

type ImageModalProps = {
  isOpen: boolean;
  data: ModalData | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  canPrev: boolean;
  canNext: boolean;
};

const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  data,
  onClose,
  onPrev,
  onNext,
  canPrev,
  canNext,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', onKeyDown);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen || !data) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[2147483647] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label="이미지 미리보기 모달"
    >
      <div className="absolute inset-0 bg-black/60" onMouseDown={onClose} />

      <div
        className="relative z-10 w-[min(1100px,92vw)] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-100">
          <div className="min-w-0">
            <h3 className="text-xl font-serif font-bold truncate">{data.title}</h3>

            {data.titleKr && (
              <p
                className="mt-1 text-[12px] leading-snug text-zinc-500 truncate"
                style={{ fontFamily: 'Pretendard, system-ui, -apple-system, Segoe UI, Roboto, sans-serif' }}
              >
                {data.titleKr}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onPrev}
              disabled={!canPrev}
              className="shrink-0 text-[10px] font-bold uppercase tracking-[0.3em] border border-zinc-200 px-4 py-2 transition-all duration-300 rounded-full disabled:opacity-30 disabled:cursor-not-allowed hover:bg-black hover:text-white"
              aria-label="이전 작품"
              title="이전 (←)"
            >
              Prev
            </button>

            <button
              type="button"
              onClick={onNext}
              disabled={!canNext}
              className="shrink-0 text-[10px] font-bold uppercase tracking-[0.3em] border border-zinc-200 px-4 py-2 transition-all duration-300 rounded-full disabled:opacity-30 disabled:cursor-not-allowed hover:bg-black hover:text-white"
              aria-label="다음 작품"
              title="다음 (→)"
            >
              Next
            </button>

            <button
              type="button"
              onClick={onClose}
              className="shrink-0 text-[10px] font-bold uppercase tracking-[0.3em] border border-zinc-200 px-4 py-2 hover:bg-black hover:text-white transition-all duration-300 rounded-full"
              aria-label="모달 닫기"
              title="닫기 (Esc)"
            >
              Close
            </button>
          </div>
        </div>

        <div className="max-h-[80vh] overflow-y-auto">
          <img src={data.imageUrl} alt={data.title} className="w-full h-auto object-contain" />
        </div>

        <div className="px-6 py-4 border-t border-zinc-100 text-[10px] uppercase tracking-[0.25em] text-zinc-300">
          Use ← → keys to navigate
        </div>
      </div>
    </div>,
    document.body
  );
};

const Hero: React.FC = () => (
  <section id="hero" className="relative min-h-screen flex items-center bg-white px-6 sm:px-12 pt-20">
    <div className="max-w-[1800px] mx-auto w-full">
      <div className="space-y-12">
        <div className="overflow-hidden">
          <span className="editorial-caps text-[10px] font-bold text-zinc-300 block mb-6 animate-slide-up">
            DESIGN STUDIO
          </span>
        </div>

        <h1 className="text-[12vw] sm:text-[10vw] font-serif font-black leading-[0.85] editorial-spacing tracking-tighter">
          Visual <br />
          <span className="italic font-normal ml-[5vw]">Intelligence.</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-20 items-end">
          <div className="lg:col-span-5">
            <p className="text-xl sm:text-2xl text-zinc-500 font-light leading-relaxed max-w-lg">
              우리는 단순한 '아름다움'을 넘어, 비즈니스의 본질을 꿰뚫는 전략적 디자인을 통해 복잡한 문제를 명쾌한 시각적
              솔루션으로 풀어냅니다.
            </p>
          </div>

          <div className="lg:col-span-7 flex justify-end">
            <div className="flex flex-col sm:flex-row gap-12">
              <button
                onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative overflow-hidden"
              >
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] block border-b border-black pb-2 group-hover:text-zinc-400 group-hover:border-zinc-300 transition-all duration-500">
                  Selected Work
                </span>
              </button>

              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative overflow-hidden"
              >
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] block border-b border-black pb-2 group-hover:text-zinc-400 group-hover:border-zinc-300 transition-all duration-500">
                  Contact Us
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/** ✅ What we solve 영역 (첫 번째 코드의 Problems 그대로) */
const Problems: React.FC = () => (
  <section className="py-40 bg-white px-6 sm:px-12 border-y border-zinc-100">
    <div className="max-w-[1800px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
        <div className="lg:col-span-4">
          <h2 className="editorial-caps text-[10px] font-bold text-zinc-300 mb-8">What we solve</h2>
          <h3 className="text-5xl font-serif font-bold italic leading-tight">
            Design is <br /> Problem Solving.
          </h3>
        </div>

        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-32">
          {[
            { title: 'Strategic Positioning', desc: '브랜드가 시장에서 가져야 할 고유한 목소리를 디자인으로 치환합니다.' },
            { title: 'Conversion Optimized', desc: '사용자의 심리를 분석하여 목표한 행동을 유도하는 인터페이스를 설계합니다.' },
            { title: 'Systemic Thinking', desc: '단발성 작업이 아닌, 성장을 지속할 수 있는 확장 가능한 시스템을 구축합니다.' },
            { title: 'Seamless Collaboration', desc: '개발 효율성을 극대화하는 완벽한 가이드와 소통 체계를 지향합니다.' },
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

const GallerySection: React.FC = () => {
  const [filter, setFilter] = useState<string>('ALL');

  const columns = 3;
  const defaultStep = columns === 2 ? 8 : 9;

  const [limit, setLimit] = useState<number>(defaultStep);

  const [modalOpen, setModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const items = PORTFOLIO_ITEMS;

  const filteredItems = useMemo(() => {
    return filter === 'ALL' ? items : items.filter((item) => item.category === filter);
  }, [filter, items]);

  const displayItems = filteredItems.slice(0, limit);
  const showMoreButton = filteredItems.length > limit;

  const gridColsClass =
    columns === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';

  const openModalByItem = (item: PortfolioItem & { preview?: string; titleKr?: string }) => {
    const idx = displayItems.findIndex((x) => x.id === item.id);
    setActiveIndex(idx);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setActiveIndex(-1);
  };

  const canPrev = activeIndex > 0;
  const canNext = activeIndex >= 0 && activeIndex < displayItems.length - 1;

  const goPrev = () => setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
  const goNext = () => setActiveIndex((prev) => (prev < displayItems.length - 1 ? prev + 1 : prev));

  const modalData: ModalData | null =
    modalOpen && activeIndex >= 0 && activeIndex < displayItems.length
      ? {
          title: displayItems[activeIndex].title,
          titleKr: (displayItems[activeIndex] as any).titleKr,
          imageUrl: (displayItems[activeIndex] as any).preview ?? displayItems[activeIndex].thumbnail,
        }
      : null;

  return (
    <section id="work" className="py-40 bg-white px-6 sm:px-12">
      <div className="max-w-[1800px] mx-auto">
        <div className="flex flex-col lg:flex-row justify-between lg:items-end mb-24 space-y-12 lg:space-y-0">
          <div>
            <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-300 mb-6">Works Index</h2>
            <h3 className="text-7xl font-serif font-black editorial-spacing">Selected.</h3>
          </div>

          <div className="flex flex-wrap gap-x-12 gap-y-6 overflow-x-auto no-scrollbar">
            {WORK_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setFilter(cat);
                  setLimit(defaultStep);
                  closeModal();
                }}
                className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-all pb-2 border-b-2 ${
                  filter === cat ? 'border-black text-black' : 'border-transparent text-zinc-300 hover:text-black'
                }`}
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
                <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-zinc-300 block">
                  {item.category}
                </span>
                <h3 className="text-3xl font-serif font-bold leading-tight group-hover:italic transition-all max-w-sm">
                  {item.title}
                </h3>

                <Link
                  to={`/work/${item.id}`}
                  className="inline-block text-[9px] font-bold uppercase tracking-[0.3em] border-b border-black pb-1 pt-2"
                >
                  Discover
                </Link>
              </div>

              <button
                type="button"
                onClick={() => openModalByItem(item as any)}
                className="block w-full overflow-hidden aspect-[4/3] bg-white focus:outline-none"
                aria-label={`${item.title} 이미지 미리보기 열기`}
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                />
              </button>
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
              onClick={() => setLimit((prev) => prev + defaultStep)}
              className="text-[10px] font-bold uppercase tracking-[0.4em] border border-zinc-200 px-16 py-6 hover:bg-black hover:text-white transition-all duration-500"
            >
              Expand List
            </button>
          </div>
        )}
      </div>

      <ImageModal
        isOpen={modalOpen}
        data={modalData}
        onClose={closeModal}
        onPrev={goPrev}
        onNext={goNext}
        canPrev={canPrev}
        canNext={canNext}
      />
    </section>
  );
};


/** ✅ Methodology 영역 (첫 번째 코드의 Process 그대로) */
const Process: React.FC = () => (
  <section className="py-40 bg-zinc-950 text-white px-6 sm:px-12">
    <div className="max-w-[1800px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 mb-32">
        <div className="lg:col-span-5">
          <h2 className="editorial-caps text-[10px] font-bold text-zinc-700 mb-8">Methodology</h2>
          <h3 className="text-6xl font-serif leading-tight">
            Structured <br /> <span className="italic">Execution.</span>
          </h3>
        </div>
        <div className="lg:col-span-7 flex items-end">
          <p className="text-zinc-500 text-lg font-light leading-relaxed max-w-md">
            우리는 모든 단계를 데이터와 논리에 근거하여 진행합니다. 투명한 프로세스는 클라이언트와 우리 사이의 가장 단단한
            신뢰가 됩니다.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-px bg-zinc-900">
        {[
          { step: '01', title: 'Discovery', desc: '요구사항 분석 및 비즈니스 정렬' },
          { step: '02', title: 'Structure', desc: '사용자 중심의 IA 및 골격 설계' },
          { step: '03', title: 'Design', desc: '시각적 전략 및 시스템 구축' },
          { step: '04', title: 'Development', desc: '고성능 퍼블리싱 및 검수' },
          { step: '05', title: 'Expansion', desc: '런칭 후 지속적 성장을 위한 지원' },
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

/** ✅ Start a Project 영역 (첫 번째 코드의 ContactSection 그대로) */
const ContactSection: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //     setSubmitted(true);
  //   }, 1500);
  // };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setLoading(true);

  const formData = new FormData(e.currentTarget);

  try {
    const response = await fetch('https://formspree.io/f/mpqrqeje', {
      method: 'POST',
      body: formData,
      headers: { Accept: 'application/json' },
    });

    if (response.ok) {
      setSubmitted(true);
      e.currentTarget.reset(); // 선택: 전송 후 폼 비우기
    } else {
      alert('문의 제출 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
    }
  } catch (err) {
    console.error(err);
    alert('네트워크 오류가 발생했습니다.');
  } finally {
    setLoading(false);
  }
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
          <button
            onClick={() => setSubmitted(false)}
            className="text-[10px] font-bold uppercase tracking-[0.3em] border-b border-black pb-2"
          >
            Send Another
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-40 bg-white px-6 sm:px-12">
      <div className="max-w-[1800px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-32">
          <div className="lg:col-span-5 space-y-16">
            <h1 className="text-8xl sm:text-[10vw] font-serif font-black leading-[0.85] tracking-tighter">
              Start a <br />
              <span className="italic font-normal">Project.</span>
            </h1>

            <div className="space-y-12">
              <div>
                <h4 className="text-[10px] uppercase font-bold text-zinc-300 tracking-[0.4em] mb-4">Email</h4>
                <p className="text-2xl font-serif italic">wlsdkwns@gmail.com</p>
              </div>
              <div className="pt-4">
                <a
                  href="https://open.kakao.com/o/sJDEALAB"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-between w-full max-w-xs bg-black text-white px-8 py-6 overflow-hidden transition-all duration-500"
                >
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-[#FEE500]"></div>
                  <div className="relative z-10 flex flex-col items-start transition-opacity duration-300 group-hover:opacity-0">
                    <span className="text-[8px] font-black uppercase tracking-[0.2em] text-zinc-400 group-hover:text-white/50 mb-1">카카오톡 문의</span>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">Connect KakaoTalk</span>
                  </div>
                  <span className="relative z-10 text-xl transform transition-all duration-300 group-hover:translate-x-2 group-hover:text-black">→</span>
                  <div className="absolute inset-0 bg-[#FEE500] translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                  <span className="absolute inset-0 flex items-center justify-center text-black text-[10px] font-black uppercase tracking-[0.3em] translate-y-full group-hover:translate-y-0 transition-transform duration-500">Open Kakao Chat</span>
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 flex justify-end">
            <form onSubmit={handleSubmit} className="space-y-16 w-full max-w-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-16">
                <div className="flex flex-col space-y-4">
                  <label className="text-[9px] uppercase font-bold tracking-[0.3em] text-zinc-300">Information</label>
                  <input
                    required
                    name="name"
                    type="text"
                    className="bg-transparent border-b border-zinc-200 py-4 focus:outline-none focus:border-black transition text-lg placeholder:text-zinc-200"
                    placeholder="성함 또는 기업명"
                  />
                </div>

                <div className="flex flex-col space-y-4">
                  <label className="text-[9px] uppercase font-bold tracking-[0.3em] text-zinc-300">Connection</label>
                  <input
                    required
                    name="email"
                    type="email"
                    className="bg-transparent border-b border-zinc-200 py-4 focus:outline-none focus:border-black transition text-lg placeholder:text-zinc-200"
                    placeholder="이메일"
                  />
                </div>
              </div>

              <div className="flex flex-col space-y-4">
                <label className="text-[9px] uppercase font-bold tracking-[0.3em] text-zinc-300">Brief</label>
                <textarea
                  required
                  name="message"
                  rows={4}
                  className="bg-transparent border-b border-zinc-200 py-4 focus:outline-none focus:border-black transition text-lg resize-none placeholder:text-zinc-200"
                  placeholder="진행하시려는 프로젝트에 대해 자유롭게 들려주세요."
                />
              </div>

              <div className="pt-10">
                <button
                  disabled={loading}
                  type="submit"
                  className="w-full bg-black text-white py-8 text-[11px] font-bold uppercase tracking-[0.5em] hover:bg-zinc-800 transition-all duration-500 disabled:bg-zinc-200"
                >
                  {loading ? 'Initializing...' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function Leejina() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="fade-in scroll-smooth">
      <Hero />
      <Problems />
      <GallerySection />
      <Process />
      <ContactSection />
    </div>
  );
}
