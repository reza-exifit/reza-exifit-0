import React, { useEffect, useState, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';
import { Mail, Phone, MapPin, Clock, Send, User, MessageSquare, Sparkles } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = 'تماس با ما - مدیریت سلامت نقره‌ای';
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

    // Content animation with intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: contentRef.current?.children,
              opacity: [0, 1],
              translateY: [15, 0],
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

    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "تلفن تماس",
      content: "+98 21 1234 5678",
      subtitle: "پاسخگویی ۲۴ ساعته"
    },
    {
      icon: Mail,
      title: "ایمیل",
      content: "info@silverhealth.com",
      subtitle: "پاسخ در کمتر از ۲۴ ساعت"
    },
    {
      icon: MapPin,
      title: "آدرس",
      content: "تهران، خیابان ولیعصر، پلاک ۱۲۳",
      subtitle: "ساختمان تجاری نقره‌ای، طبقه ۸"
    },
    {
      icon: Clock,
      title: "ساعات کاری",
      content: "شنبه تا چهارشنبه: ۸ الی ۱۷",
      subtitle: "پنج‌شنبه: ۸ الی ۱۳"
    }
  ];

  const handleCardHover = (e: React.MouseEvent, isEntering: boolean) => {
    anime({
      targets: e.currentTarget,
      scale: isEntering ? 1.03 : 1,
      translateX: isEntering ? 8 : 0,
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

  const handleInputFocus = (e: React.FocusEvent) => {
    anime({
      targets: e.currentTarget,
      scale: 1.01,
      duration: 200,
      easing: 'easeOutQuad'
    });
  };

  const handleInputBlur = (e: React.FocusEvent) => {
    anime({
      targets: e.currentTarget,
      scale: 1,
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
              <span className="text-gray-800 font-black">ارتباط با ما</span>
            </div>
            <h1 className="text-4xl lg:text-7xl font-black mb-6 text-gray-800">
              تماس با ما
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-semibold">
              آماده پاسخگویی به سوالات و ارائه مشاوره تخصصی هستیم
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-4" style={{ marginTop: '15px' }}>
        <div className="blur-sheet rounded-3xl mx-4 sm:mx-6 lg:mx-8">
          <div
            ref={contentRef}
            className="container mx-auto px-8 sm:px-12 lg:px-16 py-8"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div style={{ opacity: 0 }}>
                <h2 className="text-4xl font-black text-gray-800 mb-10">
                  اطلاعات تماس
                </h2>
                
                <div className="space-y-8">
                  {contactInfo.map((info, index) => (
                    <div
                      key={index}
                      className="group"
                      onMouseEnter={(e) => handleCardHover(e, true)}
                      onMouseLeave={(e) => handleCardHover(e, false)}
                    >
                      <div className="bg-white/30 backdrop-blur-md border border-white/40 rounded-3xl p-8 hover:shadow-2xl transition-all duration-200">
                        <div className="flex items-start space-x-4 space-x-reverse">
                          <div
                            className="flex-shrink-0 w-14 h-14 bg-gradient-to-r from-purple-500 to-emerald-500 rounded-2xl flex items-center justify-center"
                            onMouseEnter={(e) => handleIconHover(e, true)}
                            onMouseLeave={(e) => handleIconHover(e, false)}
                          >
                            <info.icon className="w-7 h-7 text-white icon-rotate" />
                          </div>
                          <div>
                            <h3 className="text-xl font-black text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
                              {info.title}
                            </h3>
                            <p className="text-gray-700 font-bold mb-2 text-lg">
                              {info.content}
                            </p>
                            <p className="text-gray-600 font-semibold">
                              {info.subtitle}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Map Placeholder */}
                <div className="mt-10 bg-white/30 backdrop-blur-md border border-white/40 rounded-3xl p-8">
                  <h3 className="text-xl font-black text-gray-800 mb-6">
                    موقعیت ما
                  </h3>
                  <div className="h-72 bg-gradient-to-br from-purple-100 to-emerald-100 rounded-2xl flex items-center justify-center">
                    <p className="text-gray-700 font-bold text-lg">نقشه موقعیت مکانی</p>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div style={{ opacity: 0 }}>
                <div className="bg-white/30 backdrop-blur-md border border-white/40 rounded-3xl p-10">
                  <h2 className="text-4xl font-black text-gray-800 mb-10">
                    فرم تماس
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="group">
                        <label className="flex items-center space-x-2 space-x-reverse text-gray-800 font-black mb-3">
                          <User className="w-5 h-5 text-purple-500" />
                          <span>نام و نام خانوادگی</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          onFocus={handleInputFocus}
                          onBlur={handleInputBlur}
                          className="w-full px-6 py-4 bg-white/30 backdrop-blur-md border border-white/40 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 font-semibold"
                          required
                        />
                      </div>

                      <div className="group">
                        <label className="flex items-center space-x-2 space-x-reverse text-gray-800 font-black mb-3">
                          <Mail className="w-5 h-5 text-purple-500" />
                          <span>ایمیل</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          onFocus={handleInputFocus}
                          onBlur={handleInputBlur}
                          className="w-full px-6 py-4 bg-white/30 backdrop-blur-md border border-white/40 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 font-semibold"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="group">
                        <label className="flex items-center space-x-2 space-x-reverse text-gray-800 font-black mb-3">
                          <Phone className="w-5 h-5 text-purple-500" />
                          <span>شماره تماس</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          onFocus={handleInputFocus}
                          onBlur={handleInputBlur}
                          className="w-full px-6 py-4 bg-white/30 backdrop-blur-md border border-white/40 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 font-semibold"
                        />
                      </div>

                      <div className="group">
                        <label className="text-gray-800 font-black mb-3 block">
                          موضوع
                        </label>
                        <select
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          onFocus={handleInputFocus}
                          onBlur={handleInputBlur}
                          className="w-full px-6 py-4 bg-white/30 backdrop-blur-md border border-white/40 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 font-semibold"
                          required
                        >
                          <option value="">انتخاب موضوع</option>
                          <option value="consultation">مشاوره محصولات</option>
                          <option value="support">پشتیبانی فنی</option>
                          <option value="partnership">همکاری</option>
                          <option value="other">سایر</option>
                        </select>
                      </div>
                    </div>

                    <div className="group">
                      <label className="text-gray-800 font-black mb-3 block">
                        پیام شما
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                        rows={6}
                        className="w-full px-6 py-4 bg-white/30 backdrop-blur-md border border-white/40 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 resize-none font-semibold"
                        placeholder="پیام خود را بنویسید..."
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-500 to-emerald-500 hover:from-purple-600 hover:to-emerald-600 text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center space-x-2 space-x-reverse transition-all duration-200"
                      onMouseEnter={(e) => handleButtonHover(e, true)}
                      onMouseLeave={(e) => handleButtonHover(e, false)}
                      onMouseDown={(e) => handleButtonTap(e, true)}
                      onMouseUp={(e) => handleButtonTap(e, false)}
                    >
                      <Send className="w-6 h-6" />
                      <span>ارسال پیام</span>
                    </button>
                  </form>
                </div>

                {/* Newsletter Signup */}
                <div className="mt-10 bg-gradient-to-r from-purple-500 to-emerald-500 rounded-3xl p-10 text-white">
                  <h3 className="text-2xl font-black mb-6">
                    عضویت در خبرنامه
                  </h3>
                  <p className="mb-8 text-purple-100 font-semibold text-lg">
                    از آخرین اخبار و رویدادها مطلع شوید
                  </p>
                  <div className="flex space-x-4 space-x-reverse">
                    <input
                      type="email"
                      placeholder="آدرس ایمیل شما"
                      className="flex-1 px-6 py-4 bg-white/20 border border-white/20 rounded-2xl text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-white/50 font-semibold"
                    />
                    <button
                      className="bg-white text-purple-600 px-8 py-4 rounded-2xl font-black hover:bg-gray-100 transition-colors"
                      onMouseEnter={(e) => handleButtonHover(e, true)}
                      onMouseLeave={(e) => handleButtonHover(e, false)}
                      onMouseDown={(e) => handleButtonTap(e, true)}
                      onMouseUp={(e) => handleButtonTap(e, false)}
                    >
                      عضویت
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;