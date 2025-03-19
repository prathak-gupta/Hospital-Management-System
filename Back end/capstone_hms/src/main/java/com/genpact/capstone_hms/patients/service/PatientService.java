package com.genpact.capstone_hms.patients.service;

import com.genpact.capstone_hms.doctors.model.Doctor;
import com.genpact.capstone_hms.model.DoctorLogin;
import com.genpact.capstone_hms.model.PatientLogin;
import com.genpact.capstone_hms.patients.model.Patient;
import com.genpact.capstone_hms.patients.repository.PatientRepository;
import com.genpact.capstone_hms.repository.PatientLoginRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientService {

    private final PatientRepository patientRepository;
    private final PatientLoginRepository plr;
    
    @Autowired
    public PatientService(PatientRepository patientRepository, PatientLoginRepository plr) {
        this.patientRepository = patientRepository;
        this.plr = plr;
    }

    // Create Patient
    public void createPatient(Patient patient) {
        patientRepository.createPatient(patient);
        
        Patient pat = patientRepository.getLatestPatient();
        if(pat != null)
        {
        	PatientLogin patLogin = new PatientLogin();
        	patLogin.setPatientId(pat.getPatientID());
        	patLogin.setUsername(pat.getFirstName()+"@"+pat.getPatientID());
        	BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
        	String encPass = bcrypt.encode("Password"); // default password
        	patLogin.setPassword(encPass);
        	plr.createPatientLogin(patLogin);
        }
        else
        {
        	System.out.println("Latest Patient Entery Can't be null");
        }
    }

    // Read Patient
    public Patient readPatient(int patientID) {
        return patientRepository.readPatient(patientID);
    }

    // Update Patient
    public void updatePatient(Patient patient) {
        patientRepository.updatePatient(patient);
    }

    // Delete Patient
    public void deletePatient(int patientID) {
        patientRepository.deletePatient(patientID);
    }

    // Search Patients
    public List<Patient> searchPatients(String keyword) {
        return patientRepository.searchPatients(keyword);
    }

    // Get All Patients
    public List<Patient> getAllPatients() {
        return patientRepository.getAllPatients();
    }
}