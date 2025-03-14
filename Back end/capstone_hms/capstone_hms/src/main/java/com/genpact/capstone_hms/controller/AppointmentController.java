package com.genpact.capstone_hms.controller;

import com.genpact.capstone_hms.service.AppointmentService;
import com.genpact.capstone_hms.model.Appointment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "http://localhost:5173")
public class AppointmentController {

    private final AppointmentService appointmentService;

    @Autowired
    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @PostMapping("/add")
    public ResponseEntity<String> createAppointment(@RequestBody Appointment appointment) {
        appointmentService.createAppointment(appointment);
        return ResponseEntity.status(HttpStatus.CREATED).body("Appointment created successfully");
    }

    @GetMapping("/{id}")
    public ResponseEntity<Appointment> getAppointmentById(@PathVariable int id) {
        Appointment appointment = appointmentService.readAppointment(id);
        return (appointment != null) ? ResponseEntity.ok(appointment) : ResponseEntity.notFound().build();
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateAppointment(@RequestBody Appointment appointment, @PathVariable int id) {
        appointment.setAppointmentID(id);
        appointmentService.updateAppointment(appointment);
        return ResponseEntity.ok("Appointment updated successfully");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteAppointment(@PathVariable int id) {
        appointmentService.deleteAppointment(id);
        return ResponseEntity.noContent().build();  // 204 No Content
    }

    @GetMapping("/search")
    public ResponseEntity<List<Appointment>> searchAppointments(@RequestParam String keyword) {
        List<Appointment> appointments = appointmentService.searchAppointments(keyword);
        return ResponseEntity.ok(appointments);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Appointment>> getAllAppointments() {
        List<Appointment> appointments = appointmentService.getAllAppointments();
        return ResponseEntity.ok(appointments);
    }
}
