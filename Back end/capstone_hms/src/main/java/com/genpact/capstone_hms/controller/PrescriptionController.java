package com.genpact.capstone_hms.controller;

import com.genpact.capstone_hms.service.PrescriptionService;
import com.genpact.capstone_hms.model.Prescription;
import com.genpact.capstone_hms.patients.model.Patient;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/prescriptions")
@CrossOrigin(origins = "http://localhost:5173")
public class PrescriptionController {

    private final PrescriptionService prescriptionService;

    @Autowired
    public PrescriptionController(PrescriptionService prescriptionService) {
        this.prescriptionService = prescriptionService;
    }

    @PostMapping("/add")
    public ResponseEntity<String> createPrescription(@RequestBody Prescription prescription) {
//    	System.out.println(prescription);
        prescriptionService.createPrescription(prescription);
        return ResponseEntity.status(HttpStatus.CREATED).body("Prescription created successfully");
    }

    @GetMapping("/{id}")
    public ResponseEntity<Prescription> getPrescriptionById(@PathVariable int id) {
        Prescription prescription = prescriptionService.readPrescription(id);
        return (prescription != null) ? ResponseEntity.ok(prescription) : ResponseEntity.notFound().build();
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> updatePrescription(@RequestBody Prescription prescription, @PathVariable int id) {
        prescription.setPrescriptionId(id);
        prescriptionService.updatePrescription(prescription);
        return ResponseEntity.ok("Prescription updated successfully");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deletePrescription(@PathVariable int id) {
        prescriptionService.deletePrescription(id);
        return ResponseEntity.noContent().build();  // 204 No Content
    }

    @GetMapping("/search")
    public ResponseEntity<List<Prescription>> searchPrescriptions(@RequestParam String keyword) {
        List<Prescription> prescriptions = prescriptionService.searchPrescriptions(keyword);
        return ResponseEntity.ok(prescriptions);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Prescription>> getAllPrescriptions() {
        List<Prescription> prescriptions = prescriptionService.getAllPrescriptions();
        return ResponseEntity.ok(prescriptions);
    }
    
    @GetMapping("/all/{id}")
    public ResponseEntity<List<Prescription>> getAllPrescriptionsByDoctor(@PathVariable int id) {
        List<Prescription> prescriptions = prescriptionService.getAllPrescriptionsByDoctor(id);
        return ResponseEntity.ok(prescriptions);
    }
//    @GetMapping("/my-patients/{doctorId}")
//    public ResponseEntity<List<Patient>> getPatientsByDoctor(@PathVariable int doctorId) {
//        List<Patient> patients = prescriptionService.getPatientsByDoctor(doctorId);
//        return ResponseEntity.ok(patients);
//    }
}
