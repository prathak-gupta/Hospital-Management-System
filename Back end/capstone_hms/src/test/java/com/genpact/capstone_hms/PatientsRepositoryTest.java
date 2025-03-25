//package com.genpact.capstone_hms;
//import static org.junit.jupiter.api.Assertions.*;
//import org.junit.jupiter.api.*;
//import java.sql.*;
//
//public class PatientsRepositoryTest {
//
//    private static Connection connection;
//
//    @BeforeAll
//    static void setUpDatabaseConnection() throws SQLException {
//        connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/capstone_hms", "root", "Genpact@123456789");
//    }
//
//    @AfterAll
//    static void closeDatabaseConnection() throws SQLException {
//        if (connection != null) {
//            connection.close();
//        }
//    }
//
//    @Test
//    void testPatientExists() throws SQLException {
//        String sql = "SELECT COUNT(*) FROM patients WHERE PatientID = ?";
//        try (PreparedStatement statement = connection.prepareStatement(sql)) {
//            statement.setInt(1, 1);
//            ResultSet resultSet = statement.executeQuery();
//            resultSet.next();
//            int count = resultSet.getInt(1);
//            assertTrue(count > 0, "Patient should exist");
//        }
//    }
//}

package com.genpact.capstone_hms;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.*;
import java.sql.*;

public class PatientsRepositoryTest {
    private static Connection connection;

    @BeforeAll
    static void setupDatabaseConnection() throws SQLException {
        connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/capstone_hms", "root", "Genpact@123456789");
    }

    @Test
    void testInsertPatient() throws SQLException {
        String sql = "INSERT INTO patients (FirstName, LastName, DateOfBirth) VALUES (?, ?, ?)";
        try (PreparedStatement stmt = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            stmt.setString(1, "Jane");
            stmt.setString(2, "Doe");
            stmt.setDate(3, Date.valueOf("1990-05-10"));

            int rowsInserted = stmt.executeUpdate();
            assertTrue(rowsInserted > 0, "Patient record should be inserted");

            ResultSet generatedKeys = stmt.getGeneratedKeys();
            assertTrue(generatedKeys.next(), "A new patient ID should be generated");
        }
    }

    @Test
    void testRetrievePatientByID() throws SQLException {
        String sql = "SELECT * FROM patients WHERE PatientID = ?";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, 1); // Assuming 1 is a valid PatientID
            ResultSet rs = stmt.executeQuery();
            assertTrue(rs.next(), "Patient should be retrievable by ID");
        }
    }

    // Boundary Test: Insert with Minimum Valid Name Length (1 character)
    @Test
    void testInsertPatientWithMinNameLength() throws SQLException {
        String sql = "INSERT INTO patients (FirstName, LastName, DateOfBirth) VALUES (?, ?, ?)";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setString(1, "A");
            stmt.setString(2, "B");
            stmt.setDate(3, Date.valueOf("2000-01-01"));

            int rowsInserted = stmt.executeUpdate();
            assertTrue(rowsInserted > 0, "Patient with minimum name length should be inserted");
        }
    }

    //  Boundary Test: Insert with Maximum Name Length (Assuming 50 chars max)
    @Test
    void testInsertPatientWithMaxNameLength() throws SQLException {
        String longName = "ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNO"; // 50 chars
        String sql = "INSERT INTO patients (FirstName, LastName, DateOfBirth) VALUES (?, ?, ?)";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setString(1, longName);
            stmt.setString(2, longName);
            stmt.setDate(3, Date.valueOf("1985-07-15"));

            int rowsInserted = stmt.executeUpdate();
            assertTrue(rowsInserted > 0, "Patient with maximum name length should be inserted");
        }
    }

    // Boundary Test: Insert with Oldest Possible Date of Birth
    @Test
    void testInsertPatientWithOldestDOB() throws SQLException {
        String sql = "INSERT INTO patients (FirstName, LastName, DateOfBirth) VALUES (?, ?, ?)";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setString(1, "Oldest");
            stmt.setString(2, "Patient");
            stmt.setDate(3, Date.valueOf("1900-01-01")); // Oldest reasonable DOB

            int rowsInserted = stmt.executeUpdate();
            assertTrue(rowsInserted > 0, "Oldest possible patient should be inserted");
        }
    }

    // Boundary Test: Insert with Future Date of Birth (Invalid Case)
    @Test
    void testInsertPatientWithFutureDOB() {
        String sql = "INSERT INTO patients (FirstName, LastName, DateOfBirth) VALUES (?, ?, ?)";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setString(1, "Future");
            stmt.setString(2, "Patient");
            stmt.setDate(3, Date.valueOf("2100-01-01")); // Invalid DOB in the future

            stmt.executeUpdate();
            fail("Should not allow future date of birth"); // This should fail
        } catch (SQLException e) {
            assertTrue(e.getMessage().contains("CHECK constraint failed") || e.getMessage().contains("Incorrect date"),
                    "Should fail due to invalid future DOB");
        }
    }

    @AfterAll
    static void closeConnection() throws SQLException {
        if (connection != null) connection.close();
    }
}
