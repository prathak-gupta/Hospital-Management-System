package com.genpact.capstone_hms.repository;

import com.genpact.capstone_hms.model.Prescription;
import com.genpact.capstone_hms.patients.model.Patient;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class PrescriptionRepository {
    // CRUDS - Create, Read, Update, Delete, Search
    private JdbcTemplate prescriptionJdbc;
    private RowMapper<Prescription> prescriptionRowMapper = new RowMapper<Prescription>() {
        @Override
        public Prescription mapRow(ResultSet resultSet, int rowNum) throws SQLException {
            return new Prescription(
                resultSet.getInt("prescriptionId"),
                resultSet.getInt("patientId"),
                resultSet.getInt("doctorId"),
                resultSet.getString("medication_name"),
                resultSet.getString("dosage"),
                resultSet.getString("frequency"),
                resultSet.getString("duration"),
                resultSet.getDate("issue_date"),
                resultSet.getString("notes")
            );
        }
    };

    private RowMapper<Patient> patientRowMapper = new RowMapper<Patient>() {
        @Override
        public Patient mapRow(ResultSet resultSet, int rowNum) throws SQLException {
            return new Patient(
                resultSet.getInt("patientId"),
                resultSet.getString("firstName"),
                resultSet.getString("lastName"),
                resultSet.getDate("dateOfBirth"),
                resultSet.getString("gender"),
                resultSet.getString("address"),
                resultSet.getString("phoneNumber"),
                resultSet.getString("email"),
                resultSet.getString("emergencyContactName"),
                resultSet.getString("emergencyContactPhone"),
                resultSet.getTimestamp("registration_date")
            );
        }
    };

    public JdbcTemplate getPrescriptionJdbc() {
        return prescriptionJdbc;
    }

    public PrescriptionRepository(JdbcTemplate prescriptionJdbc) {
        super();
        this.prescriptionJdbc = prescriptionJdbc;
    }

    // Create Prescription
    public void createPrescription(Prescription prescription) {
        String sql = "INSERT INTO prescriptions (patientId, doctorId, medication_name, dosage, frequency, duration, issue_date, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        try {
            prescriptionJdbc.update(sql, prescription.getPatientId(), prescription.getDoctorId(), prescription.getMedicationName(), prescription.getDosage(), prescription.getFrequency(), prescription.getDuration(), prescription.getIssueDate(), prescription.getNotes());
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
        }
    }

    // Read Prescription
    public Prescription readPrescription(int prescriptionId) {
        String sql = "SELECT * FROM prescriptions WHERE prescriptionId = ?";
        try {
            return prescriptionJdbc.queryForObject(sql, prescriptionRowMapper, prescriptionId);
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }

    // Update Prescription
    public void updatePrescription(Prescription prescription) {
        String sql = "UPDATE prescriptions SET patientId = ?, doctorId = ?, medication_name = ?, dosage = ?, frequency = ?, duration = ?, issue_date = ?, notes = ? WHERE prescriptionId = ?";
        try {
            prescriptionJdbc.update(sql, prescription.getPatientId(), prescription.getDoctorId(), prescription.getMedicationName(), prescription.getDosage(), prescription.getFrequency(), prescription.getDuration(), prescription.getIssueDate(), prescription.getNotes(), prescription.getPrescriptionId());
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
        }
    }

    // Delete Prescription
    public void deletePrescription(int prescriptionId) {
        String sql = "DELETE FROM prescriptions WHERE prescriptionId = ?";
        try {
            prescriptionJdbc.update(sql, prescriptionId);
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
        }
    }

    // Search Prescriptions
    public List<Prescription> searchPrescriptions(String keyword) {
        String sql = "SELECT * FROM prescriptions WHERE medication_name LIKE ? OR notes LIKE ?";
        try {
            String formattedKeyword = "%" + keyword.trim().replaceAll("\\s+", " ") + "%";
            return prescriptionJdbc.query(sql, prescriptionRowMapper, formattedKeyword, formattedKeyword);
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }

    // Get All Prescriptions
    public List<Prescription> getAllPrescriptions() {
        String sql = "SELECT * FROM prescriptions";
        try {
            return prescriptionJdbc.query(sql, prescriptionRowMapper);
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }

    public List<Prescription> getAllPrescriptionsByDoctor(int docId) {
        String sql = "SELECT * FROM prescriptions where doctorId=?";
        try {
            return prescriptionJdbc.query(sql, prescriptionRowMapper,docId);
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }

//    // Get Patients by Doctor
//    public List<Patient> getPatientsByDoctor(int doctorId) {
//        String sql = "SELECT p.* FROM patients p JOIN prescriptions pr ON p.patientId = pr.patientId WHERE pr.doctorId = ?";
//        try {
//            return prescriptionJdbc.query(sql, patientRowMapper, doctorId);
//        } catch (Exception e) {
//            System.err.println("Error: " + e.getMessage());
//            e.printStackTrace();
//            return null;
//        }
//    }
}
