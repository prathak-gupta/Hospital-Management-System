package com.genpact.capstone_hms.service;

import com.genpact.capstone_hms.model.AdminLogin;
import com.genpact.capstone_hms.model.PatientLogin;
import com.genpact.capstone_hms.repository.PatientLoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientLoginService {

    private final PatientLoginRepository patientLoginRepository;

    @Autowired
    public PatientLoginService(PatientLoginRepository patientLoginRepository) {
        this.patientLoginRepository = patientLoginRepository;
    }

    // Create PatientLogin
    public void createPatientLogin(PatientLogin patientLogin) {
    	BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
    	String encPass = bcrypt.encode(patientLogin.getPassword());
    	patientLogin.setPassword(encPass);
        patientLoginRepository.createPatientLogin(patientLogin);
    }

    // Read PatientLogin
    public PatientLogin readPatientLogin(String username) {
        return patientLoginRepository.readPatientLogin(username);
    }

    // Update PatientLogin
    public void updatePatientLogin(PatientLogin patientLogin) {
    	BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
    	String encPass = bcrypt.encode(patientLogin.getPassword());
    	patientLogin.setPassword(encPass);
    	patientLoginRepository.updatePatientLogin(patientLogin);
    }

    // Delete PatientLogin
    public void deletePatientLogin(int loginId) {
        patientLoginRepository.deletePatientLogin(loginId);
    }

    // Search PatientLogins
    public List<PatientLogin> searchPatientLogins(String keyword) {
        return patientLoginRepository.searchPatientLogins(keyword);
    }

    // Get All PatientLogins
    public List<PatientLogin> getAllPatientLogins() {
        return patientLoginRepository.getAllPatientLogins();
    }
    
    public boolean authenticatePatientLogin(PatientLogin patLogin) {
    	BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
    	PatientLogin patDetails = patientLoginRepository.readPatientLogin(patLogin.getUsername());
    	if(bcrypt.matches(patLogin.getPassword(), patDetails.getPassword()))
    		return true;
        return false;
    }
}
