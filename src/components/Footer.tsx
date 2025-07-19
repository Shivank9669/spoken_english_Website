import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Instagram, 
  Youtube,
  Clock,
  Calendar,
  Star,
  Award,
  Users,
  BookOpen
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const router = useRouter();

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#', color: 'hover:bg-blue-600' },
    { name: 'Instagram', icon: Instagram, href: '#', color: 'hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-600' },
    { name: 'YouTube', icon: Youtube, href: '#', color: 'hover:bg-red-600' }
  ];

  const stats = [
    { icon: Users, number: "500+", label: "Students Trained" },
    { icon: Award, number: "95%", label: "Success Rate" },
    { icon: BookOpen, number: "4", label: "Months Course" },
    { icon: Star, number: "₹4000", label: "Complete Fee" }
  ];

  const handleStartLearning = () => {
    router.push('/courses');
  };

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.05 }}
              className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <motion.div 
                className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mx-auto mb-3"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <stat.icon className="w-6 h-6 text-white" />
              </motion.div>
              <div className="text-2xl font-bold text-white mb-1">{stat.number}</div>
              <div className="text-sm text-blue-200">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <motion.div 
                className="w-12 h-12 bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-white font-bold text-lg">GA</span>
              </motion.div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  Great Academy
                </h2>
                <p className="text-blue-200 text-sm">of Spoken English</p>
              </div>
            </div>
            
            <p className="text-gray-200 mb-8 text-lg leading-relaxed">
              Empowering students in Muzaffarnagar to master English speaking skills through 
              our comprehensive 4-month course, expert instruction by Ankit Sir, and proven methodologies.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-4">
              <motion.div 
                className="flex items-center space-x-4 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20"
                whileHover={{ x: 5, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-sm text-blue-200">Phone</div>
                  <div className="font-semibold">+91 9368181331</div>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-center space-x-4 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20"
                whileHover={{ x: 5, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-sm text-blue-200">Email</div>
                  <div className="font-semibold">ankitkumarmzn756@gmail.com</div>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-center space-x-4 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20"
                whileHover={{ x: 5, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-sm text-blue-200">Address</div>
                  <div className="font-semibold">Near Kookra Block, Almaspur, Muzaffarnagar, UP</div>
                </div>
              </motion.div>
            </div>

            {/* Course Highlights */}
            <div className="mt-8 space-y-3">
              <motion.div 
                className="flex items-center space-x-3 text-gray-200"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.3 }}
              >
                <Clock className="w-5 h-5 text-blue-400" />
                <span className="font-medium">Timings: 6:00 AM to 8:00 PM</span>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-3 text-gray-200"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.3 }}
              >
                <Calendar className="w-5 h-5 text-green-400" />
                <span className="font-medium">Working Days: Monday to Saturday</span>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-3 text-gray-200"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-2xl text-yellow-400">₹</span>
                <span className="font-medium">Course Fee: ₹4000 (One-Time Payment)</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Social Links Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <div className="text-center lg:text-right">
              <motion.h3 
                className="text-2xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                Follow Us
              </motion.h3>
              <p className="text-gray-300 mb-8 text-lg">
                Stay connected with us for latest updates, tips, and success stories!
              </p>
              
              <div className="flex justify-center lg:justify-end space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ 
                      scale: 1.15, 
                      y: -8,
                      rotate: 5 
                    }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-16 h-16 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center text-white border border-white/20 transition-all duration-300 ${social.color}`}
                  >
                    <social.icon className="w-8 h-8" />
                  </motion.a>
                ))}
              </div>

              {/* Call to Action */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="mt-8 text-center lg:text-right"
              >
                <motion.button
                  onClick={handleStartLearning}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
                >
                  Start Learning Today
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="relative border-t border-white/20 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-gray-300 text-sm">
              © {currentYear} Great Academy of Spoken English, Muzaffarnagar. All rights reserved.
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 