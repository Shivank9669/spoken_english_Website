import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { auth } from '../lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Play, 
  FileText, 
  Award, 
  Calendar,
  Clock,
  TrendingUp,
  Target,
  CheckCircle,
  ArrowRight,
  Download,
  Eye,
  Star,
  Users,
  BarChart3
} from 'lucide-react';

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const enrolledCourses = [
    {
      id: 1,
      title: 'Spoken English Basics',
      progress: 75,
      totalLessons: 24,
      completedLessons: 18,
      nextLesson: 'Lesson 19: Advanced Pronunciation',
      instructor: 'Sarah Wilson',
      category: 'Foundation'
    },
    {
      id: 2,
      title: 'Advanced Communication',
      progress: 45,
      totalLessons: 36,
      completedLessons: 16,
      nextLesson: 'Lesson 17: Business Presentations',
      instructor: 'Michael Chen',
      category: 'Professional'
    }
  ];

  const recentNotes = [
    {
      id: 1,
      title: 'English Basics Notes',
      description: 'Comprehensive notes covering fundamental English concepts',
      downloadCount: 1250,
      size: '2.4 MB',
      type: 'PDF'
    },
    {
      id: 2,
      title: 'Pronunciation Guide',
      description: 'Detailed guide for perfect English pronunciation',
      downloadCount: 890,
      size: '1.8 MB',
      type: 'PDF'
    },
    {
      id: 3,
      title: 'Interview Preparation',
      description: 'Complete guide for job interview success',
      downloadCount: 1100,
      size: '3.2 MB',
      type: 'PDF'
    }
  ];

  const recentVideos = [
    {
      id: 1,
      title: 'Introduction to Spoken English',
      duration: '45:30',
      views: 1250,
      instructor: 'Sarah Wilson',
      thumbnail: '/window.svg'
    },
    {
      id: 2,
      title: 'Advanced Pronunciation Techniques',
      duration: '38:15',
      views: 890,
      instructor: 'Michael Chen',
      thumbnail: '/window.svg'
    },
    {
      id: 3,
      title: 'Business Communication Skills',
      duration: '52:20',
      views: 1100,
      instructor: 'Priya Patel',
      thumbnail: '/window.svg'
    }
  ];

  const achievements = [
    { name: 'First Lesson', icon: '🎯', description: 'Completed your first lesson' },
    { name: 'Week Warrior', icon: '🔥', description: 'Studied for 7 consecutive days' },
    { name: 'Note Taker', icon: '📝', description: 'Downloaded 5 study materials' },
    { name: 'Video Watcher', icon: '👁️', description: 'Watched 10 video lectures' }
  ];

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </Layout>
    );
  }

  if (!user) {
  return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Please log in to access your dashboard</h1>
            <a href="/login" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200">
              Go to Login
            </a>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout 
      title="Dashboard - Great Academy of Spoken English"
      description="Access your courses, progress, and learning materials in your personalized dashboard."
    >
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, {user.displayName || user.email?.split('@')[0]}! 👋
              </h1>
              <p className="text-gray-600">Track your progress and continue your learning journey</p>
            </motion.div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Progress Overview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Your Progress</h2>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <TrendingUp className="w-4 h-4" />
                    <span>Overall: 60%</span>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 mb-1">2</div>
                    <div className="text-sm text-gray-600">Active Courses</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 mb-1">34</div>
                    <div className="text-sm text-gray-600">Lessons Completed</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600 mb-1">12</div>
                    <div className="text-sm text-gray-600">Study Hours</div>
                  </div>
                </div>
              </motion.div>

              {/* Enrolled Courses */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Your Courses</h2>
                  <a href="/courses" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View All Courses
                  </a>
                </div>
                
                <div className="space-y-4">
                  {enrolledCourses.map((course, index) => (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">{course.title}</h3>
                          <p className="text-sm text-gray-500">Instructor: {course.instructor}</p>
                        </div>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                          {course.category}
                        </span>
                      </div>
                      
                      <div className="mb-3">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>{course.completedLessons}/{course.totalLessons} lessons completed</span>
                        <button className="text-blue-600 hover:text-blue-700 font-medium">
                          Continue Learning
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Recent Activity */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Completed Lesson 18</p>
                      <p className="text-xs text-gray-500">Spoken English Basics • 2 hours ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <Download className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Downloaded Pronunciation Guide</p>
                      <p className="text-xs text-gray-500">Study Materials • 1 day ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                    <Play className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Watched Advanced Communication</p>
                      <p className="text-xs text-gray-500">Video Lecture • 2 days ago</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Study Streak</span>
                    <span className="font-semibold text-green-600">7 days</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">This Week</span>
                    <span className="font-semibold text-blue-600">5 hours</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Certificates</span>
                    <span className="font-semibold text-purple-600">1 earned</span>
                  </div>
                </div>
              </motion.div>

              {/* Achievements */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h3>
                <div className="space-y-3">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                        <span className="text-sm">{achievement.icon}</span>
          </div>
          <div>
                        <p className="text-sm font-medium text-gray-900">{achievement.name}</p>
                        <p className="text-xs text-gray-500">{achievement.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-between p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200">
                    <span className="text-sm font-medium text-blue-700">Continue Learning</span>
                    <ArrowRight className="w-4 h-4 text-blue-600" />
                  </button>
                  <button className="w-full flex items-center justify-between p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors duration-200">
                    <span className="text-sm font-medium text-green-700">Download Notes</span>
                    <Download className="w-4 h-4 text-green-600" />
                  </button>
                  <button className="w-full flex items-center justify-between p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors duration-200">
                    <span className="text-sm font-medium text-purple-700">Watch Videos</span>
                    <Play className="w-4 h-4 text-purple-600" />
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard; 