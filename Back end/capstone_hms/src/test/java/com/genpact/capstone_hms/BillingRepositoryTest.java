package com.genpact.capstone_hms;
//
//import static org.junit.jupiter.api.Assertions.*;
//import org.junit.jupiter.api.*;
//import java.sql.*;
//
//public class BillingRepositoryTest {
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
//    void testBillingRecordExists() throws SQLException {
//        String sql = "SELECT COUNT(*) FROM billing WHERE PatientID = ?";
//        try (PreparedStatement statement = connection.prepareStatement(sql)) {
//            statement.setInt(1, 1);
//            ResultSet resultSet = statement.executeQuery();
//            resultSet.next();
//            int count = resultSet.getInt(1);
//            assertTrue(count > 0, "Billing record should exist for the patient");
//        }
//    }
//}


//package com.genpact.capstone_hms;
//
//import static org.junit.jupiter.api.Assertions.*;
//import org.junit.jupiter.api.*;
//import java.sql.*;
//import java.math.BigDecimal;
//import java.time.LocalDate;
//
//public class BillingRepositoryTest {
//    private static Connection connection;
//
//    @BeforeAll
//    static void setupDatabaseConnection() throws SQLException {
//        connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/capstone_hms", "root", "Genpact@123456789");
//    }
//
//    @Test
//    void testInsertBillingRecord() throws SQLException {
//        String sql = "INSERT INTO billing (PatientID, Amount, Date, PaymentStatus) VALUES (?, ?, ?, ?)";
//        try (PreparedStatement statement = connection.prepareStatement(sql)) {
//            statement.setInt(1, 1);  // Existing PatientID
//            statement.setBigDecimal(2, new BigDecimal("500.00"));
//            statement.setDate(3, Date.valueOf("2024-03-09"));
//            statement.setString(4, "Paid");
//
//            int rowsInserted = statement.executeUpdate();
//            assertTrue(rowsInserted > 0, "Billing record should be inserted");
//        }
//    }
//
//    @Test
//    void testTotalBillingPerMonth() throws SQLException {
//        String sql = "SELECT SUM(Amount) FROM billing WHERE MONTH(Date) = ?";
//        try (PreparedStatement statement = connection.prepareStatement(sql)) {
//            statement.setInt(1, 3); // March
//            ResultSet resultSet = statement.executeQuery();
//            resultSet.next();
//            BigDecimal totalAmount = resultSet.getBigDecimal(1);
//            assertNotNull(totalAmount, "Total revenue should not be null");
//        }
//    }
//
//    @Test
//    void testDeleteBillingRecord() throws SQLException {
//        String sql = "DELETE FROM billing WHERE PatientID = ?";
//        try (PreparedStatement statement = connection.prepareStatement(sql)) {
//            statement.setInt(1, 1);
//            int rowsDeleted = statement.executeUpdate();
//            assertTrue(rowsDeleted > 0, "Billing record should be deleted");
//        }
//    }
//
//    @AfterAll
//    static void closeConnection() throws SQLException {
//        if (connection != null) connection.close();
//    }
//}
//
//




import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.*;

import java.sql.*;
import java.math.BigDecimal;

public class BillingRepositoryTest {
    private static Connection connection;

    //  Setup database connection before all tests
    @BeforeAll
    static void setupDatabaseConnection() throws SQLException {
        connection = DriverManager.getConnection(
            "jdbc:mysql://localhost:3306/capstone_hms",
            "root",
            "Genpact@123456789"
        );
        connection.setAutoCommit(false);  // Enable rollback to prevent permanent changes
    }

    //  Rollback after each test to keep DB clean
    @AfterEach
    void rollbackTransaction() throws SQLException {
        connection.rollback();
    }

    // ✅ Close connection after all tests
    @AfterAll
    static void closeConnection() throws SQLException {
        if (connection != null) connection.close();
    }

    //  Test: Insert a Normal Billing Record
    @Test
    void testInsertBillingRecord() throws SQLException {
        String sql = "INSERT INTO billing (PatientID, Amount, Date, PaymentStatus) VALUES (?, ?, ?, ?)";
        
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, 1);  // Existing PatientID
            statement.setBigDecimal(2, new BigDecimal("500.00"));
            statement.setDate(3, Date.valueOf("2024-03-09"));
            statement.setString(4, "Paid");

            int rowsInserted = statement.executeUpdate();
            assertTrue(rowsInserted > 0, "Billing record should be inserted");
        }
    }

    //  Test: Total Billing Per Month
    @Test
    void testTotalBillingPerMonth() throws SQLException {
        String sql = "SELECT SUM(Amount) FROM billing WHERE MONTH(Date) = ?";
        
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, 3); // March
            ResultSet resultSet = statement.executeQuery();

            if (resultSet.next()) {
                BigDecimal totalAmount = resultSet.getBigDecimal(1);
                assertNotNull(totalAmount, "Total revenue should not be null");
            } else {
                fail("No data found for the given month");
            }
        }
    }

    //  Test: Delete a Billing Record
    @Test
    void testDeleteBillingRecord() throws SQLException {
        String sql = "DELETE FROM billing WHERE PatientID = ?";
        
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, 1);
            int rowsDeleted = statement.executeUpdate();
            assertTrue(rowsDeleted > 0, "Billing record should be deleted");
        }
    }

    // Boundary Test: Amount = ₹0 (Minimum Valid Value)
    @Test
    void testInsertZeroAmountBilling() throws SQLException {
        String sql = "INSERT INTO billing (PatientID, Amount, Date, PaymentStatus) VALUES (?, ?, ?, ?)";
        
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, 2);
            statement.setBigDecimal(2, BigDecimal.ZERO);
            statement.setDate(3, Date.valueOf("2024-03-10"));
            statement.setString(4, "Pending");

            int rowsInserted = statement.executeUpdate();
            assertTrue(rowsInserted > 0, "Billing record with zero amount should be inserted");
        }
    }

    //  Boundary Test: Negative Amount (Invalid Case)
    @Test
    void testInsertNegativeAmountBilling() {
        String sql = "INSERT INTO billing (PatientID, Amount, Date, PaymentStatus) VALUES (?, ?, ?, ?)";

        assertThrows(SQLException.class, () -> {
            try (PreparedStatement statement = connection.prepareStatement(sql)) {
                statement.setInt(1, 3);
                statement.setBigDecimal(2, new BigDecimal("-500.00"));  // Negative amount
                statement.setDate(3, Date.valueOf("2024-03-11"));
                statement.setString(4, "Failed");
                statement.executeUpdate();
            }
        }, "Negative billing amount should not be allowed");
    }

    //  Boundary Test: Large Amount (₹10 Crore)
    @Test
    void testInsertLargeAmountBilling() throws SQLException {
        String sql = "INSERT INTO billing (PatientID, Amount, Date, PaymentStatus) VALUES (?, ?, ?, ?)";
        
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, 4);
            statement.setBigDecimal(2, new BigDecimal("100000000.00"));  // ₹10 Crore
            statement.setDate(3, Date.valueOf("2024-03-12"));
            statement.setString(4, "Paid");

            int rowsInserted = statement.executeUpdate();
            assertTrue(rowsInserted > 0, "Billing record with large amount should be inserted");
        }
    }

    // Boundary Test: Oldest Possible Date (0001-01-01)
    @Test
    void testInsertOldestDateBilling() {
        String sql = "INSERT INTO billing (PatientID, Amount, Date, PaymentStatus) VALUES (?, ?, ?, ?)";

        assertThrows(SQLException.class, () -> {
            try (PreparedStatement statement = connection.prepareStatement(sql)) {
                statement.setInt(1, 5);
                statement.setBigDecimal(2, new BigDecimal("100.00"));
                statement.setDate(3, Date.valueOf("0001-01-01"));  // Too old date
                statement.setString(4, "Paid");
                statement.executeUpdate();
            }
        }, "Oldest date should not be allowed");
    }

    //  Boundary Test: Future Date (2099-12-31)
    @Test
    void testInsertFutureDateBilling() throws SQLException {
        String sql = "INSERT INTO billing (PatientID, Amount, Date, PaymentStatus) VALUES (?, ?, ?, ?)";

        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, 6);
            statement.setBigDecimal(2, new BigDecimal("200.00"));
            statement.setDate(3, Date.valueOf("2099-12-31"));  // Future date
            statement.setString(4, "Pending");

            int rowsInserted = statement.executeUpdate();
            assertTrue(rowsInserted > 0, "Billing record with future date should be inserted");
        }
    }

    //  Boundary Test: Invalid Payment Status (Empty String)
    @Test
    void testInsertInvalidPaymentStatusBilling() {
        String sql = "INSERT INTO billing (PatientID, Amount, Date, PaymentStatus) VALUES (?, ?, ?, ?)";

        assertThrows(SQLException.class, () -> {
            try (PreparedStatement statement = connection.prepareStatement(sql)) {
                statement.setInt(1, 7);
                statement.setBigDecimal(2, new BigDecimal("300.00"));
                statement.setDate(3, Date.valueOf("2024-03-15"));
                statement.setString(4, "");  // Empty string
                statement.executeUpdate();
            }
        }, "Empty payment status should not be allowed");
    }
}






