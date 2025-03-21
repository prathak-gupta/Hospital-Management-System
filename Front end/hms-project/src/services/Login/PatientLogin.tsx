import axios from "axios";

const PATIENT_LOGIN_URL = "http://localhost:5050/api/patient-logins";

interface PatientCreds {
    loginId: number;
    patientId: number;
    username: string;
    password: string;
}

class PatientLogin {
    authenticatePatient(dc: PatientCreds) {
        return axios.post(`${PATIENT_LOGIN_URL}/auth`, dc);
    }

    resetPassword(username: string, oldPassword: string, newPassword: string, email: string) {
        return axios.post(`${PATIENT_LOGIN_URL}/reset-password`, null, {
            params: {
                username,
                oldPassword,
                newPassword,
                email
            }
        });
    }

    forgotPassword(username: string) {
        return axios.post(`${PATIENT_LOGIN_URL}/forgot-password`, null, {
            params: {
                username
            }
        });
    }
}

export default new PatientLogin();
