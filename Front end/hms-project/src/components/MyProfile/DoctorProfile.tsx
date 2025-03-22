import React, { useState, useEffect } from 'react';
import DoctorService from '../../services/DoctorService';

interface Doctor {
  doctorID: number;
  firstName: string;
  lastName: string;
  specialization?: string;
  phoneNumber?: string;
  email?: string;
  department?: string;
  qualification?: string;
  yearsOfExperience?: number;
  charges?: number;
  registrationDate: string;
}

const DoctorProfile: React.FC = () => {
  const [doctor, setDoctor] = useState<Partial<Doctor>>({});
  const [formData, setFormData] = useState<Partial<Doctor>>({});
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchDoctor();
  }, []);

  const fetchDoctor = async () => {
    try {
      const response = await DoctorService.getDoctorById(1); // Assuming doctor ID is 1 for the profile page
      setDoctor(response.data);
      setFormData(response.data);
    } catch (error) {
      console.error('Error fetching doctor data:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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

    if (!formData.firstName) {
      newErrors.firstName = 'Please enter first name';
    }

    if (!formData.lastName) {
      newErrors.lastName = 'Please enter last name';
    }

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
        await DoctorService.updateDoctor(formData as Doctor, formData.doctorID || 0);
        fetchDoctor();
        setIsEditing(false);
      } catch (error) {
        console.error('Error updating doctor data:', error);
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
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <p className="mt-1 text-sm text-gray-900">{doctor.firstName}</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <p className="mt-1 text-sm text-gray-900">{doctor.lastName}</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Specialization</label>
              <p className="mt-1 text-sm text-gray-900">{doctor.specialization}</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <p className="mt-1 text-sm text-gray-900">{doctor.phoneNumber}</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <p className="mt-1 text-sm text-gray-900">{doctor.email}</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Department</label>
              <p className="mt-1 text-sm text-gray-900">{doctor.department}</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Qualification</label>
              <p className="mt-1 text-sm text-gray-900">{doctor.qualification}</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Years of Experience</label>
              <p className="mt-1 text-sm text-gray-900">{doctor.yearsOfExperience}</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Charges</label>
              <p className="mt-1 text-sm text-gray-900">{doctor.charges}</p>
            </div>
            <button onClick={() => setIsEditing(true)} className="btn btn-primary">Edit Profile</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName || ''}
                onChange={handleChange}
                className={`mt-1 block w-full pl-3 pr-3 py-2 border ${
                  errors.firstName ? 'border-red-300' : 'border-gray-300'
                } rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm`}
              />
              {errors.firstName && (
                <p className="mt-2 text-sm text-red-600">{errors.firstName}</p>
              )}
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName || ''}
                onChange={handleChange}
                className={`mt-1 block w-full pl-3 pr-3 py-2 border ${
                  errors.lastName ? 'border-red-300' : 'border-gray-300'
                } rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm`}
              />
              {errors.lastName && (
                <p className="mt-2 text-sm text-red-600">{errors.lastName}</p>
              )}
            </div>

            <div>
              <label htmlFor="specialization" className="block text-sm font-medium text-gray-700">Specialization</label>
              <input
                type="text"
                id="specialization"
                name="specialization"
                value={formData.specialization || ''}
                onChange={handleChange}
                className={`mt-1 block w-full pl-3 pr-3 py-2 border ${
                  errors.specialization ? 'border-red-300' : 'border-gray-300'
                } rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm`}
              />
              {errors.specialization && (
                <p className="mt-2 text-sm text-red-600">{errors.specialization}</p>
              )}
            </div>

            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber || ''}
                onChange={handleChange}
                className={`mt-1 block w-full pl-3 pr-3 py-2 border ${
                  errors.phoneNumber ? 'border-red-300' : 'border-gray-300'
                } rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm`}
              />
              {errors.phoneNumber && (
                <p className="mt-2 text-sm text-red-600">{errors.phoneNumber}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email || ''}
                onChange={handleChange}
                className={`mt-1 block w-full pl -3 pr -3 py -2 border ${
                  errors.email ? 'border-red -300' : 'border-gray -300'
                 } rounded-md shadow -sm focus:outline -none focus:ring -primary -500 focus:border -primary -500 sm:text -sm`}
               />
               {errors.email && (
                 <p className ="mt -2 text -sm text -red -600">{errors.email}</p >
               )}
             </div >

             <div >
               <label htmlFor ="qualification" className ="block text -sm font -medium text -gray -700">Qualification</label >
               <input
                 type ="text"
                 id ="qualification"
                 name ="qualification"
                 value ={formData.qualification || ''}
                 onChange ={handleChange}
                 className ={`mt -1 block w -full pl -3 pr -3 py -2 border ${
                   errors.qualification ? 'border-red -300' : 'border-gray -300'
                 } rounded-md shadow -sm focus:outline -none focus:ring -primary -500 focus:border -primary -500 sm:text -sm`}
               />
               {errors.qualification && (
                 <p className ="mt -2 text -sm text -red -600">{errors.qualification}</p >
               )}
             </div >

             <div className ="flex justify-end space-x -3">
               <button
                 type ="button"
                 onClick ={() => setIsEditing(false)}
                 className ="btn btn-outline"
               >
                 Cancel
               </button >
               <button
                 type ="submit"
                 className ="btn btn-primary"
               >
                 Save Changes
               </button >
             </div >
           </form >
         )}
       </div >
     </div >
   );
};

export default DoctorProfile;
