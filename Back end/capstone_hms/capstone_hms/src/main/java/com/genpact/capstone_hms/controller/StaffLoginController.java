package com.genpact.capstone_hms.controller;

import com.genpact.capstone_hms.model.AdminLogin;
import com.genpact.capstone_hms.model.StaffLogin;
import com.genpact.capstone_hms.service.StaffLoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/staff-logins")
@CrossOrigin(origins = "http://localhost:5173")
public class StaffLoginController {

    private final StaffLoginService staffLoginService;

    @Autowired
    public StaffLoginController(StaffLoginService staffLoginService) {
        this.staffLoginService = staffLoginService;
    }

    @PostMapping("/register")
    @ResponseBody
    public ResponseEntity<String> registerStaffLogin(@RequestBody StaffLogin staffLogin) {
        staffLoginService.createStaffLogin(staffLogin);
        return ResponseEntity.ok("Staff login registered successfully");
    }

    @GetMapping("/{username}")
    @ResponseBody
    public ResponseEntity<StaffLogin> getStaffLoginById(@PathVariable String username) {
        StaffLogin staffLogin = staffLoginService.readStaffLogin(username);
        if (staffLogin != null) {
            return ResponseEntity.ok(staffLogin);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/update/{id}")
    @ResponseBody
    public ResponseEntity<String> updateStaffLogin(@RequestBody StaffLogin staffLogin, @PathVariable int id) {
        staffLogin.setLoginId(id);
        staffLoginService.updateStaffLogin(staffLogin);
        return ResponseEntity.ok("Staff login updated successfully");
    }

    @DeleteMapping("/delete/{id}")
    @ResponseBody
    public ResponseEntity<String> deleteStaffLogin(@PathVariable int id) {
        staffLoginService.deleteStaffLogin(id);
        return ResponseEntity.ok("Staff login deleted successfully");
    }

    @GetMapping("/search")
    @ResponseBody
    public ResponseEntity<List<StaffLogin>> searchStaffLogins(@RequestParam String keyword) {
        List<StaffLogin> staffLogins = staffLoginService.searchStaffLogins(keyword);
        return ResponseEntity.ok(staffLogins);
    }

    @GetMapping("/all")
    @ResponseBody
    public ResponseEntity<List<StaffLogin>> getAllStaffLogins() {
        List<StaffLogin> staffLogins = staffLoginService.getAllStaffLogins();
        return ResponseEntity.ok(staffLogins);
    }
        
    @PostMapping("/auth")
    @ResponseBody
    public boolean AuthenticateStaffLogin(@RequestBody StaffLogin staffLogin) {
        return staffLoginService.authenticateStaffLogin(staffLogin);
    }

}
