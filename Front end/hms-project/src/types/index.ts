export type UserRole = 'admin' | 'doctor' | 'patient';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Doctor extends User {
  role: 'doctor';
  specialty: string;
  department: string;
  patients: string[];
  schedule: Availability[];
}

export interface Patient extends User {
  role: 'patient';
  dateOfBirth: string;
  bloodGroup: string;
  allergies: string[];
  medicalHistory: MedicalRecord[];
  assignedDoctor?: string;
}

export interface Admin extends User {
  role: 'admin';
  department: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'pending';
  notes?: string;
  type: 'checkup' | 'follow-up' | 'emergency' | 'consultation';
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  diagnosis: string;
  treatment: string;
  notes: string;
  attachments?: string[];
}

export interface Prescription {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  medications: Medication[];
  instructions: string;
  refillable: boolean;
  expiryDate: string;
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  notes?: string;
}

export interface Bill {
  id: string;
  patientId: string;
  date: string;
  dueDate: string;
  items: BillItem[];
  totalAmount: number;
  status: 'paid' | 'pending' | 'overdue';
  paymentMethod?: string;
  paymentDate?: string;
}

export interface BillItem {
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

export interface LabReport {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  testType: string;
  results: string;
  normalRange?: string;
  interpretation?: string;
  attachmentUrl?: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'appointment' | 'prescription' | 'bill' | 'lab' | 'general';
}

export interface Availability {
  day: string;
  startTime: string;
  endTime: string;
}