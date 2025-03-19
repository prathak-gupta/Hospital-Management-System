import axios, { AxiosResponse } from "axios";

const API_URL = "http://localhost:5050/api/billings";

interface Billing {
  billID: number;
  patientID: number;
  amount: number;
  paymentStatus: string;
  paymentMethod: string;
  billingStatus: string;
  createdBy: number;
}

class BillingService {
  getAllBillings(): Promise<AxiosResponse<Billing[]>> {
    return axios.get(`${API_URL}/all`);
  }

  getBillingById(id: number): Promise<AxiosResponse<Billing>> {
    return axios.get(`${API_URL}/${id}`);
  }

  registerBilling(billing: Billing): Promise<AxiosResponse<Billing>> {
    return axios.post(`${API_URL}/add`, billing);
  }

  deleteBilling(id: number): Promise<AxiosResponse<void>> {
    return axios.delete(`${API_URL}/delete/${id}`);
  }

  updateBilling(billing: Billing, id: number): Promise<AxiosResponse<Billing>> {
    return axios.put(`${API_URL}/update/${id}`, billing);
  }

  searchBilling(keyword: string): Promise<AxiosResponse<Billing[]>> {
    return axios.get(`${API_URL}/search?keyword=${keyword}`);
  }
}

export default new BillingService();
