import React, { useEffect, useRef } from 'react';
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import anime from 'animejs/lib/anime.es.js';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate footer content
            anime({
              targets: contentRef.current?.children,
              opacity: [0, 1],
              translateY: [10, 0],
              duration: 400,
              delay: anime.stagger(30),
              easing: 'easeOutExpo'
            });

            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSocialHover = (e: React.MouseEvent, isEntering: boolean) => {
    anime({
      targets: e.currentTarget,
      scale: isEntering ? 1.1 : 1,
      translateY: isEntering ? -3 : 0,
      duration: 200,
      easing: 'easeOutQuad'
    });
  };

  const handleSocialTap = (e: React.MouseEvent, isPressed: boolean) => {
    anime({
      targets: e.currentTarget,
      scale: isPressed ? 0.95 : 1,
      duration: 100,
      easing: 'easeOutQuad'
    });
  };

  const handleLinkHover = (e: React.MouseEvent, isEntering: boolean) => {
    anime({
      targets: e.currentTarget,
      translateX: isEntering ? 5 : 0,
      duration: 200,
      easing: 'easeOutQuad'
    });
  };

  return (
    <footer ref={footerRef} className="relative mb-4 mx-4 sm:mx-6 lg:mx-8" style={{ marginTop: '15px' }}>
      <div className="blur-sheet rounded-3xl">
        <div
          ref={contentRef}
          className="container mx-auto px-8 sm:px-12 lg:px-16 py-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2" style={{ opacity: 0 }}>
              <div className="flex items-center space-x-2 space-x-reverse mb-6">
                <Heart className="w-8 h-8 text-purple-500" />
                <span className="text-xl font-black bg-gradient-to-r from-purple-600 to-emerald-600 bg-clip-text text-transparent">
                  مدیریت سلامت نقره‌ای
                </span>
              </div>
              <p className="text-gray-800 mb-8 leading-relaxed font-semibold text-lg">
                ما متعهد به ارائه بهترین خدمات فناوری اطلاعات در حوزه سلامت هستیم. 
                با تیمی متخصص و تجربه چندین ساله، راه‌حل‌های نوآورانه و کارآمد برای صنعت سلامت ارائه می‌دهیم.
              </p>
              <div className="flex space-x-4 space-x-reverse">
                {[
                  { Icon: Facebook, href: 'https://facebook.com/silverhealth' },
                  { Icon: Twitter, href: 'https://twitter.com/silverhealth' },
                  { Icon: Instagram, href: 'https://instagram.com/silverhealth' },
                  { Icon: Linkedin, href: 'https://linkedin.com/company/silverhealth' }
                ].map(({ Icon, href }, index) => (
                  <a
                    key={index}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white/30 backdrop-blur-md border border-white/40 rounded-2xl flex items-center justify-center text-gray-700 hover:text-purple-600 hover:bg-white/40 transition-all duration-200"
                    onMouseEnter={(e) => handleSocialHover(e, true)}
                    onMouseLeave={(e) => handleSocialHover(e, false)}
                    onMouseDown={(e) => handleSocialTap(e, true)}
                    onMouseUp={(e) => handleSocialTap(e, false)}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div style={{ opacity: 0 }}>
              <h3 className="text-lg font-black mb-6 text-purple-600">دسترسی سریع</h3>
              <ul className="space-y-3">
                {[
                  { label: 'خانه', href: '/' },
                  { label: 'محصولات', href: '/products' },
                  { label: 'رویدادها', href: '/events' },
                  { label: 'تماس با ما', href: '/contact' }
                ].map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-800 hover:text-purple-600 transition-colors duration-200 font-semibold"
                      onMouseEnter={(e) => handleLinkHover(e, true)}
                      onMouseLeave={(e) => handleLinkHover(e, false)}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div style={{ opacity: 0 }}>
              <h3 className="text-lg font-black mb-6 text-purple-600">اطلاعات تماس</h3>
              <div className="space-y-4">
                <div 
                  className="flex items-center space-x-3 space-x-reverse text-gray-800"
                  onMouseEnter={(e) => handleLinkHover(e, true)}
                  onMouseLeave={(e) => handleLinkHover(e, false)}
                >
                  <MapPin className="w-5 h-5 text-purple-500 flex-shrink-0" />
                  <span className="text-sm font-semibold">تهران، خیابان ولیعصر، پلاک ۱۲۳</span>
                </div>
                <div 
                  className="flex items-center space-x-3 space-x-reverse text-gray-800"
                  onMouseEnter={(e) => handleLinkHover(e, true)}
                  onMouseLeave={(e) => handleLinkHover(e, false)}
                >
                  <Phone className="w-5 h-5 text-purple-500 flex-shrink-0" />
                  <span className="text-sm font-semibold" dir="ltr">+98 21 1234 5678</span>
                </div>
                <div 
                  className="flex items-center space-x-3 space-x-reverse text-gray-800"
                  onMouseEnter={(e) => handleLinkHover(e, true)}
                  onMouseLeave={(e) => handleLinkHover(e, false)}
                >
                  <Mail className="w-5 h-5 text-purple-500 flex-shrink-0" />
                  <span className="text-sm font-semibold" dir="ltr">info@silverhealth.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div
            className="border-t border-gray-300/50 mt-12 pt-8 text-center"
            style={{ opacity: 0 }}
          >
            <p className="text-gray-700 text-sm font-semibold">
              © {currentYear} مدیریت سلامت نقره‌ای. تمامی حقوق محفوظ است.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;