package com.genpact.capstone_hms.patients.service;

import com.genpact.capstone_hms.mailsystem.EmailSenderService;
import com.genpact.capstone_hms.model.PatientLogin;
import com.genpact.capstone_hms.patients.model.Patient;
import com.genpact.capstone_hms.patients.repository.PatientRepository;
import com.genpact.capstone_hms.repository.PatientLoginRepository;
import com.genpact.capstone_hms.service.PasswordGenerator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientService {

    private final PatientRepository patientRepository;
    private final PatientLoginRepository plr;
    
    @Autowired
    private EmailSenderService email;

    @Autowired
    public PatientService(PatientRepository patientRepository, PatientLoginRepository plr) {
        this.patientRepository = patientRepository;
        this.plr = plr;
    }

    // Create Patient
    public void createPatient(Patient patient) {
        patientRepository.createPatient(patient);
        
        Patient pat = patientRepository.getLatestPatient();
        if (pat != null) {
            PatientLogin patLogin = new PatientLogin();
            patLogin.setPatientId(pat.getPatientID());
            patLogin.setUsername(pat.getFirstName() + "@" + pat.getPatientID());
            BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
            String userPassword = PasswordGenerator.generatePassword();
            String encPass = bcrypt.encode(userPassword); // generating random password of 12 characters
            String mailBody = "Dear " + pat.getFirstName() + " " + pat.getLastName() + ",\r\n"
                + "\r\n"
                + "Welcome to Medicare Hospital! We are thrilled to have you join us.\r\n"
                + "\r\n"
                + "Here are your login credentials to access our systems:\r\n"
                + "\r\n"
                + "Username: " + pat.getFirstName() + "@" + pat.getPatientID() + "\r\n"
                + "Password: " + userPassword + "\r\n"
                + "\r\n"
                + "Please keep your login credentials confidential to ensure the security of your account.\r\n"
                + "\r\n"
                + "Log in at your earliest convenience and update your password. If you need any assistance, our Helpdesk team is here to help at helpdesk@medicarehospital.com.\r\n"
                + "\r\n"
                + "We look forward to your valuable contributions and hope you have a rewarding experience with us.\r\n"
                + "\r\n"
                + "Best regards,\r\n"
                + "Medicare Hospital";
            String subject = "Welcome to Medicare Hospital! Your Login Credentials";

            // Send password to the user via email
            email.sendMail(pat.getEmail(), subject, mailBody);

            patLogin.setPassword(encPass);
            plr.createPatientLogin(patLogin);
        } else {
            System.out.println("Latest Patient Entry Can't be null");
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
