package com.genpact.capstone_hms.service;

import com.genpact.capstone_hms.model.AdminLogin;
import com.genpact.capstone_hms.model.DoctorLogin;
import com.genpact.capstone_hms.repository.DoctorLoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoctorLoginService {

    private final DoctorLoginRepository doctorLoginRepository;

    @Autowired
    public DoctorLoginService(DoctorLoginRepository doctorLoginRepository) {
        this.doctorLoginRepository = doctorLoginRepository;
    }

    // Create DoctorLogin
    public void createDoctorLogin(DoctorLogin doctorLogin) {
    	BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
    	String encPass = bcrypt.encode(doctorLogin.getPassword());
    	doctorLogin.setPassword(encPass);
        doctorLoginRepository.createDoctorLogin(doctorLogin);
    }

    // Read DoctorLogin
    public DoctorLogin readDoctorLogin(String username) {
        return doctorLoginRepository.readDoctorLogin(username);
    }

    // Update DoctorLogin
    public void updateDoctorLogin(DoctorLogin doctorLogin) {
    	BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
    	String encPass = bcrypt.encode(doctorLogin.getPassword());
    	doctorLogin.setPassword(encPass);
    	doctorLoginRepository.updateDoctorLogin(doctorLogin);
    }

    // Delete DoctorLogin
    public void deleteDoctorLogin(int loginId) {
        doctorLoginRepository.deleteDoctorLogin(loginId);
    }

    // Search DoctorLogins
    public List<DoctorLogin> searchDoctorLogins(String keyword) {
        return doctorLoginRepository.searchDoctorLogins(keyword);
    }

    // Get All DoctorLogins
    public List<DoctorLogin> getAllDoctorLogins() {
        return doctorLoginRepository.getAllDoctorLogins();
    }
    
    public boolean authenticateDoctorLogin(DoctorLogin docLogin) {
    	BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
    	DoctorLogin docDetails = doctorLoginRepository.readDoctorLogin(docLogin.getUsername());
    	if(bcrypt.matches(docLogin.getPassword(), docDetails.getPassword()))
    		return true;
        return false;
    }

}
