package com.genpact.capstone_hms.doctors.controller;

import com.genpact.capstone_hms.doctors.model.Doctor;
import com.genpact.capstone_hms.doctors.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doctors")
@CrossOrigin(origins = "http://localhost:5173")
public class DoctorController {

    private final DoctorService doctorService;

    @Autowired
    public DoctorController(DoctorService doctorService) {
        this.doctorService = doctorService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerDoctor(@RequestBody Doctor doctor) {
        doctorService.createDoctor(doctor);
        return ResponseEntity.status(HttpStatus.CREATED).body("Doctor registered successfully");
    }

    @GetMapping("/{id}")
    public ResponseEntity<Doctor> getDoctorById(@PathVariable int id) {
        Doctor doctor = doctorService.readDoctor(id);
        return (doctor != null) ? ResponseEntity.ok(doctor) : ResponseEntity.notFound().build();
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateDoctor(@RequestBody Doctor doctor, @PathVariable int id) {
        doctor.setDoctorID(id);
        doctorService.updateDoctor(doctor);
        return ResponseEntity.ok("Doctor updated successfully");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteDoctor(@PathVariable int id) {
        doctorService.deleteDoctor(id);
        return ResponseEntity.noContent().build();  // 204 No Content
    }

    @GetMapping("/search")
    public ResponseEntity<List<Doctor>> searchDoctors(@RequestParam String keyword) {
        List<Doctor> doctors = doctorService.searchDoctors(keyword);
        return ResponseEntity.ok(doctors);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Doctor>> getAllDoctors() {
        List<Doctor> doctors = doctorService.getAllDoctors();
        return ResponseEntity.ok(doctors);
    }
}
