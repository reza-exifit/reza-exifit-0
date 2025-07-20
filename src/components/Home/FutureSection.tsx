import React, { useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';
import { Calendar, Target, Rocket, Users, TrendingUp, Award, Sparkles } from 'lucide-react';

const FutureSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const plans = [
    {
      icon: Target,
      title: "توسعه هوش مصنوعی",
      description: "پیاده‌سازی الگوریتم‌های هوش مصنوعی برای تشخیص بهتر بیماری‌ها",
      timeline: "ماه اول تا سوم"
    },
    {
      icon: Rocket,
      title: "اپلیکیشن موبایل",
      description: "راه‌اندازی اپلیکیشن موبایل برای دسترسی آسان‌تر بیماران",
      timeline: "ماه سوم تا چهارم"
    },
    {
      icon: Users,
      title: "شبکه پزشکان",
      description: "ایجاد شبکه‌ای از پزشکان متخصص برای مشاوره آنلاین",
      timeline: "ماه چهارم تا پنجم"
    },
    {
      icon: TrendingUp,
      title: "تحلیل داده‌ها",
      description: "سیستم پیشرفته تحلیل داده‌های سلامت و ارائه گزارشات",
      timeline: "ماه پنجم تا ششم"
    },
    {
      icon: Award,
      title: "استانداردسازی",
      description: "دریافت گواهینامه‌های بین‌المللی کیفیت و امنیت",
      timeline: "ماه ششم"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Header animation
            anime({
              targets: headerRef.current,
              opacity: [0, 1],
              translateY: [15, 0],
              duration: 600,
              easing: 'easeOutExpo'
            });

            // Grid items staggered animation
            anime({
              targets: gridRef.current?.children,
              opacity: [0, 1],
              translateX: [-20, 0],
              duration: 400,
              delay: anime.stagger(30, { start: 200 }),
              easing: 'easeOutExpo'
            });

            // CTA animation
            anime({
              targets: ctaRef.current,
              opacity: [0, 1],
              translateY: [15, 0],
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
      scale: isEntering ? 1.03 : 1,
      translateY: isEntering ? -5 : 0,
      duration: 200,
      easing: 'easeOutQuad'
    });
  };

  const handleIconHover = (e: React.MouseEvent, isEntering: boolean) => {
    const icon = e.currentTarget.querySelector('.icon-rotate');
    if (icon && isEntering) {
      anime({
        targets: icon,
        rotate: 360,
        duration: 300,
        easing: 'easeOutQuad'
      });
    }
  };

  const handleCTAButtonHover = (e: React.MouseEvent, isEntering: boolean) => {
    anime({
      targets: e.currentTarget,
      scale: isEntering ? 1.05 : 1,
      translateY: isEntering ? -3 : 0,
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
      <div className="blur-sheet rounded-3xl mx-4 sm:mx-6 lg:mx-8">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 py-8">
          <div ref={headerRef} className="text-center mb-10" style={{ opacity: 0 }}>
            <div className="inline-flex items-center space-x-2 space-x-reverse bg-white/20 backdrop-blur-xl border border-white/30 rounded-full px-6 py-3 mb-6">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <span className="text-gray-800 font-black">برنامه‌های آینده</span>
            </div>
            <h2 className="text-2xl lg:text-4xl font-black mb-6 text-gray-800">
              نقشه راه نوآوری
            </h2>
            <p className="text-base text-gray-700 max-w-3xl mx-auto font-semibold">
              نگاهی به برنامه‌های توسعه و نوآوری ما در شش ماه آینده
            </p>
          </div>

          <div ref={gridRef} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {plans.map((plan, index) => (
              <div
                key={index}
                className="group"
                style={{ opacity: 0 }}
                onMouseEnter={(e) => handleCardHover(e, true)}
                onMouseLeave={(e) => handleCardHover(e, false)}
              >
                <div className="bg-white/30 backdrop-blur-md border border-white/40 rounded-2xl p-6 hover:bg-white/40 transition-all duration-200">
                  <div className="flex items-start space-x-4 space-x-reverse">
                    <div
                      className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-500 to-emerald-500 rounded-2xl flex items-center justify-center"
                      onMouseEnter={(e) => handleIconHover(e, true)}
                      onMouseLeave={(e) => handleIconHover(e, false)}
                    >
                      <plan.icon className="w-6 h-6 text-white icon-rotate" />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-lg font-black text-gray-800 mb-3 group-hover:text-purple-600 transition-colors">
                        {plan.title}
                      </h3>
                      <p className="text-gray-700 mb-4 leading-relaxed font-semibold">
                        {plan.description}
                      </p>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Calendar className="w-5 h-5 text-purple-500" />
                        <span className="text-purple-600 font-bold">
                          {plan.timeline}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div ref={ctaRef} className="text-center mt-10" style={{ opacity: 0 }}>
            <button
              className="bg-gradient-to-r from-purple-500 to-emerald-500 hover:from-purple-600 hover:to-emerald-600 text-white px-8 py-4 rounded-2xl font-black text-base shadow-2xl transition-all duration-200"
              onMouseEnter={(e) => handleCTAButtonHover(e, true)}
              onMouseLeave={(e) => handleCTAButtonHover(e, false)}
              onMouseDown={(e) => handleCTAButtonTap(e, true)}
              onMouseUp={(e) => handleCTAButtonTap(e, false)}
            >
              جزئیات بیشتر
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FutureSection;