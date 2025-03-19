package com.genpact.capstone_hms.admin.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import com.genpact.capstone_hms.admin.model.Admin;
import com.genpact.capstone_hms.admin.repository.AdminRepository;
import com.genpact.capstone_hms.doctors.model.Doctor;
import com.genpact.capstone_hms.model.AdminLogin;
import com.genpact.capstone_hms.model.DoctorLogin;
import com.genpact.capstone_hms.repository.AdminLoginRepository;

@Service
public class AdminService {
    
    private final AdminRepository adminRepo;
    private final AdminLoginRepository alr;

    public AdminService(AdminRepository adminRepo, AdminLoginRepository alr) {
        super();
        this.adminRepo = adminRepo;
        this.alr=alr;
    }
    
    public void registerAdmin(Admin admin) {
        adminRepo.createAdmin(admin);
        
        Admin adm = adminRepo.getLatestAdmin();
        if(adm != null)
        {
        	AdminLogin admLogin = new AdminLogin();
        	admLogin.setAdminId(adm.getAdminId());
        	admLogin.setUsername(adm.getUsername()+"@"+adm.getAdminId());
        	BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
        	String encPass = bcrypt.encode("Password"); // default password
        	admLogin.setPassword(encPass);
        	alr.createAdminLogin(admLogin);
        }
        else
        {
        	System.out.println("Latest Admin Entery Can't be null");
        }
    }
    
    public Admin getAdminById(int adminId) {
        return adminRepo.readAdmin(adminId);
    }
    
    public void updateAdmin(Admin admin) {
        adminRepo.updateAdmin(admin);
    }
    
    public void deleteAdmin(int adminId) {
        adminRepo.deleteAdmin(adminId);
    }
    
    public List<Admin> searchAdmins(String keyword) {
        return adminRepo.searchAdmins(keyword);
    }
    
    public List<Admin> getAllAdmins()
    {
    	return adminRepo.getAllAdmins();
    }

}
