import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Mail, Lock, AlertCircle, AlertTriangle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import DoctorLogin from '../../services/Login/DoctorLogin';
import PatientLogin from '../../services/Login/PatientLogin';
import AdminLogin from '../../services/Login/AdminLogin';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [domain, setDomain] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [showModal, setShowModal] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!domain) {
      setNotification({ message: 'Please select a domain', type: 'error' });
      setIsLoading(false);
      return;
    }

    try {
      const success = await login(domain, email, password);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!domain) {
      setNotification({ message: 'Please select a domain', type: 'error' });
      return;
    }
    if (!email) {
      setNotification({ message: 'Please enter your email address', type: 'error' });
      return;
    }
    setShowModal(true);
  };

  const confirmForgotPassword = async () => {
    setShowModal(false);
    let apiUrl = '';
    if (domain === 'admin') {
      AdminLogin.forgotPassword(email).then(response =>{
        setNotification({ message: 'Forgot password request sent successfully', type: 'success' });
}).catch(error =>{
        setNotification({ message: 'Error sending forgot password request', type: 'error' });

});

} else if (domain === 'doctor') {
      DoctorLogin.forgotPassword(email).then(response =>{
              setNotification({ message: 'Forgot password request sent successfully', type: 'success' });
      }).catch(error =>{
              setNotification({ message: 'Error sending forgot password request', type: 'error' });

      });

    } else if (domain === 'patient') {
      PatientLogin.forgotPassword(email).then(response =>{
        setNotification({ message: 'Forgot password request sent successfully', type: 'success' });
}).catch(error =>{
        setNotification({ message: 'Error sending forgot password request', type: 'error' });

});
}

    // try {
    //   const response = await fetch(apiUrl, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ email }),
    //   });

    //   if (!response.ok) {
    //     throw new Error('Failed to send forgot password request');
    //   }

    //   setNotification({ message: 'Forgot password request sent successfully', type: 'success' });
    // } catch (error) {
    //   console.error('Error sending forgot password request:', error);
    //   setNotification({ message: 'Error sending forgot password request', type: 'error' });
    // }
  };

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000); // Auto disappear after 3 seconds

      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center">
            <Activity className="h-12 w-12 text-primary-600" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to MediCare
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Hospital Management System
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-red-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                defaultChecked
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="font-medium text-primary-600 hover:text-primary-500"
              >
                Forgot your password?
              </button>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>

          <div className="mt-4">
            <p className="text-center text-sm text-gray-600">
              Current selected domain: {domain || "None"}
            </p>
            <div className="mt-2 grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => { setDomain("admin"); setNotification({ message: "Admin Selected", type: "success" }); }}
                className={`py-2 px-4 border border-gray-300 rounded-md shadow-sm text-xs font-medium ${domain === "admin" ? "bg-primary-100" : "bg-white"} hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500`}
              >
                Admin
              </button>
              <button
                type="button"
                onClick={() => { setDomain("doctor"); setNotification({ message: "Doctor Selected", type: "success" }); }}
                className={`py-2 px-4 border border-gray-300 rounded-md shadow-sm text-xs font-medium ${domain === "doctor" ? "bg-primary-100" : "bg-white"} hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500`}
              >
                Doctor
              </button>
              <button
                type="button"
                onClick={() => { setDomain("patient"); setNotification({ message: "Patient Selected", type: "success" }); }}
                className={`py-2 px-4 border border-gray-300 rounded-md shadow-sm text-xs font-medium ${domain === "patient" ? "bg-primary-100" : "bg-white"} hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500`}
              >
                Patient
              </button>
            </div>
          </div>
        </form>

        {notification && (
          <div
            className={`fixed top-[20px] right-[20px] p-[16px] rounded-md shadow-lg ${
              notification.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            } flex items-center`}
          >
            {notification.type === 'success' ? (
              <AlertCircle className='mr-[8px]' size={24} />
            ) : (
              <AlertTriangle className='mr-[8px]' size={24} />
            )}
            {notification.message}
          </div>
        )}

        {/* Warning Modal */}
        {showModal && (
          <div className="fixed inset-[0] flex items-center justify-center overflow-y-auto bg-black bg-opacity-[0.5]">
            <div className="bg-white rounded-lg shadow-lg p-[24px] max-w-md w-full">
              <h3 className="text-lg font-medium text-gray-[900]">Warning</h3>
              <p className="mt-[8px] text-sm text-gray-[600]">After proceeding, your current password will be removed and a temporary password will be sent to your email. Do you want to continue?</p>
              <div className="mt-[16px] flex justify-end">
                <button
                  className="mr-[8px] px-[16px] py-[8px] bg-gray-[200] rounded-md hover:bg-gray-[300]"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-[16px] py-[8px] bg-red-600 text-white rounded-md hover:bg-red-700"
                  onClick={confirmForgotPassword}
                >
                  Proceed
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
