import axios from "axios";

const DOCTOR_LOGIN_URL = "http://localhost:5050/api/doctor-logins";
// const ADMIN_LOGIN_URL = "http://localhost:5050/api/admin-logins";
// const STAFF_LOGIN_URL = "http://localhost:5050/api/staff-logins";
// const PATIENT_LOGIN_URL = "http://localhost:5050/api/patient-logins";

interface DoctorCreds {
    loginId: number;
    doctorId: number;
    username: string;
    password: string;
}

class DoctorLogin {
    authenticateDoctor(dc: DoctorCreds) {
        return axios.post(`${DOCTOR_LOGIN_URL}/auth`, dc);
    }

    resetPassword(username: string, oldPassword: string, newPassword: string, email: string) {
        return axios.post(`${DOCTOR_LOGIN_URL}/reset-password`, null, {
            params: {
                username,
                oldPassword,
                newPassword,
                email
            }
        });
    }

    forgotPassword(username: string, initiator_role:string) {
        return axios.post(`${DOCTOR_LOGIN_URL}/forgot-password`, null, {
            params: {
                username,
                initiator_role
            }
        });
    }
}

export default new DoctorLogin();
