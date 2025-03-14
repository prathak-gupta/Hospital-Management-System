import React, { useState } from 'react';
import { FileText, Download, Calendar, User, Plus } from 'lucide-react';
import { mockMedicalRecords, mockPatients, mockDoctors } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import { MedicalRecord } from '../../types';

const PatientRecords: React.FC = () => {
  const { user } = useAuth();
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter records based on user role
  const filteredRecords = mockMedicalRecords.filter(record => {
    if (user?.role === 'doctor') {
      return record.doctorId === user.id;
    } else if (user?.role === 'patient') {
      return record.patientId === user.id;
    }
    return true; // Admin sees all
  });
  
  // Apply search filter
  const searchedRecords = filteredRecords.filter(record => {
    const patient = mockPatients.find(p => p.id === record.patientId);
    const doctor = mockDoctors.find(d => d.id === record.doctorId);
    
    const searchString = `${patient?.name} ${doctor?.name} ${record.diagnosis} ${record.treatment}`.toLowerCase();
    return searchString.includes(searchTerm.toLowerCase());
  });
  
  const handleViewRecord = (record: MedicalRecord) => {
    setSelectedRecord(record);
  };
  
  const closeModal = () => {
    setSelectedRecord(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Medical Records</h1>
          <p className="mt-1 text-sm text-gray-500">
            View and manage patient medical records
          </p>
        </div>
        {user?.role === 'doctor' && (
          <button
            type="button"
            className="btn btn-primary flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Record
          </button>
        )}
      </div>
      
      {/* Search and Filter */}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FileText className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search records by patient, doctor, diagnosis..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      {/* Records List */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {user?.role === 'patient' ? 'Your Medical Records' : 'Patient Records'}
          </h3>
        </div>
        
        {searchedRecords.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {searchedRecords.map((record) => {
              const patient = mockPatients.find(p => p.id === record.patientId);
              const doctor = mockDoctors.find(d => d.id === record.doctorId);
              
              return (
                <div key={record.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-primary-600 truncate">
                      {user?.role === 'patient' ? 
                        `Medical Record - ${record.date}` : 
                        `${patient?.name} - ${record.date}`}
                    </p>
                    <div className="ml-2 flex-shrink-0 flex">
                      <button
                        onClick={() => handleViewRecord(record)}
                        className="btn btn-outline text-xs py-1 px-2 flex items-center"
                      >
                        <FileText className="h-3 w-3 mr-1" />
                        View Details
                      </button>
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
                        {record.date}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      <span className="font-medium text-gray-600">Diagnosis:</span> {record.diagnosis}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="px-4 py-8 text-center text-gray-500">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No records found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm ? 'Try adjusting your search terms.' : 'No medical records available.'}
            </p>
          </div>
        )}
      </div>
      
      {/* Record Details Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full mx-4">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Medical Record Details
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
                    {mockPatients.find(p => p.id === selectedRecord.patientId)?.name}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Doctor</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {mockDoctors.find(d => d.id === selectedRecord.doctorId)?.name}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Date</dt>
                  <dd className="mt-1 text-sm text-gray-900">{selectedRecord.date}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500">Diagnosis</dt>
                  <dd className="mt-1 text-sm text-gray-900">{selectedRecord.diagnosis}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500">Treatment</dt>
                  <dd className="mt-1 text-sm text-gray-900">{selectedRecord.treatment}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500">Notes</dt>
                  <dd className="mt-1 text-sm text-gray-900">{selectedRecord.notes}</dd>
                </div>
                {selectedRecord.attachments && selectedRecord.attachments.length > 0 && (
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">Attachments</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                        {selectedRecord.attachments.map((attachment, index) => (
                          <li key={index} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                            <div className="w-0 flex-1 flex items-center">
                              <FileText className="flex-shrink-0 h-5 w-5 text-gray-400" />
                              <span className="ml-2 flex-1 w-0 truncate">{attachment}</span>
                            </div>
                            <div className="ml-4 flex-shrink-0">
                              <button className="font-medium text-primary-600 hover:text-primary-500 flex items-center">
                                <Download className="h-4 w-4 mr-1" />
                                Download
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                )}
              </dl>
            </div>
            <div className="px-4 py-4 sm:px-6 bg-gray-50 flex justify-end space-x-3 rounded-b-lg">
              {user?.role === 'doctor' && (
                <button
                  type="button"
                  className="btn btn-primary"
                >
                  Edit Record
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

export default PatientRecords;