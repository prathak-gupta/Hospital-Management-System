import axios, { AxiosResponse } from "axios";
 
const API_URL = "http://localhost:5050/api/admins";
 
interface Admin {
adminId:number,
username:string,
password:string,
role:string,
email:string
}
 
class AdminService {
  getAllAdmins(): Promise<AxiosResponse<Admin[]>> {
    return axios.get(`${API_URL}/all`);
  }
 
  getAdminById(id: number): Promise<AxiosResponse<Admin>> {
    return axios.get(`${API_URL}/${id}`);
  }
 
  registerAdmin(patient: Admin): Promise<AxiosResponse<Admin>> {
    return axios.post(`${API_URL}/register`, patient);
  }
 
  deleteAdmin(id: number): Promise<AxiosResponse<void>> {
    return axios.delete(`${API_URL}/delete/${id}`);
  }
 
  updateAdmin(patient: Admin, id: number): Promise<AxiosResponse<Admin>> {
    return axios.put(`${API_URL}/update/${id}`, patient);
  }
 
  searchAdmin(keyword: string): Promise<AxiosResponse<Admin[]>> {
    return axios.get(`${API_URL}/search?keyword=${keyword}`);
  }

}
 
export default new AdminService();