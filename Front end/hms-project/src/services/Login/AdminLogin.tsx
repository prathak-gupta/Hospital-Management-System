import axios from "axios";

const ADMIN_LOGIN_URL = "http://localhost:5050/api/admin-logins";

interface AdminCreds{
    loginId: number;
    adminId: number;
    username: string;
    password: string;
}

class AdminLogin{
    authenticateAdmin(dc: AdminCreds){
        return axios.post(`${ADMIN_LOGIN_URL}/auth`, dc);
    }
}

export default new AdminLogin;