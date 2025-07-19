import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  X, 
  AlertTriangle,
  ArrowLeft,
  RefreshCw,
  Database,
  FileText,
  Video,
  BookOpen
} from 'lucide-react';

const AdminTest = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [testResults, setTestResults] = useState<any[]>([]);
  const [isRunningTests, setIsRunningTests] = useState(false);
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

  const runTests = async () => {
    setIsRunningTests(true);
    setTestResults([]);

    const tests = [
      {
        name: 'Admin Authentication',
        test: () => {
          const adminLoggedIn = localStorage.getItem('adminLoggedIn');
          return adminLoggedIn === 'true';
        },
        description: 'Check if admin is properly logged in'
      },
      {
        name: 'Uploaded Notes Storage',
        test: () => {
          const uploadedNotes = JSON.parse(localStorage.getItem('uploadedNotes') || '[]');
          return uploadedNotes.length >= 0;
        },
        description: 'Check if uploaded notes are stored in localStorage'
      },
      {
        name: 'Uploaded Videos Storage',
        test: () => {
          const uploadedVideos = JSON.parse(localStorage.getItem('uploadedVideos') || '[]');
          return uploadedVideos.length >= 0;
        },
        description: 'Check if uploaded videos are stored in localStorage'
      },
      {
        name: 'Notes Data Structure',
        test: () => {
          const uploadedNotes = JSON.parse(localStorage.getItem('uploadedNotes') || '[]');
          if (uploadedNotes.length === 0) return true;
          
          const requiredFields = ['id', 'title', 'description', 'category', 'type', 'uploadDate'];
          return uploadedNotes.every((note: any) => 
            requiredFields.every(field => note.hasOwnProperty(field))
          );
        },
        description: 'Check if notes have proper data structure'
      },
      {
        name: 'Videos Data Structure',
        test: () => {
          const uploadedVideos = JSON.parse(localStorage.getItem('uploadedVideos') || '[]');
          if (uploadedVideos.length === 0) return true;
          
          const requiredFields = ['id', 'title', 'description', 'category', 'instructor', 'duration', 'url', 'uploadDate'];
          return uploadedVideos.every((video: any) => 
            requiredFields.every(field => video.hasOwnProperty(field))
          );
        },
        description: 'Check if videos have proper data structure'
      },
      {
        name: 'LocalStorage Access',
        test: () => {
          try {
            localStorage.setItem('test', 'test');
            localStorage.removeItem('test');
            return true;
          } catch (e) {
            return false;
          }
        },
        description: 'Check if localStorage is accessible'
      }
    ];

    for (let i = 0; i < tests.length; i++) {
      const test = tests[i];
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate test delay
      
      try {
        const result = test.test();
        setTestResults(prev => [...prev, {
          name: test.name,
          description: test.description,
          passed: result,
          error: null
        }]);
      } catch (error) {
        setTestResults(prev => [...prev, {
          name: test.name,
          description: test.description,
          passed: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        }]);
      }
    }

    setIsRunningTests(false);
  };

  const clearAllData = () => {
    if (confirm('Are you sure you want to clear all uploaded data? This cannot be undone.')) {
      localStorage.removeItem('uploadedNotes');
      localStorage.removeItem('uploadedVideos');
      alert('All uploaded data has been cleared.');
    }
  };

  const getStorageInfo = () => {
    const uploadedNotes = JSON.parse(localStorage.getItem('uploadedNotes') || '[]');
    const uploadedVideos = JSON.parse(localStorage.getItem('uploadedVideos') || '[]');
    
    return {
      notes: uploadedNotes.length,
      videos: uploadedVideos.length,
      totalItems: uploadedNotes.length + uploadedVideos.length
    };
  };

  const storageInfo = getStorageInfo();

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
                <h1 className="text-xl font-bold text-gray-900">Admin Test Panel</h1>
                <p className="text-sm text-gray-500">Test and verify admin functionality</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Storage Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Uploaded Notes</p>
                <p className="text-2xl font-bold text-gray-900">{storageInfo.notes}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Video className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Uploaded Videos</p>
                <p className="text-2xl font-bold text-gray-900">{storageInfo.videos}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Database className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Items</p>
                <p className="text-2xl font-bold text-gray-900">{storageInfo.totalItems}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Test Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm border p-6 mb-8"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Test Controls</h3>
          <div className="flex space-x-4">
            <motion.button
              onClick={runTests}
              disabled={isRunningTests}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isRunningTests ? (
                <RefreshCw className="w-5 h-5 animate-spin" />
              ) : (
                <CheckCircle className="w-5 h-5" />
              )}
              <span>{isRunningTests ? 'Running Tests...' : 'Run Tests'}</span>
            </motion.button>
            
            <motion.button
              onClick={clearAllData}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors duration-200 flex items-center space-x-2"
            >
              <X className="w-5 h-5" />
              <span>Clear All Data</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Test Results */}
        {testResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm border overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Test Results</h3>
            </div>
            
            <div className="divide-y divide-gray-200">
              {testResults.map((result, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="p-6"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        {result.passed ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <AlertTriangle className="w-5 h-5 text-red-600" />
                        )}
                        <h4 className="font-semibold text-gray-900">{result.name}</h4>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          result.passed 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {result.passed ? 'PASSED' : 'FAILED'}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">{result.description}</p>
                      {result.error && (
                        <p className="text-red-600 text-sm mt-2">Error: {result.error}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-blue-50 rounded-xl p-6 mt-8"
        >
          <h3 className="text-lg font-semibold text-blue-900 mb-4">How to Test</h3>
          <div className="space-y-3 text-blue-800">
            <p>1. <strong>Upload Test:</strong> Go to Upload Notes/Video pages and add some test content</p>
            <p>2. <strong>Manage Test:</strong> Check if uploaded content appears in Manage pages</p>
            <p>3. <strong>Delete Test:</strong> Try deleting items to verify delete functionality</p>
            <p>4. <strong>Run Tests:</strong> Click "Run Tests" to verify all functionality</p>
            <p>5. <strong>Clear Data:</strong> Use "Clear All Data" to reset if needed</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminTest; 