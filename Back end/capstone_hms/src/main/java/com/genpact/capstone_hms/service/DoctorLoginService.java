package com.genpact.capstone_hms.service;

import com.genpact.capstone_hms.doctors.model.Doctor;
import com.genpact.capstone_hms.doctors.repository.DoctorRepository;
import com.genpact.capstone_hms.mailsystem.EmailSenderService;
import com.genpact.capstone_hms.model.DoctorLogin;
import com.genpact.capstone_hms.repository.DoctorLoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoctorLoginService {

    private final DoctorLoginRepository doctorLoginRepository;
    private final DoctorRepository docRepo;
    
    @Autowired
    private EmailSenderService mail;

    @Autowired
    public DoctorLoginService(DoctorLoginRepository doctorLoginRepository, DoctorRepository docRepo) {
        this.doctorLoginRepository = doctorLoginRepository;
        this.docRepo = docRepo;
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

    // Authenticate DoctorLogin
    public int authenticateDoctorLogin(DoctorLogin docLogin) {
        BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
        DoctorLogin docDetails = doctorLoginRepository.readDoctorLogin(docLogin.getUsername());
        if (bcrypt.matches(docLogin.getPassword(), docDetails.getPassword())) {
            return docDetails.getDoctorId();
        }
        return -1;
    }

    // Reset Password
    public boolean resetPassword(String username, String oldPassword, String newPassword, String email) {
        DoctorLogin doctorLogin = doctorLoginRepository.readDoctorLogin(username);
        if (doctorLogin != null) {
            BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
            if (bcrypt.matches(oldPassword, doctorLogin.getPassword())) {
                String encPass = bcrypt.encode(newPassword);
                doctorLogin.setPassword(encPass);
                doctorLoginRepository.updateDoctorLogin(doctorLogin);
                // Send email to doctor about password update
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
    public boolean forgotPassword(String username, String initiator_role) {
//        System.out.println(initiator_role+": "+username);
        DoctorLogin doctorLogin = doctorLoginRepository.readDoctorLogin(username);
        if (doctorLogin != null) {
            // Generate a temporary password
            String tempPassword = PasswordGenerator.generatePassword();
            BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
            String encPass = bcrypt.encode(tempPassword);
            doctorLogin.setPassword(encPass);
            String subject="", body="";
            if(initiator_role.equalsIgnoreCase("doctor")) {
            // Send the temporary password to the doctor's email
            subject = "Temporary Password for Your Account";
            body = "Dear " + username + ",\r\n\r\n" +
                    "We have generated a temporary password for your account. Please use the following temporary password to log in and reset your password immediately:\r\n\r\n" +
                    "Temporary Password: " + tempPassword + "\r\n\r\n" +
                    "If you did not request a password reset, please contact your manager or the system administrators immediately to ensure the security of your account.\r\n\r\n" +
                    "Thank you for your attention to this matter.\r\n\r\n" +
                    "Best regards,\r\n" +
                    "Medicare Support Team";
            }
            else if(initiator_role.equalsIgnoreCase("admin")) {
            	subject = "Admin has reset your Account's Password ";

            	body = "Dear " + username + ",\r\n\r\n" +
            	              "Your account password has been reset by the administrator. Please use the following temporary password to log in and reset your password immediately:\r\n\r\n" +
            	              "Temporary Password: " + tempPassword + "\r\n\r\n" +
            	              "If you did not request this password reset, please contact your manager or the system administrators immediately to ensure the security of your account.\r\n\r\n" +
            	              "Thank you for your prompt attention to this matter.\r\n\r\n" +
            	              "Best regards,\r\n" +
            	              "Medicare Support Team";

            }
            else {
            	subject = "Urgent: Unauthorized Password Reset Attempt";

            	body = "Dear " + username + ",\r\n\r\n" +
            	              "We have detected an unauthorized attempt to reset your account password. For your security, please do not use the temporary password provided and contact your manager or the system administrators immediately to secure your account.\r\n\r\n" +
            	              "If you did not request this password reset, it is crucial to report this incident as soon as possible to prevent any unauthorized access.\r\n\r\n" +
            	              "Thank you for your prompt attention to this matter.\r\n\r\n" +
            	              "Best regards,\r\n" +
            	              "Medicare Support Team";
                Doctor doc = docRepo.readDoctor(doctorLogin.getDoctorId());
                mail.sendMail(doc.getEmail(), subject, body);
            	return false;
            }
            doctorLoginRepository.updateDoctorLogin(doctorLogin);
            // get the email from doctor Repository..
            Doctor doc = docRepo.readDoctor(doctorLogin.getDoctorId());
            mail.sendMail(doc.getEmail(), subject, body);

            return true;
        }
        return false;
    }
}
