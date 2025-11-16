import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import CourseManagement from '../components/admin/CourseManagement';
import InstructorManagement from '../components/admin/InstructorManagement';
import ContactManagement from '../components/admin/ContactManagement';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('courses');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-xl sm:text-2xl font-bold text-blue-600">Admin Dashboard</h1>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors w-full sm:w-auto"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-4 sm:py-8">
        <div className="bg-white rounded-lg shadow-md mb-6 overflow-hidden">
          <div className="flex flex-col sm:flex-row border-b overflow-x-auto">
            <button
              onClick={() => setActiveTab('courses')}
              className={`px-4 sm:px-6 py-3 font-semibold whitespace-nowrap transition-colors ${
                activeTab === 'courses'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              Courses
            </button>
            <button
              onClick={() => setActiveTab('instructors')}
              className={`px-4 sm:px-6 py-3 font-semibold whitespace-nowrap transition-colors ${
                activeTab === 'instructors'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              Instructors
            </button>
            <button
              onClick={() => setActiveTab('contacts')}
              className={`px-4 sm:px-6 py-3 font-semibold whitespace-nowrap transition-colors ${
                activeTab === 'contacts'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              Contacts
            </button>
          </div>
        </div>

        {activeTab === 'courses' && <CourseManagement />}
        {activeTab === 'instructors' && <InstructorManagement />}
        {activeTab === 'contacts' && <ContactManagement />}
      </div>
    </div>
  );
};

export default AdminDashboard;

