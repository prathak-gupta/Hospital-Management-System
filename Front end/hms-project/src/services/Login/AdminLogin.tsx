import axios from "axios";

const ADMIN_LOGIN_URL = "http://localhost:5050/api/admin-logins";

interface AdminCreds {
    loginId: number;
    adminId: number;
    username: string;
    password: string;
}

class AdminLogin {
    authenticateAdmin(dc: AdminCreds) {
        return axios.post(`${ADMIN_LOGIN_URL}/auth`, dc);
    }

    resetPassword(username: string, oldPassword: string, newPassword: string, email: string) {
        return axios.post(`${ADMIN_LOGIN_URL}/reset-password`, null, {
            params: {
                username,
                oldPassword,
                newPassword,
                email
            }
        });
    }

    forgotPassword(username: string) {
        return axios.post(`${ADMIN_LOGIN_URL}/forgot-password`, null, {
            params: {
                username
            }
        });
    }
}

export default new AdminLogin();
