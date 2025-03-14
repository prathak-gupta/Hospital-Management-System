import React, { useState } from 'react';
import { Pill, Calendar, User, Download, Plus } from 'lucide-react';
import { mockPrescriptions, mockPatients, mockDoctors } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import { Prescription } from '../../types';

const PrescriptionList: React.FC = () => {
  const { user } = useAuth();
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter prescriptions based on user role
  const filteredPrescriptions = mockPrescriptions.filter(prescription => {
    if (user?.role === 'doctor') {
      return prescription.doctorId === user.id;
    } else if (user?.role === 'patient') {
      return prescription.patientId === user.id;
    }
    return true; // Admin sees all
  });
  
  // Apply search filter
  const searchedPrescriptions = filteredPrescriptions.filter(prescription => {
    const patient = mockPatients.find(p => p.id === prescription.patientId);
    const doctor = mockDoctors.find(d => d.id === prescription.doctorId);
    
    const medications = prescription.medications.map(m => m.name).join(' ');
    const searchString = `${patient?.name} ${doctor?.name} ${medications}`.toLowerCase();
    return searchString.includes(searchTerm.toLowerCase());
  });
  
  const handleViewPrescription = (prescription: Prescription) => {
    setSelectedPrescription(prescription);
  };
  
  const closeModal = () => {
    setSelectedPrescription(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Prescriptions</h1>
          <p className="mt-1 text-sm text-gray-500">
            View and manage prescriptions
          </p>
        </div>
        {user?.role === 'doctor' && (
          <button
            type="button"
            className="btn btn-primary flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Prescription
          </button>
        )}
      </div>
      
      {/* Search and Filter */}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Pill className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search prescriptions by patient, doctor, medication..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      {/* Prescriptions List */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {user?.role === 'patient' ? 'Your Prescriptions' : 'Patient Prescriptions'}
          </h3>
        </div>
        
        {searchedPrescriptions.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {searchedPrescriptions.map((prescription) => {
              const patient = mockPatients.find(p => p.id === prescription.patientId);
              const doctor = mockDoctors.find(d => d.id === prescription.doctorId);
              
              return (
                <div key={prescription.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-primary-600 truncate">
                      {user?.role === 'patient' ? 
                        `Prescription - ${prescription.date}` : 
                        `${patient?.name} - ${prescription.date}`}
                    </p>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        prescription.refillable ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {prescription.refillable ? 'Refillable' : 'Non-refillable'}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        <User className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                        Dr. {doctor?.name}
                      </p>
                      <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                        <Calendar className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                        {prescription.date}
                      </p>
                    </div>
                    <button
                      onClick={() => handleViewPrescription(prescription)}
                      className="mt-2 flex items-center text-sm font-medium text-primary-600 hover:text-primary-500 sm:mt-0"
                    >
                      View Details
                    </button>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      <span className="font-medium text-gray-600">Medications:</span>{' '}
                      {prescription.medications.map(med => med.name).join(', ')}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="px-4 py-8 text-center text-gray-500">
            <Pill className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No prescriptions found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm ? 'Try adjusting your search terms.' : 'No prescriptions available.'}
            </p>
          </div>
        )}
      </div>
      
      {/* Prescription Details Modal */}
      {selectedPrescription && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full mx-4">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Prescription Details
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Close</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Patient</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {mockPatients.find(p => p.id === selectedPrescription.patientId)?.name}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Doctor</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {mockDoctors.find(d => d.id === selectedPrescription.doctorId)?.name}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Date Issued</dt>
                  <dd className="mt-1 text-sm text-gray-900">{selectedPrescription.date}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Expiry Date</dt>
                  <dd className="mt-1 text-sm text-gray-900">{selectedPrescription.expiryDate}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500">Medications</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                      {selectedPrescription.medications.map((medication, index) => (
                        <li key={index} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                          <div className="w-0 flex-1 flex items-center">
                            <Pill className="flex-shrink-0 h-5 w-5 text-gray-400" />
                            <span className="ml-2 flex-1 w-0 truncate font-medium">{medication.name}</span>
                          </div>
                          <div className="ml-4 flex-shrink-0">
                            <span className="text-gray-500">{medication.dosage} - {medication.frequency}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500">Instructions</dt>
                  <dd className="mt-1 text-sm text-gray-900">{selectedPrescription.instructions}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500">Refill Status</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      selectedPrescription.refillable ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {selectedPrescription.refillable ? 'Refillable' : 'Non-refillable'}
                    </span>
                  </dd>
                </div>
              </dl>
            </div>
            <div className="px-4 py-4 sm:px-6 bg-gray-50 flex justify-end space-x-3 rounded-b-lg">
              <button
                type="button"
                className="btn btn-outline flex items-center"
              >
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </button>
              {user?.role === 'patient' && selectedPrescription.refillable && (
                <button
                  type="button"
                  className="btn btn-primary"
                >
                  Request Refill
                </button>
              )}
              {user?.role === 'doctor' && (
                <button
                  type="button"
                  className="btn btn-primary"
                >
                  Edit Prescription
                </button>
              )}
              <button
                type="button"
                onClick={closeModal}
                className="btn btn-outline"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrescriptionList;