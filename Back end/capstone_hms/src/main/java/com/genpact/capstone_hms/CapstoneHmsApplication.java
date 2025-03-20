package com.genpact.capstone_hms;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;

import com.genpact.capstone_hms.mailsystem.EmailSenderService;

@SpringBootApplication
public class CapstoneHmsApplication {
//	
//	@Autowired
//	private EmailSenderService email;
	
	public static void main(String[] args) {
		
		SpringApplication.run(CapstoneHmsApplication.class, args);
	}
	
//	@EventListener(ApplicationReadyEvent.class)
//	public void sendMail() {
//		email.snedMail("maddyskynet@gmail.com", "Spring Boot Integration Test", "Hii This is just a Test mail.. Feel free to ignore.");
//	}

}
