import React, { useEffect, useState } from 'react';
import { Users, Calendar, CreditCard, Activity, TrendingUp, Clock } from 'lucide-react';
import { mockDoctors, mockPatients, mockAppointments, mockBills } from '../../data/mockData';
import { format } from 'date-fns';
import Appointment from '../../services/Appointment';
import DoctorService from '../../services/DoctorService';
import PatientService from '../../services/PatientService';

const AdminDashboard: React.FC = () => {
  // State for dynamic data
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [totalDoctors, setTotalDoctors] = useState(0);
  const [totalPatients, setTotalPatients] = useState(0);

  // Calculate statistics
  // const totalDoctors = mockDoctors.length;
  // const totalPatients = mockPatients.length;
  const pendingAppointments = mockAppointments.filter(a => a.status === 'pending').length;
  const todayAppointments = mockAppointments.filter(a => a.date === format(new Date(), 'yyyy-MM-dd')).length;

  // Calculate revenue
  const totalRevenue = mockBills.reduce((sum, bill) => sum + bill.totalAmount, 0);
  const pendingRevenue = mockBills.filter(b => b.status === 'pending').reduce((sum, bill) => sum + bill.totalAmount, 0);

  // Fetch total appointments count
  useEffect(() => {
    const fetchTotalData = async () => {
      try {
        const count = (await Appointment.getAllAppointmentCount()).data;
        setTotalAppointments(count);
      } catch (error) {
        console.error('Error fetching total appointments:', error);
      }

      try {
        const count = (await DoctorService.getAlldoctorsCount()).data;
        setTotalDoctors(count);
      } catch (error) {
        console.error('Error fetching total appointments:', error);
      }

      
      try {
        const count = (await PatientService.getAllPatientsCount()).data;
        setTotalPatients(count);
      } catch (error) {
        console.error('Error fetching total appointments:', error);
      }
    };

    fetchTotalData();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Overview of hospital activities and statistics
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-primary-100 rounded-md p-3">
                <Users className="h-6 w-6 text-primary-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Doctors</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">{totalDoctors}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <a href="/alldoctors" className="font-medium text-primary-600 hover:text-primary-900">
                View all
              </a>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-secondary-100 rounded-md p-3">
                <Users className="h-6 w-6 text-secondary-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Patients</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">{totalPatients}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <a href="/allpatients" className="font-medium text-primary-600 hover:text-primary-900">
                View all
              </a>
            </div>
          </div>
        </div>

        {/* Total Appointments */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-purple-100 rounded-md p-3">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Appointments</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">{totalAppointments}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <a href="/all-appointments" className="font-medium text-primary-600 hover:text-primary-900">
                View all
              </a>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-red-100 rounded-md p-3">
                <TrendingUp className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Revenue</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">₹{totalRevenue.toFixed(2)}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <a href="/billing" className="font-medium text-primary-600 hover:text-primary-900">
                View details
              </a>
            </div>
          </div>
        </div>


      </div>

    </div>
  );
};

export default AdminDashboard;
