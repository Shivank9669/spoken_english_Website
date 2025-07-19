import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { collection, getDocs, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { motion } from 'framer-motion';
import { 
  Search, 
  Play, 
  Clock, 
  Eye, 
  Users,
  Filter,
  Calendar,
  Star,
  Bookmark,
  Share2,
  ThumbsUp,
  MessageCircle
} from 'lucide-react';

const getYouTubeId = (url: string) => {
  const match = url.match(/(?:youtu.be\/|youtube.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  return match ? match[1] : null;
};

const VideoLectures = () => {
  const [videos, setVideos] = useState<Array<{ 
    id: string; 
    title: string; 
    url: string; 
    description?: string;
    duration?: string;
    instructor?: string;
    category?: string;
    views?: number;
    likes?: number;
    date?: string;
    thumbnail?: string;
  }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Mock data for demonstration
  const mockVideos = [
    {
      id: '1',
      title: 'Introduction to Spoken English',
      description: 'Learn the fundamentals of spoken English with practical examples and exercises.',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      duration: '45:30',
      instructor: 'Sarah Wilson',
      category: 'Foundation',
      views: 1250,
      likes: 89,
      date: '2024-01-15',
      thumbnail: '/window.svg'
    },
    {
      id: '2',
      title: 'Advanced Pronunciation Techniques',
      description: 'Master advanced pronunciation techniques for clear and confident speech.',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      duration: '38:15',
      instructor: 'Michael Chen',
      category: 'Foundation',
      views: 890,
      likes: 67,
      date: '2024-01-10',
      thumbnail: '/window.svg'
    },
    {
      id: '3',
      title: 'Business Communication Skills',
      description: 'Develop professional communication skills for business environments.',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      duration: '52:20',
      instructor: 'Priya Patel',
      category: 'Professional',
      views: 1100,
      likes: 95,
      date: '2024-01-08',
      thumbnail: '/window.svg'
    },
    {
      id: '4',
      title: 'Interview Preparation Masterclass',
      description: 'Complete guide to ace your job interviews with confidence.',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      duration: '41:45',
      instructor: 'David Thompson',
      category: 'Career',
      views: 950,
      likes: 78,
      date: '2024-01-05',
      thumbnail: '/window.svg'
    },
    {
      id: '5',
      title: 'IELTS Speaking Test Strategies',
      description: 'Expert strategies to achieve your target IELTS speaking band score.',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      duration: '48:30',
      instructor: 'Emma Rodriguez',
      category: 'Exam Prep',
      views: 750,
      likes: 56,
      date: '2024-01-03',
      thumbnail: '/window.svg'
    },
    {
      id: '6',
      title: 'Conversational English for Daily Life',
      description: 'Learn natural conversation patterns for everyday social interactions.',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      duration: '35:20',
      instructor: 'James Anderson',
      category: 'Social',
      views: 680,
      likes: 42,
      date: '2024-01-01',
      thumbnail: '/window.svg'
    }
  ];

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'videos'));
        const videosData = querySnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({
          id: doc.id,
          ...doc.data(),
        })) as Array<{ 
          id: string; 
          title: string; 
          url: string; 
          description?: string;
          duration?: string;
          instructor?: string;
          category?: string;
          views?: number;
          likes?: number;
          date?: string;
          thumbnail?: string;
        }>;
        
        // Use mock data if no videos in database
        setVideos(videosData.length > 0 ? videosData : mockVideos);
      } catch (err: any) {
        setError('Failed to fetch videos');
        // Use mock data as fallback
        setVideos(mockVideos);
      }
      setLoading(false);
    };
    fetchVideos();
  }, []);

  const categories = ['All', 'Foundation', 'Professional', 'Career', 'Exam Prep', 'Social'];
  
  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || video.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout 
      title="Video Lectures - Great Academy of Spoken English"
      description="Watch expert-led video lectures to enhance your English speaking skills with interactive learning content."
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Video Lectures</h1>
              <p className="text-gray-600">Learn from expert instructors through high-quality video content</p>
            </motion.div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8"
          >
            <div className="grid md:grid-cols-2 gap-6">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search videos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
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
          </motion.div>

          {/* Videos Grid */}
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVideos.map((video, index) => {
                const ytId = getYouTubeId(video.url);
                return (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  >
                    {/* Video Thumbnail */}
                    <div className="relative">
                      {ytId ? (
                        <iframe
                          src={`https://www.youtube.com/embed/${ytId}`}
                          title={video.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-48"
                        />
                      ) : (
                        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                          <Play className="w-12 h-12 text-gray-400" />
                        </div>
                      )}
                      <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                        {video.duration}
                      </div>
                    </div>

                    {/* Video Info */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                          {video.category}
                        </span>
                        <button className="text-gray-400 hover:text-gray-600">
                          <Bookmark className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{video.title}</h3>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{video.description}</p>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                        <div className="flex items-center space-x-1">
                          <Users className="w-3 h-3" />
                          <span>{video.views} views</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{video.date}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <div className="text-sm text-gray-600">
                          Instructor: <span className="font-medium">{video.instructor}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium">4.8</span>
                        </div>
                      </div>

                      {/* Video Actions */}
                      <div className="flex space-x-3">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                        >
                          <Play className="w-4 h-4" />
                          <span>Watch Now</span>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center space-x-2"
                        >
                          <Share2 className="w-4 h-4" />
                          <span>Share</span>
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Empty State */}
          {!loading && filteredVideos.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Play className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No videos found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </motion.div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default VideoLectures; 