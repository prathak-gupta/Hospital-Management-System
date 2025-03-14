import axios, { AxiosResponse } from "axios";

const API_URL = "http://localhost:5050/api/doctors";

interface Doctor {
    doctorID: number;
    firstName: string;
    lastName: string;
    specialization?: string;
    phoneNumber?: string;
    email?: string;
    department?: string;
    qualification?: string;
    yearsOfExperience?: number;
    charges?:number;
    registrationDate: string;
  }
  
class DoctorService {
  getAllDoctors(): Promise<AxiosResponse<Doctor[]>> {
    return axios.get(`${API_URL}/all`);
  }

  getDoctorById(id: number): Promise<AxiosResponse<Doctor>> {
    return axios.get(`${API_URL}/${id}`);
  }

  registerDoctor(doctor: Doctor): Promise<AxiosResponse<Doctor>> {
    return axios.post(`${API_URL}/register`, doctor);
  }

  deleteDoctor(id: number): Promise<AxiosResponse<void>> {
    return axios.delete(`${API_URL}/delete/${id}`);
  }

  updateDoctor(doctor: Doctor, id: number): Promise<AxiosResponse<Doctor>> {
    return axios.put(`${API_URL}/update/${id}`, doctor);
  }

  searchDoctor(keyword: string): Promise<AxiosResponse<Doctor[]>> {
    return axios.get(`${API_URL}/search?keyword=${keyword}`);
  }
}

export default new DoctorService();