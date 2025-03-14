import { User, Doctor, Patient, Admin, Appointment, MedicalRecord, Prescription, Bill, LabReport, Notification } from '../types';
import { addDays, format, subDays } from 'date-fns';

// Helper function to generate dates
const today = new Date();
const formatDate = (date: Date) => format(date, 'yyyy-MM-dd');

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'admin1',
    name: 'Admin User',
    email: 'admin@hospital.com',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 'doctor1',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@hospital.com',
    role: 'doctor',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 'doctor2',
    name: 'Dr. Michael Chen',
    email: 'michael.chen@hospital.com',
    role: 'doctor',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 'patient1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    role: 'patient',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 'patient2',
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    role: 'patient',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
];

// Mock Doctors
export const mockDoctors: Doctor[] = [
  {
    id: 'doctor1',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@hospital.com',
    role: 'doctor',
    specialty: 'Cardiology',
    department: 'Cardiology',
    patients: ['patient1', 'patient2'],
    schedule: [
      { day: 'Monday', startTime: '09:00', endTime: '17:00' },
      { day: 'Wednesday', startTime: '09:00', endTime: '17:00' },
      { day: 'Friday', startTime: '09:00', endTime: '17:00' },
    ],
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 'doctor2',
    name: 'Dr. Michael Chen',
    email: 'michael.chen@hospital.com',
    role: 'doctor',
    specialty: 'Neurology',
    department: 'Neurology',
    patients: ['patient1'],
    schedule: [
      { day: 'Tuesday', startTime: '09:00', endTime: '17:00' },
      { day: 'Thursday', startTime: '09:00', endTime: '17:00' },
      { day: 'Saturday', startTime: '10:00', endTime: '14:00' },
    ],
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
];

// Mock Patients
export const mockPatients: Patient[] = [
  {
    id: 'patient1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    role: 'patient',
    dateOfBirth: '1985-05-15',
    bloodGroup: 'O+',
    allergies: ['Penicillin', 'Peanuts'],
    medicalHistory: [],
    assignedDoctor: 'doctor1',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 'patient2',
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    role: 'patient',
    dateOfBirth: '1990-08-22',
    bloodGroup: 'A-',
    allergies: ['Sulfa drugs'],
    medicalHistory: [],
    assignedDoctor: 'doctor1',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
];

// Mock Admins
export const mockAdmins: Admin[] = [
  {
    id: 'admin1',
    name: 'Admin User',
    email: 'admin@hospital.com',
    role: 'admin',
    department: 'Hospital Management',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
];

// Mock Appointments
export const mockAppointments: Appointment[] = [
  {
    id: 'appt1',
    patientId: 'patient1',
    doctorId: 'doctor1',
    date: formatDate(today),
    startTime: '10:00',
    endTime: '10:30',
    status: 'scheduled',
    notes: 'Regular checkup',
    type: 'checkup',
  },
  {
    id: 'appt2',
    patientId: 'patient2',
    doctorId: 'doctor1',
    date: formatDate(addDays(today, 1)),
    startTime: '14:00',
    endTime: '14:30',
    status: 'scheduled',
    notes: 'Follow-up on medication',
    type: 'follow-up',
  },
  {
    id: 'appt3',
    patientId: 'patient1',
    doctorId: 'doctor2',
    date: formatDate(subDays(today, 5)),
    startTime: '11:00',
    endTime: '11:30',
    status: 'completed',
    notes: 'Neurological consultation',
    type: 'consultation',
  },
];

// Mock Medical Records
export const mockMedicalRecords: MedicalRecord[] = [
  {
    id: 'record1',
    patientId: 'patient1',
    doctorId: 'doctor1',
    date: formatDate(subDays(today, 30)),
    diagnosis: 'Hypertension',
    treatment: 'Prescribed Lisinopril 10mg daily',
    notes: 'Patient should monitor blood pressure regularly',
    attachments: ['report1.pdf'],
  },
  {
    id: 'record2',
    patientId: 'patient2',
    doctorId: 'doctor1',
    date: formatDate(subDays(today, 15)),
    diagnosis: 'Migraine',
    treatment: 'Prescribed Sumatriptan as needed',
    notes: 'Advised to avoid triggers and maintain regular sleep schedule',
    attachments: [],
  },
];

// Mock Prescriptions
export const mockPrescriptions: Prescription[] = [
  {
    id: 'presc1',
    patientId: 'patient1',
    doctorId: 'doctor1',
    date: formatDate(subDays(today, 30)),
    medications: [
      {
        name: 'Lisinopril',
        dosage: '10mg',
        frequency: 'Once daily',
        duration: '30 days',
        notes: 'Take in the morning',
      },
    ],
    instructions: 'Take with food. Monitor blood pressure.',
    refillable: true,
    expiryDate: formatDate(addDays(today, 60)),
  },
  {
    id: 'presc2',
    patientId: 'patient2',
    doctorId: 'doctor1',
    date: formatDate(subDays(today, 15)),
    medications: [
      {
        name: 'Sumatriptan',
        dosage: '50mg',
        frequency: 'As needed for migraine',
        duration: 'PRN',
        notes: 'Not more than 2 tablets in 24 hours',
      },
      {
        name: 'Propranolol',
        dosage: '20mg',
        frequency: 'Twice daily',
        duration: '30 days',
        notes: 'For migraine prevention',
      },
    ],
    instructions: 'Take Sumatriptan at first sign of migraine. Propranolol should be taken regularly.',
    refillable: true,
    expiryDate: formatDate(addDays(today, 75)),
  },
];

// Mock Bills
export const mockBills: Bill[] = [
  {
    id: 'bill1',
    patientId: 'patient1',
    date: formatDate(subDays(today, 30)),
    dueDate: formatDate(addDays(today, 15)),
    items: [
      {
        description: 'Consultation',
        quantity: 1,
        unitPrice: 150,
        amount: 150,
      },
      {
        description: 'Blood Test',
        quantity: 1,
        unitPrice: 75,
        amount: 75,
      },
    ],
    totalAmount: 225,
    status: 'pending',
  },
  {
    id: 'bill2',
    patientId: 'patient2',
    date: formatDate(subDays(today, 45)),
    dueDate: formatDate(subDays(today, 15)),
    items: [
      {
        description: 'Consultation',
        quantity: 1,
        unitPrice: 150,
        amount: 150,
      },
      {
        description: 'MRI Scan',
        quantity: 1,
        unitPrice: 850,
        amount: 850,
      },
    ],
    totalAmount: 1000,
    status: 'paid',
    paymentMethod: 'Credit Card',
    paymentDate: formatDate(subDays(today, 20)),
  },
];

// Mock Lab Reports
export const mockLabReports: LabReport[] = [
  {
    id: 'lab1',
    patientId: 'patient1',
    doctorId: 'doctor1',
    date: formatDate(subDays(today, 25)),
    testType: 'Complete Blood Count',
    results: 'WBC: 7.5, RBC: 4.8, Hemoglobin: 14.2, Hematocrit: 42%',
    normalRange: 'WBC: 4.5-11.0, RBC: 4.5-5.5, Hemoglobin: 13.5-17.5, Hematocrit: 41-50%',
    interpretation: 'Normal blood count',
    attachmentUrl: 'lab_report1.pdf',
  },
  {
    id: 'lab2',
    patientId: 'patient2',
    doctorId: 'doctor1',
    date: formatDate(subDays(today, 40)),
    testType: 'Lipid Panel',
    results: 'Total Cholesterol: 210, HDL: 55, LDL: 130, Triglycerides: 150',
    normalRange: 'Total Cholesterol: <200, HDL: >40, LDL: <130, Triglycerides: <150',
    interpretation: 'Slightly elevated cholesterol and LDL levels',
    attachmentUrl: 'lab_report2.pdf',
  },
];

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: 'notif1',
    userId: 'patient1',
    title: 'Appointment Reminder',
    message: 'You have an appointment with Dr. Sarah Johnson tomorrow at 10:00 AM',
    date: formatDate(subDays(today, 1)),
    read: false,
    type: 'appointment',
  },
  {
    id: 'notif2',
    userId: 'patient1',
    title: 'New Prescription',
    message: 'Dr. Sarah Johnson has issued a new prescription for you',
    date: formatDate(subDays(today, 30)),
    read: true,
    type: 'prescription',
  },
  {
    id: 'notif3',
    userId: 'doctor1',
    title: 'New Appointment Request',
    message: 'John Smith has requested an appointment on ' + formatDate(addDays(today, 3)),
    date: formatDate(subDays(today, 2)),
    read: false,
    type: 'appointment',
  },
];

// Combine all mock data
export const mockData = {
  users: mockUsers,
  doctors: mockDoctors,
  patients: mockPatients,
  admins: mockAdmins,
  appointments: mockAppointments,
  medicalRecords: mockMedicalRecords,
  prescriptions: mockPrescriptions,
  bills: mockBills,
  labReports: mockLabReports,
  notifications: mockNotifications,
};