import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { PortfolioItem } from '../types';

// ✅ 로컬 이미지 import
//상세페이지
import detail001m from '../assets/images/detail-001-m.webp';
import detail001s from '../assets/images/detail-001-s.webp';

import detail002m from '../assets/images/detail-002-m.webp';
import detail002s from '../assets/images/detail-002-s.webp';

import detail003m from '../assets/images/detail-003-m.webp';
import detail003s from '../assets/images/detail-003-s.webp';

//운영디자인
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

// ✅ 미리캔버스 (assets/images/miri/)
import miri100m from '../assets/images/miri/miri-100-m.webp';
import miri100s from '../assets/images/miri/miri-100-s.webp';
import miri101m from '../assets/images/miri/miri-101-m.webp';
import miri101s from '../assets/images/miri/miri-101-s.webp';
import miri102m from '../assets/images/miri/miri-102-m.webp';
import miri102s from '../assets/images/miri/miri-102-s.webp';
import miri103m from '../assets/images/miri/miri-103-m.webp';
import miri103s from '../assets/images/miri/miri-103-s.webp';
import miri104m from '../assets/images/miri/miri-104-m.webp';
import miri104s from '../assets/images/miri/miri-104-s.webp';
import miri105m from '../assets/images/miri/miri-105-m.webp';
import miri105s from '../assets/images/miri/miri-105-s.webp';

/**
 * ✅ 탭 이름
 * - "미리캔버스" 카테고리 추가
 */
const WORK_CATEGORIES = ['ALL', '웹사이트', '상세페이지', '운영디자인', '제안서·프레젠테이션', '미리캔버스'] as const;

/**
 * ✅ 포트폴리오 목록
 * - thumbnail: 카드 썸네일 (m)
 * - preview: 모달 큰 이미지 (s)
 * - titleKr: 모달 한글 타이틀
 */
const PORTFOLIO_ITEMS: (PortfolioItem & { preview?: string; titleKr?: string })[] = [

  // =========================
  // ✅ 미리캔버스
  // =========================
  {
    id: 'miri-100',
    title: 'MiriCanvas Design Assets',
    titleKr: '미리캔버스 디자인 요소 제작',
    category: '미리캔버스',
    thumbnail: miri100m,
    preview: miri100s,
  },
  {
    id: 'miri-101',
    title: 'MiriCanvas Design Assets',
    titleKr: '미리캔버스 디자인 요소 제작',
    category: '미리캔버스',
    thumbnail: miri101m,
    preview: miri101s,
  },
  {
    id: 'miri-102',
    title: 'MiriCanvas Design Assets',
    titleKr: '미리캔버스 디자인 요소 제작',
    category: '미리캔버스',
    thumbnail: miri102m,
    preview: miri102s,
  },
  {
    id: 'miri-103',
    title: 'MiriCanvas Design Assets',
    titleKr: '미리캔버스 디자인 요소 제작',
    category: '미리캔버스',
    thumbnail: miri103m,
    preview: miri103s,
  },
  {
    id: 'miri-104',
    title: 'MiriCanvas Design Assets',
    titleKr: '미리캔버스 디자인 요소 제작',
    category: '미리캔버스',
    thumbnail: miri104m,
    preview: miri104s,
  },
  {
    id: 'miri-105',
    title: 'MiriCanvas Design Assets',
    titleKr: '미리캔버스 디자인 요소 제작',
    category: '미리캔버스',
    thumbnail: miri105m,
    preview: miri105s,
  },
  // =========================
  // 상세페이지
  // =========================
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

  // =========================
  // 운영디자인
  // =========================
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

  // =========================
  // 웹사이트
  // =========================
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

  // =========================
  // 제안서·프레젠테이션
  // =========================
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
  title: string;
  titleKr?: string;
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
  const scrollRef = useRef<HTMLDivElement | null>(null);

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

  // ✅ Next/Prev로 이미지가 바뀔 때마다 스크롤을 최상단으로
  useEffect(() => {
    if (!isOpen) return;
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [isOpen, data?.imageUrl]);

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

        <div ref={scrollRef} className="max-h-[80vh] overflow-y-auto">
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

const GallerySection: React.FC = () => {
  const [filter, setFilter] = useState<string>('ALL');

  const items = PORTFOLIO_ITEMS;

  const [modalOpen, setModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const filteredItems = useMemo(() => {
    return filter === 'ALL' ? items : items.filter((item) => item.category === filter);
  }, [filter, items]);

  // ✅ 더보기 제거: 전체 노출
  const displayItems = filteredItems;

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
        <div className="flex flex-col sm:flex-row sm:items-start gap-12 mb-20">
          <div>
            <h4 className="text-[10px] uppercase font-bold text-zinc-300 tracking-[0.4em] mb-4">
              Name
            </h4>
            <p className="text-2xl font-serif italic">
              Lee Jin A{" "}
              <span
                className="not-italic text-base ml-2"
                style={{
                  fontFamily:
                    "Pretendard, system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
                }}
              >
                (이진아)
              </span>
            </p>
          </div>

          <div>
            <h4 className="text-[10px] uppercase font-bold text-zinc-300 tracking-[0.4em] mb-4">
              Email
            </h4>
            <p className="text-2xl font-serif italic">wlsdkwns@naver.com</p>
          </div>
        </div>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white border-zinc-100 border-x-px border-t-px">
          {displayItems.map((item) => (
            <div key={item.id} className="group bg-white p-8 sm:p-14 hover-lift border-b border-zinc-100">
              <div className="space-y-6 mb-12">
                <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-zinc-300 block">
                  {item.category}
                </span>
                <h3 className="text-3xl font-serif font-bold leading-tight group-hover:italic transition-all max-w-sm">
                  {item.title}
                </h3>
                {/*
                <Link
                  to={`/work/${item.id}`}
                  className="inline-block text-[9px] font-bold uppercase tracking-[0.3em] border-b border-black pb-1 pt-2"
                >
                  Discover
                </Link>*/}
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

export default function PortfolioLeejina() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="fade-in scroll-smooth">
      <GallerySection />
    </div>
  );
}
