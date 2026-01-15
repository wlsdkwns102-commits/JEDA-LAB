
import { PortfolioItem, ServicePackage, ProjectCategory, FAQItem } from './types';

export const INITIAL_PORTFOLIO: PortfolioItem[] = [
  {
    id: '1',
    title: 'Luxury Furniture Brand Identity & E-commerce',
    category: ProjectCategory.WEBSITE,
    thumbnail: 'https://picsum.photos/1200/800?random=1',
    summary: '브랜드 가치 전달과 구매 전환율 24% 개선을 목표로 한 통합 디자인 솔루션',
    overview: '프리미엄 가구 브랜드의 디지털 쇼룸 및 커머스 구축 프로젝트입니다.',
    problem: '기존 사이트는 미려하지 못한 비주얼로 브랜드 신뢰도가 낮았고, 복잡한 결제 동선으로 인해 이탈률이 60%에 달했습니다.',
    strategy: '에디토리얼 그리드 시스템을 도입하여 잡지를 읽는 듯한 경험을 선사하고, 3단계 결제 프로세스로 최적화했습니다.',
    images: ['https://picsum.photos/1200/800?random=11', 'https://picsum.photos/1200/800?random=12'],
    client: 'Heritage Furniture',
    duration: '10주',
    featured: true
  },
  {
    id: '2',
    title: 'Fintech App UI Design System',
    category: ProjectCategory.UI_UX,
    thumbnail: 'https://picsum.photos/1200/800?random=2',
    summary: '개발 효율성과 디자인 일관성을 극대화한 원스톱 컴포넌트 라이브러리',
    overview: '성장하는 핀테크 스타트업을 위한 지속 가능한 UI 시스템 구축입니다.',
    problem: '디자이너마다 다른 UI 파편화로 인해 개발 생산성이 저하되고 유저 인터페이스가 불일치하는 문제가 있었습니다.',
    strategy: 'Atomic Design 방법론을 적용하여 150개 이상의 재사용 가능한 컴포넌트와 스타일 가이드를 피그마로 구축했습니다.',
    images: ['https://picsum.photos/1200/800?random=21', 'https://picsum.photos/1200/800?random=22'],
    client: 'SafePay Inc.',
    duration: '8주',
    featured: true
  },
  {
    id: '3',
    title: 'Ed-Tech Landing Page Optimization',
    category: ProjectCategory.LANDING,
    thumbnail: 'https://picsum.photos/1200/800?random=3',
    summary: '상담 신청 리드 수집을 3배 증가시킨 심리 기반 상세페이지 리뉴얼',
    overview: '온라인 교육 서비스의 수강 신청 전환을 위한 랜딩페이지입니다.',
    problem: '단순 정보 나열 위주의 구성으로 사용자의 소구점을 자극하지 못해 상담 신청률이 정체되어 있었습니다.',
    strategy: '사용자의 페인 포인트를 건드리는 카피라이팅과 소셜 프루프(후기) 배치를 강화한 스토리텔링 레이아웃을 설계했습니다.',
    images: ['https://picsum.photos/1200/800?random=31', 'https://picsum.photos/1200/800?random=32'],
    client: 'EduMaster',
    duration: '3주',
    featured: true
  }
];

export const SERVICES: ServicePackage[] = [
  {
    id: 'web-design',
    title: '브랜드 사이트 디자인 + 퍼블리싱',
    description: '기업의 아이덴티티를 담은 고품격 웹사이트를 구축합니다.',
    recommendedFor: ['신규 브랜드 런칭을 앞둔 대표님', '노후된 사이트를 트렌디하게 바꾸고 싶은 기업'],
    includes: ['기획 및 IA 설계', '디자인 가이드 제공', '반응형 웹 퍼블리싱', '기본 SEO 세팅'],
    process: '상담 → 기획 → 디자인 시안 → 개발 → 피드백 → 최종 런칭',
    timeline: '4~8주'
  },
  {
    id: 'landing-page',
    title: '전환형 상세페이지',
    description: '구매와 상담으로 이어지는 강력한 설득 논리를 시각화합니다.',
    recommendedFor: ['광고 효율이 나오지 않는 마케터', '신제품 출시를 준비하는 셀러'],
    includes: ['스토리보드 기획', '고해상도 그래픽 작업', '모바일 최적화 레이아웃', 'CTA 최적화'],
    process: '자료 분석 → 설득 논리 구성 → 비주얼 디자인 → 최종 파일 전달',
    timeline: '1~3주'
  }
];

export const FAQS: FAQItem[] = [
  {
    question: "기획안이 없어도 작업이 가능한가요?",
    answer: "네, 가능합니다. 저희는 단순 디자인뿐만 아니라 비즈니스 목표를 분석하여 정보 구조(IA)와 콘텐츠 기획부터 함께 진행하는 프로세스를 갖추고 있습니다."
  },
  {
    question: "수정은 몇 회까지 가능한가요?",
    answer: "공식적으로는 큰 단계별 2회의 피드백 기간을 가집니다. 하지만 단순 오타나 미세 조정은 프로젝트 기간 내 상시 대응해 드리고 있습니다."
  },
  {
    question: "유지보수 서비스도 제공하시나요?",
    answer: "운영 가이드라인과 원본 파일을 함께 전달드리며, 정기적인 유지보수가 필요한 경우 별도의 운영 파트너십 계약을 통해 지속적인 지원이 가능합니다."
  }
];
