import React, { useState, useEffect } from 'react';
import AdminService from '../../services/AdminService';
import { useAuth } from '../../context/AuthContext';
import NotFoundPage from '../../context/NotFoundPage';

interface Admin {
  adminId: number;
  username: string;
  password: string;
  role: string;
  email: string;
}

const AdminProfile: React.FC = () => {
  
  const [admin, setAdmin] = useState<Partial<Admin>>({});
  const [formData, setFormData] = useState<Partial<Admin>>({});
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const {user} = useAuth();

  if(user?.role === "admin"){
  useEffect(() => {
    fetchAdmin();
  }, []);

  const fetchAdmin = async () => {
    try {
      // console.log("USER",user);
      const response = await AdminService.getAdminById(user?.id); // Assuming admin ID is 1 for the profile page
      setAdmin(response.data);
      setFormData(response.data);
    } catch (error) {
      console.error('Error fetching admin data:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = 'Please enter email';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        console.log(formData);
        await AdminService.updateAdmin(formData as Admin, formData.adminId || 0);
        fetchAdmin();
        setIsEditing(false);
      } catch (error) {
        console.error('Error updating admin data:', error);
      }
    }
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          My Profile
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          View and update your profile information.
        </p>
      </div>

      <div className="px-4 py-5 sm:p-6">
        {!isEditing ? (
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <p className="mt-1 text-sm text-gray-900">{admin.username}</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <p className="mt-1 text-sm text-gray-900">{admin.email}</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <p className="mt-1 text-sm text-gray-900">{admin.role}</p>
            </div>
            <button onClick={() => setIsEditing(true)} className="btn btn-primary">Edit Email</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email || ''}
                onChange={handleChange}
                className={`mt-1 block w-full pl-3 pr-3 py-2 border ${
                  errors.email ? 'border-red-300' : 'border-gray-300'
                } rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm`}
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
              >
                Save Changes
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}else
{return (<NotFoundPage/>)}
};

export default AdminProfile;
