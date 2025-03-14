package com.genpact.capstone_hms.admin.service;

import org.springframework.stereotype.Service;
import java.util.List;
import com.genpact.capstone_hms.admin.model.Admin;
import com.genpact.capstone_hms.admin.repository.AdminRepository;

@Service
public class AdminService {
    
    private final AdminRepository adminRepo;

    public AdminService(AdminRepository adminRepo) {
        super();
        this.adminRepo = adminRepo;
    }
    
    public void registerAdmin(Admin admin) {
        adminRepo.createAdmin(admin);
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
