//package com.genpact.capstone_hms;
//
////import static org.junit.jupiter.api.Assertions.*;
////import org.junit.jupiter.api.*;
////import java.sql.*;
////
////public class AppointmentsRepositoryTest {
////
////    private static Connection connection;
////
////    @BeforeAll
////    static void setUpDatabaseConnection() throws SQLException {
////        connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/capstone_hms", "root", "Genpact@123456789");
////    }
////
////    @AfterAll
////    static void closeDatabaseConnection() throws SQLException {
////        if (connection != null) {
////            connection.close();
////        }
////    }
////
////    @Test
////    void testAppointmentExists() throws SQLException {
////        String sql = "SELECT COUNT(*) FROM appointments WHERE PatientID = ?";
////        try (PreparedStatement statement = connection.prepareStatement(sql)) {
////            statement.setInt(1, 1);
////            ResultSet resultSet = statement.executeQuery();
////            resultSet.next();
////            int count = resultSet.getInt(1);
////            assertTrue(count > 0, "Appointment should exist for the patient");
////        }
////    }
////}
//
//
//
//import static org.junit.jupiter.api.Assertions.*;
//import org.junit.jupiter.api.*;
//import java.sql.*;
//
//public class AppointmentsRepositoryTest {
//
//    private static Connection connection;
//
//    @BeforeAll
//    static void setUpDatabaseConnection() throws SQLException {
//        String url = "jdbc:mysql://localhost:3306/capstone_hms";
//        String user = "root";  // Change if needed
//        String password = "Genpact@123456789";  // Change if needed
//        connection = DriverManager.getConnection(url, user, password);
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
//    void testInsertAppointment() throws SQLException {
//        String sql = "INSERT INTO appointments (PatientID, DoctorID, AppointmentDate, AppointmentTime, Reason) VALUES (?, ?, ?, ?, ?)";
//        try (PreparedStatement statement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
//            statement.setInt(1, 1);  // Example PatientID
//            statement.setInt(2, 1);  // Example DoctorID
//            statement.setDate(3, Date.valueOf("2024-09-01"));  // Example Date
//            statement.setTime(4, Time.valueOf("10:30:00"));  // Example Time
//            statement.setString(5, "Routine Checkup");
//
//            int rowsInserted = statement.executeUpdate();
//            assertTrue(rowsInserted > 0, "Appointment should be inserted");
//
//            ResultSet generatedKeys = statement.getGeneratedKeys();
//            assertTrue(generatedKeys.next(), "Generated key should be returned");
//        }
//    }
//
//    @Test
//    void testRetrieveAppointments() throws SQLException {
//        String sql = "SELECT * FROM appointments";
//        try (PreparedStatement statement = connection.prepareStatement(sql)) {
//            ResultSet resultSet = statement.executeQuery();
//            assertNotNull(resultSet, "Result set should not be null");
//        }
//    }
//
//    @Test
//    void testDeleteAppointment() throws SQLException {
//        String sql = "DELETE FROM appointments WHERE AppointmentID = ?";
//        try (PreparedStatement statement = connection.prepareStatement(sql)) {
//            statement.setInt(1,3 ); // Assuming ID 1 exists
//            int rowsDeleted = statement.executeUpdate();
//            assertTrue(rowsDeleted > 0, "Appointment should be deleted");
//        }
//    }
//
//    @Test
//    void testAppointmentNotFound() throws SQLException {
//        String sql = "SELECT * FROM appointments WHERE AppointmentID = ?";
//        try (PreparedStatement statement = connection.prepareStatement(sql)) {
//            statement.setInt(1, 999); // Assuming ID 999 does not exist
//            ResultSet resultSet = statement.executeQuery();
//            assertFalse(resultSet.next(), "No appointment should be found");
//        }
//    }
//}
//
//


//package com.genpact.capstone_hms;
//
//import static org.junit.jupiter.api.Assertions.*;
//import org.junit.jupiter.api.*;
//import java.sql.*;
//import java.time.LocalDate;
//import java.time.LocalTime;
//
//public class AppointmentsRepositoryTest {
//    private static Connection connection;
//
//    @BeforeAll
//    static void setupDatabaseConnection() throws SQLException {
//        connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/capstone_hms", "root", "Genpact@123456789");
//    }
//
//    @BeforeEach
//    void insertTestData() throws SQLException {
//        try (Statement stmt = connection.createStatement()) {
//            stmt.executeUpdate("INSERT IGNORE INTO patients (PatientID, FirstName, LastName, DateOfBirth, Gender, Address, PhoneNumber, Email) " +
//                               "VALUES (1, 'Test', 'Patient', '1994-08-15', 'M', '123 Main St', '9876543210', 'test@example.com')");
//            stmt.executeUpdate("INSERT IGNORE INTO doctors (DoctorID, FirstName, LastName, Specialization, PhoneNumber, Email, Department, Qualification, YearsOfExperience) " +
//                               "VALUES (1, 'Dr.', 'Test', 'General', '9876543211', 'dr.test@example.com', 'General Medicine', 'MBBS', 10)");
//        }
//    }
//
//    @Test
//    void testInsertAppointment() throws SQLException {
//        String sql = "INSERT INTO appointments (PatientID, DoctorID, AppointmentDate, AppointmentTime, Reason) VALUES (?, ?, ?, ?, ?)";
//        try (PreparedStatement statement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
//            statement.setInt(1, 1); // Existing PatientID
//            statement.setInt(2, 1); // Existing DoctorID
//            statement.setDate(3, Date.valueOf("2024-09-01"));
//            statement.setTime(4, Time.valueOf("10:30:00"));
//            statement.setString(5, "General Checkup");
//
//            int rowsInserted = statement.executeUpdate();
//            assertTrue(rowsInserted > 0, "Appointment should be inserted");
//
//            ResultSet generatedKeys = statement.getGeneratedKeys();
//            assertTrue(generatedKeys.next(), "Generated ID should be returned");
//        }
//    }
//
//    @Test
//    void testRetrieveAppointmentsForDoctor() throws SQLException {
//        String sql = "SELECT COUNT(*) FROM appointments WHERE DoctorID = ?";
//        try (PreparedStatement statement = connection.prepareStatement(sql)) {
//            statement.setInt(1, 1);
//            ResultSet resultSet = statement.executeQuery();
//            resultSet.next();
//            int count = resultSet.getInt(1);
//            assertTrue(count > 0, "Doctor should have at least one appointment");
//        }
//    }
//
//    @Test
//    void testConcurrentAppointmentBooking() throws InterruptedException, SQLException {
//        Thread t1 = new Thread(() -> {
//            try (PreparedStatement stmt = connection.prepareStatement(
//                    "UPDATE appointments SET Reason = 'User 1 Booking' WHERE AppointmentID = 2")) {
//                stmt.executeUpdate();
//            } catch (SQLException ignored) {}
//        });
//
//        Thread t2 = new Thread(() -> {
//            try (PreparedStatement stmt = connection.prepareStatement(
//                    "UPDATE appointments SET Reason = 'User 2 Booking' WHERE AppointmentID = 2")) {
//                stmt.executeUpdate();
//            } catch (SQLException ignored) {}
//        });
//
//        t1.start();
//        t2.start();
//        t1.join();
//        t2.join();
//
//        try (PreparedStatement stmt = connection.prepareStatement("SELECT Reason FROM appointments WHERE AppointmentID = 2");
//             ResultSet rs = stmt.executeQuery()) {
//            rs.next();
//            String reason = rs.getString("Reason");
//            assertNotNull(reason, "Appointment should have a valid reason after update");
//        }
//    }
//
//    @AfterAll
//    static void closeConnection() throws SQLException {
//        if (connection != null) connection.close();
//    }
//}



package com.genpact.capstone_hms;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.*;
import java.sql.*;
import java.time.LocalTime;

public class AppointmentsRepositoryTest {
    private static Connection connection;

    @BeforeAll
    static void setupDatabaseConnection() throws SQLException {
        connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/capstone_hms", "root", "Genpact@123456789");
    }

    @BeforeEach
    void insertTestData() throws SQLException {
        try (Statement stmt = connection.createStatement()) {
            stmt.executeUpdate("INSERT IGNORE INTO patients (PatientID, FirstName, LastName, DateOfBirth, Gender, Address, PhoneNumber, Email) " +
                               "VALUES (1, 'Test', 'Patient', '1994-08-15', 'M', '123 Main St', '9876543210', 'test@example.com')");
            stmt.executeUpdate("INSERT IGNORE INTO doctors (DoctorID, FirstName, LastName, Specialization, PhoneNumber, Email, Department, Qualification, YearsOfExperience) " +
                               "VALUES (1, 'Dr.', 'Test', 'General', '9876543211', 'dr.test@example.com', 'General Medicine', 'MBBS', 10)");
        }
    }

    //  Test inserting an appointment at clinic's opening time
    @Test
    void testBoundaryAppointmentAtOpeningTime() throws SQLException {
        String sql = "INSERT INTO appointments (PatientID, DoctorID, AppointmentDate, AppointmentTime, Reason) VALUES (?, ?, ?, ?, ?)";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, 1);
            statement.setInt(2, 1);
            statement.setDate(3, Date.valueOf("2024-09-01"));
            statement.setTime(4, Time.valueOf("08:00:00")); // 8:00 AM Opening Time
            statement.setString(5, "Morning Checkup");

            int rowsInserted = statement.executeUpdate();
            assertTrue(rowsInserted > 0, "Should allow booking at 08:00 AM");
        }
    }

    // Test inserting an appointment at clinic's closing time
    @Test
    void testBoundaryAppointmentAtClosingTime() throws SQLException {
        String sql = "INSERT INTO appointments (PatientID, DoctorID, AppointmentDate, AppointmentTime, Reason) VALUES (?, ?, ?, ?, ?)";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, 1);
            statement.setInt(2, 1);
            statement.setDate(3, Date.valueOf("2024-09-01"));
            statement.setTime(4, Time.valueOf("20:00:00")); // 8:00 PM Closing Time
            statement.setString(5, "Evening Consultation");

            int rowsInserted = statement.executeUpdate();
            assertTrue(rowsInserted > 0, "Should allow booking at 08:00 PM");
        }
    }

    // Test retrieving an appointment with an invalid ID
    @Test
    void testRetrieveAppointmentForInvalidId() throws SQLException {
        String sql = "SELECT * FROM appointments WHERE AppointmentID = ?";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, 9999); // Invalid ID
            ResultSet resultSet = statement.executeQuery();
            assertFalse(resultSet.next(), "No appointment should exist with invalid ID");
        }
    }

    // Test retrieving the max appointment ID
    @Test
    void testRetrieveAppointmentForMaxId() throws SQLException {
        String sql = "SELECT MAX(AppointmentID) FROM appointments";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            ResultSet resultSet = statement.executeQuery();
            resultSet.next();
            int maxId = resultSet.getInt(1);
            assertTrue(maxId > 0, "Max ID should be greater than 0");
        }
    }

    //  Test retrieving the latest appointment
    @Test
    void testAppointmentWithLatestDate() throws SQLException {
        String sql = "SELECT MAX(AppointmentDate) FROM appointments";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            ResultSet resultSet = statement.executeQuery();
            resultSet.next();
            Date latestDate = resultSet.getDate(1);
            assertNotNull(latestDate, "Latest appointment date should not be null");
        }
    }

    // Test retrieving the earliest appointment
    @Test
    void testAppointmentWithEarliestDate() throws SQLException {
        String sql = "SELECT MIN(AppointmentDate) FROM appointments";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            ResultSet resultSet = statement.executeQuery();
            resultSet.next();
            Date earliestDate = resultSet.getDate(1);
            assertNotNull(earliestDate, "Earliest appointment date should not be null");
        }
    }

    // ✅ Test if appointment reason is not empty after update
    @Test
    void testAppointmentReasonNotEmptyAfterUpdate() throws SQLException {
        String updateSql = "UPDATE appointments SET Reason = 'Updated Checkup' WHERE AppointmentID = 4";
        try (PreparedStatement statement = connection.prepareStatement(updateSql)) {
            statement.executeUpdate();
        }

        String checkSql = "SELECT Reason FROM appointments WHERE AppointmentID = 4";
        try (PreparedStatement statement = connection.prepareStatement(checkSql);
             ResultSet rs = statement.executeQuery()) {
            rs.next();
            String reason = rs.getString("Reason");
            assertNotNull(reason, "Reason should not be empty after update");
        }
    }

    // Test concurrent appointment booking (multi-threading)
    @Test
    void testConcurrentBookingAtBoundaryTime() throws InterruptedException, SQLException {
        Thread t1 = new Thread(() -> {
            try (PreparedStatement stmt = connection.prepareStatement(
                    "UPDATE appointments SET Reason = 'User 1 Booking' WHERE AppointmentID = 2")) {
                stmt.executeUpdate();
            } catch (SQLException ignored) {}
        });

        Thread t2 = new Thread(() -> {
            try (PreparedStatement stmt = connection.prepareStatement(
                    "UPDATE appointments SET Reason = 'User 2 Booking' WHERE AppointmentID = 2")) {
                stmt.executeUpdate();
            } catch (SQLException ignored) {}
        });

        t1.start();
        t2.start();
        t1.join();
        t2.join();

        try (PreparedStatement stmt = connection.prepareStatement("SELECT Reason FROM appointments WHERE AppointmentID = 2");
             ResultSet rs = stmt.executeQuery()) {
            rs.next();
            String reason = rs.getString("Reason");
            assertNotNull(reason, "Appointment should have a valid reason after update");
        }
    }

    @AfterAll
    static void closeConnection() throws SQLException {
        if (connection != null) connection.close();
    }
}
