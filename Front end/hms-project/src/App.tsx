import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginForm from './components/Auth/LoginForm';
import MainLayout from './components/Layout/MainLayout';
import DashboardRouter from './components/Dashboard/DashboardRouter';
import AppointmentCalendar from './components/Appointments/AppointmentCalendar';
import AppointmentForm from './components/Appointments/AppointmentForm';
import PatientRecords from './components/MedicalRecords/PatientRecords';
import PrescriptionList from './components/Prescriptions/PrescriptionList';
import BillingList from './components/Billing/BillingList';
import LabReportList from './components/LabReports/LabReportList';
import NotificationList from './components/Notifications/NotificationList';
import VitalsMonitor from './components/Vitals/VitalsMonitor';
import ViewAllDoctors from './components/ViewAll/ViewAllDoctors';
// import ViewAllStaff from './components/ViewAll/ViewAllStaff';
import ViewAllPatients from './components/ViewAll/ViewAllPatients';
import MyPatients from './components/Doctor/MyPatients';
import Settings from './components/Settings/Settings';
import PatientBilling from './PatientBilling/PatientBilling';
import Home from "./components/LandingPage.tsx/Home";
import Security from "./components/Security/Security"
import FractureDetector from './components/AI/FractureDetector';
import AdminProfile from './components/MyProfile/AdminProfile';
import DoctorProfile from './components/MyProfile/DoctorProfile';
import PatientProfile from './components/MyProfile/PatientProfile';

// Protected route component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          
          <Route path="/" element={<Home />} />
          
          <Route path="/" element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }>
            <Route path="dashboard" element={<DashboardRouter />} />
            
            <Route path="appointments" element={<AppointmentCalendar />} />
            <Route path="appointments/new" element={<AppointmentForm />} />
            
            <Route path="medical-records" element={<PatientRecords />} />
            <Route path="prescriptions" element={<PrescriptionList />} />
            <Route path="billing" element={<PatientBilling />} />
            <Route path="lab-reports" element={<LabReportList />} />
            <Route path="notifications" element={<NotificationList />} />
            <Route path="vitals" element={<VitalsMonitor />} />
            <Route path="/alldoctors" element={<ViewAllDoctors />} />
            <Route path="/allpatients" element={<ViewAllPatients />} />
            {/* <Route path="/allstaff" element={<ViewAllStaff />} /> */}
            <Route path="/my-patients" element={<MyPatients />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/patients" element={<ViewAllPatients />} />
            <Route path="/doctors" element={<ViewAllDoctors />} />
            <Route path="/security" element={<Security />} />
            <Route path="/ai-fracture-detector" element={<FractureDetector />} />
            <Route path="/derm-ai" element={<FractureDetector />} />
            <Route path="/ai-prescription-detector" element={<FractureDetector />} />
            <Route path="/admin_profile" element={<AdminProfile />} />
            <Route path="/doctor_profile" element={<DoctorProfile />} />
            <Route path="/patient_profile" element={<PatientProfile />} />
            
            {/* Add more routes as needed */}
            <Route path="*" element={<div>Page not found</div>} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
