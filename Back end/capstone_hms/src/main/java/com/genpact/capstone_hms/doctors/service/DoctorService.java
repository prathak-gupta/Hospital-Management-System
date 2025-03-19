package com.genpact.capstone_hms.doctors.service;

import com.genpact.capstone_hms.doctors.model.Doctor;
import com.genpact.capstone_hms.doctors.repository.DoctorRepository;
import com.genpact.capstone_hms.model.DoctorLogin;
import com.genpact.capstone_hms.repository.DoctorLoginRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoctorService {

    private final DoctorRepository doctorRepository;
    private final DoctorLoginRepository dlr;

    @Autowired
    public DoctorService(DoctorRepository doctorRepository, DoctorLoginRepository dlr) {
        this.doctorRepository = doctorRepository;
        this.dlr = dlr;
    }

    // Create Doctor
    public void createDoctor(Doctor doctor) {
        doctorRepository.createDoctor(doctor);
        
        Doctor doc = doctorRepository.getLatestDoctor();
        if(doc != null)
        {
        	DoctorLogin docLogin = new DoctorLogin();
        	docLogin.setDoctorId(doc.getDoctorID());
        	docLogin.setUsername(doc.getFirstName()+"@"+doc.getDoctorID());
        	BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
        	String encPass = bcrypt.encode("Password"); // default password
        	docLogin.setPassword(encPass);
        	dlr.createDoctorLogin(docLogin);
        }
        else
        {
        	System.out.println("Latest Doctor Entery Can't be null");
        }
    }

    // Read Doctor
    public Doctor readDoctor(int doctorID) {
        return doctorRepository.readDoctor(doctorID);
    }

    // Update Doctor
    public void updateDoctor(Doctor doctor) {
        doctorRepository.updateDoctor(doctor);
    }

    // Delete Doctor
    public void deleteDoctor(int doctorID) {
        doctorRepository.deleteDoctor(doctorID);
    }

    // Search Doctors
    public List<Doctor> searchDoctors(String keyword) {
        return doctorRepository.searchDoctors(keyword);
    }

    // Get All Doctors
    public List<Doctor> getAllDoctors() {
        return doctorRepository.getAllDoctors();
    }
}