package com.genpact.capstone_hms.doctors.service;

import com.genpact.capstone_hms.doctors.model.Doctor;
import com.genpact.capstone_hms.doctors.repository.DoctorRepository;
import com.genpact.capstone_hms.mailsystem.EmailSenderService;
import com.genpact.capstone_hms.model.DoctorLogin;
import com.genpact.capstone_hms.repository.DoctorLoginRepository;
import com.genpact.capstone_hms.service.PasswordGenerator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoctorService {

    private final DoctorRepository doctorRepository;
    private final DoctorLoginRepository dlr;

	@Autowired
	private EmailSenderService email;
	
    @Autowired
    public DoctorService(DoctorRepository doctorRepository, DoctorLoginRepository dlr) {
        this.doctorRepository = doctorRepository;
        this.dlr = dlr;
    }

    // Create Doctor
    public void createDoctor(Doctor doctor) {
        doctorRepository.createDoctor(doctor);
        
        Doctor doc = doctorRepository.getLatestDoctor();
//        System.out.println(doc);
        if(doc != null)
        {
        	DoctorLogin docLogin = new DoctorLogin();
        	String userPassword="";
        	docLogin.setDoctorId(doc.getDoctorID());
        	docLogin.setUsername(doc.getFirstName()+"@"+doc.getDoctorID());
        	BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
        	userPassword = PasswordGenerator.generatePassword();
        	String encPass = bcrypt.encode(userPassword); // generating random password of 12 characters..
        	String mailBody="Dear "+doc.getFirstName()+" "+doc.getLastName()+ ",\r\n"
        			+ "\r\n"
        			+ "We are excited to welcome you to Medicare Hospital! Below are your login credentials to access our systems:\r\n"
        			+ "\r\n"
        			+ "Username: "+doc.getFirstName()+"@"+doc.getDoctorID()+"\r\n"
        			+ "Password: "+userPassword+"\r\n"
        			+ "Please do not share your login credentials with anyone to ensure the security of your account.\r\n"
        			+ "\r\n"
        			+ "Please log in at your earliest convenience and update your password. If you encounter any issues, feel free to reach out to our Helpdesk team at helpdesk@medicarehospital.com.\r\n"
        			+ "\r\n"
        			+ "We look forward to your contributions to our team and hope you have a rewarding experience here.\r\n"
        			+ "\r\n"
        			+ "Best regards,\r\n"
        			+ "Medicare Hospital";
        	String subject = "Welcome to Medicare Hospital! Your Login Credentials";

        	//send password to the user via email..
        	email.sendMail(doc.getEmail(), subject, mailBody);
        	docLogin.setPassword(encPass);
        	dlr.createDoctorLogin(docLogin);
        }
        else
        {
        	System.out.println("Latest Doctor Entery Can't be null");
        }
    }

    // Read Doctor
    public Doctor readDoctor(int doctorID) {
        return doctorRepository.readDoctor(doctorID);
    }

    // Update Doctor
    public void updateDoctor(Doctor doctor) {
        doctorRepository.updateDoctor(doctor);
    }

    // Delete Doctor
    public void deleteDoctor(int doctorID) {
        doctorRepository.deleteDoctor(doctorID);
    }

    // Search Doctors
    public List<Doctor> searchDoctors(String keyword) {
        return doctorRepository.searchDoctors(keyword);
    }

    // Get All Doctors
    public List<Doctor> getAllDoctors() {
        return doctorRepository.getAllDoctors();
    }
}