import axios, { AxiosResponse } from "axios";
 
const API_URL = "http://localhost:5050/api/staff";
 
interface Staff {
  staffID: number;
  firstName: string;
  lastName: string;
  role?: string;
  phoneNumber?: string;
  email?: string;
  department?: string;
  hire_date: string;
}
 
class StaffService {
  getAllStaff(): Promise<AxiosResponse<Staff[]>> {
    return axios.get(`${API_URL}/all`);
  }
 
  getStaffById(id: number): Promise<AxiosResponse<Staff>> {
    return axios.get(`${API_URL}/${id}`);
  }
 
  registerStaff(staff: Staff): Promise<AxiosResponse<Staff>> {
    // console.log(staff)
    return axios.post(`${API_URL}/register`, staff);
  }
 
  deleteStaff(id: number): Promise<AxiosResponse<void>> {
    return axios.delete(`${API_URL}/delete/${id}`);
  }
 
  updateStaff(staff: Staff, id: number): Promise<AxiosResponse<Staff>> {
    return axios.put(`${API_URL}/update/${id}`, staff);
  }
 
  searchStaff(keyword: string): Promise<AxiosResponse<Staff[]>> {
    return axios.get(`${API_URL}/search?keyword=${keyword}`);
  }
}
 
export default new StaffService();