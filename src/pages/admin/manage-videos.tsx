import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { 
  Video, 
  Trash2, 
  Edit, 
  Eye, 
  ArrowLeft,
  Search,
  Filter,
  Play,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  RefreshCw
} from 'lucide-react';

interface VideoItem {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  instructor: string;
  uploadDate: string;
  views: number;
  thumbnail: string;
  url: string;
}

const ManageVideos = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [videos, setVideos] = useState<VideoItem[]>([
    {
      id: '1',
      title: 'Basic Grammar Introduction',
      description: 'Learn fundamental grammar concepts with examples',
      category: 'Foundation',
      duration: '15:30',
      instructor: 'Ankit Sir',
      uploadDate: '2024-01-15',
      views: 156,
      thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop',
      url: 'https://example.com/video1'
    },
    {
      id: '2',
      title: 'Professional Email Writing',
      description: 'Master the art of writing professional emails',
      category: 'Professional',
      duration: '22:45',
      instructor: 'Ankit Sir',
      uploadDate: '2024-01-12',
      views: 89,
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop',
      url: 'https://example.com/video2'
    },
    {
      id: '3',
      title: 'Interview Skills Masterclass',
      description: 'Complete guide to ace your job interviews',
      category: 'Career',
      duration: '28:15',
      instructor: 'Ankit Sir',
      uploadDate: '2024-01-10',
      views: 203,
      thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=200&fit=crop',
      url: 'https://example.com/video3'
    },
    {
      id: '4',
      title: 'Daily Conversation Practice',
      description: 'Practice everyday English conversations',
      category: 'Social',
      duration: '18:20',
      instructor: 'Ankit Sir',
      uploadDate: '2024-01-08',
      views: 134,
      thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=200&fit=crop',
      url: 'https://example.com/video4'
    }
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState<VideoItem | null>(null);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if admin is logged in
    const adminLoggedIn = localStorage.getItem('adminLoggedIn');
    if (adminLoggedIn === 'true') {
      setIsLoggedIn(true);
    } else {
      router.push('/admin/login');
    }
    setIsLoading(false);
  }, [router]);

  useEffect(() => {
    // Load uploaded videos from localStorage
    const uploadedVideos = JSON.parse(localStorage.getItem('uploadedVideos') || '[]');
    console.log('Loaded uploaded videos:', uploadedVideos); // Debug log
    
    if (uploadedVideos.length > 0) {
      setVideos(prevVideos => {
        // Combine uploaded videos with default videos, avoiding duplicates
        const existingIds = new Set(prevVideos.map(video => video.id));
        const newUploadedVideos = uploadedVideos.filter((video: VideoItem) => !existingIds.has(video.id));
        const combinedVideos = [...newUploadedVideos, ...prevVideos];
        console.log('Combined videos:', combinedVideos); // Debug log
        return combinedVideos;
      });
    }
  }, []);

  // Add a function to refresh videos from localStorage
  const refreshVideos = () => {
    const uploadedVideos = JSON.parse(localStorage.getItem('uploadedVideos') || '[]');
    const defaultVideos = [
      {
        id: '1',
        title: 'Basic Grammar Introduction',
        description: 'Learn fundamental grammar concepts with examples',
        category: 'Foundation',
        duration: '15:30',
        instructor: 'Ankit Sir',
        uploadDate: '2024-01-15',
        views: 156,
        thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop',
        url: 'https://example.com/video1'
      },
      {
        id: '2',
        title: 'Professional Email Writing',
        description: 'Master the art of writing professional emails',
        category: 'Professional',
        duration: '22:45',
        instructor: 'Ankit Sir',
        uploadDate: '2024-01-12',
        views: 89,
        thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop',
        url: 'https://example.com/video2'
      },
      {
        id: '3',
        title: 'Interview Skills Masterclass',
        description: 'Complete guide to ace your job interviews',
        category: 'Career',
        duration: '28:15',
        instructor: 'Ankit Sir',
        uploadDate: '2024-01-10',
        views: 203,
        thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=200&fit=crop',
        url: 'https://example.com/video3'
      },
      {
        id: '4',
        title: 'Daily Conversation Practice',
        description: 'Practice everyday English conversations',
        category: 'Social',
        duration: '18:20',
        instructor: 'Ankit Sir',
        uploadDate: '2024-01-08',
        views: 134,
        thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=200&fit=crop',
        url: 'https://example.com/video4'
      }
    ];
    
    const existingIds = new Set(defaultVideos.map(video => video.id));
    const newUploadedVideos = uploadedVideos.filter((video: VideoItem) => !existingIds.has(video.id));
    const combinedVideos = [...newUploadedVideos, ...defaultVideos];
    setVideos(combinedVideos);
  };

  // Refresh videos when component mounts
  useEffect(() => {
    refreshVideos();
  }, []);

  const handleDelete = (video: VideoItem) => {
    setVideoToDelete(video);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!videoToDelete) return;

    try {
      // Simulate delete process
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Remove video from state
      setVideos(videos.filter(video => video.id !== videoToDelete.id));
      
      // Also remove from localStorage if it's an uploaded video
      const uploadedVideos = JSON.parse(localStorage.getItem('uploadedVideos') || '[]');
      const updatedUploadedVideos = uploadedVideos.filter((video: VideoItem) => video.id !== videoToDelete.id);
      localStorage.setItem('uploadedVideos', JSON.stringify(updatedUploadedVideos));
      
      setDeleteSuccess(true);
      setShowDeleteModal(false);
      setVideoToDelete(null);
      
      // Reset success message after 3 seconds
      setTimeout(() => setDeleteSuccess(false), 3000);
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || video.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', 'Foundation', 'Professional', 'Career', 'Exam Prep', 'Social'];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/admin')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </motion.button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Manage Videos</h1>
                <p className="text-sm text-gray-500">View, edit, and delete video lectures</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/admin/upload-videos')}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              Add New Video
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={refreshVideos}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Refresh</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white p-6 rounded-xl shadow-sm border"
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Video className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Videos</p>
                <p className="text-2xl font-bold text-gray-900">{videos.length}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white p-6 rounded-xl shadow-sm border"
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Play className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Views</p>
                <p className="text-2xl font-bold text-gray-900">{videos.reduce((sum, video) => sum + video.views, 0)}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white p-6 rounded-xl shadow-sm border"
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Duration</p>
                <p className="text-2xl font-bold text-gray-900">1h 24m</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white p-6 rounded-xl shadow-sm border"
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Avg. Views</p>
                <p className="text-2xl font-bold text-gray-900">{Math.round(videos.reduce((sum, video) => sum + video.views, 0) / videos.length)}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search videos by title or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
              />
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-5 w-5 text-gray-400" />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Videos Grid */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Video Lectures ({filteredVideos.length})</h3>
          </div>
          
          {deleteSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-6 mt-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center space-x-2"
            >
              <CheckCircle className="w-5 h-5" />
              <span>Video deleted successfully!</span>
            </motion.div>
          )}

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVideos.map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  {/* Thumbnail */}
                  <div className="relative">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
                      <div className="w-12 h-12 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                        <Play className="w-6 h-6 text-gray-800" />
                      </div>
                    </div>
                    <div className="absolute top-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        video.category === 'Foundation' ? 'bg-blue-100 text-blue-800' :
                        video.category === 'Professional' ? 'bg-green-100 text-green-800' :
                        video.category === 'Career' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {video.category}
                      </span>
                    </div>
                    
                    <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">{video.title}</h4>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{video.description}</p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span>👨‍🏫 {video.instructor}</span>
                      <span>👁️ {video.views} views</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">📅 {video.uploadDate}</span>
                      
                      <div className="flex items-center space-x-1">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-1 text-blue-600 hover:bg-blue-100 rounded transition-colors duration-200"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-1 text-green-600 hover:bg-green-100 rounded transition-colors duration-200"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleDelete(video)}
                          className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors duration-200"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {filteredVideos.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                <Video className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No videos found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 max-w-md w-full mx-4"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Delete Video</h3>
                <p className="text-sm text-gray-500">This action cannot be undone.</p>
              </div>
            </div>
            
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete "<strong>{videoToDelete?.title}</strong>"? 
              This will permanently remove the video from the system.
            </p>
            
            <div className="flex space-x-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={confirmDelete}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
              >
                Delete
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ManageVideos; 