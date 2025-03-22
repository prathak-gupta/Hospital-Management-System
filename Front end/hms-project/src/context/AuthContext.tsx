import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import DoctorLogin from '../services/Login/DoctorLogin';
import PatientLogin from '../services/Login/PatientLogin';
import AdminLogin from '../services/Login/AdminLogin';
import DoctorService from '../services/DoctorService';
import PatientService from '../services/PatientService';
import AdminService from '../services/AdminService';

const doctorCred = {
  loginId: 0,
  doctorId: 0,
  username: '',
  password: ''
};

const adminCred = {
  loginId: 0,
  adminId: 0,
  username: '',
  password: ''
};

const patientCred = {
  loginId: 0,
  patientId: 0,
  username: '',
  password: ''
};

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (domain: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (domain: string, username: string, password: string): Promise<boolean> => {
    setLoading(true);

    
    //here we also have to apply if else ladder for admin, staff, patient..
    if (domain === 'doctor') {
      doctorCred.username = username;
      doctorCred.password = password;
      try {
        const res = (await DoctorLogin.authenticateDoctor(doctorCred)).data;
        if (res > 0) {
          const doc = (await DoctorService.getDoctorById(res)).data;
          const foundUser: User = {
            id: doc.doctorID,
            username: username,
            email: doc.email || '', // Ensure email is a string
            name: `Dr. ${doc.firstName} ${doc.lastName}`,
            role: 'doctor',
            avatar: 'https://cdn4.iconfinder.com/data/icons/professions-1-2/151/3-1024.png'
          };
          setUser(foundUser);
          localStorage.setItem('user', JSON.stringify(foundUser));
          console.log('Login Successful.');
          setLoading(false);
          return true;
        } else {
          console.log('Login Failed.');
        }
      } catch (error) {
        console.error('Error during login:', error);
      }
    }
    // For testing purpose.. need to update with proper login functionality..
    else if (domain === 'admin') {
      adminCred.username = username;
      adminCred.password = password;
      try {
        const res = (await AdminLogin.authenticateAdmin(adminCred)).data;
        if (res > 0) {
          const admin = (await AdminService.getAdminById(res)).data;
          // console.log("Admin id:", admin.adminId)
          const foundUser: User = {
            id: admin.adminId,
            username: username,
            email: admin.email || '', // Ensure email is a string
            name: `${admin.username}`,
            role: 'admin',
            avatar: 'https://cdn4.iconfinder.com/data/icons/professions-1-2/151/3-1024.png'
          };
          // console.log("admin",foundUser);
          setUser(foundUser);
          localStorage.setItem('user', JSON.stringify(foundUser));
          console.log('Login Successful.');
          setLoading(false);
          return true;
        } else {
          console.log('Login Failed.');
        }
      } catch (error) {
        console.error('Error during login:', error);
      }
}

    // For testing purpose.. need to update with proper login functionality..
    else if (domain === 'patient') {
      patientCred.username = username;
      patientCred.password = password;
      try {
        const res = (await PatientLogin.authenticatePatient(patientCred)).data;
        if (res > 0) {
          const pat = (await PatientService.getPatientById(res)).data;
          const foundUser: User = {
            id: pat.patientID,
            username: username,
            email: pat.email || '', // Ensure email is a string
            name: `${pat.firstName} ${pat.lastName}`,
            role: 'patient',
            avatar: 'https://cdn4.iconfinder.com/data/icons/professions-1-2/151/3-1024.png'
          };
          console.log(pat);
          setUser(foundUser);
          localStorage.setItem('user', JSON.stringify(foundUser));
          console.log('Login Successful.');
          setLoading(false);
          return true;
        } else {
          console.log('Login Failed.');
        }
      } catch (error) {
        console.error('Error during login:', error);
      }
 
}

    console.log("No login function ran..")
    setLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
