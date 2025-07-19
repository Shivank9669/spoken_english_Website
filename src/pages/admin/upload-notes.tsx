import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { 
  Upload, 
  FileText, 
  X, 
  CheckCircle,
  ArrowLeft,
  Save,
  AlertCircle,
  Link,
  Globe
} from 'lucide-react';

const UploadNotes = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Foundation');
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState('');
  const [uploadType, setUploadType] = useState<'file' | 'url'>('file');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [error, setError] = useState('');
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type === 'application/pdf') {
        setFile(selectedFile);
        setError('');
      } else {
        setError('Please select a PDF file only.');
        setFile(null);
      }
    }
  };

  const validateUrl = (url: string) => {
    const urlPattern = /^https?:\/\/.+/;
    return urlPattern.test(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Please enter a title for the note.');
      return;
    }

    if (uploadType === 'file' && !file) {
      setError('Please select a PDF file to upload.');
      return;
    }

    if (uploadType === 'url' && !url.trim()) {
      setError('Please enter a valid URL.');
      return;
    }

    if (uploadType === 'url' && !validateUrl(url)) {
      setError('Please enter a valid URL starting with http:// or https://');
      return;
    }

    setIsUploading(true);
    setError('');

    try {
      // Simulate upload process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would typically upload to Firebase Storage or your backend
      console.log('Uploading note:', {
        title,
        description,
        category,
        uploadType,
        fileName: file?.name,
        fileSize: file?.size,
        url: uploadType === 'url' ? url : null
      });

      // Add to localStorage for demo (in real app, this would go to database)
      const newNote = {
        id: Date.now().toString(),
        title,
        description,
        category,
        type: uploadType,
        fileName: file?.name || 'URL Link',
        fileSize: file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : 'N/A',
        url: uploadType === 'url' ? url : null,
        uploadDate: new Date().toISOString().split('T')[0],
        downloads: 0
      };

      const existingNotes = JSON.parse(localStorage.getItem('uploadedNotes') || '[]');
      existingNotes.push(newNote);
      localStorage.setItem('uploadedNotes', JSON.stringify(existingNotes));

      setUploadSuccess(true);
      setTitle('');
      setDescription('');
      setCategory('Foundation');
      setFile(null);
      setUrl('');
      
      // Reset success message after 3 seconds
      setTimeout(() => setUploadSuccess(false), 3000);
    } catch (err) {
      setError('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const categories = [
    'Foundation',
    'Professional',
    'Career',
    'Exam Prep',
    'Social'
  ];

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
                <h1 className="text-xl font-bold text-gray-900">Upload Notes</h1>
                <p className="text-sm text-gray-500">Add new study materials for students</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl shadow-sm border p-8"
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Upload className="w-8 h-8 text-blue-600" />
            </motion.div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Study Notes</h2>
            <p className="text-gray-600">Add new PDF notes and study materials for your students</p>
          </div>

          {uploadSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center space-x-2"
            >
              <CheckCircle className="w-5 h-5" />
              <span>Note uploaded successfully!</span>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center space-x-2"
            >
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Note Title *
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Basic Grammar Rules"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description of the note content..."
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Upload Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Upload Method
              </label>
              <div className="grid grid-cols-2 gap-4">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setUploadType('file')}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                    uploadType === 'file'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Upload className="w-5 h-5" />
                    <div className="text-left">
                      <div className="font-medium">File Upload</div>
                      <div className="text-sm opacity-75">Upload PDF file</div>
                    </div>
                  </div>
                </motion.button>

                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setUploadType('url')}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                    uploadType === 'url'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Link className="w-5 h-5" />
                    <div className="text-left">
                      <div className="font-medium">URL Link</div>
                      <div className="text-sm opacity-75">Google Drive, Dropbox, etc.</div>
                    </div>
                  </div>
                </motion.button>
              </div>
            </div>

            {/* File Upload Section */}
            {uploadType === 'file' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-2">
                  PDF File *
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors duration-200">
                  <input
                    id="file"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label htmlFor="file" className="cursor-pointer">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-lg font-medium text-gray-900 mb-2">
                      {file ? file.name : 'Click to upload PDF file'}
                    </p>
                    <p className="text-sm text-gray-500">
                      {file ? `File size: ${(file.size / 1024 / 1024).toFixed(2)} MB` : 'Only PDF files are allowed'}
                    </p>
                  </label>
                </div>
                {file && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 flex items-center space-x-2 bg-blue-50 p-3 rounded-lg"
                  >
                    <FileText className="w-5 h-5 text-blue-600" />
                    <span className="text-sm text-blue-700">{file.name}</span>
                    <button
                      type="button"
                      onClick={() => setFile(null)}
                      className="ml-auto p-1 hover:bg-blue-100 rounded"
                    >
                      <X className="w-4 h-4 text-blue-600" />
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* URL Upload Section */}
            {uploadType === 'url' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
                  PDF URL *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Globe className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="url"
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://drive.google.com/file/d/... or https://dropbox.com/..."
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    required
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Supported: Google Drive, Dropbox, OneDrive, or any direct PDF link
                </p>
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isUploading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  <span>Upload Note</span>
                </>
              )}
            </motion.button>
          </form>

          {/* Instructions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 p-6 bg-gray-50 rounded-lg"
          >
            <h3 className="font-semibold text-gray-900 mb-3">Upload Guidelines:</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-800 mb-2">📁 File Upload:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Only PDF files are accepted</li>
                  <li>• Maximum file size: 10MB</li>
                  <li>• Use descriptive titles</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-2">🔗 URL Upload:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Google Drive sharing links</li>
                  <li>• Dropbox public links</li>
                  <li>• OneDrive sharing links</li>
                  <li>• Direct PDF URLs</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default UploadNotes; 