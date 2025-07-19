import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Trash2, 
  Edit, 
  Eye, 
  ArrowLeft,
  Search,
  Filter,
  Download,
  AlertTriangle,
  CheckCircle,
  X,
  RefreshCw
} from 'lucide-react';

interface Note {
  id: string;
  title: string;
  description: string;
  category: string;
  type: string;
  fileName?: string;
  fileSize?: string;
  url?: string;
  uploadDate: string;
  downloads: number;
}

const ManageNotes = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      title: 'Basic Grammar Rules',
      description: 'Fundamental grammar concepts for beginners',
      category: 'Foundation',
      type: 'file',
      fileName: 'basic-grammar.pdf',
      fileSize: '2.5 MB',
      uploadDate: '2024-01-15',
      downloads: 45
    },
    {
      id: '2',
      title: 'Professional Communication',
      description: 'Advanced communication skills for workplace',
      category: 'Professional',
      type: 'url',
      url: 'https://drive.google.com/file/d/example',
      uploadDate: '2024-01-10',
      downloads: 32
    },
    {
      id: '3',
      title: 'Interview Preparation',
      description: 'Complete guide for job interviews',
      category: 'Career',
      type: 'file',
      fileName: 'interview-prep.pdf',
      fileSize: '1.8 MB',
      uploadDate: '2024-01-08',
      downloads: 28
    },
    {
      id: '4',
      title: 'Social English Conversations',
      description: 'Everyday conversation patterns and phrases',
      category: 'Social',
      type: 'url',
      url: 'https://dropbox.com/s/example',
      uploadDate: '2024-01-05',
      downloads: 56
    }
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState<Note | null>(null);
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
    // Load uploaded notes from localStorage
    const uploadedNotes = JSON.parse(localStorage.getItem('uploadedNotes') || '[]');
    console.log('Loaded uploaded notes:', uploadedNotes); // Debug log
    
    if (uploadedNotes.length > 0) {
      setNotes(prevNotes => {
        // Combine uploaded notes with default notes, avoiding duplicates
        const existingIds = new Set(prevNotes.map(note => note.id));
        const newUploadedNotes = uploadedNotes.filter((note: Note) => !existingIds.has(note.id));
        const combinedNotes = [...newUploadedNotes, ...prevNotes];
        console.log('Combined notes:', combinedNotes); // Debug log
        return combinedNotes;
      });
    }
  }, []);

  // Add a function to refresh notes from localStorage
  const refreshNotes = () => {
    const uploadedNotes = JSON.parse(localStorage.getItem('uploadedNotes') || '[]');
    const defaultNotes = [
      {
        id: '1',
        title: 'Basic Grammar Rules',
        description: 'Fundamental grammar concepts for beginners',
        category: 'Foundation',
        type: 'file',
        fileName: 'basic-grammar.pdf',
        fileSize: '2.5 MB',
        uploadDate: '2024-01-15',
        downloads: 45
      },
      {
        id: '2',
        title: 'Professional Communication',
        description: 'Advanced communication skills for workplace',
        category: 'Professional',
        type: 'url',
        url: 'https://drive.google.com/file/d/example',
        uploadDate: '2024-01-10',
        downloads: 32
      },
      {
        id: '3',
        title: 'Interview Preparation',
        description: 'Complete guide for job interviews',
        category: 'Career',
        type: 'file',
        fileName: 'interview-prep.pdf',
        fileSize: '1.8 MB',
        uploadDate: '2024-01-08',
        downloads: 28
      },
      {
        id: '4',
        title: 'Social English Conversations',
        description: 'Everyday conversation patterns and phrases',
        category: 'Social',
        type: 'url',
        url: 'https://dropbox.com/s/example',
        uploadDate: '2024-01-05',
        downloads: 56
      }
    ];
    
    const existingIds = new Set(defaultNotes.map(note => note.id));
    const newUploadedNotes = uploadedNotes.filter((note: Note) => !existingIds.has(note.id));
    const combinedNotes = [...newUploadedNotes, ...defaultNotes];
    setNotes(combinedNotes);
  };

  // Refresh notes when component mounts
  useEffect(() => {
    refreshNotes();
  }, []);

  const handleDelete = (note: Note) => {
    setNoteToDelete(note);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!noteToDelete) return;

    try {
      // Simulate delete process
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Remove note from state
      setNotes(notes.filter(note => note.id !== noteToDelete.id));
      
      // Also remove from localStorage if it's an uploaded note
      const uploadedNotes = JSON.parse(localStorage.getItem('uploadedNotes') || '[]');
      const updatedUploadedNotes = uploadedNotes.filter((note: Note) => note.id !== noteToDelete.id);
      localStorage.setItem('uploadedNotes', JSON.stringify(updatedUploadedNotes));
      
      setDeleteSuccess(true);
      setShowDeleteModal(false);
      setNoteToDelete(null);
      
      // Reset success message after 3 seconds
      setTimeout(() => setDeleteSuccess(false), 3000);
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || note.category === selectedCategory;
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
                <h1 className="text-xl font-bold text-gray-900">Manage Notes</h1>
                <p className="text-sm text-gray-500">View, edit, and delete study materials</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/admin/upload-notes')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Add New Note
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={refreshNotes}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center space-x-2"
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
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Notes</p>
                <p className="text-2xl font-bold text-gray-900">{notes.length}</p>
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
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Download className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Downloads</p>
                <p className="text-2xl font-bold text-gray-900">{notes.reduce((sum, note) => sum + note.downloads, 0)}</p>
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
                <FileText className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">File Uploads</p>
                <p className="text-2xl font-bold text-gray-900">{notes.filter(note => note.type === 'file').length}</p>
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
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">URL Links</p>
                <p className="text-2xl font-bold text-gray-900">{notes.filter(note => note.type === 'url').length}</p>
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
                placeholder="Search notes by title or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              />
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-5 w-5 text-gray-400" />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Notes List */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Study Notes ({filteredNotes.length})</h3>
          </div>
          
          {deleteSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-6 mt-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center space-x-2"
            >
              <CheckCircle className="w-5 h-5" />
              <span>Note deleted successfully!</span>
            </motion.div>
          )}

          <div className="divide-y divide-gray-200">
            {filteredNotes.map((note, index) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-6 hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="text-lg font-semibold text-gray-900">{note.title}</h4>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        note.category === 'Foundation' ? 'bg-blue-100 text-blue-800' :
                        note.category === 'Professional' ? 'bg-green-100 text-green-800' :
                        note.category === 'Career' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {note.category}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        note.type === 'file' ? 'bg-gray-100 text-gray-800' : 'bg-indigo-100 text-indigo-800'
                      }`}>
                        {note.type === 'file' ? 'File' : 'URL'}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-3">{note.description}</p>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>📅 {note.uploadDate}</span>
                      <span>📥 {note.downloads} downloads</span>
                      {note.type === 'file' && (
                        <span>📄 {note.fileSize}</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                      title="View"
                    >
                      <Eye className="w-4 h-4" />
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors duration-200"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDelete(note)}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {filteredNotes.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No notes found matching your criteria.</p>
            </div>
          )}
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
                <h3 className="text-lg font-semibold text-gray-900">Delete Note</h3>
                <p className="text-sm text-gray-500">This action cannot be undone.</p>
              </div>
            </div>
            
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete "<strong>{noteToDelete?.title}</strong>"? 
              This will permanently remove the note from the system.
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

export default ManageNotes; 