package com.genpact.capstone_hms.staff.controller;

import com.genpact.capstone_hms.staff.model.Staff;
import com.genpact.capstone_hms.staff.service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/staff")
@CrossOrigin(origins = "http://localhost:5173")

public class StaffController {

    private final StaffService staffService;

    @Autowired
    public StaffController(StaffService staffService) {
        this.staffService = staffService;
    }

    @PostMapping("/register")
    @ResponseBody
    public ResponseEntity<String> registerStaff(@RequestBody Staff staff) {
        staffService.createStaff(staff);
        return ResponseEntity.ok("Staff registered successfully");
    }

    @GetMapping("/{id}")
    @ResponseBody
    public ResponseEntity<Staff> getStaffById(@PathVariable int id) {
        Staff staff = staffService.readStaff(id);
        if (staff != null) {
            return ResponseEntity.ok(staff);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/update/{id}")
    @ResponseBody
    public ResponseEntity<String> updateStaff(@RequestBody Staff staff, @PathVariable int id) {
        staff.setStaffID(id);
        staffService.updateStaff(staff);
        return ResponseEntity.ok("Staff updated successfully");
    }

    @DeleteMapping("/delete/{id}")
    @ResponseBody
    public ResponseEntity<String> deleteStaff(@PathVariable int id) {
        staffService.deleteStaff(id);
        return ResponseEntity.ok("Staff deleted successfully");
    }

    @GetMapping("/search")
    @ResponseBody
    public ResponseEntity<List<Staff>> searchStaff(@RequestParam String keyword) {
//        System.out.println("Received keyword: " + keyword);
        List<Staff> staff = staffService.searchStaff(keyword);
//        System.out.println("Staff found: " + staff);
        return ResponseEntity.ok(staff);
    }

    @GetMapping("/all")
    @ResponseBody
    public ResponseEntity<List<Staff>> getAllStaff() {
        List<Staff> staff = staffService.getAllStaff();
        return ResponseEntity.ok(staff);
    }
}