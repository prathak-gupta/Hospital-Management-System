import React, { useState } from 'react';
import { CreditCard, Calendar, User, Download, CheckCircle } from 'lucide-react';
import { mockBills, mockPatients } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import { Bill } from '../../types';

const BillingList: React.FC = () => {
  const { user } = useAuth();
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter bills based on user role
  const filteredBills = mockBills.filter(bill => {
    if (user?.role === 'patient') {
      return bill.patientId === user.id;
    }
    return true; // Admin and doctors see all
  });
  
  // Apply search filter
  const searchedBills = filteredBills.filter(bill => {
    const patient = mockPatients.find(p => p.id === bill.patientId);
    
    const searchString = `${patient?.name} ${bill.id} ${bill.status}`.toLowerCase();
    return searchString.includes(searchTerm.toLowerCase());
  });
  
  const handleViewBill = (bill: Bill) => {
    setSelectedBill(bill);
  };
  
  const closeModal = () => {
    setSelectedBill(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Billing</h1>
        <p className="mt-1 text-sm text-gray-500">
          View and manage billing information
        </p>
      </div>
      
      {/* Search and Filter */}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <CreditCard className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search bills by patient, ID, status..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      {/* Bills List */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {user?.role === 'patient' ? 'Your Bills' : 'Patient Bills'}
          </h3>
        </div>
        
        {searchedBills.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {searchedBills.map((bill) => {
              const patient = mockPatients.find(p => p.id === bill.patientId);
              
              return (
                <div key={bill.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-primary-600 truncate">
                      {user?.role === 'patient' ? 
                        `Bill #${bill.id.substring(0, 8)}` : 
                        `${patient?.name} - Bill #${bill.id.substring(0, 8)}`}
                    </p>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        bill.status === 'paid' ? 'bg-green-100 text-green-800' : 
                        bill.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        {bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        <Calendar className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                        {bill.date}
                      </p>
                      <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                        <CreditCard className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                        Due: {bill.dueDate}
                      </p>
                    </div>
                    <button
                      onClick={() => handleViewBill(bill)}
                      className="mt-2 flex items-center text-sm font-medium text-primary-600 hover:text-primary-500 sm:mt-0"
                    >
                      View Details
                    </button>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      <span className="font-medium text-gray-600">Amount:</span>{' '}
                      ${bill.totalAmount.toFixed(2)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="px-4 py-8 text-center text-gray-500">
            <CreditCard className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No bills found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm ? 'Try adjusting your search terms.' : 'No billing information available.'}
            </p>
          </div>
        )}
      </div>
      
      {/* Bill Details Modal */}
      {selectedBill && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full mx-4">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Bill Details
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
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-bold text-gray-900">Invoice #{selectedBill.id.substring(0, 8)}</h4>
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">Date:</span> {selectedBill.date}
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">Due Date:</span> {selectedBill.dueDate}
                  </p>
                </div>
                <div>
                  <p className={`px-2 inline-flex text-sm leading-5 font-semibold rounded-full ${
                    selectedBill.status === 'paid' ? 'bg-green-100 text-green-800' : 
                    selectedBill.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-red-100 text-red-800'
                  }`}>
                    {selectedBill.status.charAt(0).toUpperCase() + selectedBill.status.slice(1)}
                  </p>
                </div>
              </div>
              
              <div className="mt-6">
                <h5 className="text-sm font-medium text-gray-500">Patient Information</h5>
                <p className="mt-1 text-sm text-gray-900">
                  {mockPatients.find(p => p.id === selectedBill.patientId)?.name}
                </p>
              </div>
              
              <div className="mt-6">
                <h5 className="text-sm font-medium text-gray-500">Bill Items</h5>
                <div className="mt-2 flex flex-col">
                  <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                      <div className="overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Description
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Quantity
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Unit Price
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Amount
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {selectedBill.items.map((item, index) => (
                              <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  {item.description}
                                </td>
                                <td className="px-6  py-4 whitespace-nowrap text-sm text-gray-500">
                                  {item.quantity}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  ${item.unitPrice.toFixed(2)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  ${item.amount.toFixed(2)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                          <tfoot>
                            <tr>
                              <td colSpan={3} className="px-6 py-4 text-sm font-medium text-gray-900 text-right">
                                Total
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                ${selectedBill.totalAmount.toFixed(2)}
                              </td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {selectedBill.status === 'paid' && (
                <div className="mt-6 bg-green-50 p-4 rounded-md">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-green-800">Payment Received</h3>
                      <div className="mt-2 text-sm text-green-700">
                        <p>Payment was received on {selectedBill.paymentDate} via {selectedBill.paymentMethod}.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="px-4 py-4 sm:px-6 bg-gray-50 flex justify-end space-x-3 rounded-b-lg">
              <button
                type="button"
                className="btn btn-outline flex items-center"
              >
                <Download className="h-4 w-4 mr-2" />
                Download Invoice
              </button>
              {user?.role === 'patient' && selectedBill.status !== 'paid' && (
                <button
                  type="button"
                  className="btn btn-primary"
                >
                  Pay Now
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

export default BillingList;