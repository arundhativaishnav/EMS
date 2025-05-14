import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminNotificationForm = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [sendTo, setSendTo] = useState('all'); // 'all' or 'specific'
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    if (sendTo === 'specific') {
      axios.get('/api/users') // Make sure this returns all employees
        .then(res => setUsers(res.data.users))
        .catch(err => console.error(err));
    }
  }, [sendTo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/notifications', {
        title,
        message,
        isGlobal: sendTo === 'all',
        recipients: sendTo === 'specific' ? selectedUsers : [],
      });

      // Reset form
      setTitle('');
      setMessage('');
      setSendTo('all');
      setSelectedUsers([]);

      alert('Notification sent successfully');
    } catch (error) {
      console.error(error);
      alert('Error sending notification');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Send Notification</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Send to:</label>
          <div className="flex gap-6">
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="all"
                checked={sendTo === 'all'}
                onChange={() => setSendTo('all')}
                className="form-radio text-blue-600"
              />
              <span className="ml-2 text-gray-700">All Employees</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="specific"
                checked={sendTo === 'specific'}
                onChange={() => setSendTo('specific')}
                className="form-radio text-blue-600"
              />
              <span className="ml-2 text-gray-700">Specific Employees</span>
            </label>
          </div>
        </div>

        {sendTo === 'specific' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Employees</label>
            <select
              multiple
              value={selectedUsers}
              onChange={(e) =>
                setSelectedUsers(Array.from(e.target.selectedOptions, option => option.value))
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-2 h-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {users.map(user => (
                <option key={user._id} value={user._id}>
                  {user.name} ({user.email})
                </option>
              ))}
            </select>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg text-lg font-medium hover:bg-blue-700 transition"
        >
          Send Notification
        </button>
      </form>
    </div>
  );
};

export default AdminNotificationForm;
