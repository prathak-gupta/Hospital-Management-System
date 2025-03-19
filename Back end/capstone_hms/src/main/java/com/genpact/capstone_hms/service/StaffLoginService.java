package com.genpact.capstone_hms.service;

import com.genpact.capstone_hms.model.AdminLogin;
import com.genpact.capstone_hms.model.StaffLogin;
import com.genpact.capstone_hms.repository.StaffLoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StaffLoginService {

    private final StaffLoginRepository staffLoginRepository;

    @Autowired
    public StaffLoginService(StaffLoginRepository staffLoginRepository) {
        this.staffLoginRepository = staffLoginRepository;
    }

    // Create StaffLogin
    public void createStaffLogin(StaffLogin staffLogin) {
    	BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
    	String encPass = bcrypt.encode(staffLogin.getPassword());
    	staffLogin.setPassword(encPass);
        staffLoginRepository.createStaffLogin(staffLogin);
    }

    // Read StaffLogin
    public StaffLogin readStaffLogin(String username) {
        return staffLoginRepository.readStaffLogin(username);
    }

    // Update StaffLogin
    public void updateStaffLogin(StaffLogin staffLogin) {
    	BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
    	String encPass = bcrypt.encode(staffLogin.getPassword());
    	staffLogin.setPassword(encPass);
        staffLoginRepository.updateStaffLogin(staffLogin);
    }

    // Delete StaffLogin
    public void deleteStaffLogin(int loginId) {
        staffLoginRepository.deleteStaffLogin(loginId);
    }

    // Search StaffLogins
    public List<StaffLogin> searchStaffLogins(String keyword) {
        return staffLoginRepository.searchStaffLogins(keyword);
    }

    // Get All StaffLogins
    public List<StaffLogin> getAllStaffLogins() {
        return staffLoginRepository.getAllStaffLogins();
    }
    
    public boolean authenticateStaffLogin(StaffLogin staffLogin) {
    	BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
    	StaffLogin staffDetails = staffLoginRepository.readStaffLogin(staffLogin.getUsername());
    	if(bcrypt.matches(staffLogin.getPassword(), staffDetails.getPassword()))
    		return true;
        return false;
    }
}
