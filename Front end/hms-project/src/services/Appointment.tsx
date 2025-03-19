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
  registration_date: string;
}
 
class AppointmentService{
getPatientsByDoctor(docId: number): Promise<AxiosResponse<Patient[]>>{
    return axios.get(`${API_URL}/my-patients/${docId}`);
  }
}

export default new AppointmentService;