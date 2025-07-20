import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, User, MessageSquare, Sparkles } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    document.title = 'تماس با ما - مدیریت سلامت نقره‌ای';
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } }
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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 lg:py-20 relative" style={{ marginTop: '15px' }}>
        <div className="blur-sheet rounded-3xl mx-4 sm:mx-6 lg:mx-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="relative z-10 container mx-auto px-8 sm:px-12 lg:px-16 py-12 text-center"
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
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-4" style={{ marginTop: '15px' }}>
        <div className="blur-sheet rounded-3xl mx-4 sm:mx-6 lg:mx-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="container mx-auto px-8 sm:px-12 lg:px-16 py-8"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <motion.div variants={itemVariants}>
                <h2 className="text-4xl font-black text-gray-800 mb-10">
                  اطلاعات تماس
                </h2>
                
                <div className="space-y-8">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      whileHover={{ scale: 1.03, x: 8 }}
                      className="group"
                    >
                      <div className="bg-white/30 backdrop-blur-md border border-white/40 rounded-3xl p-8 hover:shadow-2xl transition-all duration-200">
                        <div className="flex items-start space-x-4 space-x-reverse">
                          <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.3 }}
                            className="flex-shrink-0 w-14 h-14 bg-gradient-to-r from-purple-500 to-emerald-500 rounded-2xl flex items-center justify-center"
                          >
                            <info.icon className="w-7 h-7 text-white" />
                          </motion.div>
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
                    </motion.div>
                  ))}
                </div>

                {/* Map Placeholder */}
                <motion.div
                  variants={itemVariants}
                  className="mt-10 bg-white/30 backdrop-blur-md border border-white/40 rounded-3xl p-8"
                >
                  <h3 className="text-xl font-black text-gray-800 mb-6">
                    موقعیت ما
                  </h3>
                  <div className="h-72 bg-gradient-to-br from-purple-100 to-emerald-100 rounded-2xl flex items-center justify-center">
                    <p className="text-gray-700 font-bold text-lg">نقشه موقعیت مکانی</p>
                  </div>
                </motion.div>
              </motion.div>

              {/* Contact Form */}
              <motion.div variants={itemVariants}>
                <div className="bg-white/30 backdrop-blur-md border border-white/40 rounded-3xl p-10">
                  <h2 className="text-4xl font-black text-gray-800 mb-10">
                    فرم تماس
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <motion.div
                        whileFocus={{ scale: 1.01 }}
                        className="group"
                      >
                        <label className="flex items-center space-x-2 space-x-reverse text-gray-800 font-black mb-3">
                          <User className="w-5 h-5 text-purple-500" />
                          <span>نام و نام خانوادگی</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-6 py-4 bg-white/30 backdrop-blur-md border border-white/40 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 font-semibold"
                          required
                        />
                      </motion.div>

                      <motion.div
                        whileFocus={{ scale: 1.01 }}
                        className="group"
                      >
                        <label className="flex items-center space-x-2 space-x-reverse text-gray-800 font-black mb-3">
                          <Mail className="w-5 h-5 text-purple-500" />
                          <span>ایمیل</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-6 py-4 bg-white/30 backdrop-blur-md border border-white/40 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 font-semibold"
                          required
                        />
                      </motion.div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <motion.div
                        whileFocus={{ scale: 1.01 }}
                        className="group"
                      >
                        <label className="flex items-center space-x-2 space-x-reverse text-gray-800 font-black mb-3">
                          <Phone className="w-5 h-5 text-purple-500" />
                          <span>شماره تماس</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-6 py-4 bg-white/30 backdrop-blur-md border border-white/40 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 font-semibold"
                        />
                      </motion.div>

                      <motion.div
                        whileFocus={{ scale: 1.01 }}
                        className="group"
                      >
                        <label className="text-gray-800 font-black mb-3 block">
                          موضوع
                        </label>
                        <select
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          className="w-full px-6 py-4 bg-white/30 backdrop-blur-md border border-white/40 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 font-semibold"
                          required
                        >
                          <option value="">انتخاب موضوع</option>
                          <option value="consultation">مشاوره محصولات</option>
                          <option value="support">پشتیبانی فنی</option>
                          <option value="partnership">همکاری</option>
                          <option value="other">سایر</option>
                        </select>
                      </motion.div>
                    </div>

                    <motion.div
                      whileFocus={{ scale: 1.01 }}
                      className="group"
                    >
                      <label className="text-gray-800 font-black mb-3 block">
                        پیام شما
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={6}
                        className="w-full px-6 py-4 bg-white/30 backdrop-blur-md border border-white/40 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 resize-none font-semibold"
                        placeholder="پیام خود را بنویسید..."
                        required
                      />
                    </motion.div>

                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.05, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full bg-gradient-to-r from-purple-500 to-emerald-500 hover:from-purple-600 hover:to-emerald-600 text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center space-x-2 space-x-reverse transition-all duration-200"
                    >
                      <Send className="w-6 h-6" />
                      <span>ارسال پیام</span>
                    </motion.button>
                  </form>
                </div>

                {/* Newsletter Signup */}
                <motion.div
                  variants={itemVariants}
                  className="mt-10 bg-gradient-to-r from-purple-500 to-emerald-500 rounded-3xl p-10 text-white"
                >
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
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-white text-purple-600 px-8 py-4 rounded-2xl font-black hover:bg-gray-100 transition-colors"
                    >
                      عضویت
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;