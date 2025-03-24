import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, User, FileText } from 'lucide-react';
import AppointmentService from '../../services/Appointment';
import BillingService from '../../services/BillingService';
import DoctorService from '../../services/DoctorService';
import { useAuth } from '../../context/AuthContext';

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

const AppointmentForm: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    doctorID: '',
    date: '',
    time: '',
    type: '',
    notes: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await DoctorService.getAllDoctors();
        setDoctors(response.data);
      } catch (error) {
        console.error('Failed to fetch doctors:', error);
      }
    };

    fetchDoctors();
  }, []);
  
  const appointmentTypes = [
    { id: 'checkup', label: 'Regular Checkup' },
    { id: 'follow-up', label: 'Follow-up' },
    { id: 'consultation', label: 'Consultation' },
    { id: 'emergency', label: 'Emergency' },
  ];
  
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
    
    if (!formData.doctorID) {
      newErrors.doctorID = 'Please select a doctor';
    }
    
    if (!formData.date) {
      newErrors.date = 'Please select a date';
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.date = 'Please select a future date';
      }
    }
    
    if (!formData.time) {
      newErrors.time = 'Please select a time';
    } else {
      const selectedDateTime = new Date(`${formData.date}T${formData.time}`);
      if (selectedDateTime < new Date()) {
        newErrors.time = 'Please select a future time';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        await AppointmentService.createAppointment({
          appointmentID: 0,
          patientID: user?.id || 0,
          doctorID: parseInt(formData.doctorID),
          appointmentDate: formData.date,
          appointmentTime: `${formData.time}:00`,
          reason: formData.notes,
          appointmentType: formData.type as 'checkup' | 'follow-up' | 'consultation' | 'emergency',
          registrationTime: new Date().toISOString()
        });
        
        setShowPaymentModal(true);
      } catch (error) {
        console.error('Failed to create appointment:', error);
        alert('Failed to create appointment. Please try again.');
      }
    }
  };

  const handlePayment = async () => {
    try {
      await BillingService.registerBilling({
        billID: 0,
        patientID: user?.id || 0,
        amount: 100, // Example amount
        paymentStatus: 'Completed',
        paymentMethod,
        billingStatus: 'Paid',
        createdBy: paymentMethod === 'Credit Card' ? 111 : paymentMethod === 'Debit Card' ? 222 : paymentMethod === 'PayPal' ? 333 : paymentMethod === 'UPI' ? 444 : 404
      });

      alert('Payment successful and billing entry created!');
      setShowPaymentModal(false);
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to process payment:', error);
      alert('Failed to process payment. Please try again.');
    }
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Request New Appointment
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Fill out the form below to schedule an appointment with a doctor.
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="px-4 py-5 sm:p-6">
        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label htmlFor="doctorID" className="block text-sm font-medium text-gray-700">
              Select Doctor
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <select
                id="doctorID"
                name="doctorID"
                value={formData.doctorID}
                onChange={handleChange}
                className={`block w-full pl-10 pr-3 py-2 border ${
                  errors.doctorID ? 'border-red-300' : 'border-gray-300'
                } rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm`}
              >
                <option value="">Select a doctor</option>
                {doctors.map(doctor => (
                  <option key={doctor.doctorID} value={doctor.doctorID}>
                    {doctor.firstName} {doctor.lastName} - {doctor.specialization}
                  </option>
                ))}
              </select>
            </div>
            {errors.doctorID && (
              <p className="mt-2 text-sm text-red-600">{errors.doctorID}</p>
            )}
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">
              Appointment Type
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FileText className="h-5 w-5 text-gray-400" />
              </div>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              >
                {appointmentTypes.map(type => (
                  <option key={type.id} value={type.id}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className={`block w-full pl-10 pr-3 py-2 border ${
                  errors.date ? 'border-red-300' : 'border-gray-300'
                } rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm`}
              />
            </div>
            {errors.date && (
              <p className="mt-2 text-sm text-red-600">{errors.date}</p>
            )}
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="time" className="block text-sm font-medium text-gray-700">
              Preferred Time
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Clock className="h-5 w-5 text-gray-400" />
              </div>
              <select
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className={`block w-full pl-10 pr-3 py-2 border ${
                  errors.time ? 'border-red-300' : 'border-gray-300'
                } rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm`}
              >
                <option value="">Select a time</option>
                <option value="09:00">9:00 AM</option>
                <option value="09:30">9:30 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="10:30">10:30 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="11:30">11:30 AM</option>
                <option value="13:00">1:00 PM</option>
                <option value="13:30">1:30 PM</option>
                <option value="14:00">2:00 PM</option>
                <option value="14:30">2:30 PM</option>
                <option value="15:00">3:00 PM</option>
                <option value="15:30">3:30 PM</option>
                <option value="16:00">4:00 PM</option>
                <option value="16:30">4:30 PM</option>
              </select>
            </div>
            {errors.time && (
              <p className="mt-2 text-sm text-red-600">{errors.time}</p>
            )}
          </div>

          <div className="sm:col-span-6">
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
              Notes (Optional)
            </label>
            <div className="mt-1">
              <textarea
                id="notes"
                name="notes"
                rows={3}
                value={formData.notes}
                onChange={handleChange}
                placeholder="Please describe your symptoms or reason for the appointment"
                className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate('/appointments')}
            className="btn btn-outline"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
          >
            Request Appointment
          </button>
        </div>
      </form>

      {showPaymentModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full sm:p-6 sm:align-middle">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Simulate Payment Gateway</h3>
              <div className="mt-2">
                <p>Select Payment Method:</p>
                <select
                  name="paymentMethod"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                >
                  <option value="Credit Card">Credit Card</option>
                  <option value="Debit Card">Debit Card</option>
                  <option value="PayPal">Paytm</option>
                  <option value="UPI">UPI</option> {/* Added UPI method */}
                  {/* Add more payment methods as needed */}
                </select>
              </div>

              {/* Simulated Payment Details */}
              <div className='mt-4'>
                 {/* Simulated Payment Details */}
                 {paymentMethod === "Credit Card" && (
                   <>
                     <label htmlFor='cardNumber' className='block text-sm font-medium text-gray700'>
                       Card Number
                     </label>
                     <input
                       type='text'
                       id='cardNumber'
                       name='cardNumber'
                       placeholder='1234 5678 9012 3456'
                       className='mt1 block w-full border bordergray300 rounded-md shadow-sm focus:outline-none focus:ringprimary focus:border-primary sm:textsm'
                     />
                     {/* Add more fields as needed */}
                   </>
                 )}
                 {paymentMethod === "Debit Card" && (
                   <>
                     {/* Similar fields for Debit Card */}
                     {/* Add more fields as needed */}
                   </>
                 )}
                 {paymentMethod === "PayPal" && (
                   <>
                     {/* Similar fields for PayPal */}
                     {/* Add more fields as needed */}
                   </>
                 )}
                 {paymentMethod === "UPI" && (
                   <>
                     {/* Similar fields for UPI */}
                     {/* Add more fields as needed */}
                   </>
                 )}
               </div>

               {/* Payment Buttons */}
               <div className='mt4 flex justify-end space-x3'>
                 <button
                   type='button'
                   onClick={() => setShowPaymentModal(false)}
                   className='btn btn-outline'
                 >
                   Cancel
                 </button>
                 <button type='button' onClick={handlePayment} className='btn btn-primary'>
                   Pay Now
                 </button>
               </div>

             </div>

           </div>

         </div>

       )}

     </div>

   );

};

export default AppointmentForm;
