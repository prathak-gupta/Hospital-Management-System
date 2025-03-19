package com.genpact.capstone_hms.admin.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.genpact.capstone_hms.admin.model.Admin;
import com.genpact.capstone_hms.admin.service.AdminService;

@RestController
@RequestMapping("/api/admins")
public class AdminController {

    private final AdminService adminService;

    @Autowired
    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping("/register")
    @ResponseBody    
    public ResponseEntity<String> registerAdmin(@RequestBody Admin admin) {
        adminService.registerAdmin(admin);
        return ResponseEntity.ok("Admin registered successfully");
    }

    @GetMapping("/{id}")
    @ResponseBody
    public ResponseEntity<Admin> getAdminById(@PathVariable int id) {
        Admin admin = adminService.getAdminById(id);
        if (admin != null) {
            return ResponseEntity.ok(admin);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/update/{id}")
    @ResponseBody
    public ResponseEntity<String> updateAdmin(@RequestBody Admin admin, @PathVariable int id) {
//    	System.out.print(admin);
    	admin.setAdminID(id);
        adminService.updateAdmin(admin);
        return ResponseEntity.ok("Admin updated successfully");
    }

    @DeleteMapping("/delete/{id}")
    @ResponseBody
    public ResponseEntity<String> deleteAdmin(@PathVariable int id) {
        adminService.deleteAdmin(id);
        return ResponseEntity.ok("Admin deleted successfully");
    }

    @GetMapping("/search")
    @ResponseBody
    public ResponseEntity<List<Admin>> searchAdmins(@RequestParam String keyword) {
        System.out.println("Received keyword: " + keyword);
        List<Admin> admins = adminService.searchAdmins(keyword);
        System.out.println("Admins found: " + admins);
        return ResponseEntity.ok(admins);
    }
    
    @GetMapping("/all")
    @ResponseBody
    public ResponseEntity<List<Admin>> getAllAdmins(){
        List<Admin> admins = adminService.getAllAdmins();
        return ResponseEntity.ok(admins);    	
    }
}
