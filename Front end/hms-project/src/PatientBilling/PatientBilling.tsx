import React, { useState, useEffect } from 'react';
import { FileText, Download, Calendar, User, Plus } from 'lucide-react';
import BillingService from "../services/BillingService";
import { useAuth } from '../context/AuthContext';
import jsPDF from 'jspdf';
import NotFoundPage from '../context/NotFoundPage';
// import 'jspdf-autotable';

interface Billing {
  billID: number;
  patientID: number;
  amount: number;
  paymentStatus: string;
  paymentMethod: string;
  billingStatus: string;
  createdBy: number;
}

const PatientBilling: React.FC = () => {
  const { user } = useAuth();
  if(user?.role === "patient"){
  const [billings, setBillings] = useState<Billing[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<Billing | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    BillingService.getAllBillsByPatient(user?.id||0)
      .then(response => {
        setBillings(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  // Filter records based on user role
  const filteredRecords = billings.filter(record => {
    if (user?.role === 'doctor') {
      return record.createdBy === user.id;
    } else if (user?.role === 'patient') {
      return record.patientID === user.id;
    }
    return true; // Admin sees all
  });

  // Apply search filter
  const searchedRecords = filteredRecords.filter(record => {
    const searchString = `${record.patientID} ${record.createdBy} ${record.paymentStatus} ${record.billingStatus}`.toLowerCase();
    return searchString.includes(searchTerm.toLowerCase());
  });

  const handleViewRecord = (record: Billing) => {
    setSelectedRecord(record);
  };

  const closeModal = () => {
    setSelectedRecord(null);
    setErrors([]);
  };

  const handleDownload = (record: Billing) => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('Billing Details', 14, 22);
    doc.setFontSize(12);
    doc.text(`Bill ID: ${record.billID}`, 14, 32);
    doc.text(`Patient ID: ${record.patientID}`, 14, 42);
    doc.text(`Amount: ${record.amount}`, 14, 52);
    doc.text(`Payment Status: ${record.paymentStatus}`, 14, 62);
    doc.text(`Payment Method: ${record.paymentMethod}`, 14, 72);
    doc.text(`Billing Status: ${record.billingStatus}`, 14, 82);
    doc.text(`Created By: ${record.createdBy}`, 14, 92);
    
    doc.save(`billing_${record.billID}.pdf`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Patient Billings</h1>
          <p className="mt-1 text-sm text-gray-500">
            View and manage patient billings
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
            placeholder="Search records by patient, doctor, status..."
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
            {user?.role === 'patient' ? 'Your Receipt' : 'Patient Records'}
          </h3>
        </div>

        {searchedRecords.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {searchedRecords.map((record) => (
              <div key={record.billID} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-primary-600 truncate">
                    {user?.role === 'patient' ? 
                      `Medical Record - ${record.billID}` : 
                      `Patient ID: ${record.patientID} - Bill ID: ${record.billID}`}
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
                      Created By: {record.createdBy}
                    </p>
                    <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                      <Calendar className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                      Amount: {record.amount}
                    </p>
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    <span className="font-medium text-gray-600">Payment Status:</span> {record.paymentStatus}
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="font-medium text-gray-600">Billing Status:</span> {record.billingStatus}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="px-4 py-8 text-center text-gray-500">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No bills found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm ? 'Try adjusting your search terms.' : 'No billing records available.'}
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
                Billing Details
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
                  <dt className="text-sm font-medium text-gray-500">Created By</dt>
                  <dd className="mt-1 text-sm text-gray-900">{selectedRecord.createdBy}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Amount</dt>
                  <dd className="mt-1 text-sm text-gray-900">{selectedRecord.amount}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500">Payment Status</dt>
                  <dd className="mt-1 text-sm text-gray-900">{selectedRecord.paymentStatus}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500">Billing Status</dt>
                  <dd className="mt-1 text-sm text-gray-900">{selectedRecord.billingStatus}</dd>
                </div>
              </dl>
            </div>
            <div className="px-4 py-4 sm:px-6 bg-gray-50 flex justify-end space-x-3 rounded-b-lg">
              {user?.role === 'doctor' && (
                <button
                  type="button"
                  className="btn btn-primary"
                >
                  Edit Billings
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
}else{
  return (<NotFoundPage/>)
}
};

export default PatientBilling;
