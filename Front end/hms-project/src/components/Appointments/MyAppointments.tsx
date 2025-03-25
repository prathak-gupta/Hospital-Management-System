import React, { useState, useEffect } from 'react';
import { FileText, Download, Calendar, User, Plus } from 'lucide-react';
import AppointmentService from "../../services/Appointment";
import { useAuth } from '../../context/AuthContext';
import jsPDF from 'jspdf';
import NotFoundPage from '../../context/NotFoundPage';

interface Appointment {
  appointmentID: number;
  patientID: number;
  doctorID: number;
  appointmentDate: string;
  appointmentTime: string;
  appointmentType: 'checkup' | 'follow-up' | 'consultation' | 'emergency';
  reason: string;
  registrationTime: string;
}

const MyAppointment: React.FC = () => {
  const { user } = useAuth();
  if(user?.role === "patient"){
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<Appointment | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    AppointmentService.getAppointmentsByPatient(user?.id || 0)
      .then(response => {
        setAppointments(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  // Apply search filter
  const searchedRecords = appointments.filter(record => {
    const searchString = `${record.patientID} ${record.doctorID} ${record.appointmentType} ${record.reason}`.toLowerCase();
    return searchString.includes(searchTerm.toLowerCase());
  });

  const handleViewRecord = (record: Appointment) => {
    setSelectedRecord(record);
  };

  const closeModal = () => {
    setSelectedRecord(null);
    setErrors([]);
  };

  const handleDownload = (record: Appointment) => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('Appointment Details', 14, 22);
    doc.setFontSize(12);
    doc.text(`Appointment ID: ${record.appointmentID}`, 14, 32);
    doc.text(`Patient ID: ${record.patientID}`, 14, 42);
    doc.text(`Doctor ID: ${record.doctorID}`, 14, 52);
    doc.text(`Appointment Date: ${record.appointmentDate}`, 14, 62);
    doc.text(`Appointment Time: ${record.appointmentTime}`, 14, 72);
    doc.text(`Appointment Type: ${record.appointmentType}`, 14, 82);
    doc.text(`Reason: ${record.reason}`, 14, 92);
    
    doc.save(`appointment_${record.appointmentID}.pdf`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Appointments</h1>
          <p className="mt-1 text-sm text-gray-500">
            View and manage your appointments
          </p>
        </div>
        {/* {user?.role === 'doctor' && (
          <button
            type="button"
            className="btn btn-primary flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Appointment
          </button>
        )} */}
      </div>

      {/* Search and Filter */}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FileText className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search appointments by patient, doctor, type..."
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
            {user?.role === 'patient' ? 'Your Appointments' : 'Patient Appointments'}
          </h3>
        </div>
        {searchedRecords.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {searchedRecords.map((record) => (
              <div key={record.appointmentID} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-primary-600 truncate">
                    {user?.role === 'patient' ? 
                      `Appointment - ${record.appointmentID}` : 
                      `Patient ID: ${record.patientID} - Appointment ID: ${record.appointmentID}`}
                  </p>
                  <div className="ml-2 flex-shrink-0 flex space-x-2">
                    <button
                      onClick={() => handleViewRecord(record)}
                      className="btn btn-outline text-xs py-1 px-2 flex items-center"
                    >
                      <FileText className="h-3 w-3 mr-1" />
                      View Details
                    </button>
                    <button
                      onClick={() => handleDownload(record)}
                      className="btn btn-outline text-xs py-1 px-2 flex items-center"
                    >
                      <Download className="h-3 w-3 mr-1" />
                      Download
                    </button>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      <User className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                      Doctor ID: {record.doctorID}
                    </p>
                    <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                      <Calendar className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                      Appointment Date: {record.appointmentDate}
                    </p>
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    <span className="font-medium text-gray-600">Appointment Type:</span> {record.appointmentType}
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="font-medium text-gray-600">Reason:</span> {record.reason}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="px-4 py-8 text-center text-gray-500">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No appointments found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm ? 'Try adjusting your search terms.' : 'No appointment records available.'}
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
                Appointment Details
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
                  <dt className="text-sm font-medium text-gray-500">Patient ID</dt>
                  <dd className="mt-1 text-sm text-gray-900">{selectedRecord.patientID}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Doctor ID</dt>
                  <dd className="mt-1 text-sm text-gray-900">{selectedRecord.doctorID}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Appointment Date</dt>
                  <dd className="mt-1 text-sm text-gray-900">{selectedRecord.appointmentDate}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500">Appointment Time</dt>
                  <dd className="mt-1 text-sm text-gray-900">{selectedRecord.appointmentTime}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500">Reason</dt>
                  <dd className="mt-1 text-sm text-gray-900">{selectedRecord.reason}</dd>
                </div>
              </dl>
            </div>
            <div className="px-4 py-4 sm:px-6 bg-gray-50 flex justify-end space-x-3 rounded-b-lg">
              {/* {user?.role === 'doctor' && (
                <button
                  type="button"
                  className="btn btn-primary"
                >
                  Edit Appointment
                </button>
              )} */}
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
}else{
  return (<NotFoundPage/>)
}
};

export default MyAppointment;
