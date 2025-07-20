import React from 'react';
import { motion } from 'framer-motion';
import { Users, Sparkles } from 'lucide-react';
import { teamMembers } from '../../data/team';

const TeamSection: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } }
  };

  return (
    <section className="py-4 relative" style={{ marginTop: '15px' }}>
      <div className="mx-4 sm:mx-6 lg:mx-8">
        <div className="blur-sheet rounded-3xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
            className="container mx-auto px-6 sm:px-8 lg:px-12 py-8"
          >
            {/* Section Header */}
            <motion.div variants={itemVariants} className="text-center mb-8">
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
            </motion.div>

            {/* Team Grid - Minimal Design */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  variants={itemVariants}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="group"
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
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gradient-to-r from-purple-500 to-emerald-500 hover:from-purple-600 hover:to-emerald-600 text-white py-2 rounded-lg font-bold text-xs transition-all duration-200"
                      >
                        مشاهده پروفایل
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Call to Action - Compact */}
            <motion.div
              variants={itemVariants}
              className="text-center mt-8"
            >
              <div className="bg-white/30 backdrop-blur-md border border-white/40 rounded-2xl p-6 max-w-lg mx-auto">
                <h3 className="text-lg font-black text-gray-800 mb-3">
                  به تیم ما بپیوندید
                </h3>
                <p className="text-gray-700 mb-4 font-semibold text-sm">
                  در حال جستجوی استعدادهای جدید برای توسعه آینده سلامت دیجیتال
                </p>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-purple-500 to-emerald-500 hover:from-purple-600 hover:to-emerald-600 text-white px-6 py-2 rounded-lg font-bold text-sm transition-all duration-200"
                >
                  مشاهده فرصت‌های شغلی
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;