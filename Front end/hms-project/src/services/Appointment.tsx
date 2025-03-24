import axios, { AxiosResponse } from "axios";

const API_URL = "http://localhost:5050/api/appointments";

interface Patient {
  patientID: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender?: string;
  address?: string;
  phoneNumber?: string;
  email?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  registrationDate: string;
}

interface Appointment {
  appointmentID: number;
  patientID: number;
  doctorID: number;
  appointmentDate: string;
  appointmentTime: string;
  appointmentType: 'checkup' | 'follow-up' | 'consultation' | 'emergency';
  reason: string;
  registrationTime: string;
}

class AppointmentService {
  getAllAppointments(): Promise<AxiosResponse<Appointment[]>> {
    return axios.get(`${API_URL}/all`);
  }

  getAppointmentById(id: number): Promise<AxiosResponse<Appointment>> {
    return axios.get(`${API_URL}/${id}`);
  }

  createAppointment(appointment: Appointment): Promise<AxiosResponse<string>> {
    console.log("appoinyrnt data: ", appointment.appointmentTime)
    return axios.post(`${API_URL}/add`, appointment);
  }

  updateAppointment(appointment: Appointment, id: number): Promise<AxiosResponse<string>> {
    return axios.put(`${API_URL}/update/${id}`, appointment);
  }

  deleteAppointment(id: number): Promise<AxiosResponse<void>> {
    return axios.delete(`${API_URL}/delete/${id}`);
  }

  searchAppointments(keyword: string): Promise<AxiosResponse<Appointment[]>> {
    return axios.get(`${API_URL}/search?keyword=${keyword}`);
  }

  getPatientsByDoctor(docId: number): Promise<AxiosResponse<Patient[]>> {
    return axios.get(`${API_URL}/my-patients/${docId}`);
  }
}

export default new AppointmentService();
