package com.genpact.capstone_hms.controller;

import com.genpact.capstone_hms.model.AdminLogin;
import com.genpact.capstone_hms.service.AdminLoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin-logins")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminLoginController {

    private final AdminLoginService adminLoginService;

    @Autowired
    public AdminLoginController(AdminLoginService adminLoginService) {
        this.adminLoginService = adminLoginService;
    }
    
    @PostMapping("/register")
    @ResponseBody
    public ResponseEntity<String> registerAdminLogin(@RequestBody AdminLogin adminLogin) {
        adminLoginService.createAdminLogin(adminLogin);
        return ResponseEntity.ok("Admin login registered successfully");
    }

    @GetMapping("/{username}")
    @ResponseBody
    public ResponseEntity<AdminLogin> getAdminLoginById(@PathVariable String username) {
        AdminLogin adminLogin = adminLoginService.readAdminLogin(username);
        if (adminLogin != null) {
            return ResponseEntity.ok(adminLogin);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    

    @PutMapping("/update/{id}")
    @ResponseBody
    public ResponseEntity<String> updateAdminLogin(@RequestBody AdminLogin adminLogin, @PathVariable int id) {
        adminLogin.setLoginId(id);
        adminLoginService.updateAdminLogin(adminLogin);
        return ResponseEntity.ok("Admin login updated successfully");
    }

    @DeleteMapping("/delete/{id}")
    @ResponseBody
    public ResponseEntity<String> deleteAdminLogin(@PathVariable int id) {
        adminLoginService.deleteAdminLogin(id);
        return ResponseEntity.ok("Admin login deleted successfully");
    }

    @GetMapping("/search")
    @ResponseBody
    public ResponseEntity<List<AdminLogin>> searchAdminLogins(@RequestParam String keyword) {
        List<AdminLogin> adminLogins = adminLoginService.searchAdminLogins(keyword);
        return ResponseEntity.ok(adminLogins);
    }

    @GetMapping("/all")
    @ResponseBody
    public ResponseEntity<List<AdminLogin>> getAllAdminLogins() {
        List<AdminLogin> adminLogins = adminLoginService.getAllAdminLogins();
        return ResponseEntity.ok(adminLogins);
    }
    
    @PostMapping("/auth")
    @ResponseBody
    public boolean AuthenticateAdminLogin(@RequestBody AdminLogin adminLogin) {
        return adminLoginService.authenticateAdminLogin(adminLogin);
    }

}
