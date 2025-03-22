import React, { useState, useEffect } from 'react';
import PatientService from '../../services/PatientService';

interface Patient {
  patientID: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender?: string;
  address?: string;
  phoneNumber?: string;
  email?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  registrationDate: string;
}

const PatientProfile: React.FC = () => {
  const [patient, setPatient] = useState<Partial<Patient>>({});
  const [formData, setFormData] = useState<Partial<Patient>>({});
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchPatient();
  }, []);

  const fetchPatient = async () => {
    try {
      const response = await PatientService.getPatientById(1); // Assuming patient ID is 1 for the profile page
      setPatient(response.data);
      setFormData(response.data);
    } catch (error) {
      console.error('Error fetching patient data:', error);
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

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Please enter date of birth';
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
        await PatientService.updatePatient(formData as Patient, formData.patientID || 0);
        fetchPatient();
        setIsEditing(false);
      } catch (error) {
        console.error('Error updating patient data:', error);
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
              <p className="mt-1 text-sm text-gray-900">{patient.firstName}</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <p className="mt-1 text-sm text-gray-900">{patient.lastName}</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
              <p className="mt-1 text-sm text-gray-900">{patient.dateOfBirth}</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Gender</label>
              <p className="mt-1 text-sm text-gray-900">{patient.gender}</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <p className="mt-1 text-sm text-gray-900">{patient.address}</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <p className="mt-1 text-sm text-gray-900">{patient.phoneNumber}</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <p className="mt-1 text-sm text-gray-900">{patient.email}</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Emergency Contact Name</label>
              <p className="mt-1 text-sm text-gray-900">{patient.emergencyContactName}</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Emergency Contact Phone</label>
              <p className="mt-1 text-sm text-gray-900">{patient.emergencyContactPhone}</p>
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
              <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">Date of Birth</label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth || ''}
                onChange={handleChange}
                className={`mt-1 block w-full pl -3 pr -3 py -2 border ${
                  errors.dateOfBirth ? 'border-red -300' : 'border-gray -300'
                 } rounded-md shadow -sm focus:outline -none focus:ring -primary -500 focus:border -primary -500 sm:text -sm`}
               />
               {errors.dateOfBirth && (
                 <p className ="mt -2 text -sm text -red -600">{errors.dateOfBirth}</p >
               )}
             </div >

             <div >
               <label htmlFor ="gender" className ="block text -sm font -medium text -gray -700">Gender</label >
               <input
                 type ="text"
                 id ="gender"
                 name ="gender"
                 value ={formData.gender || ''}
                 onChange ={handleChange}
                 className ={`mt -1 block w -full pl -3 pr -3 py -2 border ${
                   errors.gender ? 'border-red -300' : 'border-gray -300'
                 } rounded-md shadow -sm focus:outline -none focus:ring -primary -500 focus:border -primary -500 sm:text -sm`}
               />
               {errors.gender && (
                 <p className ="mt -2 text -sm text -red -600">{errors.gender}</p >
               )}
             </div >

             <div >
               <label htmlFor ="address" className ="block text -sm font -medium text -gray -700">Address</label >
               <input
                 type ="text"
                 id ="address"
                 name ="address"
                 value ={formData.address || ''}
                 onChange ={handleChange}
                 className ={`mt -1 block w -full pl -3 pr -3 py -2 border ${
                   errors.address ? 'border-red -300' : 'border-gray -300'
                 } rounded-md shadow -sm focus:outline -none focus:ring -primary -500 focus:border -primary -500 sm:text -sm`}
               />
               {errors.address && (
                 <p className ="mt -2 text -sm text -red -600">{errors.address}</p >
               )}
             </div >

             <div >
               <label htmlFor ="phoneNumber" className ="block text-sm font-medium text-gray-700">Phone Number</label >
               <input
                 type ="text"
                 id ="phoneNumber"
                 name ="phoneNumber"
                 value ={formData.phoneNumber || ''}
                 onChange ={handleChange}
                 className ={`mt-1 block w-full pl-full 
                   errors.phoneNumber? " border-phoneNumber?
                  } rounded-md shadow-sm focus:outline-none focus:ring-primary-focus:border-primary sm:text-sm`}
               />
               {errors.phoneNumber && (
                 <p className ="mt-2 text-sm text-red-600">{errors.phoneNumber}</p >
               )}
             </div >

             <div >
               <label htmlFor ="email" className ="block text-sm font-medium text-gray-700">Email</label >
               <input
                 type ="email"
                 id ="email"
                 name ="email"
                 value ={formData.email || ''}
                 onChange ={handleChange}
                 className ={`mt-1 block w-full pl-full 
                   errors.email? " border-email?
                  } rounded-md shadow-sm focus:outline-none focus:ring-primary-focus:border-primary sm:text-sm`}
               />
               {errors.email && (
                 <p className ="mt-2 text-sm text-red-600">{errors.email}</p >
               )}
             </div >

             <div >
               <label htmlFor ="emergencyContactPhone" className ="block text-sm font-medium text-gray-700">Emergency Contact Phone</label >
               <input
                 type ="text"
                 id ="emergencyContactPhone"
                 name ="emergencyContactPhone"
                 value ={formData.emergencyContactPhone || ''}
                 onChange ={handleChange}
                 className ={`mt-1 block w-full pl-full 
                   errors.emergencyContactPhone? " border-emergencyContactPhone?
                  } rounded-md shadow-sm focus:outline-none focus:ring-primary-focus:border-primary sm:text-sm`}
               />
               {errors.emergencyContactPhone && (
                 <p className ="mt-2 text-sm text-red-600">{errors.emergencyContactPhone}</p >
               )}
             </div >

             <div >
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

export default PatientProfile; 
