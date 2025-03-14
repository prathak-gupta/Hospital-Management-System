package com.genpact.capstone_hms.patients.repository;

import com.genpact.capstone_hms.patients.model.Patient;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class PatientRepository {
    // CRUDS - Create, Read, Update, Delete, Search
    private JdbcTemplate patientJdbc;
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

    public JdbcTemplate getPatientJdbc() {
        return patientJdbc;
    }

    public PatientRepository(JdbcTemplate patientJdbc) {
        super();
        this.patientJdbc = patientJdbc;
    }

    // Create Patient
    public void createPatient(Patient patient) {
        String sql = "INSERT INTO Patients (FirstName, LastName, DateOfBirth, Gender, Address, PhoneNumber, Email, EmergencyContactName, EmergencyContactPhone) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        try {
            patientJdbc.update(sql, patient.getFirstName(), patient.getLastName(), patient.getDateOfBirth(), patient.getGender(), patient.getAddress(), patient.getPhoneNumber(), patient.getEmail(), patient.getEmergencyContactName(), patient.getEmergencyContactPhone());
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
        }
    }

    // Read Patient
    public Patient readPatient(int patientID) {
        String sql = "SELECT * FROM Patients WHERE PatientID = ?";
        try {
            return patientJdbc.queryForObject(sql, patientRowMapper, patientID);
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }

    // Update Patient
    public void updatePatient(Patient patient) {
        String sql = "UPDATE Patients SET FirstName = ?, LastName = ?, DateOfBirth = ?, Gender = ?, Address = ?, PhoneNumber = ?, Email = ?, EmergencyContactName = ?, EmergencyContactPhone = ? WHERE PatientID = ?";
        try {
            patientJdbc.update(sql, patient.getFirstName(), patient.getLastName(), patient.getDateOfBirth(), patient.getGender(), patient.getAddress(), patient.getPhoneNumber(), patient.getEmail(), patient.getEmergencyContactName(), patient.getEmergencyContactPhone(), patient.getPatientID());
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
        }
    }

    // Delete Patient
    public void deletePatient(int patientID) {
        String sql = "DELETE FROM Patients WHERE PatientID = ?";
        try {
            patientJdbc.update(sql, patientID);
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
        }
    }

    // Search Patients
    public List<Patient> searchPatients(String keyword) {
        String sql = "SELECT * FROM Patients WHERE FirstName LIKE ? OR LastName LIKE ? OR PhoneNumber LIKE ? OR Email LIKE ? OR EmergencyContactName LIKE ? OR EmergencyContactPhone LIKE ?";
        try {
            String formattedKeyword = "%" + keyword.trim().replaceAll("\\s+", " ") + "%";
            return patientJdbc.query(sql, patientRowMapper, formattedKeyword, formattedKeyword, formattedKeyword, formattedKeyword, formattedKeyword, formattedKeyword);
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }

    // Get All Patients
    public List<Patient> getAllPatients() {
        String sql = "SELECT * FROM Patients";
        try {
            return patientJdbc.query(sql, patientRowMapper);
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }
}