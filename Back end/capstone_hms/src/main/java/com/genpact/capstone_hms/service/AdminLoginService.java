package com.genpact.capstone_hms.service;

import com.genpact.capstone_hms.admin.model.Admin;
import com.genpact.capstone_hms.admin.repository.AdminRepository;
import com.genpact.capstone_hms.mailsystem.EmailSenderService;
import com.genpact.capstone_hms.model.AdminLogin;
import com.genpact.capstone_hms.repository.AdminLoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminLoginService {

    private final AdminLoginRepository adminLoginRepository;
    private final AdminRepository adminRepo;

    @Autowired
    private EmailSenderService mail;

    @Autowired
    public AdminLoginService(AdminLoginRepository adminLoginRepository, AdminRepository adminRepo) {
        this.adminLoginRepository = adminLoginRepository;
        this.adminRepo = adminRepo;
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

    // Authenticate AdminLogin
    public int authenticateAdminLogin(AdminLogin adminLogin) {
        BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
        AdminLogin adminDetails = adminLoginRepository.readAdminLogin(adminLogin.getUsername());
        if (bcrypt.matches(adminLogin.getPassword(), adminDetails.getPassword())) {
            return adminDetails.getAdminId();
        }
        return -1;
    }

    // Reset Password
    public boolean resetPassword(String username, String oldPassword, String newPassword, String email) {
        AdminLogin adminLogin = adminLoginRepository.readAdminLogin(username);
        if (adminLogin != null) {
            BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
            if (bcrypt.matches(oldPassword, adminLogin.getPassword())) {
                String encPass = bcrypt.encode(newPassword);
                adminLogin.setPassword(encPass);
                adminLoginRepository.updateAdminLogin(adminLogin);
                // Send email to admin about password update
                String subject = "Password Reset Confirmation";
                String body = "Dear " + username + ",\r\n\r\n" +
                        "We wanted to inform you that your password has been successfully reset. If you initiated this change, no further action is required.\r\n\r\n" +
                        "However, if you did not request a password reset, please contact your manager or the system administrators immediately to ensure the security of your account.\r\n\r\n" +
                        "Thank you for your attention to this matter.\r\n\r\n" +
                        "Best regards,\r\n" +
                        "Medicare Support Team";
                mail.sendMail(email, subject, body);
                return true;
            }
        }
        String subject = "Alert: Failed Password Change Attempt";
        String body = "Dear " + username + ",\r\n\r\n" +
                "We wanted to bring to your attention that there was a failed attempt to change your password. If you did not initiate this attempt, it is important to take immediate action to secure your account.\r\n\r\n" +
                "Please contact your manager or the system administrators as soon as possible to report this incident and ensure the security of your account.\r\n\r\n" +
                "Thank you for your prompt attention to this matter.\r\n\r\n" +
                "Best regards,\r\n" +
                "Medicare Support Team";
        mail.sendMail(email, subject, body);
        return false;
    }

    // Forgot Password
    public boolean forgotPassword(String username) {
        AdminLogin adminLogin = adminLoginRepository.readAdminLogin(username);
        if (adminLogin != null) {
            // Generate a temporary password
            String tempPassword = PasswordGenerator.generatePassword();
            BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
            String encPass = bcrypt.encode(tempPassword);
            adminLogin.setPassword(encPass);
            adminLoginRepository.updateAdminLogin(adminLogin);

            // Send the temporary password to the admin's email
            String subject = "Temporary Password for Your Account";
            String body = "Dear " + username + ",\r\n\r\n" +
                    "We have generated a temporary password for your account. Please use the following temporary password to log in and reset your password immediately:\r\n\r\n" +
                    "Temporary Password: " + tempPassword + "\r\n\r\n" +
                    "If you did not request a password reset, please contact your manager or the system administrators immediately to ensure the security of your account.\r\n\r\n" +
                    "Thank you for your attention to this matter.\r\n\r\n" +
                    "Best regards,\r\n" +
                    "Medicare Support Team";
            Admin adm = adminRepo.readAdmin(adminLogin.getAdminId());
            mail.sendMail(adm.getEmail(), subject, body);

            return true;
        }
        return false;
    }
}
