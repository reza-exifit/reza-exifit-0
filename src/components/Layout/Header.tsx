import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart } from 'lucide-react';
import anime from 'animejs/lib/anime.es.js';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const headerRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Initial header animation
    anime({
      targets: headerRef.current,
      opacity: [0, 1],
      translateY: [-20, 0],
      duration: 400,
      easing: 'easeOutExpo'
    });
  }, []);

  useEffect(() => {
    // Mobile menu animation
    if (isMenuOpen && mobileMenuRef.current) {
      anime({
        targets: mobileMenuRef.current,
        opacity: [0, 1],
        height: [0, 'auto'],
        duration: 200,
        easing: 'easeOutQuad'
      });

      // Animate menu items
      anime({
        targets: mobileMenuRef.current.querySelectorAll('a'),
        opacity: [0, 1],
        translateX: [-20, 0],
        duration: 200,
        delay: anime.stagger(30),
        easing: 'easeOutQuad'
      });
    }
  }, [isMenuOpen]);

  const navItems = [
    { path: '/', label: 'خانه' },
    { path: '/products', label: 'محصولات' },
    { path: '/events', label: 'رویدادها' },
    { path: '/contact', label: 'تماس با ما' }
  ];

  const handleLogoHover = (e: React.MouseEvent, isEntering: boolean) => {
    anime({
      targets: e.currentTarget,
      scale: isEntering ? 1.05 : 1,
      duration: 100,
      easing: 'easeOutQuad'
    });
  };

  const handleLogoTap = (e: React.MouseEvent, isPressed: boolean) => {
    anime({
      targets: e.currentTarget,
      scale: isPressed ? 0.95 : 1,
      duration: 100,
      easing: 'easeOutQuad'
    });
  };

  const handleMenuButtonTap = (e: React.MouseEvent, isPressed: boolean) => {
    anime({
      targets: e.currentTarget,
      scale: isPressed ? 0.95 : 1,
      duration: 100,
      easing: 'easeOutQuad'
    });
  };

  return (
    <header
      ref={headerRef}
      className="fixed top-4 left-4 right-4 z-50 max-w-7xl mx-auto mb-4"
      style={{ opacity: 0 }}
    >
      <div className="blur-sheet rounded-2xl shadow-xl">
        <div className="px-4 lg:px-6">
          <div className="flex justify-between items-center h-14 lg:h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 space-x-reverse flex-shrink-0">
              <div
                className="flex items-center space-x-2 space-x-reverse"
                onMouseEnter={(e) => handleLogoHover(e, true)}
                onMouseLeave={(e) => handleLogoHover(e, false)}
                onMouseDown={(e) => handleLogoTap(e, true)}
                onMouseUp={(e) => handleLogoTap(e, false)}
              >
                <Heart className="w-6 h-6 text-purple-500" />
                <span className="text-base sm:text-lg lg:text-xl font-black bg-gradient-to-r from-purple-600 to-emerald-600 bg-clip-text text-transparent whitespace-nowrap">
                  مدیریت سلامت نقره‌ای
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-2 space-x-reverse">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative text-sm font-black transition-all duration-300 whitespace-nowrap px-4 py-2 rounded-xl min-w-[80px] text-center ${
                    location.pathname === item.path
                      ? 'text-purple-600 bg-white/20 backdrop-blur-xl'
                      : 'text-gray-800 hover:text-purple-600 hover:bg-white/10'
                  } focus:outline-none focus:ring-0`}
                >
                  {item.label}
                  {location.pathname === item.path && (
                    <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-emerald-500 rounded-full" />
                  )}
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-2xl bg-white/20 backdrop-blur-xl hover:bg-white/30 transition-all duration-200 flex-shrink-0"
              onMouseDown={(e) => handleMenuButtonTap(e, true)}
              onMouseUp={(e) => handleMenuButtonTap(e, false)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav
              ref={mobileMenuRef}
              className="md:hidden bg-white/20 backdrop-blur-xl rounded-2xl mt-2 overflow-hidden shadow-2xl"
              style={{ opacity: 0, height: 0 }}
            >
              <div className="py-2">
                {navItems.map((item, index) => (
                  <div key={item.path} style={{ opacity: 0 }}>
                    <Link
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block px-4 py-3 text-sm font-black transition-colors duration-200 focus:outline-none ${
                        location.pathname === item.path
                          ? 'text-purple-600 bg-purple-50/50'
                          : 'text-gray-800 hover:text-purple-600 hover:bg-purple-50/30'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </div>
                ))}
              </div>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;