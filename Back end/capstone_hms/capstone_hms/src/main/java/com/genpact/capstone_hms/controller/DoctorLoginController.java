package com.genpact.capstone_hms.controller;

import com.genpact.capstone_hms.model.AdminLogin;
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
    public boolean AuthenticateAdminLogin(@RequestBody DoctorLogin docLogin) {
        return doctorLoginService.authenticateDoctorLogin(docLogin);
    }
}
