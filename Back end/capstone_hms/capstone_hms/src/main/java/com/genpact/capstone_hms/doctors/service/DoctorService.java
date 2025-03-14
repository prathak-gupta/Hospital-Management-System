package com.genpact.capstone_hms.doctors.service;

import com.genpact.capstone_hms.doctors.model.Doctor;
import com.genpact.capstone_hms.doctors.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoctorService {

    private final DoctorRepository doctorRepository;

    @Autowired
    public DoctorService(DoctorRepository doctorRepository) {
        this.doctorRepository = doctorRepository;
    }

    // Create Doctor
    public void createDoctor(Doctor doctor) {
        doctorRepository.createDoctor(doctor);
    }

    // Read Doctor
    public Doctor readDoctor(int doctorID) {
        return doctorRepository.readDoctor(doctorID);
    }

    // Update Doctor
    public void updateDoctor(Doctor doctor) {
        doctorRepository.updateDoctor(doctor);
    }

    // Delete Doctor
    public void deleteDoctor(int doctorID) {
        doctorRepository.deleteDoctor(doctorID);
    }

    // Search Doctors
    public List<Doctor> searchDoctors(String keyword) {
        return doctorRepository.searchDoctors(keyword);
    }

    // Get All Doctors
    public List<Doctor> getAllDoctors() {
        return doctorRepository.getAllDoctors();
    }
}