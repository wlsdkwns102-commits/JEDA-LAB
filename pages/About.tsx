
import React from 'react';

export default function About() {
  return (
    <div className="bg-white min-h-screen pb-24">
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <h1 className="text-8xl font-serif font-bold tracking-tight mb-8 leading-tight">Beyond <br /> <span className="italic">Visuals.</span></h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mt-20">
           <div className="lg:col-span-7">
              <h2 className="text-3xl font-serif leading-relaxed mb-12">
                우리는 디자인의 역할을 '아름답게 포장하는 것'이 아니라, 
                <span className="italic"> '문제를 명확히 정의하고 해결하는 것' </span>으로 믿습니다.
              </h2>
              <div className="space-y-8 text-gray-600 leading-loose">
                 <p>
                    디자인 스튜디오 STUDIO_M은 실무 기반의 경험을 가진 시니어급 디자인 팀으로 구성되어 있습니다. 
                    우리는 클라이언트가 직면한 비즈니스의 벽을 분석하고, 디자인이라는 도구를 통해 그 벽을 허무는 최적의 경로를 설계합니다.
                 </p>
                 <p>
                    작업의 퀄리티는 기본입니다. 우리가 가장 중요하게 생각하는 것은 '신뢰'와 '체계'입니다. 
                    철저한 일정 준수, 투명한 커뮤니케이션, 그리고 유지보수가 용이한 정리된 산출물까지. 
                    우리는 클라이언트가 안심하고 비즈니스에 집중할 수 있는 완벽한 디자인 파트너를 지향합니다.
                 </p>
              </div>
           </div>
           <div className="lg:col-span-5 border-l border-gray-100 lg:pl-16">
              <h3 className="text-xs uppercase font-bold tracking-widest text-gray-400 mb-10">Our Philosophy</h3>
              <div className="space-y-12">
                 {[
                   { title: "Essentialism", desc: "불필요한 장식을 걷어내고 본질에 집중합니다." },
                   { title: "Operability", desc: "예쁜 파일이 아닌, 실제로 운영 가능한 시스템을 만듭니다." },
                   { title: "Transparency", desc: "모든 프로세스와 결과물 산출 근거를 투명하게 공유합니다." }
                 ].map((item, idx) => (
                   <div key={idx}>
                      <h4 className="text-lg font-bold mb-3 italic font-serif">0{idx + 1}. {item.title}</h4>
                      <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>

      <section className="py-24 bg-zinc-50 border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-6">
              <h3 className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-16">Communication Rules</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                  {[
                      { title: "Weekly Sync", desc: "매주 마일스톤 현황과 다음 단계를 리포트합니다." },
                      { title: "Tool Stack", desc: "Figma, Slack, Notion을 통해 실시간으로 소통합니다." },
                      { title: "2-Round Feedback", desc: "주요 단계별 명확한 피드백 루프를 운영합니다." },
                      { title: "Style Guide", desc: "컴포넌트 중심의 인수인계 파일을 무조건 제공합니다." }
                  ].map((rule, idx) => (
                      <div key={idx} className="bg-white p-8 shadow-sm">
                          <h4 className="text-sm font-bold mb-4 uppercase tracking-wider">{rule.title}</h4>
                          <p className="text-xs text-gray-500 leading-relaxed">{rule.desc}</p>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      <section className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6 text-center">
              <h2 className="text-4xl font-serif mb-12">Who We Are</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                  {[
                      { name: "S.K. Park", role: "Creative Director", img: "https://picsum.photos/400/500?random=51" },
                      { name: "J.H. Lee", role: "UI/UX Lead", img: "https://picsum.photos/400/500?random=52" },
                      { name: "Y.M. Kim", role: "Design Tech Lead", img: "https://picsum.photos/400/500?random=53" }
                  ].map((member, idx) => (
                      <div key={idx} className="group">
                          <img src={member.img} alt={member.name} className="w-full aspect-[4/5] object-cover mb-8 grayscale group-hover:grayscale-0 transition duration-500" />
                          <h4 className="text-xl font-bold mb-2">{member.name}</h4>
                          <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">{member.role}</p>
                      </div>
                  ))}
              </div>
          </div>
      </section>
    </div>
  );
}
