import React, { useEffect, useRef, useState } from 'react';
import anime from 'animejs/lib/anime.es.js';
import { Calendar, Clock, MapPin, ExternalLink, Users, Sparkles } from 'lucide-react';
import { events } from '../data/events';

const Events: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const eventsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = 'رویدادها - مدیریت سلامت نقره‌ای';
  }, []);

  useEffect(() => {
    // Hero animation
    anime({
      targets: heroRef.current,
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 600,
      easing: 'easeOutExpo'
    });

    // Events animation with intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: eventsRef.current?.children,
              opacity: [0, 1],
              translateY: [20, 0],
              duration: 400,
              delay: anime.stagger(50),
              easing: 'easeOutExpo'
            });

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
      { threshold: 0.1 }
    );

    if (eventsRef.current) {
      observer.observe(eventsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Modal animation
    if (selectedEvent && modalRef.current) {
      anime({
        targets: modalRef.current,
        opacity: [0, 1],
        duration: 200,
        easing: 'easeOutQuad'
      });

      anime({
        targets: modalRef.current.querySelector('.modal-content'),
        scale: [0.9, 1],
        opacity: [0, 1],
        duration: 200,
        easing: 'easeOutQuad'
      });
    }
  }, [selectedEvent]);

  const handleCardHover = (e: React.MouseEvent, isEntering: boolean) => {
    anime({
      targets: e.currentTarget,
      scale: isEntering ? 1.02 : 1,
      translateY: isEntering ? -8 : 0,
      duration: 200,
      easing: 'easeOutQuad'
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

  const handleCloseModal = () => {
    if (modalRef.current) {
      anime({
        targets: modalRef.current.querySelector('.modal-content'),
        scale: [1, 0.9],
        opacity: [1, 0],
        duration: 200,
        easing: 'easeOutQuad'
      });

      anime({
        targets: modalRef.current,
        opacity: [1, 0],
        duration: 200,
        delay: 100,
        easing: 'easeOutQuad',
        complete: () => setSelectedEvent(null)
      });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 lg:py-20 relative" style={{ marginTop: '15px' }}>
        <div className="blur-sheet rounded-3xl mx-4 sm:mx-6 lg:mx-8">
          <div
            ref={heroRef}
            className="relative z-10 container mx-auto px-8 sm:px-12 lg:px-16 py-12 text-center"
            style={{ opacity: 0 }}
          >
            <div className="inline-flex items-center space-x-2 space-x-reverse bg-white/20 backdrop-blur-xl border border-white/30 rounded-full px-6 py-3 mb-8">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <span className="text-gray-800 font-black">رویدادهای علمی</span>
            </div>
            <h1 className="text-4xl lg:text-7xl font-black mb-6 text-gray-800">
              رویدادهای آینده
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-semibold">
              به برنامه‌های آموزشی و علمی ما بپیوندید
            </p>
          </div>
        </div>
      </section>

      {/* Events List */}
      <section className="py-4" style={{ marginTop: '15px' }}>
        <div className="blur-sheet rounded-3xl mx-4 sm:mx-6 lg:mx-8">
          <div className="container mx-auto px-8 sm:px-12 lg:px-16 py-8">
            <div ref={eventsRef} className="space-y-8">
              {events.map((event, index) => (
                <div
                  key={event.id}
                  className="group"
                  style={{ opacity: 0 }}
                  onMouseEnter={(e) => handleCardHover(e, true)}
                  onMouseLeave={(e) => handleCardHover(e, false)}
                >
                  <div className="bg-white/30 backdrop-blur-md border border-white/40 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-200">
                    <div className="lg:flex">
                      {/* Event Image */}
                      <div className="lg:w-1/3 h-72 lg:h-auto relative overflow-hidden">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute top-6 left-6 bg-gradient-to-r from-purple-500 to-emerald-500 text-white px-4 py-2 rounded-full font-black">
                          رویداد {index + 1}
                        </div>
                      </div>

                      {/* Event Content */}
                      <div className="lg:w-2/3 p-10">
                        <h3 className="text-3xl lg:text-4xl font-black text-gray-800 mb-6 group-hover:text-purple-600 transition-colors">
                          {event.title}
                        </h3>
                        
                        <p className="text-gray-700 mb-8 leading-relaxed text-lg font-semibold">
                          {event.description}
                        </p>

                        {/* Event Details */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                          <div className="flex items-center space-x-3 space-x-reverse">
                            <Calendar className="w-6 h-6 text-purple-500" />
                            <div>
                              <p className="font-black text-gray-800">تاریخ</p>
                              <p className="text-gray-700 font-semibold">{event.date}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-3 space-x-reverse">
                            <Clock className="w-6 h-6 text-purple-500" />
                            <div>
                              <p className="font-black text-gray-800">زمان</p>
                              <p className="text-gray-700 font-semibold">{event.time}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-3 space-x-reverse">
                            <MapPin className="w-6 h-6 text-purple-500" />
                            <div>
                              <p className="font-black text-gray-800">مکان</p>
                              <p className="text-gray-700 font-semibold">{event.location}</p>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 sm:space-x-reverse">
                          <a
                            href={event.registrationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center space-x-2 space-x-reverse bg-gradient-to-r from-purple-500 to-emerald-500 hover:from-purple-600 hover:to-emerald-600 text-white px-8 py-4 rounded-2xl font-black transition-all duration-200"
                            onMouseEnter={(e) => handleButtonHover(e, true)}
                            onMouseLeave={(e) => handleButtonHover(e, false)}
                            onMouseDown={(e) => handleButtonTap(e, true)}
                            onMouseUp={(e) => handleButtonTap(e, false)}
                          >
                            <Users className="w-5 h-5" />
                            <span>ثبت‌نام در رویداد</span>
                            <ExternalLink className="w-4 h-4" />
                          </a>
                          
                          <button
                            onClick={() => setSelectedEvent(event.id)}
                            className="flex items-center justify-center space-x-2 space-x-reverse bg-white/30 backdrop-blur-md border border-white/40 text-gray-700 hover:text-purple-600 px-8 py-4 rounded-2xl font-black transition-all duration-200"
                            onMouseEnter={(e) => handleButtonHover(e, true)}
                            onMouseLeave={(e) => handleButtonHover(e, false)}
                            onMouseDown={(e) => handleButtonTap(e, true)}
                            onMouseUp={(e) => handleButtonTap(e, false)}
                          >
                            <span>اطلاعات کامل</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Future Events Note */}
            <div ref={ctaRef} className="mt-16 text-center" style={{ opacity: 0 }}>
              <div className="bg-white/30 backdrop-blur-md border border-white/40 rounded-3xl p-10 max-w-2xl mx-auto">
                <h3 className="text-2xl font-black text-gray-800 mb-6">
                  رویدادهای بیشتر در راه است
                </h3>
                <p className="text-gray-700 mb-8 leading-relaxed font-semibold text-lg">
                  برای اطلاع از جدیدترین رویدادها و برنامه‌های آموزشی، در خبرنامه ما عضو شوید
                </p>
                <button
                  className="bg-gradient-to-r from-purple-500 to-emerald-500 hover:from-purple-600 hover:to-emerald-600 text-white px-10 py-4 rounded-2xl font-black text-lg transition-all duration-200"
                  onMouseEnter={(e) => handleButtonHover(e, true)}
                  onMouseLeave={(e) => handleButtonHover(e, false)}
                  onMouseDown={(e) => handleButtonTap(e, true)}
                  onMouseUp={(e) => handleButtonTap(e, false)}
                >
                  عضویت در خبرنامه
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div
          ref={modalRef}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          style={{ opacity: 0 }}
          onClick={handleCloseModal}
        >
          <div
            className="modal-content bg-white/90 backdrop-blur-md border border-white/40 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            style={{ opacity: 0, transform: 'scale(0.9)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {(() => {
              const event = events.find(e => e.id === selectedEvent);
              if (!event) return null;

              return (
                <div className="p-8">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                      {event.title}
                    </h2>
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-48 object-cover rounded-xl mb-4"
                    />
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {event.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div><strong>تاریخ:</strong> {event.date}</div>
                      <div><strong>زمان:</strong> {event.time}</div>
                      <div className="col-span-2"><strong>مکان:</strong> {event.location}</div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-4 space-x-reverse">
                    <button
                      onClick={handleCloseModal}
                      className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                    >
                      بستن
                    </button>
                    <a
                      href={event.registrationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-orange-500 text-white py-3 rounded-xl font-semibold text-center hover:bg-orange-600 transition-colors"
                    >
                      ثبت‌نام
                    </a>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;