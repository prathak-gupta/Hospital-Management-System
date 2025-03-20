package com.genpact.capstone_hms.service;

import com.genpact.capstone_hms.model.Prescription;
import com.genpact.capstone_hms.repository.PrescriptionRepository;
import com.genpact.capstone_hms.patients.model.Patient;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PrescriptionService {

    private final PrescriptionRepository prescriptionRepository;

    @Autowired
    public PrescriptionService(PrescriptionRepository prescriptionRepository) {
        this.prescriptionRepository = prescriptionRepository;
    }

    // Create Prescription
    public void createPrescription(Prescription prescription) {
        prescriptionRepository.createPrescription(prescription);
    }

    // Read Prescription
    public Prescription readPrescription(int prescriptionId) {
        return prescriptionRepository.readPrescription(prescriptionId);
    }

    // Update Prescription
    public void updatePrescription(Prescription prescription) {
        prescriptionRepository.updatePrescription(prescription);
    }

    // Delete Prescription
    public void deletePrescription(int prescriptionId) {
        prescriptionRepository.deletePrescription(prescriptionId);
    }

    // Search Prescriptions
    public List<Prescription> searchPrescriptions(String keyword) {
        return prescriptionRepository.searchPrescriptions(keyword);
    }

    // Get All Prescriptions
    public List<Prescription> getAllPrescriptions() {
        return prescriptionRepository.getAllPrescriptions();
    }
    
    public List<Prescription> getAllPrescriptionsByDoctor(int docId) {
        return prescriptionRepository.getAllPrescriptionsByDoctor(docId);
    }
        
    
//    // Get Patients by Doctor
//    public List<Patient> getPatientsByDoctor(int doctorId) {
//        return prescriptionRepository.getPatientsByDoctor(doctorId);
//    }
}
