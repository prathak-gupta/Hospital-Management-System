import axios, { AxiosResponse } from "axios";

const API_URL = "http://localhost:5050/api/prescriptions";

interface Prescription {
    prescriptionId: number;
    patientId: number;
    doctorId: number;
    medicationName: string;
    dosage: string;
    frequency: string;
    duration: string;
    issueDate: string; // Using string to represent date in ISO format
    notes?: string;
  }

class PrescriptionService {
  getAllPrescriptions(): Promise<AxiosResponse<Prescription[]>> {
    return axios.get(`${API_URL}/all`);
  }

  getPrescriptionById(id: number): Promise<AxiosResponse<Prescription>> {
    return axios.get(`${API_URL}/${id}`);
  }

  registerPrescription(prescription: Prescription): Promise<AxiosResponse<Prescription>> {
    return axios.post(`${API_URL}/add`, prescription);
  }

  deletePrescription(id: number): Promise<AxiosResponse<void>> {
    return axios.delete(`${API_URL}/delete/${id}`);
  }

  updatePrescription(prescription: Prescription, id: number): Promise<AxiosResponse<Prescription>> {
    return axios.put(`${API_URL}/update/${id}`, prescription);
  }

  searchPrescriptions(keyword: string): Promise<AxiosResponse<Prescription[]>> {
    return axios.get(`${API_URL}/search?keyword=${keyword}`);
  }

  getAllPrescriptionsByDoctor(docId: number): Promise<AxiosResponse<Prescription[]>> {
    return axios.get(`${API_URL}/all/${docId}`);
    }
}

export default new PrescriptionService();
