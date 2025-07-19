import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import { 
  Search, 
  FileText, 
  Download, 
  Eye, 
  Bookmark, 
  Calendar, 
  Star,
  ExternalLink
} from 'lucide-react';

// Mock data for notes
const mockNotes = [
  {
    id: 1,
    title: 'Basic Grammar Rules',
    description: 'Comprehensive guide covering fundamental English grammar rules, sentence structure, and common patterns for spoken English.',
    category: 'Foundation',
    size: '2.3 MB',
    downloads: 156,
    date: '2024-01-15',
    url: 'https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/view'
  },
  {
    id: 2,
    title: 'Pronunciation Guide',
    description: 'Detailed pronunciation guide with audio examples and practice exercises for clear English speaking and accent improvement.',
    category: 'Foundation',
    size: '1.8 MB',
    downloads: 203,
    date: '2024-01-10',
    url: 'https://docs.google.com/document/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit'
  },
  {
    id: 3,
    title: 'Vocabulary Building',
    description: 'Essential vocabulary lists and word-building exercises to enhance your English speaking vocabulary and fluency.',
    category: 'Foundation',
    size: '3.1 MB',
    downloads: 89,
    date: '2024-01-08',
    url: 'https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/view'
  },
  {
    id: 4,
    title: 'Conversation Skills',
    description: 'Practical conversation techniques, common phrases, and dialogue examples for everyday English speaking.',
    category: 'Foundation',
    size: '2.7 MB',
    downloads: 134,
    date: '2024-01-05',
    url: 'https://docs.google.com/document/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit'
  },
  {
    id: 5,
    title: 'Interview Preparation',
    description: 'Complete guide for job interview preparation including common questions and professional English responses.',
    category: 'Professional',
    size: '1.9 MB',
    downloads: 167,
    date: '2024-01-03',
    url: 'https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/view'
  },
  {
    id: 6,
    title: 'Public Speaking Tips',
    description: 'Techniques and strategies for confident public speaking and presentation skills in English.',
    category: 'Professional',
    size: '2.1 MB',
    downloads: 98,
    date: '2024-01-01',
    url: 'https://docs.google.com/document/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit'
  }
];

const Notes = () => {
  const [notes, setNotes] = useState(mockNotes);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Use mock data as fallback
        setNotes(mockNotes);
      } catch (err) {
        setError('Failed to load notes');
        // Use mock data as fallback
        setNotes(mockNotes);
      }
      setLoading(false);
    };
    fetchNotes();
  }, []);

  // Helper to get direct download link for Google Drive/Docs
  function getDownloadUrl(url: string) {
    // Google Drive file
    const driveMatch = url.match(/drive\.google\.com\/file\/d\/([\w-]+)/);
    if (driveMatch) {
      return `https://drive.google.com/uc?export=download&id=${driveMatch[1]}`;
    }
    // Google Docs
    const docsMatch = url.match(/docs\.google\.com\/document\/d\/([\w-]+)/);
    if (docsMatch) {
      return `https://docs.google.com/document/d/${docsMatch[1]}/export?format=pdf`;
    }
    // Otherwise, return original
    return url;
  }

  // Handle download
  const handleDownload = (note: any) => {
    const downloadUrl = getDownloadUrl(note.url);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `${note.title}.pdf`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle preview
  const handlePreview = (note: any) => {
    const previewUrl = note.url;
    window.open(previewUrl, '_blank');
  };

  const categories = ['All', 'Foundation', 'Professional'];
  
  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || note.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout 
      title="Study Materials - Great Academy of Spoken English"
      description="Download comprehensive study materials, notes, and guides to enhance your English learning journey. Free study materials for our 4-month spoken English course."
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Study Materials</h1>
              <p className="text-gray-600">Download free study materials to enhance your spoken English learning</p>
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
                  placeholder="Search study materials..."
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

          {/* Notes Grid */}
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
              {filteredNotes.map((note, index) => (
                <motion.div
                  key={note.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  {/* Note Header */}
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <FileText className="w-5 h-5 text-blue-600" />
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                          {note.category}
                        </span>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <Bookmark className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{note.title}</h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{note.description}</p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Download className="w-3 h-3" />
                        <span>{note.downloads} downloads</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{note.date}</span>
                      </div>
                    </div>
                  </div>

                  {/* Note Actions */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <span>{note.size}</span>
                        <span>•</span>
                        <span>PDF</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">4.8</span>
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleDownload(note)}
                        className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download</span>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handlePreview(note)}
                        className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center space-x-2"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Preview</span>
                      </motion.button>
                    </div>
                </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && filteredNotes.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No study materials found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </motion.div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Notes; 