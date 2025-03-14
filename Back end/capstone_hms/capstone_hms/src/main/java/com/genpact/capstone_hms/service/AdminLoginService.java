package com.genpact.capstone_hms.service;

import com.genpact.capstone_hms.model.AdminLogin;
import com.genpact.capstone_hms.repository.AdminLoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminLoginService {

    private final AdminLoginRepository adminLoginRepository;

    @Autowired
    public AdminLoginService(AdminLoginRepository adminLoginRepository) {
        this.adminLoginRepository = adminLoginRepository;
    }

    // Create AdminLogin
    public void createAdminLogin(AdminLogin adminLogin) {
    	BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
    	String encryptePass = bcrypt.encode(adminLogin.getPassword());
    	adminLogin.setPassword(encryptePass);
    	adminLoginRepository.createAdminLogin(adminLogin);
    }

    // Read AdminLogin
    public AdminLogin readAdminLogin(String username) {
        return adminLoginRepository.readAdminLogin(username);
    }

    // Update AdminLogin
    public void updateAdminLogin(AdminLogin adminLogin) {
    	BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
    	String encryptePass = bcrypt.encode(adminLogin.getPassword());
    	adminLogin.setPassword(encryptePass);
        adminLoginRepository.updateAdminLogin(adminLogin);
    }

    // Delete AdminLogin
    public void deleteAdminLogin(int loginId) {
        adminLoginRepository.deleteAdminLogin(loginId);
    }

    // Search AdminLogins
    public List<AdminLogin> searchAdminLogins(String keyword) {
        return adminLoginRepository.searchAdminLogins(keyword);
    }

    // Get All AdminLogins
    public List<AdminLogin> getAllAdminLogins() {
        return adminLoginRepository.getAllAdminLogins();
    }
    
    public boolean authenticateAdminLogin(AdminLogin adminLogin) {
    	BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
    	AdminLogin adminDetails = adminLoginRepository.readAdminLogin(adminLogin.getUsername());
    	if(bcrypt.matches(adminLogin.getPassword(), adminDetails.getPassword()))
    		return true;
        return false;
    }

}
