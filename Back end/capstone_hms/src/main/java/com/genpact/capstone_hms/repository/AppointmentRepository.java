package com.genpact.capstone_hms.repository;

import com.genpact.capstone_hms.model.Appointment;
import com.genpact.capstone_hms.patients.model.Patient;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class AppointmentRepository {
    // CRUDS - Create, Read, Update, Delete, Search
    private JdbcTemplate appointmentJdbc;
    private RowMapper<Appointment> appointmentRowMapper = new RowMapper<Appointment>() {
        @Override
        public Appointment mapRow(ResultSet resultSet, int rowNum) throws SQLException {
            return new Appointment(
                resultSet.getInt("AppointmentID"),
                resultSet.getInt("PatientID"),
                resultSet.getInt("DoctorID"),
                resultSet.getDate("AppointmentDate"),
                resultSet.getTime("AppointmentTime"),
                resultSet.getString("Reason"),
                resultSet.getString("appointmentType"),
                resultSet.getTimestamp("registration_time")
            );
        }
    };

    private RowMapper<Patient> patientRowMapper = new RowMapper<Patient>() {
        @Override
        public Patient mapRow(ResultSet resultSet, int rowNum) throws SQLException {
            return new Patient(
                resultSet.getInt("PatientID"),
                resultSet.getString("FirstName"),
                resultSet.getString("LastName"),
                resultSet.getDate("DateOfBirth"),
                resultSet.getString("Gender"),
                resultSet.getString("Address"),
                resultSet.getString("PhoneNumber"),
                resultSet.getString("Email"),
                resultSet.getString("EmergencyContactName"),
                resultSet.getString("EmergencyContactPhone"),
                resultSet.getTimestamp("Registration_date")
            );
        }
    };

    public JdbcTemplate getAppointmentJdbc() {
        return appointmentJdbc;
    }

    public AppointmentRepository(JdbcTemplate appointmentJdbc) {
        super();
        this.appointmentJdbc = appointmentJdbc;
    }

    // Create Appointment
    public void createAppointment(Appointment appointment) {
        String sql = "INSERT INTO Appointments (PatientID, DoctorID, AppointmentDate, AppointmentTime, appointmentType, Reason) VALUES (?, ?, ?, ?, ?, ?)";
        try {
            appointmentJdbc.update(sql, appointment.getPatientID(), appointment.getDoctorID(), appointment.getAppointmentDate(), appointment.getAppointmentTime(), appointment.getAppointmentType(), appointment.getReason());
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
        }
    }

    // Read Appointment
    public Appointment readAppointment(int appointmentID) {
        String sql = "SELECT * FROM Appointments WHERE AppointmentID = ?";
        try {
            return appointmentJdbc.queryForObject(sql, appointmentRowMapper, appointmentID);
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }

    // Update Appointment
    public void updateAppointment(Appointment appointment) {
        String sql = "UPDATE Appointments SET PatientID = ?, DoctorID = ?, AppointmentDate = ?, AppointmentTime = ?, appointmentType = ?, Reason = ? WHERE AppointmentID = ?";
        try {
            appointmentJdbc.update(sql, appointment.getPatientID(), appointment.getDoctorID(), appointment.getAppointmentDate(), appointment.getAppointmentTime(), appointment.getAppointmentType(), appointment.getReason(), appointment.getAppointmentID());
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
        }
    }

    // Delete Appointment
    public void deleteAppointment(int appointmentID) {
        String sql = "DELETE FROM Appointments WHERE AppointmentID = ?";
        try {
            appointmentJdbc.update(sql, appointmentID);
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
        }
    }

    // Search Appointments
    public List<Appointment> searchAppointments(String keyword) {
        String sql = "SELECT * FROM Appointments WHERE Reason LIKE ? OR appointmentType LIKE ?";
        try {
            String formattedKeyword = "%" + keyword.trim().replaceAll("\\s+", " ") + "%";
            return appointmentJdbc.query(sql, appointmentRowMapper, formattedKeyword, formattedKeyword);
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }

    // Get All Appointments
    public List<Appointment> getAllAppointments() {
        String sql = "SELECT * FROM Appointments";
        try {
            return appointmentJdbc.query(sql, appointmentRowMapper);
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }

    // Get Patients by Doctor
    public List<Patient> getPatientsByDoctor(int doctorId) {
        String sql = "SELECT p.* FROM Patients p JOIN Appointments a ON p.PatientID = a.PatientID WHERE a.DoctorID = ?";
        try {
            return appointmentJdbc.query(sql, patientRowMapper, doctorId);
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }

//    // Get Appointments by Doctor
//    public List<Appointment> getAppointmentsByDoctor(int doctorId) {
//        String sql = "SELECT * FROM Appointments WHERE DoctorID = ?";
//        try {
//            return appointmentJdbc.query(sql, appointmentRowMapper, doctorId);
//        } catch (Exception e) {
//            System.err.println("Error: " + e.getMessage());
//            e.printStackTrace();
//            return null;
//        }
//    }
}
