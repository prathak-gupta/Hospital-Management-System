import React from 'react';
import { Calendar, FileText, Pill, CreditCard, Activity, Clock, AlertCircle } from 'lucide-react';
import { mockAppointments, mockPrescriptions, mockBills, mockLabReports } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import { format, parseISO, isAfter } from 'date-fns';

const PatientDashboard: React.FC = () => {
  const { user } = useAuth();
  const patientId = user?.id;
  
  // Filter data for this patient
  const patientAppointments = mockAppointments.filter(a => a.patientId === patientId);
  const upcomingAppointments = patientAppointments.filter(a => {
    const appointmentDate = parseISO(`${a.date}T${a.startTime}`);
    return isAfter(appointmentDate, new Date()) && a.status !== 'cancelled';
  }).sort((a, b) => {
    const dateA = parseISO(`${a.date}T${a.startTime}`);
    const dateB = parseISO(`${b.date}T${b.startTime}`);
    return dateA.getTime() - dateB.getTime();
  });
  
  const patientPrescriptions = mockPrescriptions.filter(p => p.patientId === patientId);
  const patientBills = mockBills.filter(b => b.patientId === patientId);
  const pendingBills = patientBills.filter(b => b.status === 'pending');
  const patientLabReports = mockLabReports.filter(l => l.patientId === patientId);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Patient Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Welcome back, {user?.name}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-primary-100 rounded-md p-3">
                <Calendar className="h-6 w-6 text-primary-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Upcoming Appointments</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">{upcomingAppointments.length}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <a href="/appointments" className="font-medium text-primary-600 hover:text-primary-900">
                View all
              </a>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                <Pill className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Active Prescriptions</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">{patientPrescriptions.length}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <a href="/prescriptions" className="font-medium text-primary-600 hover:text-primary-900">
                View prescriptions
              </a>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-yellow-100 rounded-md p-3">
                <CreditCard className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Pending Bills</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">{pendingBills.length}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <a href="/billing" className="font-medium text-primary-600 hover:text-primary-900">
                View bills
              </a>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-purple-100 rounded-md p-3">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Lab Reports</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">{patientLabReports.length}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <a href="/lab-reports" className="font-medium text-primary-600 hover:text-primary-900">
                View reports
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Appointments */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Upcoming Appointments</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {upcomingAppointments.length > 0 ? (
            upcomingAppointments.slice(0, 3).map((appointment) => (
              <div key={appointment.id} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-primary-600 truncate">
                    {appointment.date} at {appointment.startTime}
                  </p>
                  <div className="ml-2 flex-shrink-0 flex">
                    <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </p>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      <Activity className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                      {appointment.type.charAt(0).toUpperCase() + appointment.type.slice(1)}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <Clock className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                    <p>
                      Duration: {appointment.startTime} - {appointment.endTime}
                    </p>
                  </div>
                </div>
                <div className="mt-2 flex space-x-2">
                  <button className="btn btn-outline text-xs py-1 px-2 flex items-center text-red-600 hover:bg-red-50">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    Cancel
                  </button>
                  <button className="btn btn-outline text-xs py-1 px-2 flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    Reschedule
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="px-4 py-8 text-center text-gray-500">
              <Calendar className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No upcoming appointments</h3>
              <p className="mt-1 text-sm text-gray-500">Schedule a new appointment with your doctor.</p>
              <div className="mt-6">
                <a
                  href="/appointments/new"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  New Appointment
                </a>
              </div>
            </div>
          )}
        </div>
        {upcomingAppointments.length > 0 && (
          <div className="bg-gray-50 px-4 py-4 sm:px-6">
            <div className="text-sm">
              <a
                href="/appointments/new"
                className="font-medium text-primary-600 hover:text-primary-900"
              >
                Schedule new appointment
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Recent Prescriptions */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Prescriptions</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {patientPrescriptions.length > 0 ? (
            patientPrescriptions.slice(0, 3).map((prescription) => (
              <div key={prescription.id} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-primary-600 truncate">
                    Prescription from {prescription.date}
                  </p>
                  <div className="ml-2 flex-shrink-0 flex">
                    <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      prescription.refillable ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {prescription.refillable ? 'Refillable' : 'Non-refillable'}
                    </p>
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-600 font-medium">Medications:</p>
                  <ul className="mt-1 space-y-1">
                    {prescription.medications.map((med, index) => (
                      <li key={index} className="text-sm text-gray-500">
                        • {med.name} ({med.dosage}) - {med.frequency}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    <span className="font-medium text-gray-600">Instructions:</span> {prescription.instructions}
                  </p>
                </div>
                <div className="mt-2">
                  <a
                    href={`/prescriptions/${prescription.id}`}
                    className="text-sm font-medium text-primary-600 hover:text-primary-900"
                  >
                    View details
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="px-4 py-8 text-center text-gray-500">
              <Pill className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No prescriptions</h3>
              <p className="mt-1 text-sm text-gray-500">You don't have any active prescriptions.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;