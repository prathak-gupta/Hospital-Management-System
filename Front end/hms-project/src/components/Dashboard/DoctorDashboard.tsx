import React from 'react';
import { Calendar, Users, ClipboardList, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { mockAppointments, mockPatients, mockPrescriptions } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import { format } from 'date-fns';

const DoctorDashboard: React.FC = () => {
  const { user } = useAuth();
  const doctorId = user?.id;
  
  // Filter data for this doctor
  const doctorAppointments = mockAppointments.filter(a => a.doctorId === doctorId);
  const todayAppointments = doctorAppointments.filter(a => a.date === format(new Date(), 'yyyy-MM-dd'));
  const pendingAppointments = doctorAppointments.filter(a => a.status === 'pending');
  const completedAppointments = doctorAppointments.filter(a => a.status === 'completed');
  
  const doctorPatients = mockPatients.filter(p => p.assignedDoctor === doctorId);
  const doctorPrescriptions = mockPrescriptions.filter(p => p.doctorId === doctorId);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Doctor Dashboard</h1>
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
                <Users className="h-6 w-6 text-primary-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">My Patients</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">{doctorPatients.length}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <a href="/my-patients" className="font-medium text-primary-600 hover:text-primary-900">
                View all
              </a>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Today's Appointments</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">{todayAppointments.length}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <a href="/appointments" className="font-medium text-primary-600 hover:text-primary-900">
                View schedule
              </a>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-yellow-100 rounded-md p-3">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Pending Appointments</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">{pendingAppointments.length}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <a href="/appointments?status=pending" className="font-medium text-primary-600 hover:text-primary-900">
                Review pending
              </a>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-purple-100 rounded-md p-3">
                <ClipboardList className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Prescriptions</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">{doctorPrescriptions.length}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <a href="/prescriptions" className="font-medium text-primary-600 hover:text-primary-900">
                Manage prescriptions
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Today's Schedule */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Today's Schedule</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {todayAppointments.length > 0 ? (
            todayAppointments.map((appointment) => {
              const patient = mockPatients.find(p => p.id === appointment.patientId);
              
              return (
                <div key={appointment.id} className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-primary-600 truncate">
                      {appointment.startTime} - {appointment.endTime} | {patient?.name}
                    </p>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${appointment.status === 'scheduled' ? 'bg-green-100 text-green-800' : 
                          appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                          appointment.status === 'cancelled' ? 'bg-red-100 text-red-800' : 
                          'bg-blue-100 text-blue-800'}`}>
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        {appointment.type.charAt(0).toUpperCase() + appointment.type.slice(1)}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      {appointment.notes && (
                        <p>
                          <span className="font-medium text-gray-600 mr-1">Notes:</span>
                          {appointment.notes}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mt-2 flex space-x-2">
                    <button className="btn btn-outline text-xs py-1 px-2 flex items-center">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Complete
                    </button>
                    <button className="btn btn-outline text-xs py-1 px-2 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      Reschedule
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="px-4 py-8 text-center text-gray-500">
              <Calendar className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No appointments today</h3>
              <p className="mt-1 text-sm text-gray-500">Enjoy your day off or check your upcoming schedule.</p>
            </div>
          )}
        </div>
      </div>

      {/* Recent Patients */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Patients</h3>
        </div>
        <ul className="divide-y divide-gray-200">
          {doctorPatients.slice(0, 5).map((patient) => (
            <li key={patient.id}>
              <div className="px-4 py-4 flex items-center sm:px-6">
                <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                  <div className="flex items-center">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={patient.avatar || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'}
                      alt=""
                    />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-primary-600">{patient.name}</p>
                      <p className="mt-1 text-sm text-gray-500">
                        <span className="font-medium text-gray-600 mr-1">DOB:</span>
                        {patient.dateOfBirth}
                        <span className="mx-2">•</span>
                        <span className="font-medium text-gray-600 mr-1">Blood:</span>
                        {patient.bloodGroup}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex-shrink-0 sm:mt-0">
                    <a
                      href={`/medical-records?patientId=${patient.id}`}
                      className="btn btn-outline text-xs py-1 px-2"
                    >
                      View Records
                    </a>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DoctorDashboard;