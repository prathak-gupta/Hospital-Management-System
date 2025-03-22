package com.genpact.capstone_hms.service;

import com.genpact.capstone_hms.mailsystem.EmailSenderService;
import com.genpact.capstone_hms.model.PatientLogin;
import com.genpact.capstone_hms.patients.model.Patient;
import com.genpact.capstone_hms.patients.repository.PatientRepository;
import com.genpact.capstone_hms.repository.PatientLoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientLoginService {

    private final PatientLoginRepository patientLoginRepository;
    private final PatientRepository patientRepo;

    @Autowired
    private EmailSenderService mail;

    @Autowired
    public PatientLoginService(PatientLoginRepository patientLoginRepository, PatientRepository patRepo) {
        this.patientLoginRepository = patientLoginRepository;
        this.patientRepo = patRepo;
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

    // Authenticate PatientLogin
    public int authenticatePatientLogin(PatientLogin patLogin) {
        BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
        PatientLogin patDetails = patientLoginRepository.readPatientLogin(patLogin.getUsername());
        if (bcrypt.matches(patLogin.getPassword(), patDetails.getPassword())) {
            return patDetails.getPatientId();
        }
        return -1;
    }

    // Reset Password
    public boolean resetPassword(String username, String oldPassword, String newPassword, String email) {
        PatientLogin patientLogin = patientLoginRepository.readPatientLogin(username);
        if (patientLogin != null) {
            BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
            if (bcrypt.matches(oldPassword, patientLogin.getPassword())) {
                String encPass = bcrypt.encode(newPassword);
                patientLogin.setPassword(encPass);
                patientLoginRepository.updatePatientLogin(patientLogin);
                // Send email to patient about password update
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
        PatientLogin patientLogin = patientLoginRepository.readPatientLogin(username);
        if (patientLogin != null) {
            // Generate a temporary password
            String tempPassword = PasswordGenerator.generatePassword();
            BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
            String encPass = bcrypt.encode(tempPassword);
            patientLogin.setPassword(encPass);
            String subject = "", body = "";
            
            if (initiator_role.equalsIgnoreCase("patient")) {
                // Send the temporary password to the patient's email
                subject = "Temporary Password for Your Account";
                body = "Dear " + username + ",\r\n\r\n" +
                       "We have generated a temporary password for your account. Please use the following temporary password to log in and reset your password immediately:\r\n\r\n" +
                       "Temporary Password: " + tempPassword + "\r\n\r\n" +
                       "If you did not request a password reset, please contact your manager or the system administrators immediately to ensure the security of your account.\r\n\r\n" +
                       "Thank you for your attention to this matter.\r\n\r\n" +
                       "Best regards,\r\n" +
                       "Medicare Support Team";
            } else if (initiator_role.equalsIgnoreCase("admin")) {
                subject = "Admin has reset your Account's Password";

                body = "Dear " + username + ",\r\n\r\n" +
                       "Your account password has been reset by the administrator. Please use the following temporary password to log in and reset your password immediately:\r\n\r\n" +
                       "Temporary Password: " + tempPassword + "\r\n\r\n" +
                       "If you did not request this password reset, please contact your manager or the system administrators immediately to ensure the security of your account.\r\n\r\n" +
                       "Thank you for your prompt attention to this matter.\r\n\r\n" +
                       "Best regards,\r\n" +
                       "Medicare Support Team";
            } else {
                subject = "Urgent: Unauthorized Password Reset Attempt";

                body = "Dear " + username + ",\r\n\r\n" +
                       "We have detected an unauthorized attempt to reset your account password. For your security, please do not use the temporary password provided and contact your manager or the system administrators immediately to secure your account.\r\n\r\n" +
                       "If you did not request this password reset, it is crucial to report this incident as soon as possible to prevent any unauthorized access.\r\n\r\n" +
                       "Thank you for your prompt attention to this matter.\r\n\r\n" +
                       "Best regards,\r\n" +
                       "Medicare Support Team";
                Patient patient = patientRepo.readPatient(patientLogin.getPatientId());
                mail.sendMail(patient.getEmail(), subject, body);
                return false;
            }
            
            patientLoginRepository.updatePatientLogin(patientLogin);
            // get the email from patient Repository..
            Patient patient = patientRepo.readPatient(patientLogin.getPatientId());
            mail.sendMail(patient.getEmail(), subject, body);

            return true;
        }
        return false;
    }

}
