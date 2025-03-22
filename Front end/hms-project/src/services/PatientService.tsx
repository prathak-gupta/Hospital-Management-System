import axios, { AxiosResponse } from "axios";
 
const API_URL = "http://localhost:5050/api/patients";
 
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
 
class PatientService {
  getAllPatients(): Promise<AxiosResponse<Patient[]>> {
    return axios.get(`${API_URL}/all`);
  }
 
  getPatientById(id: number): Promise<AxiosResponse<Patient>> {
    return axios.get(`${API_URL}/${id}`);
  }
 
  registerPatient(patient: Patient): Promise<AxiosResponse<Patient>> {
    return axios.post(`${API_URL}/register`, patient);
  }
 
  deletePatient(id: number): Promise<AxiosResponse<void>> {
    return axios.delete(`${API_URL}/delete/${id}`);
  }
 
  updatePatient(patient: Patient, id: number): Promise<AxiosResponse<Patient>> {
    return axios.put(`${API_URL}/update/${id}`, patient);
  }
 
  searchPatient(keyword: string): Promise<AxiosResponse<Patient[]>> {
    return axios.get(`${API_URL}/search?keyword=${keyword}`);
  }

}
 
export default new PatientService();