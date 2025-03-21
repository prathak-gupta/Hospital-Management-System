import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import DoctorLogin from '../../services/Login/DoctorLogin';
import AdminLogin from '../../services/Login/AdminLogin';
import PatientLogin from '../../services/Login/PatientLogin';

const Settings: React.FC = () => {
  const { user } = useAuth();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      setNotification({ message: 'New passwords do not match', type: 'error' });
      return;
    }

    try {
      if (user?.role === 'doctor') {
        await DoctorLogin.resetPassword(user.username, oldPassword, newPassword, user.email);
      } else if (user?.role === 'admin') {
        await AdminLogin.resetPassword(user.username, oldPassword, newPassword, user.email);
      } else if (user?.role === 'patient') {
        await PatientLogin.resetPassword(user.username, oldPassword, newPassword, user.email);
      }

      setNotification({ message: 'Password changed successfully', type: 'success' });
    } catch (error) {
      console.error('Error changing password:', error);
      setNotification({ message: 'Error changing password', type: 'error' });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Password Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex justify-between items-center mb-4">
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role:</label>
          <span className="text-sm text-gray-500">{user?.role}</span>
        </div>
        <div className="mb-4">
          <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700">Enter Old Password:</label>
          <input
            type="password"
            id="oldPassword"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">Create New Password:</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm New Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Change Password
        </button>
      </form>

      {notification && (
        <div
          className={`fixed bottom-4 right-4 p-4 rounded-md shadow-lg ${
            notification.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}
        >
          {notification.message}
        </div>
      )}
    </div>
  );
};

export default Settings;
