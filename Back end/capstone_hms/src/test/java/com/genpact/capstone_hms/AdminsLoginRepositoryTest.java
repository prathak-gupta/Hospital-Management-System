package com.genpact.capstone_hms;


import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.*;
import java.sql.*;

public class AdminsLoginRepositoryTest {

    private static Connection connection;

    @BeforeAll
    static void setUpDatabaseConnection() throws SQLException {
        String url = "jdbc:mysql://localhost:3306/capstone_hms";
        String user = "root";  // Change if needed
        String password = "Genpact@123456789";  // Change if needed
        connection = DriverManager.getConnection(url, user, password);
    }

    @AfterAll
    static void closeDatabaseConnection() throws SQLException {
        if (connection != null) {
            connection.close();
        }
    }

    // Test if admin username exists in the database
    @Test
    void testIfAdminUsernameExists_Success() throws SQLException {
        String sql = "SELECT COUNT(*) FROM adminslogin WHERE Username = ?";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, "newAdmin");  // Username exists in DB
            ResultSet resultSet = statement.executeQuery();
            resultSet.next();
            int count = resultSet.getInt(1);
            assertTrue(count > 0, "Admin username should exist");
        }
    }

    // Test if a non-existing admin username is correctly not found
    @Test
    void testIfAdminUsernameExists_NotFound() throws SQLException {
        String sql = "SELECT COUNT(*) FROM adminslogin WHERE Username = ?";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, "unknownAdmin");  // Username does not exist
            ResultSet resultSet = statement.executeQuery();
            resultSet.next();
            int count = resultSet.getInt(1);
            assertEquals(0, count, "Admin username should NOT exist");
        }
    }

    // Test if correct admin credentials (Username + Password) are found
    @Test
    void testIfAdminPasswordMatches_Success() throws SQLException {
        String sql = "SELECT COUNT(*) FROM adminslogin WHERE Username = ? AND Password = ?";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, "newAdmin");
            statement.setString(2, "securePass123");  // Correct password
            ResultSet resultSet = statement.executeQuery();
            resultSet.next();
            int count = resultSet.getInt(1);
            assertTrue(count > 0, "Admin password should match");
        }
    }

    // Test if incorrect admin password fails authentication
    @Test
    void testIfAdminPasswordMatches_NotFound() throws SQLException {
        String sql = "SELECT COUNT(*) FROM adminslogin WHERE Username = ? AND Password = ?";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, "newAdmin");
            statement.setString(2, "wrongPass");  // Incorrect password
            ResultSet resultSet = statement.executeQuery();
            resultSet.next();
            int count = resultSet.getInt(1);
            assertEquals(0, count, "Admin password should NOT match");
        }
    }

    // Test inserting a new admin login entry
    @Test
    void testInsertAdminLogin() throws SQLException {
        String sql = "INSERT INTO adminslogin (Username, Password) VALUES (?, ?)";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, "testAdmin");
            statement.setString(2, "testPass");
            int rowsInserted = statement.executeUpdate();
            assertEquals(1, rowsInserted, "Admin login should be inserted");
        }
    }

    // Test deleting an admin login
    @Test
    void testDeleteAdminLogin() throws SQLException {
        String sql = "DELETE FROM adminslogin WHERE Username = ?";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, "testAdmin"); // Assuming this test user exists
            int rowsDeleted = statement.executeUpdate();
            assertTrue(rowsDeleted > 0, "Admin login should be deleted");
        }
    }
}
