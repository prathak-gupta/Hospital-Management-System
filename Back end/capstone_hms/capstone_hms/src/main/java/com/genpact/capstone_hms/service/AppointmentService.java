package com.genpact.capstone_hms.service;

import com.genpact.capstone_hms.repository.AppointmentRepository;
import com.genpact.capstone_hms.model.Appointment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;

    @Autowired
    public AppointmentService(AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    // Create Appointment
    public void createAppointment(Appointment appointment) {
        appointmentRepository.createAppointment(appointment);
    }

    // Read Appointment
    public Appointment readAppointment(int appointmentID) {
        return appointmentRepository.readAppointment(appointmentID);
    }

    // Update Appointment
    public void updateAppointment(Appointment appointment) {
        appointmentRepository.updateAppointment(appointment);
    }

    // Delete Appointment
    public void deleteAppointment(int appointmentID) {
        appointmentRepository.deleteAppointment(appointmentID);
    }

    // Search Appointments
    public List<Appointment> searchAppointments(String keyword) {
        return appointmentRepository.searchAppointments(keyword);
    }

    // Get All Appointments
    public List<Appointment> getAllAppointments() {
        return appointmentRepository.getAllAppointments();
    }
    


}
