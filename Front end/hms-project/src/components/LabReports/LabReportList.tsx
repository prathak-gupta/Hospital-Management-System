import React, { useState } from 'react';
import { FlaskRound as Flask, Calendar, User, Download, FileText } from 'lucide-react';
import { mockLabReports, mockPatients, mockDoctors } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import { LabReport } from '../../types';

const LabReportList: React.FC = () => {
  const { user } = useAuth();
  const [selectedReport, setSelectedReport] = useState<LabReport | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter lab reports based on user role
  const filteredReports = mockLabReports.filter(report => {
    if (user?.role === 'doctor') {
      return report.doctorId === user.id;
    } else if (user?.role === 'patient') {
      return report.patientId === user.id;
    }
    return true; // Admin sees all
  });
  
  // Apply search filter
  const searchedReports = filteredReports.filter(report => {
    const patient = mockPatients.find(p => p.id === report.patientId);
    const doctor = mockDoctors.find(d => d.id === report.doctorId);
    
    const searchString = `${patient?.name} ${doctor?.name} ${report.testType}`.toLowerCase();
    return searchString.includes(searchTerm.toLowerCase());
  });
  
  const handleViewReport = (report: LabReport) => {
    setSelectedReport(report);
  };
  
  const closeModal = () => {
    setSelectedReport(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Lab Reports</h1>
        <p className="mt-1 text-sm text-gray-500">
          View and manage laboratory test results
        </p>
      </div>
      
      {/* Search and Filter */}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Flask className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search lab reports by patient, doctor, test type..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      {/* Lab Reports List */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {user?.role === 'patient' ? 'Your Lab Reports' : 'Patient Lab Reports'}
          </h3>
        </div>
        
        {searchedReports.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {searchedReports.map((report) => {
              const patient = mockPatients.find(p => p.id === report.patientId);
              const doctor = mockDoctors.find(d => d.id === report.doctorId);
              
              return (
                <div key={report.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-primary-600 truncate">
                      {user?.role === 'patient' ? 
                        `${report.testType} - ${report.date}` : 
                        `${patient?.name} - ${report.testType}`}
                    </p>
                    <div className="ml-2 flex-shrink-0 flex">
                      <button
                        onClick={() => handleViewReport(report)}
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
                        {report.date}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="px-4 py-8 text-center text-gray-500">
            <Flask className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No lab reports found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm ? 'Try adjusting your search terms.' : 'No laboratory reports available.'}
            </p>
          </div>
        )}
      </div>
      
      {/* Lab Report Details Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full mx-4">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Lab Report Details
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
                    {mockPatients.find(p => p.id === selectedReport.patientId)?.name}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Doctor</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {mockDoctors.find(d => d.id === selectedReport.doctorId)?.name}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Date</dt>
                  <dd className="mt-1 text-sm text-gray-900">{selectedReport.date}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Test Type</dt>
                  <dd className="mt-1 text-sm text-gray-900">{selectedReport.testType}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500">Results</dt>
                  <dd className="mt-1 text-sm text-gray-900 whitespace-pre-line">{selectedReport.results}</dd>
                </div>
                {selectedReport.normalRange && (
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">Normal Range</dt>
                    <dd className="mt-1 text-sm text-gray-900 whitespace-pre-line">{selectedReport.normalRange}</dd>
                  </div>
                )}
                {selectedReport.interpretation && (
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">Interpretation</dt>
                    <dd className="mt-1 text-sm text-gray-900">{selectedReport.interpretation}</dd>
                  </div>
                )}
                {selectedReport.attachmentUrl && (
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">Attachment</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      <div className="border border-gray-200 rounded-md p-3 flex items-center justify-between">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 text-gray-400 mr-2" />
                          <span>{selectedReport.attachmentUrl}</span>
                        </div>
                        <button className="text-primary-600 hover:text-primary-500 flex items-center">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </button>
                      </div>
                    </dd>
                  </div>
                )}
              </dl>
            </div>
            <div className="px-4 py-4 sm:px-6 bg-gray-50 flex justify-end space-x-3 rounded-b-lg">
              <button
                type="button"
                className="btn btn-outline flex items-center"
              >
                <Download className="h-4 w-4 mr-2" />
                Download Report
              </button>
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

export default LabReportList;