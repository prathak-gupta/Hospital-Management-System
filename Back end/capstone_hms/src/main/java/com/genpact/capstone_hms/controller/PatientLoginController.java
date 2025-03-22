package com.genpact.capstone_hms.controller;

import com.genpact.capstone_hms.model.PatientLogin;
import com.genpact.capstone_hms.service.PatientLoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/patient-logins")
@CrossOrigin(origins = "http://localhost:5173")
public class PatientLoginController {

    private final PatientLoginService patientLoginService;

    @Autowired
    public PatientLoginController(PatientLoginService patientLoginService) {
        this.patientLoginService = patientLoginService;
    }

    @PostMapping("/register")
    @ResponseBody
    public ResponseEntity<String> registerPatientLogin(@RequestBody PatientLogin patientLogin) {
        patientLoginService.createPatientLogin(patientLogin);
        return ResponseEntity.ok("Patient login registered successfully");
    }

    @GetMapping("/{username}")
    @ResponseBody
    public ResponseEntity<PatientLogin> getPatientLoginById(@PathVariable String username) {
        PatientLogin patientLogin = patientLoginService.readPatientLogin(username);
        if (patientLogin != null) {
            return ResponseEntity.ok(patientLogin);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/update/{id}")
    @ResponseBody
    public ResponseEntity<String> updatePatientLogin(@RequestBody PatientLogin patientLogin, @PathVariable int id) {
        patientLogin.setLoginId(id);
        patientLoginService.updatePatientLogin(patientLogin);
        return ResponseEntity.ok("Patient login updated successfully");
    }

    @DeleteMapping("/delete/{id}")
    @ResponseBody
    public ResponseEntity<String> deletePatientLogin(@PathVariable int id) {
        patientLoginService.deletePatientLogin(id);
        return ResponseEntity.ok("Patient login deleted successfully");
    }

    @GetMapping("/search")
    @ResponseBody
    public ResponseEntity<List<PatientLogin>> searchPatientLogins(@RequestParam String keyword) {
        List<PatientLogin> patientLogins = patientLoginService.searchPatientLogins(keyword);
        return ResponseEntity.ok(patientLogins);
    }

    @GetMapping("/all")
    @ResponseBody
    public ResponseEntity<List<PatientLogin>> getAllPatientLogins() {
        List<PatientLogin> patientLogins = patientLoginService.getAllPatientLogins();
        return ResponseEntity.ok(patientLogins);
    }
        
    @PostMapping("/auth")
    @ResponseBody
    public int authenticatePatientLogin(@RequestBody PatientLogin patLogin) {
        return patientLoginService.authenticatePatientLogin(patLogin);
    }

    @PostMapping("/reset-password")
    @ResponseBody
    public ResponseEntity<String> resetPassword(@RequestParam String username, @RequestParam String oldPassword, @RequestParam String newPassword, @RequestParam String email) {
        boolean result = patientLoginService.resetPassword(username, oldPassword, newPassword, email);
        if (result) {
            return ResponseEntity.ok("Password reset successfully");
        } else {
            return ResponseEntity.badRequest().body("Failed to reset password. Please check your old password.");
        }
    }

    @PostMapping("/forgot-password")
    @ResponseBody
    public ResponseEntity<String> forgotPassword(@RequestParam String username, @RequestParam String initiator_role) {
        boolean result = patientLoginService.forgotPassword(username, initiator_role);
        if (result) {
            return ResponseEntity.ok("Temporary password sent successfully");
        } else {
            return ResponseEntity.badRequest().body("Failed to set temporary password");
        }
    }
}
