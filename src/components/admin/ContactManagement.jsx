import { useState, useEffect } from 'react';
import API_URL from '../../config/backend.js';

const ContactManagement = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/contacts`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/contacts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });

      if (response.ok) {
        fetchContacts();
      }
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this contact?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/contacts/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        fetchContacts();
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'contacted':
        return 'bg-yellow-100 text-yellow-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <div className="mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Contact Management</h2>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Message</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {contacts.map((contact) => (
                <tr key={contact._id}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{contact.fullName}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{contact.organizationType}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{contact.contact}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{contact.message.substring(0, 50)}...</td>
                  <td className="px-6 py-4">
                    <select
                      value={contact.status}
                      onChange={(e) => handleStatusChange(contact._id, e.target.value)}
                      className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(contact.status)}`}
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="resolved">Resolved</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button
                      onClick={() => handleDelete(contact._id)}
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
        {contacts.map((contact) => (
          <div key={contact._id} className="bg-white rounded-lg shadow-md p-4">
            <div className="space-y-3">
              <div>
                <h3 className="text-sm font-semibold text-gray-900">{contact.fullName}</h3>
                <p className="text-xs text-gray-500">{contact.organizationType}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Contact: {contact.contact}</p>
                <p className="text-xs text-gray-500 line-clamp-2">{contact.message}</p>
              </div>
              <div className="flex items-center justify-between pt-2 border-t">
                <select
                  value={contact.status}
                  onChange={(e) => handleStatusChange(contact._id, e.target.value)}
                  className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(contact.status)}`}
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="resolved">Resolved</option>
                </select>
                <button
                  onClick={() => handleDelete(contact._id)}
                  className="text-red-600 hover:text-red-800 text-sm px-3 py-1 border border-red-600 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactManagement;

