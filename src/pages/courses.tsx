import React from 'react';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { 
  Clock, 
  Users, 
  BookOpen, 
  Star, 
  CheckCircle, 
  Play,
  ArrowRight,
  Calendar,
  Award,
  DollarSign,
  MapPin,
  Phone,
  GraduationCap,
  Target,
  Heart
} from 'lucide-react';

const courses = [
  {
    id: 1,
    title: '4-Months Complete Spoken English Course',
    description: 'Comprehensive spoken English course designed to build fluency and confidence in just 4 months.',
    longDescription: 'Our flagship course covers all aspects of spoken English including grammar, pronunciation, vocabulary, and conversation skills. Perfect for students, professionals, and anyone looking to improve their English speaking abilities.',
    duration: '4 Months',
    students: '500+',
    level: 'All Levels',
    price: '₹4000',
    originalPrice: '₹6000',
    rating: 4.9,
    features: [
      'Basic to advanced grammar',
      'Pronunciation practice',
      'Vocabulary building',
      'Conversation skills',
      'Interview preparation',
      'Public speaking confidence'
    ],
    instructor: 'Ankit Sir',
    instructorImage: '/window.svg',
    category: 'Complete Course',
    courseImage: '/globe.svg'
  }
];

const Courses = () => {
  const categories = ['All', 'Complete Course'];
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const router = useRouter();

  const filteredCourses = selectedCategory === 'All' 
    ? courses 
    : courses.filter(course => course.category === selectedCategory);

  const calculateDiscount = (originalPrice: string, currentPrice: string) => {
    const original = parseInt(originalPrice.replace('₹', ''));
    const current = parseInt(currentPrice.replace('₹', ''));
    const discount = Math.round(((original - current) / original) * 100);
    return `${discount}% OFF`;
  };

  const handleContactUs = () => {
    // Scroll to footer contact section or navigate to contact page
    const contactSection = document.querySelector('footer');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Layout 
      title="4-Months Complete Spoken English Course - Great Academy of Spoken English"
      description="Join our comprehensive 4-month spoken English course in Muzaffarnagar. Expert teaching by Ankit Sir, flexible timings, and proven results. Course fee ₹4000 only."
    >
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ 
              rotate: -360,
              scale: [1, 1.2, 1],
            }}
            transition={{ 
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >


            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              4-Months Complete Spoken English Course
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Transform your English speaking skills with our comprehensive course. 
              Learn from Ankit Sir with proven methodology and achieve fluency in just 4 months.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Course Details Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-blue-50 p-6 rounded-xl text-center hover:shadow-xl transition-all duration-300"
            >
              <motion.div 
                className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <Calendar className="w-8 h-8 text-white" />
              </motion.div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Course Duration</h3>
              <p className="text-gray-600">4 Months Complete Course</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-blue-50 p-6 rounded-xl text-center hover:shadow-xl transition-all duration-300"
            >
              <motion.div 
                className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <Clock className="w-8 h-8 text-white" />
              </motion.div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Class Duration</h3>
              <p className="text-gray-600">1 Hour 15 Minutes per Batch</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-blue-50 p-6 rounded-xl text-center hover:shadow-xl transition-all duration-300"
            >
              <motion.div 
                className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-2xl font-bold text-white">₹</span>
              </motion.div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Course Fee</h3>
              <p className="text-gray-600">₹4000 (One-Time Payment)</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-blue-50 p-6 rounded-xl text-center hover:shadow-xl transition-all duration-300"
            >
              <motion.div 
                className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <Calendar className="w-8 h-8 text-white" />
              </motion.div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Working Days</h3>
              <p className="text-gray-600">Monday to Saturday</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-colors duration-200 ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Course Image */}
                <div className="relative h-48 bg-gradient-to-br from-blue-500 to-indigo-600 overflow-hidden">
                  <motion.img 
                    src={course.courseImage}
                    alt={course.title}
                    className="w-full h-full object-cover opacity-20"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center"
                    >
                      <BookOpen className="w-10 h-10 text-white" />
                    </motion.div>
                  </div>
                  
                  {/* Discount Badge */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold"
                  >
                    {calculateDiscount(course.originalPrice, course.price)}
                  </motion.div>
                </div>

                {/* Course Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                      {course.category}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-700">{course.rating}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{course.students} students</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <BookOpen className="w-4 h-4" />
                      <span>{course.level}</span>
                    </div>
                  </div>
                </div>

                {/* Course Features */}
                <div className="p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">What you'll learn:</h4>
                  <ul className="space-y-2 mb-6">
                    {course.features.slice(0, 4).map((feature, idx) => (
                      <motion.li 
                        key={idx} 
                        className="flex items-center space-x-2 text-sm text-gray-600"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <motion.div
                          whileHover={{ scale: 1.2, rotate: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        </motion.div>
                        <span>{feature}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Instructor */}
                  <div className="flex items-center space-x-3 mb-6 p-3 bg-gray-50 rounded-lg">
                    <motion.img 
                      src={course.instructorImage} 
                      alt={course.instructor}
                      className="w-10 h-10 rounded-full"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{course.instructor}</p>
                      <p className="text-xs text-gray-500">Expert Instructor</p>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">{course.price}</span>
                      <span className="text-sm text-gray-500 line-through ml-2">{course.originalPrice}</span>
                    </div>
                    <div className="text-sm text-green-600 font-medium">
                      {calculateDiscount(course.originalPrice, course.price)}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <span>Enroll Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
        ))}
      </div>
    </div>
      </section>

      {/* Course Information Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Course Information
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about our spoken English course
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition-all duration-300"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Course Schedule</h3>
              <div className="space-y-3">
                <motion.div 
                  className="flex items-center space-x-3"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">Class Duration: 1 Hour 15 Minutes</span>
                </motion.div>
                <motion.div 
                  className="flex items-center space-x-3"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">Working Days: Monday to Saturday</span>
                </motion.div>
                <motion.div 
                  className="flex items-center space-x-3"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">Timings: 6:00 AM to 8:00 PM</span>
                </motion.div>
                <motion.div 
                  className="flex items-center space-x-3"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">Course Duration: 4 Months</span>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition-all duration-300"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-3">
                <motion.div 
                  className="flex items-center space-x-3"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Phone className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">+91 9368181331</span>
                </motion.div>
                <motion.div 
                  className="flex items-center space-x-3"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">Near Kookra Block, Almaspur, Muzaffarnagar, UP</span>
                </motion.div>
                <motion.div 
                  className="flex items-center space-x-3"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Award className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">Instructor: Ankit Sir</span>
                </motion.div>
                <motion.div 
                  className="flex items-center space-x-3"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-lg font-bold text-blue-600">₹</span>
                  <span className="text-gray-700">Course Fee: ₹4000 (One-Time Payment)</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-3xl font-bold text-white mb-4"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Ready to Start Your English Learning Journey?
            </motion.h2>
            <p className="text-xl mb-8 text-blue-100">
              Join our 4-month complete spoken English course and transform your communication skills.
            </p>
            <motion.button
              onClick={handleContactUs}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
            >
              Contact Us Now
            </motion.button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Courses; 