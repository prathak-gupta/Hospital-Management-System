import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PrescriptionService from '../../services/PrescriptionService';
import { User } from '../../types';
import { Plus } from 'lucide-react';


interface Prescription {
  prescriptionId: number;
  patientId: number;
  doctorId: number;
  medicationName: string;
  dosage: string;
  frequency: string;
  duration: string;
  issueDate: string; // Using string to represent date in ISO format
  notes?: string;
}

const PrescriptionList: React.FC = () => {
  const navigate = useNavigate();
  
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [formData, setFormData] = useState<Partial<Prescription>>({});
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  function getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    if (userStr) {
        try {
            return JSON.parse(userStr) as User;
        } catch (ex) {
            console.error('Error parsing user data:', ex);
            return null;
        }
    }
    return null;
}
  let doctorId = getCurrentUser()?.id;
  console.log("Doctor ID: ",doctorId);

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {
    try {
      const response = await PrescriptionService.getAllPrescriptionsByDoctor(doctorId||0);
      setPrescriptions(response.data);
    } catch (error) {
      console.error('Error fetching prescriptions:', error);
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
    
    if (!formData.patientId) {
      newErrors.patientID = 'Please enter patient ID';
    }
    
    if (!formData.medicationName) {
      newErrors.medicationName = 'Please enter medication name';
    }
    
    if (!formData.dosage) {
      newErrors.dosage = 'Please enter dosage';
    }
    
    if (!formData.frequency) {
      newErrors.frequency = 'Please enter frequency';
    }
    
    if (!formData.duration) {
      newErrors.duration = 'Please enter duration';
    }
    
    if (!formData.issueDate) {
      newErrors.issueDate = 'Please select an issue date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        formData.doctorId = doctorId;
        if (formData.prescriptionId) {
          await PrescriptionService.updatePrescription(formData as Prescription, formData.prescriptionId);
        } else {
          console.log(formData)
          await PrescriptionService.registerPrescription(formData as Prescription);
        }
        fetchPrescriptions();
        setFormData({});
        setIsModalOpen(false);
      } catch (error) {
        console.error('Error saving prescription:', error);
      }
    }
  };

  const handleSearch = async () => {
    try {
      const response = await PrescriptionService.searchPrescriptions(searchKeyword);
      setPrescriptions(response.data);
    } catch (error) {
      console.error('Error searching prescriptions:', error);
    }
  };

  const openModalForNewEntry = () => {
    setFormData({});
    setIsModalOpen(true);
  };

  const openModalForEdit = (prescription: Prescription) => {
    setFormData(prescription);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-black-900">
          Manage Prescriptions
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          View, create, update, and search prescriptions.
        </p>
      </div>
      
      <div className="px-4 py-5 sm:p-6">
       <button onClick={openModalForNewEntry} className="btn btn-primary mb-4  flex justify-center items-center"> <Plus/> New Prescription </button>
        
        <div className="mb-4 flex space-x-3">
          <input
            type="text"
            placeholder="Search by keyword"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="border p-2 flex-grow"
          />
          <button onClick={handleSearch} className="btn btn-primary">Search</button>
        </div>

        {prescriptions.length > 0 && (
          <table className="min-w-full bg-white mt-6">
            <thead>
              <tr>
                <th className="py-2">ID</th>
                <th className="py-2">Patient ID</th>
                <th className="py-2">Medication Name</th>
                <th className="py-2">Dosage</th>
                <th className="py-2">Frequency</th>
                <th className="py-2">Duration</th>
                <th className="py-2">Issue Date</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {prescriptions.map((prescription) => (
                <tr key={prescription.prescriptionId}>
                  <td className="border px-4 py-2">{prescription.prescriptionId}</td>
                  <td className="border px-4 py-2">{prescription.patientId}</td>
                  <td className="border px-4 py-2">{prescription.medicationName}</td>
                  <td className="border px-4 py-2">{prescription.dosage}</td>
                  <td className="border px-4 py-2">{prescription.frequency}</td>
                  <td className="border px-4 py-2">{prescription.duration}</td>
                  <td className="border px-4 py-2">{prescription.issueDate}</td>
                  <td className="border px-4 py-2 flex space-x-2">
                    <button onClick={() => openModalForEdit(prescription)} className="btn btn-outline  hover:bg-grey-800">Edit</button>
                    <button onClick={() => PrescriptionService.deletePrescription(prescription.prescriptionId).then(fetchPrescriptions)} className="btn btn-danger bg-red-400 text-white hover:bg-red-800">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleSubmit} className="px-4 py-5 sm:p-6">
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label htmlFor="patientId" className="block text-sm font-medium text-gray-700">
                      Patient ID
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        type="number"
                        id="patientId"
                        name="patientId"
                        value={formData.patientId || ''}
                        onChange={handleChange}
                        className={`block w-full pl-3 pr-3 py-2 border ${
                          errors.patientId ? 'border-red-300' : 'border-gray-300'
                        } rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm`}
                      />
                    </div>
                    {errors.patientId && (
                      <p className="mt-2 text-sm text-red-600">{errors.patientId}</p>
                    )}
                  </div>

                  {/* Medication Name */}
                  <div className="sm:col-span-3">
                    <label htmlFor="medicationName" className="block text-sm font-medium text-gray-700">
                      Medication Name
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        type="text"
                        id="medicationName"
                        name="medicationName"
                        value={formData.medicationName || ''}
                        onChange={handleChange}
                        className={`block w-full pl-3 pr-3 py-2 border ${
                          errors.medicationName ? 'border-red-300' : 'border-gray-300'
                        } rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm`}
                      />
                    </div>
                    {errors.medicationName && (
                      <p className="mt-2 text-sm text-red-600">{errors.medicationName}</p>
                    )}
                  </div>

                  {/* Dosage */}
                  <div className="sm:col-span-3">
                    <label htmlFor="dosage" className="block text-sm font-medium text-gray-700">
                      Dosage
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        type="text"
                        id="dosage"
                        name="dosage"
                        value={formData.dosage || ''}
                        onChange={handleChange}
                        className={`block w-full pl-3 pr-3 py-2 border ${
                          errors.dosage ? 'border-red-300' : 'border-gray-300'
                        } rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm`}
                      />
                    </div>
                    {errors.dosage && (
                      <p className="mt-2 text-sm text-red-600">{errors.dosage}</p>
                    )}
                  </div>

                  {/* Frequency */}
                  <div className="sm:col-span-3">
                    <label htmlFor="frequency" className="block text-sm font-medium text-gray-700">
                      Frequency
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        type="text"
                        id="frequency"
                        name="frequency"
                        value={formData.frequency || ''}
                        onChange={handleChange}
                        className={`block w-full pl-3 pr-3 py-2 border ${
                          errors.frequency ? 'border-red-300' : 'border-gray-300'
                        } rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm`}
                      />
                    </div>
                    {errors.frequency && (
                      <p className="mt-2 text-sm text-red-600">{errors.frequency}</p>
                    )}
                  </div>

                  {/* Duration */}
                  <div className="sm:col-span-3">
                    <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                      Duration
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        type="text"
                        id="duration"
                        name="duration"
                        value={formData.duration || ''}
                        onChange={handleChange}
                        className={`block w-full pl-3 pr-3 py-2 border ${
                          errors.duration ? 'border-red-300' : 'border-gray-300'
                        } rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm`}
                      />
                    </div>
                    {errors.duration && (
                      <p className="mt-2 text-sm text-red-600">{errors.duration}</p>
                    )}
                  </div>

                  {/* Issue Date */}
                  <div className="sm:col-span-3">
                    <label htmlFor="issueDate" className="block text-sm font-medium text-gray-700">
                      Issue Date
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        type="date"
                        id="issueDate"
                        name="issueDate"
                        value={formData.issueDate || ''}
                        onChange={handleChange}
                        className={`block w-full pl-3 pr-3 py-2 border ${
                          errors.issueDate ? 'border-red-300' : 'border-gray-300'
                        } rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm`}
                      />
                    </div>
                    {errors.issueDate && (
                      <p className="mt-2 text-sm text-red-600">{errors.issueDate}</p>
                    )}
                  </div>

                  {/* Notes */}
                  <div className="sm:col-span-full">
                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                      Notes
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <textarea
                        id="notes"
                        name="notes"
                        rows={4}
                        value={formData.notes || ''}
                        onChange={handleChange}
                        className={`block w-full pl-3 pr-3 py-2 border ${
                          errors.notes ? 'border-red-300' : 'border-gray-300'
                        } rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm`}
                      />
                    </div>
                    {errors.notes && (
                      <p className="mt-2 text-sm text-red-600">{errors.notes}</p>
                    )}
                  </div>

                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="btn btn-outline"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    Save Prescription
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrescriptionList;
