import axios from "axios";

const DOCTOR_LOGIN_URL = "http://localhost:5050/api/doctor-logins";
// const ADMIN_LOGIN_URL = "http://localhost:5050/api/admin-logins";
// const STAFF_LOGIN_URL = "http://localhost:5050/api/staff-logins";
// const PATIENT_LOGIN_URL = "http://localhost:5050/api/ptient-logins";

interface DoctorCreds{
    loginId: number;
    doctorId: number;
    username: string;
    password: string;
}

class DoctorLogin{
    authenticateDoctor(dc: DoctorCreds){
        return axios.post(`${DOCTOR_LOGIN_URL}/auth`, dc);
    }
}

export default new DoctorLogin;