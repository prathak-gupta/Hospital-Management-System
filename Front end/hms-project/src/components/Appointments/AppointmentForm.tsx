import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, User, FileText } from 'lucide-react';
import { mockDoctors } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';

const AppointmentForm: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    doctorId: '',
    date: '',
    time: '',
    type: 'checkup',
    notes: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const appointmentTypes = [
    { id: 'checkup', label: 'Regular Checkup' },
    { id: 'follow-up', label: 'Follow-up' },
    { id: 'consultation', label: 'Consultation' },
    { id: 'emergency', label: 'Emergency' },
  ];
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is updated
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
    
    if (!formData.doctorId) {
      newErrors.doctorId = 'Please select a doctor';
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
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real app, this would be an API call
      console.log('Appointment data:', formData);
      
      // Simulate success and redirect
      alert('Appointment request submitted successfully!');
      navigate('/appointments');
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
            <label htmlFor="doctorId" className="block text-sm font-medium text-gray-700">
              Select Doctor
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <select
                id="doctorId"
                name="doctorId"
                value={formData.doctorId}
                onChange={handleChange}
                className={`block w-full pl-10 pr-3 py-2 border ${
                  errors.doctorId ? 'border-red-300' : 'border-gray-300'
                } rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm`}
              >
                <option value="">Select a doctor</option>
                {mockDoctors.map(doctor => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name} - {doctor.specialty}
                  </option>
                ))}
              </select>
            </div>
            {errors.doctorId && (
              <p className="mt-2 text-sm text-red-600">{errors.doctorId}</p>
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
    </div>
  );
};

export default AppointmentForm;