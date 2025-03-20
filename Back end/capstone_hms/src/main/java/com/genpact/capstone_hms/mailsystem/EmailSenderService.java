package com.genpact.capstone_hms.mailsystem;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailSenderService {
	
	@Autowired
	private JavaMailSender mailSender;
	
	
	
	public EmailSenderService(JavaMailSender mailSender) {
		super();
		this.mailSender = mailSender;
	}



	public void sendMail(String toEmail,
							String subject,
							String body) {
		SimpleMailMessage message = new SimpleMailMessage();
		message.setFrom("capstone.project.team01@gmail.com");
		message.setTo(toEmail);
		message.setSubject(subject);
		message.setText(body);
		
		mailSender.send(message);
		System.out.println("Mail Sent Successfully..");
		
	}
}
