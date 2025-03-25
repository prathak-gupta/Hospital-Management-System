//package com.genpact.capstone_hms;
//
//import static org.junit.jupiter.api.Assertions.*;
//import org.junit.jupiter.api.*;
//import java.sql.*;
//
//public class DoctorsRepositoryTest {
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
//    void testDoctorExists() throws SQLException {
//        String sql = "SELECT COUNT(*) FROM doctors WHERE DoctorID = ?";
//        try (PreparedStatement statement = connection.prepareStatement(sql)) {
//            statement.setInt(1, 1);
//            ResultSet resultSet = statement.executeQuery();
//            resultSet.next();
//            int count = resultSet.getInt(1);
//            assertTrue(count > 0, "Doctor should exist");
//        }
//    }
//}

package com.genpact.capstone_hms;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.*;
import java.sql.*;

public class DoctorsRepositoryTest {
    private static Connection connection;

    @BeforeAll
    static void setupDatabaseConnection() throws SQLException {
        connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/capstone_hms", "root", "Genpact@123456789");
    }

    @Test
    void testInsertDoctor() throws SQLException {
        String sql = "INSERT INTO doctors (DoctorID, FirstName, LastName, Specialization) VALUES (?, ?, ?, ?)";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, 2);
            stmt.setString(2, "John");
            stmt.setString(3, "Doe");
            stmt.setString(4, "Cardiology");

            int rowsInserted = stmt.executeUpdate();
            assertTrue(rowsInserted > 0, "Doctor record should be inserted");
        }
    }

    @Test
    void testRetrieveDoctorBySpecialization() throws SQLException {
        String sql = "SELECT * FROM doctors WHERE Specialization = ?";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setString(1, "Cardiology");
            ResultSet rs = stmt.executeQuery();
            assertTrue(rs.next(), "Doctor should be retrievable by specialization");
        }
    }

    // Boundary Test 1: Insert Doctor with Maximum Length Names
    @Test
    void testInsertMaxLengthNameDoctor() throws SQLException {
        String sql = "INSERT INTO doctors (FirstName, LastName, Specialization) VALUES (?, ?, ?)";
        String longName = "A".repeat(255);  // Assuming VARCHAR(255)
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setString(1, longName);
            stmt.setString(2, longName);
            stmt.setString(3, "Neurology");

            int rowsInserted = stmt.executeUpdate();
            assertTrue(rowsInserted > 0, "Doctor with max-length name should be inserted");
        }
    }

    //  Boundary Test 2: Insert Doctor with Empty Strings
    @Test
    void testInsertEmptyStringDoctor() throws SQLException {
        String sql = "INSERT INTO doctors (FirstName, LastName, Specialization) VALUES (?, ?, ?)";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setString(1, "");
            stmt.setString(2, "");
            stmt.setString(3, "Orthopedics");

            assertThrows(SQLException.class, stmt::executeUpdate, "Empty names should not be allowed");
        }
    }

    @AfterAll
    static void closeConnection() throws SQLException {
        if (connection != null) connection.close();
    }
}

