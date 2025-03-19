import axios from "axios";

const PATIENT_LOGIN_URL = "http://localhost:5050/api/patient-logins";

interface PatientCreds{
    loginId: number;
    patientId: number;
    username: string;
    password: string;
}

class PatientLogin{
    authenticatePatient(dc: PatientCreds){
        return axios.post(`${PATIENT_LOGIN_URL}/auth`, dc);
    }
}

export default new PatientLogin;