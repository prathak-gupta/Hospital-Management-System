import React, { useState } from 'react';
import {  Key, Loader, CheckCircle, XCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import PatientLogin from '../../services/Login/PatientLogin';
import DoctorLogin from '../../services/Login/DoctorLogin';

const Security: React.FC = () => {
    const { user } = useAuth();

  const [activeTab, setActiveTab] = useState<'doctor' | 'patient'>('doctor');
  const [identifier, setIdentifier] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleTabChange = (tab: 'doctor' | 'patient') => {
    setActiveTab(tab);
    setIdentifier('');
    setNotification(null);
  };

  const handleResetPassword = async () => {
    if (!identifier) {
      setNotification({ message: 'Please enter a valid username', type: 'error' });
      return;
    }

    setLoading(true);
    setNotification(null);

    try {
      if (activeTab === 'doctor') {
        await DoctorLogin.forgotPassword(identifier, user?.role);
      } else {
        await PatientLogin.forgotPassword(identifier, user?.role).then(response=>{

            setNotification({ message: 'Password reset successfully', type: 'success' });
        }).catch(e=>{

            setNotification({ message: 'Error resetting password', type: 'error' });
        })
      }
      
    } catch (error) {
        setNotification({ message: 'Error resetting password', type: 'error' });
    } finally {
      setLoading(false);
    }

    console.log(`Resetting password for ${activeTab} using username: ${identifier}`);
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-black-900">
          Security Management
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Reset passwords for doctors and patients.
        </p>
      </div>

      <div className="px-4 py-5 sm:p-6">
        <div className="mb-4 flex space-x-3">
          <button
            onClick={() => handleTabChange('doctor')}
            className={`btn ${activeTab === 'doctor' ? 'bg-emerald-400 text-white' : 'bg-gray-200 text-gray-700'} rounded-full flex justify-center items-center`}
          >
             Doctor
          </button>
          <button
            onClick={() => handleTabChange('patient')}
            className={`btn ${activeTab === 'patient' ? 'bg-emerald-400 text-white' : 'bg-gray-200 text-gray-700'} rounded-full flex justify-center items-center`}
          >
             Patient
          </button>
        </div>

        <div className="mt-6">
          <div className="mb-4">
            <label htmlFor="identifier" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="email"
              id="identifier"
              name="identifier"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            />
          </div>

          <button
            onClick={handleResetPassword}
            className="btn btn-primary flex items-center"
            disabled={loading}
          >
            {loading ? <Loader className="animate-spin mr-2" /> : <Key className="mr-2" />}
            Reset Password
          </button>

          {notification && (
            <div className={`mt-4 text-sm flex items-center ${notification.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
              {notification.type === 'success' ? <CheckCircle className="mr-2" /> : <XCircle className="mr-2" />}
              {notification.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Security;
