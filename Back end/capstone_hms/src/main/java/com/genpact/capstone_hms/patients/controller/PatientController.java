package com.genpact.capstone_hms.patients.controller;

import com.genpact.capstone_hms.patients.model.Patient;
import com.genpact.capstone_hms.patients.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/patients")
@CrossOrigin(origins = "http://localhost:5173")
public class PatientController {

    private final PatientService patientService;

    @Autowired
    public PatientController(PatientService patientService) {
        this.patientService = patientService;
    }

    @PostMapping("/register")
    @ResponseBody
    public ResponseEntity<String> registerPatient(@RequestBody Patient patient) {
        patientService.createPatient(patient);
        return ResponseEntity.ok("Patient registered successfully");
    }

    @GetMapping("/{id}")
    @ResponseBody
    public ResponseEntity<Patient> getPatientById(@PathVariable int id) {
        Patient patient = patientService.readPatient(id);
        if (patient != null) {
            return ResponseEntity.ok(patient);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/update/{id}")
    @ResponseBody
    public ResponseEntity<String> updatePatient(@RequestBody Patient patient, @PathVariable int id) {
        patient.setPatientID(id);
        patientService.updatePatient(patient);
        return ResponseEntity.ok("Patient updated successfully");
    }

    @DeleteMapping("/delete/{id}")
    @ResponseBody
    public ResponseEntity<String> deletePatient(@PathVariable int id) {
        patientService.deletePatient(id);
        return ResponseEntity.ok("Patient deleted successfully");
    }

    @GetMapping("/search")
    @ResponseBody
    public ResponseEntity<List<Patient>> searchPatients(@RequestParam String keyword) {
        System.out.println("Received keyword: " + keyword);
        List<Patient> patients = patientService.searchPatients(keyword);
        System.out.println("Patients found: " + patients);
        return ResponseEntity.ok(patients);
    }

    @GetMapping("/all")
    @ResponseBody
    public ResponseEntity<List<Patient>> getAllPatients() {
        List<Patient> patients = patientService.getAllPatients();
        return ResponseEntity.ok(patients);
    }
}