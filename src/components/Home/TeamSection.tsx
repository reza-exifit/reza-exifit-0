import React, { useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';
import { Users, Sparkles } from 'lucide-react';
import { teamMembers } from '../../data/team';

const TeamSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Header animation
            anime({
              targets: headerRef.current,
              opacity: [0, 1],
              translateY: [20, 0],
              duration: 600,
              easing: 'easeOutExpo'
            });

            // Grid items staggered animation
            anime({
              targets: gridRef.current?.children,
              opacity: [0, 1],
              translateY: [20, 0],
              duration: 400,
              delay: anime.stagger(50, { start: 200 }),
              easing: 'easeOutExpo'
            });

            // CTA animation
            anime({
              targets: ctaRef.current,
              opacity: [0, 1],
              translateY: [20, 0],
              duration: 400,
              delay: 800,
              easing: 'easeOutExpo'
            });

            observer.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: '-50px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleCardHover = (e: React.MouseEvent, isEntering: boolean) => {
    anime({
      targets: e.currentTarget,
      translateY: isEntering ? -4 : 0,
      scale: isEntering ? 1.02 : 1,
      duration: 200,
      easing: 'easeOutQuad'
    });
  };

  const handleButtonHover = (e: React.MouseEvent, isEntering: boolean) => {
    anime({
      targets: e.currentTarget,
      scale: isEntering ? 1.02 : 1,
      duration: 200,
      easing: 'easeOutQuad'
    });
  };

  const handleButtonTap = (e: React.MouseEvent, isPressed: boolean) => {
    anime({
      targets: e.currentTarget,
      scale: isPressed ? 0.98 : 1,
      duration: 100,
      easing: 'easeOutQuad'
    });
  };

  const handleCTAButtonHover = (e: React.MouseEvent, isEntering: boolean) => {
    anime({
      targets: e.currentTarget,
      scale: isEntering ? 1.05 : 1,
      translateY: isEntering ? -2 : 0,
      duration: 200,
      easing: 'easeOutQuad'
    });
  };

  const handleCTAButtonTap = (e: React.MouseEvent, isPressed: boolean) => {
    anime({
      targets: e.currentTarget,
      scale: isPressed ? 0.95 : 1,
      duration: 100,
      easing: 'easeOutQuad'
    });
  };

  return (
    <section ref={sectionRef} className="py-4 relative" style={{ marginTop: '15px' }}>
      <div className="mx-4 sm:mx-6 lg:mx-8">
        <div className="blur-sheet rounded-3xl">
          <div className="container mx-auto px-6 sm:px-8 lg:px-12 py-8">
            {/* Section Header */}
            <div ref={headerRef} className="text-center mb-8" style={{ opacity: 0 }}>
              <div className="inline-flex items-center space-x-2 space-x-reverse bg-white/20 backdrop-blur-xl border border-white/30 rounded-full px-4 py-2 mb-4">
                <Users className="w-4 h-4 text-purple-600" />
                <span className="text-gray-800 font-bold text-sm">تیم متخصص ما</span>
              </div>
              <h2 className="text-2xl lg:text-3xl font-black mb-4 text-gray-800">
                متخصصان برتر
              </h2>
              <p className="text-base text-gray-700 max-w-2xl mx-auto font-bold">
                تیمی از بهترین متخصصان فناوری سلامت که آینده را می‌سازند
              </p>
            </div>

            {/* Team Grid - Minimal Design */}
            <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {teamMembers.map((member, index) => (
                <div
                  key={member.id}
                  className="group"
                  style={{ opacity: 0 }}
                  onMouseEnter={(e) => handleCardHover(e, true)}
                  onMouseLeave={(e) => handleCardHover(e, false)}
                >
                  <div className="bg-white/30 backdrop-blur-md border border-white/40 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-200">
                    {/* Member Image - Smaller */}
                    <div className="relative h-32 overflow-hidden">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      
                      {/* Member Info Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                        <h3 className="text-sm font-black mb-1 group-hover:text-purple-300 transition-colors">
                          {member.name}
                        </h3>
                        <p className="text-emerald-300 font-bold text-xs">
                          {member.role}
                        </p>
                      </div>
                    </div>

                    {/* Member Details - Compact */}
                    <div className="p-4">
                      <p className="text-gray-800 leading-relaxed font-semibold text-sm line-clamp-2 mb-3">
                        {member.description}
                      </p>
                      
                      {/* Skills Tags - Smaller */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {['AI', 'سلامت', 'نوآوری'].slice(0, 2).map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="bg-gradient-to-r from-purple-100 to-emerald-100 text-gray-800 px-2 py-1 rounded-full text-xs font-bold"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      {/* Contact Button - Smaller */}
                      <button
                        className="w-full bg-gradient-to-r from-purple-500 to-emerald-500 hover:from-purple-600 hover:to-emerald-600 text-white py-2 rounded-lg font-bold text-xs transition-all duration-200"
                        onMouseEnter={(e) => handleButtonHover(e, true)}
                        onMouseLeave={(e) => handleButtonHover(e, false)}
                        onMouseDown={(e) => handleButtonTap(e, true)}
                        onMouseUp={(e) => handleButtonTap(e, false)}
                      >
                        مشاهده پروفایل
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Call to Action - Compact */}
            <div ref={ctaRef} className="text-center mt-8" style={{ opacity: 0 }}>
              <div className="bg-white/30 backdrop-blur-md border border-white/40 rounded-2xl p-6 max-w-lg mx-auto">
                <h3 className="text-lg font-black text-gray-800 mb-3">
                  به تیم ما بپیوندید
                </h3>
                <p className="text-gray-700 mb-4 font-semibold text-sm">
                  در حال جستجوی استعدادهای جدید برای توسعه آینده سلامت دیجیتال
                </p>
                <button
                  className="bg-gradient-to-r from-purple-500 to-emerald-500 hover:from-purple-600 hover:to-emerald-600 text-white px-6 py-2 rounded-lg font-bold text-sm transition-all duration-200"
                  onMouseEnter={(e) => handleCTAButtonHover(e, true)}
                  onMouseLeave={(e) => handleCTAButtonHover(e, false)}
                  onMouseDown={(e) => handleCTAButtonTap(e, true)}
                  onMouseUp={(e) => handleCTAButtonTap(e, false)}
                >
                  مشاهده فرصت‌های شغلی
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;