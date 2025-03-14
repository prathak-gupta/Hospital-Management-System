import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { mockAppointments, mockDoctors, mockPatients } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import { Appointment } from '../../types';

const AppointmentCalendar: React.FC = () => {
  const { user } = useAuth();
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  
  // Filter appointments based on user role
  const filteredAppointments = mockAppointments.filter(appointment => {
    if (user?.role === 'doctor') {
      return appointment.doctorId === user.id;
    } else if (user?.role === 'patient') {
      return appointment.patientId === user.id;
    }
    return true; // Admin sees all
  });
  
  // Format appointments for FullCalendar
  const events = filteredAppointments.map(appointment => {
    const doctor = mockDoctors.find(d => d.id === appointment.doctorId);
    const patient = mockPatients.find(p => p.id === appointment.patientId);
    
    let title = '';
    if (user?.role === 'doctor') {
      title = `${patient?.name} - ${appointment.type}`;
    } else if (user?.role === 'patient') {
      title = `Dr. ${doctor?.name} - ${appointment.type}`;
    } else {
      title = `${patient?.name} with Dr. ${doctor?.name}`;
    }
    
    // Determine color based on status
    let backgroundColor = '#3788d8'; // default blue
    if (appointment.status === 'completed') {
      backgroundColor = '#10b981'; // green
    } else if (appointment.status === 'cancelled') {
      backgroundColor = '#ef4444'; // red
    } else if (appointment.status === 'pending') {
      backgroundColor = '#f59e0b'; // amber
    }
    
    return {
      id: appointment.id,
      title,
      start: `${appointment.date}T${appointment.startTime}`,
      end: `${appointment.date}T${appointment.endTime}`,
      backgroundColor,
      borderColor: backgroundColor,
      extendedProps: {
        appointment
      }
    };
  });
  
  const handleEventClick = (info: any) => {
    setSelectedAppointment(info.event.extendedProps.appointment);
  };
  
  const closeModal = () => {
    setSelectedAppointment(null);
  };

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        events={events}
        eventClick={handleEventClick}
        height="auto"
        aspectRatio={1.5}
        slotMinTime="08:00:00"
        slotMaxTime="18:00:00"
        allDaySlot={false}
        nowIndicator={true}
        editable={false}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
      />
      
      {/* Appointment Details Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Appointment Details
              </h3>
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
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
                  <dt className="text-sm font-medium text-gray-500">Date</dt>
                  <dd className="mt-1 text-sm text-gray-900">{selectedAppointment.date}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Time</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {selectedAppointment.startTime} - {selectedAppointment.endTime}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Patient</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {mockPatients.find(p => p.id === selectedAppointment.patientId)?.name}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Doctor</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {mockDoctors.find(d => d.id === selectedAppointment.doctorId)?.name}
                  </dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500">Type</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {selectedAppointment.type.charAt(0).toUpperCase() + selectedAppointment.type.slice(1)}
                  </dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500">Status</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${selectedAppointment.status === 'scheduled' ? 'bg-green-100 text-green-800' : 
                        selectedAppointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                        selectedAppointment.status === 'cancelled' ? 'bg-red-100 text-red-800' : 
                        'bg-blue-100 text-blue-800'}`}>
                      {selectedAppointment.status.charAt(0).toUpperCase() + selectedAppointment.status.slice(1)}
                    </span>
                  </dd>
                </div>
                {selectedAppointment.notes && (
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">Notes</dt>
                    <dd className="mt-1 text-sm text-gray-900">{selectedAppointment.notes}</dd>
                  </div>
                )}
              </dl>
            </div>
            <div className="px-4 py-4 sm:px-6 bg-gray-50 flex justify-end space-x-3 rounded-b-lg">
              {user?.role === 'doctor' && selectedAppointment.status === 'scheduled' && (
                <button
                  type="button"
                  className="btn btn-primary"
                >
                  Complete Appointment
                </button>
              )}
              {user?.role === 'patient' && selectedAppointment. status === 'scheduled' && (
                <button
                  type="button"
                  className="btn btn-outline text-red-600 hover:bg-red-50"
                >
                  Cancel Appointment
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

export default AppointmentCalendar;