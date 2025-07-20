import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import anime from 'animejs/lib/anime.es.js';
import { Play, ChevronDown, Sparkles } from 'lucide-react';

const Hero: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Initial entrance animations
    const timeline = anime.timeline({
      easing: 'easeOutExpo',
      duration: 600
    });

    timeline
      .add({
        targets: heroRef.current,
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 400,
        delay: 100
      })
      .add({
        targets: badgeRef.current,
        opacity: [0, 1],
        scale: [0.8, 1],
        duration: 300,
        delay: 200
      }, '-=200')
      .add({
        targets: titleRef.current,
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 300,
        delay: 300
      }, '-=100')
      .add({
        targets: subtitleRef.current,
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 300,
        delay: 400
      }, '-=100')
      .add({
        targets: buttonsRef.current,
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 300,
        delay: 500
      }, '-=100')
      .add({
        targets: scrollIndicatorRef.current,
        opacity: [0, 1],
        duration: 300,
        delay: 600
      }, '-=100');

    // Scroll indicator animation
    anime({
      targets: scrollIndicatorRef.current?.querySelector('.animate-bounce'),
      translateY: [0, 8, 0],
      duration: 1200,
      loop: true,
      easing: 'easeInOutSine'
    });
  }, []);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight - 100,
      behavior: 'smooth'
    });
  };

  const handleButtonHover = (e: React.MouseEvent, isEntering: boolean) => {
    anime({
      targets: e.currentTarget,
      scale: isEntering ? 1.05 : 1,
      translateY: isEntering ? -3 : 0,
      duration: 200,
      easing: 'easeOutQuad'
    });
  };

  const handleButtonTap = (e: React.MouseEvent, isPressed: boolean) => {
    anime({
      targets: e.currentTarget,
      scale: isPressed ? 0.95 : 1,
      duration: 100,
      easing: 'easeOutQuad'
    });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-4" style={{ marginTop: '15px' }}>
      {/* Hero Content */}
      <div className="blur-sheet rounded-3xl mx-4 sm:mx-6 lg:mx-8 max-w-5xl w-full relative">
        <div
          ref={heroRef}
          className="relative z-10 text-center px-6 sm:px-8 lg:px-12 py-12 lg:py-16 pb-20"
          style={{ opacity: 0 }}
        >
          <div
            ref={badgeRef}
            className="inline-flex items-center space-x-2 space-x-reverse bg-white/20 backdrop-blur-xl border border-white/30 rounded-full px-4 py-2 mb-6"
            style={{ opacity: 0 }}
          >
            <Sparkles className="w-5 h-5 text-purple-600" />
            <span className="text-gray-800 font-black">نوآوری در سلامت دیجیتال</span>
          </div>

          <h1
            ref={titleRef}
            className="text-3xl sm:text-4xl lg:text-6xl font-black mb-6 leading-tight"
            style={{ opacity: 0 }}
          >
            <span className="bg-gradient-to-r from-purple-600 via-gray-800 to-emerald-600 bg-clip-text text-transparent">
              مدیریت سلامت
            </span>
            <br />
            <span className="bg-gradient-to-r from-emerald-600 via-gray-800 to-purple-600 bg-clip-text text-transparent">
              نقره‌ای
            </span>
          </h1>

          <div
            ref={subtitleRef}
            className="mb-8"
            style={{ opacity: 0 }}
          >
            <p className="text-xl sm:text-2xl lg:text-3xl font-black text-emerald-600 mb-4">
              تیم حرفه‌ای، خدمات حرفه‌ای
            </p>
            <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed font-semibold">
              ما با بهره‌گیری از جدیدترین فناوری‌ها و تیمی متخصص، 
              راه‌حل‌های نوآورانه در حوزه فناوری اطلاعات سلامت ارائه می‌دهیم
            </p>
          </div>

          <div
            ref={buttonsRef}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 sm:space-x-reverse"
            style={{ opacity: 0 }}
          >
            <Link to="/products">
              <button
                className="group bg-gradient-to-r from-purple-500 to-emerald-500 hover:from-purple-600 hover:to-emerald-600 text-white px-8 py-4 rounded-2xl font-black text-base shadow-2xl transition-all duration-200 flex items-center space-x-3 space-x-reverse"
                onMouseEnter={(e) => handleButtonHover(e, true)}
                onMouseLeave={(e) => handleButtonHover(e, false)}
                onMouseDown={(e) => handleButtonTap(e, true)}
                onMouseUp={(e) => handleButtonTap(e, false)}
              >
                <span>مشاهده محصولات</span>
                <Play className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>

            <Link to="/contact">
              <button
                className="bg-white/20 backdrop-blur-xl border border-white/30 text-gray-800 px-8 py-4 rounded-2xl font-black text-base hover:bg-white/30 transition-all duration-200"
                onMouseEnter={(e) => handleButtonHover(e, true)}
                onMouseLeave={(e) => handleButtonHover(e, false)}
                onMouseDown={(e) => handleButtonTap(e, true)}
                onMouseUp={(e) => handleButtonTap(e, false)}
              >
                تماس با ما
              </button>
            </Link>
          </div>

          {/* Scroll Indicator - Inside the hero card */}
          <button
            ref={scrollIndicatorRef}
            onClick={scrollToContent}
            className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-gray-700 hover:text-gray-900 transition-colors z-20"
            style={{ opacity: 0 }}
          >
            <div className="flex flex-col items-center space-y-2">
              <span className="text-sm font-bold">ادامه مطالب</span>
              <div className="animate-bounce">
                <ChevronDown className="w-6 h-6" />
              </div>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;