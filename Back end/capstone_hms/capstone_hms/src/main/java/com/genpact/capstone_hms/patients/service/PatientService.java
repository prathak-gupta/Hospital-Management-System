package com.genpact.capstone_hms.patients.service;

import com.genpact.capstone_hms.patients.model.Patient;
import com.genpact.capstone_hms.patients.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientService {

    private final PatientRepository patientRepository;

    @Autowired
    public PatientService(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    // Create Patient
    public void createPatient(Patient patient) {
        patientRepository.createPatient(patient);
    }

    // Read Patient
    public Patient readPatient(int patientID) {
        return patientRepository.readPatient(patientID);
    }

    // Update Patient
    public void updatePatient(Patient patient) {
        patientRepository.updatePatient(patient);
    }

    // Delete Patient
    public void deletePatient(int patientID) {
        patientRepository.deletePatient(patientID);
    }

    // Search Patients
    public List<Patient> searchPatients(String keyword) {
        return patientRepository.searchPatients(keyword);
    }

    // Get All Patients
    public List<Patient> getAllPatients() {
        return patientRepository.getAllPatients();
    }
}