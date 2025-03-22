package com.genpact.capstone_hms.controller;

import com.genpact.capstone_hms.model.DoctorLogin;
import com.genpact.capstone_hms.service.DoctorLoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doctor-logins")
@CrossOrigin(origins = "http://localhost:5173")
public class DoctorLoginController {

    private final DoctorLoginService doctorLoginService;

    @Autowired
    public DoctorLoginController(DoctorLoginService doctorLoginService) {
        this.doctorLoginService = doctorLoginService;
    }

    @PostMapping("/register")
    @ResponseBody
    public ResponseEntity<String> registerDoctorLogin(@RequestBody DoctorLogin doctorLogin) {
        doctorLoginService.createDoctorLogin(doctorLogin);
        return ResponseEntity.ok("Doctor login registered successfully");
    }

    @GetMapping("/{username}")
    @ResponseBody
    public ResponseEntity<DoctorLogin> getDoctorLoginById(@PathVariable String username) {
        DoctorLogin doctorLogin = doctorLoginService.readDoctorLogin(username);
        if (doctorLogin != null) {
            return ResponseEntity.ok(doctorLogin);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/update/{id}")
    @ResponseBody
    public ResponseEntity<String> updateDoctorLogin(@RequestBody DoctorLogin doctorLogin, @PathVariable int id) {
        doctorLogin.setLoginId(id);
        doctorLoginService.updateDoctorLogin(doctorLogin);
        return ResponseEntity.ok("Doctor login updated successfully");
    }

    @DeleteMapping("/delete/{id}")
    @ResponseBody
    public ResponseEntity<String> deleteDoctorLogin(@PathVariable int id) {
        doctorLoginService.deleteDoctorLogin(id);
        return ResponseEntity.ok("Doctor login deleted successfully");
    }

    @GetMapping("/search")
    @ResponseBody
    public ResponseEntity<List<DoctorLogin>> searchDoctorLogins(@RequestParam String keyword) {
        List<DoctorLogin> doctorLogins = doctorLoginService.searchDoctorLogins(keyword);
        return ResponseEntity.ok(doctorLogins);
    }

    @GetMapping("/all")
    @ResponseBody
    public ResponseEntity<List<DoctorLogin>> getAllDoctorLogins() {
        List<DoctorLogin> doctorLogins = doctorLoginService.getAllDoctorLogins();
        return ResponseEntity.ok(doctorLogins);
    }
    
    @PostMapping("/auth")
    @ResponseBody
    public int authenticateDoctorLogin(@RequestBody DoctorLogin docLogin) {
        return doctorLoginService.authenticateDoctorLogin(docLogin);
    }

    @PostMapping("/reset-password")
    @ResponseBody
    public ResponseEntity<String> resetPassword(@RequestParam String username, @RequestParam String oldPassword, @RequestParam String newPassword, @RequestParam String email) {
        boolean result = doctorLoginService.resetPassword(username, oldPassword, newPassword, email);
        if (result) {
            return ResponseEntity.ok("Password reset successfully");
        } else {
            return ResponseEntity.badRequest().body("Failed to reset password. Please check your old password.");
        }
    }

    @PostMapping("/forgot-password")
    @ResponseBody
    public ResponseEntity<String> forgotPassword(@RequestParam String username, @RequestParam String initiator_role) {	// asking for role because we need to change the mail accordingly..
//       System.out.println(initiator_role+": "+username);
    	boolean result = doctorLoginService.forgotPassword(username, initiator_role);
        if (result) {
            return ResponseEntity.ok("Temporary password sent successfully");
        } else {
            return ResponseEntity.badRequest().body("Failed to set temporary password");
        }
    }
}
