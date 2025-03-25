package com.genpact.capstone_hms;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.*;
import java.sql.*;

public class PrescriptionsRepositoryTest {
    private static Connection connection;

    @BeforeAll
    static void setupDatabaseConnection() throws SQLException {
        connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/capstone_hms", "root", "Genpact@123456789");
    }

    @BeforeEach
    void insertTestData() throws SQLException {
        try (Statement stmt = connection.createStatement()) {
            // Ensure a patient exists
            stmt.executeUpdate("INSERT IGNORE INTO patients (PatientID, FirstName, LastName, DateOfBirth, Gender, Address, PhoneNumber, Email) " +
                               "VALUES (1, 'Test', 'Patient', '1994-08-15', 'M', '123 Main St', '9876543210', 'test@example.com')");
            
            // Ensure a doctor exists
            stmt.executeUpdate("INSERT IGNORE INTO doctors (DoctorID, FirstName, LastName, Specialization, PhoneNumber, Email, Department, Qualification, YearsOfExperience) " +
                               "VALUES (1, 'Dr.', 'Test', 'General', '9876543211', 'dr.test@example.com', 'General Medicine', 'MBBS', 10)");
        }
    }

    // ✅ Test inserting a valid prescription
    @Test
    void testInsertValidPrescription() throws SQLException {
        String sql = "INSERT INTO prescriptions (PatientID, DoctorID, medication_name, dosage, frequency, duration, issue_date, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, 1);
            stmt.setInt(2, 1);
            stmt.setString(3, "Paracetamol");
            stmt.setString(4, "500mg");
            stmt.setString(5, "Twice a day");
            stmt.setString(6, "5 days");
            stmt.setDate(7, Date.valueOf("2024-09-01"));
            stmt.setString(8, "Take after meals");

            int rowsInserted = stmt.executeUpdate();
            assertTrue(rowsInserted > 0, "Prescription should be inserted successfully");
        }
    }

    // ❌ Test inserting a prescription with an invalid PatientID
    @Test
    void testInsertInvalidPatientPrescription() throws SQLException {
        String sql = "INSERT INTO prescriptions (PatientID, DoctorID, medication_name, dosage, frequency, duration, issue_date, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, 9999); // Non-existent patient
            stmt.setInt(2, 1);
            stmt.setString(3, "Ibuprofen");
            stmt.setString(4, "200mg");
            stmt.setString(5, "Once a day");
            stmt.setString(6, "3 days");
            stmt.setDate(7, Date.valueOf("2024-09-01"));
            stmt.setString(8, "Take before sleep");

            assertThrows(SQLException.class, stmt::executeUpdate, "Should fail due to invalid PatientID");
        }
    }

    // ❌ Test inserting a prescription with NULL values
    @Test
    void testInsertPrescriptionWithNullFields() throws SQLException {
        String sql = "INSERT INTO prescriptions (PatientID, DoctorID, medication_name, dosage, frequency, duration, issue_date, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, 1);
            stmt.setInt(2, 1);
            stmt.setNull(3, Types.VARCHAR); // Missing medication name
            stmt.setString(4, "250mg");
            stmt.setString(5, "Once daily");
            stmt.setString(6, "7 days");
            stmt.setDate(7, Date.valueOf("2024-09-01"));
            stmt.setString(8, "Take after food");

            assertThrows(SQLException.class, stmt::executeUpdate, "Should fail due to NULL medication_name");
        }
    }

    // ✅ Test retrieving the latest prescription
    @Test
    void testRetrieveLatestPrescription() throws SQLException {
        String sql = "SELECT MAX(issue_date) FROM prescriptions";
        try (PreparedStatement stmt = connection.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {
            rs.next();
            Date latestDate = rs.getDate(1);
            assertNotNull(latestDate, "Latest prescription issue date should not be null");
        }
    }

    // ✅ Test retrieving the earliest prescription
    @Test
    void testRetrieveEarliestPrescription() throws SQLException {
        String sql = "SELECT MIN(issue_date) FROM prescriptions";
        try (PreparedStatement stmt = connection.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {
            rs.next();
            Date earliestDate = rs.getDate(1);
            assertNotNull(earliestDate, "Earliest prescription issue date should not be null");
        }
    }

    // ❌ Test retrieving a prescription with an invalid ID
    @Test
    void testRetrievePrescriptionForInvalidId() throws SQLException {
        String sql = "SELECT * FROM prescriptions WHERE prescriptionId = ?";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, 9999); // Non-existent ID
            ResultSet rs = stmt.executeQuery();
            assertFalse(rs.next(), "No prescription should exist with invalid ID");
        }
    }

    // ✅ Test updating prescription notes
    @Test
    void testUpdatePrescriptionNotes() throws SQLException {
        String updateSql = "UPDATE prescriptions SET notes = 'Updated Notes' WHERE prescriptionId = 5";
        try (PreparedStatement stmt = connection.prepareStatement(updateSql)) {
            stmt.executeUpdate();
        }

        String checkSql = "SELECT notes FROM prescriptions WHERE prescriptionId = 5";
        try (PreparedStatement stmt = connection.prepareStatement(checkSql);
             ResultSet rs = stmt.executeQuery()) {
            rs.next();
            String notes = rs.getString("notes");
            assertEquals("Updated Notes", notes, "Prescription notes should be updated");
        }
    }

    // ✅ Test deleting a prescription
    @Test
    void testDeletePrescription() throws SQLException {
        String deleteSql = "DELETE FROM prescriptisons WHERE prescriptionId = 5";
        try (PreparedStatement stmt = connection.prepareStatement(deleteSql)) {
            stmt.executeUpdate();
        }

        String checkSql = "SELECT * FROM prescriptions WHERE prescriptionId = 5";
        try (PreparedStatement stmt = connection.prepareStatement(checkSql);
             ResultSet rs = stmt.executeQuery()) {
            assertFalse(rs.next(), "Prescription should be deleted");
        }
    }

    @AfterAll
    static void closeConnection() throws SQLException {
        if (connection != null) connection.close();
    }
}
