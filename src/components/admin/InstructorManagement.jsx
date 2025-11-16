import { useState, useEffect } from 'react';
import API_URL from '../../config/backend.js';

// Helper function to get image URL
const getImageUrl = (image) => {
  if (!image) return '';
  if (image.startsWith('http')) return image;
  // Extract base URL from API_URL (remove /api)
  const baseUrl = API_URL.replace('/api', '');
  return `${baseUrl}${image}`;
};

const InstructorManagement = () => {
  const [instructors, setInstructors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingInstructor, setEditingInstructor] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    description: '',
    expertise: '',
    experience: '',
    image: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchInstructors();
  }, []);

  const fetchInstructors = async () => {
    try {
      const response = await fetch(`${API_URL}/instructors`);
      const data = await response.json();
      setInstructors(data);
    } catch (error) {
      console.error('Error fetching instructors:', error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const uploadImage = async () => {
    if (!imageFile) return formData.image;

    const formDataUpload = new FormData();
    formDataUpload.append('image', imageFile);

    const response = await fetch(`${API_URL}/upload/image`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
      },
      body: formDataUpload
    });

    const data = await response.json();
    return data.imageUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const imageUrl = await uploadImage();
      const instructorData = { ...formData, image: imageUrl || formData.image };

      const token = localStorage.getItem('adminToken');
      const url = editingInstructor
        ? `${API_URL}/instructors/${editingInstructor._id}`
        : `${API_URL}/instructors`;

      const method = editingInstructor ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(instructorData)
      });

      if (response.ok) {
        fetchInstructors();
        resetForm();
        setShowModal(false);
      }
    } catch (error) {
      console.error('Error saving instructor:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (instructor) => {
    setEditingInstructor(instructor);
    setFormData({
      name: instructor.name,
      title: instructor.title,
      description: instructor.description,
      expertise: instructor.expertise,
      experience: instructor.experience,
      image: instructor.image
    });
    setImagePreview(instructor.image ? getImageUrl(instructor.image) : '');
    setImageFile(null);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this instructor?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/instructors/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        fetchInstructors();
      }
    } catch (error) {
      console.error('Error deleting instructor:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      title: '',
      description: '',
      expertise: '',
      experience: '',
      image: ''
    });
    setImageFile(null);
    setImagePreview('');
    setEditingInstructor(null);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Instructor Management</h2>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors w-full sm:w-auto"
        >
          Add Instructor
        </button>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Expertise</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {instructors.map((instructor) => (
                <tr key={instructor._id}>
                  <td className="px-6 py-4">
                    {instructor.image ? (
                      <img
                        src={getImageUrl(instructor.image)}
                        alt={instructor.name}
                        className="w-16 h-16 object-cover rounded-full"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-gray-400 text-xs">No Image</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{instructor.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{instructor.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{instructor.expertise}</td>
                  <td className="px-6 py-4 text-sm">
                    <button
                      onClick={() => handleEdit(instructor)}
                      className="text-blue-600 hover:text-blue-800 mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(instructor._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {instructors.map((instructor) => (
          <div key={instructor._id} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-start gap-4">
              {instructor.image ? (
                <img
                  src={getImageUrl(instructor.image)}
                  alt={instructor.name}
                  className="w-20 h-20 object-cover rounded-full flex-shrink-0"
                />
              ) : (
                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-gray-400 text-xs">No Image</span>
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-gray-900 mb-1">{instructor.name}</h3>
                <p className="text-xs text-blue-600 mb-1">{instructor.title}</p>
                <p className="text-xs text-gray-500 mb-3">{instructor.expertise}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(instructor)}
                    className="text-blue-600 hover:text-blue-800 text-sm px-3 py-1 border border-blue-600 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(instructor._id)}
                    className="text-red-600 hover:text-red-800 text-sm px-3 py-1 border border-red-600 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">
              {editingInstructor ? 'Edit Instructor' : 'Add Instructor'}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
                {imagePreview && (
                  <img src={imagePreview} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded-full" />
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Expertise</label>
                <input
                  type="text"
                  value={formData.expertise}
                  onChange={(e) => setFormData({ ...formData, expertise: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Experience</label>
                <input
                  type="text"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstructorManagement;

