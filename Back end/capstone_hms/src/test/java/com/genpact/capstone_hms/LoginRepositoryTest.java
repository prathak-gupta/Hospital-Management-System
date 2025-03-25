package com.genpact.capstone_hms;
////
////import static org.junit.jupiter.api.Assertions.*;
////import static org.mockito.Mockito.*;
////
////import org.junit.jupiter.api.BeforeEach;
////import org.junit.jupiter.api.Test;
////import org.mockito.InjectMocks;
////import org.mockito.Mock;
////import org.mockito.MockitoAnnotations;
////import org.springframework.dao.DataAccessException;
////import org.springframework.jdbc.core.JdbcTemplate;
////import org.springframework.jdbc.core.RowMapper;
////
////import com.genpact.capstone_hms.model.Login;
////import com.genpact.capstone_hms.repository.LoginRepository;
////
////public class LoginRepositoryTest {
////    
////    @Mock
////    private JdbcTemplate jdbcTemplate;
////
////    @InjectMocks
////    private LoginRepository loginRepository;
////
////    @BeforeEach
////    void setUp() {
////        MockitoAnnotations.openMocks(this);
////    }
////
////    @SuppressWarnings("unchecked")
////	@Test
////    void testIfUsernameExists_Success() {
////        String username = "testUser";
////        String domain = "patient";
////        String tableName = "patientslogin";
////        
////        String sql = "SELECT username FROM " + tableName + " WHERE username = ?";
////        
////        Login mockLogin = new Login(1, username, "testPassword");
////        
////        when(jdbcTemplate.queryForObject(eq(sql), any(RowMapper.class), eq(username)))
////                .thenReturn(mockLogin);
////        
////        String result = loginRepository.ifUsernameExist(username, domain);
////        
////        assertEquals("true", result);
////    }
////
////    @SuppressWarnings({ "unchecked", "serial" })
////	@Test
////    void testIfUsernameExists_NotFound() {
////        String username = "unknownUser";
////        String domain = "patient";
////        String tableName = "patientslogin";
////        
////        String sql = "SELECT username FROM " + tableName + " WHERE username = ?";
////
////        when(jdbcTemplate.queryForObject(eq(sql), any(RowMapper.class), eq(username)))
////                .thenThrow(new DataAccessException("User not found") {});
////        
////        String result = loginRepository.ifUsernameExist(username, domain);
////        
////        assertEquals("Error accessing database", result);
////    }
////
////    @SuppressWarnings("unchecked")
////	@Test
////    void testIfPasswordExists_Success() {
////        String password = "securePass";
////        String domain = "patient";
////        String tableName = "patientslogin";
////        
////        String sql = "SELECT password FROM " + tableName + " WHERE password = ?";
////        
////        Login mockLogin = new Login(1, "testUser", password);
////        
////        when(jdbcTemplate.queryForObject(eq(sql), any(RowMapper.class), eq(password)))
////                .thenReturn(mockLogin);
////        
////        String result = loginRepository.ifPasswordExist(password, domain);
////        
////        assertEquals("true", result);
////    }
////
//////    @SuppressWarnings({ "unchecked", "serial" })
//////	@Test
//////    void testIfPasswordExists_NotFound() {
//////        String password = "wrongPass";
//////        String domain = "patient";
//////        String tableName = "patientslogin";
//////        
//////        String sql = "SELECT password FROM " + tableName + " WHERE password = ?";
//////
//////        when(jdbcTemplate.queryForObject(eq(sql), any(RowMapper.class), eq(password)))
//////                .thenThrow(new DataAccessException("Password not found") {});
//////        
//////        String result = loginRepository.ifPasswordExist(password, domain);
//////        
//////        assertEquals("Error accessing database", result);
//////    }
////
////    @Test
////    void testInvalidDomain() {
////        String result = loginRepository.ifUsernameExist("testUser", "invalidDomain");
////        assertEquals("Error: Login domain undefined!", result);
////        
////        result = loginRepository.ifPasswordExist("testPass", "invalidDomain");
////        assertEquals("Error: Login domain undefined!", result);
////    }
////}
//
//
//
//package com.genpact.capstone_hms;
//
//import static org.junit.jupiter.api.Assertions.*;
//
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.jdbc.core.JdbcTemplate;
//
//import com.genpact.capstone_hms.repository.LoginRepository;
//
//@SpringBootTest
//public class LoginRepositoryTest {
//
//    @Autowired
//    private JdbcTemplate jdbcTemplate;  // Use actual database
//
//    @Autowired
//    private LoginRepository loginRepository; // Use actual repository
//
//    @BeforeEach
//    void setUp() {
//        // Ensure test data exists in the database before running the tests
//        jdbcTemplate.execute("INSERT INTO patientslogin (username, password) VALUES ('testUser', 'securePass')");
//    }
//
//    @Test
//    void testIfUsernameExists_Success() {
//        String username = "testUser";
//        String domain = "patient";
//
//        String result = loginRepository.ifUsernameExist(username, domain);
//
//        assertEquals("true", result);
//    }
//
//    @Test
//    void testIfUsernameExists_NotFound() {
//        String username = "unknownUser";
//        String domain = "patient";
//
//        String result = loginRepository.ifUsernameExist(username, domain);
//
//        assertNotEquals("true", result); // It should return an error or empty result
//    }
//
//    @Test
//    void testIfPasswordExists_Success() {
//        String password = "securePass";
//        String domain = "patient";
//
//        String result = loginRepository.ifPasswordExist(password, domain);
//
//        assertEquals("true", result);
//    }
//
//    @Test
//    void testIfPasswordExists_NotFound() {
//        String password = "wrongPass";
//        String domain = "patient";
//
//        String result = loginRepository.ifPasswordExist(password, domain);
//
//        assertNotEquals("true", result); // Should return an error or empty result
//    }
//
//    @Test
//    void testInvalidDomain() {
//        String result = loginRepository.ifUsernameExist("testUser", "invalidDomain");
//        assertEquals("Error: Login domain undefined!", result);
//
//        result = loginRepository.ifPasswordExist("testPass", "invalidDomain");
//        assertEquals("Error: Login domain undefined!", result);
//    }
//}
//

//-------------------------------------------------------------------------------------------

//working
//import static org.junit.jupiter.api.Assertions.*;
//import org.junit.jupiter.api.*;
//import java.sql.*;
//
//public class LoginRepositoryTest {
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
//    void testIfUsernameExists_Success() throws SQLException {
//        String sql = "SELECT COUNT(*) FROM patientslogin WHERE Username = ?";
//        try (PreparedStatement statement = connection.prepareStatement(sql)) {
//            statement.setString(1, "testuser");  // Username exists in DB
//            ResultSet resultSet = statement.executeQuery();
//            resultSet.next();
//            int count = resultSet.getInt(1);
//            assertTrue(count > 0, "Username should exist");
//        }
//    }
//
//    @Test
//    void testIfUsernameExists_NotFound() throws SQLException {
//        String sql = "SELECT COUNT(*) FROM patientslogin WHERE Username = ?";
//        try (PreparedStatement statement = connection.prepareStatement(sql)) {
//            statement.setString(1, "unknownUser");  // Username does not exist
//            ResultSet resultSet = statement.executeQuery();
//            resultSet.next();
//            int count = resultSet.getInt(1);
//            assertEquals(0, count, "Username should NOT exist");
//        }
//    }
//
//    @Test
//    void testIfPasswordExists_Success() throws SQLException {
//        String sql = "SELECT COUNT(*) FROM patientslogin WHERE Username = ? AND Password = ?";
//        try (PreparedStatement statement = connection.prepareStatement(sql)) {
//            statement.setString(1, "testuser");
//            statement.setString(2, "testpassword");  // Correct password
//            ResultSet resultSet = statement.executeQuery();
//            resultSet.next();
//            int count = resultSet.getInt(1);
//            assertTrue(count > 0, "Password should match for the user");
//        }
//    }
//
//    @Test
//    void testIfPasswordExists_NotFound() throws SQLException {
//        String sql = "SELECT COUNT(*) FROM patientslogin WHERE Username = ? AND Password = ?";
//        try (PreparedStatement statement = connection.prepareStatement(sql)) {
//            statement.setString(1, "testuser");
//            statement.setString(2, "wrongpassword");  // Incorrect password
//            ResultSet resultSet = statement.executeQuery();
//            resultSet.next();
//            int count = resultSet.getInt(1);
//            assertEquals(0, count, "Password should NOT match");
//        }
//    }
//
//    @Test
//    void testInvalidDomain() {
//        // Assuming login domain validation is handled elsewhere
//        String invalidDomain = "invalidDomain.com";
//        String expectedError = "Error: Login domain undefined!";
//
//        // Simulate validation
//        String actualError = validateDomain(invalidDomain);
//        
//        assertEquals(expectedError, actualError, "Invalid domain should return an error message");
//    }
//
//    private String validateDomain(String domain) {
//        if (!domain.equals("hospital.com")) {  // Example domain validation
//            return "Error: Login domain undefined!";
//        }
//        return "Valid domain";
//    }
//}


//-------------------------------------------------------------------------------------------------------------






import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.*;
import java.sql.*;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class LoginRepositoryTest {
    private Connection connection;

    @BeforeEach
    void setupDatabaseConnection() throws SQLException {
        connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/capstone_hms", "root", "Genpact@123456789");
    }

    @Test
    void testValidUserLogin() throws SQLException, NoSuchAlgorithmException {
        String sql = "SELECT * FROM users WHERE username = ? AND password = ?";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setString(1, "user1");
            stmt.setString(2, hashPassword("password123")); // Hash before checking
            ResultSet rs = stmt.executeQuery();
            assertTrue(rs.next(), "Valid user should be able to log in");
        }
    }

    @Test
    void testInvalidUserLogin() throws SQLException, NoSuchAlgorithmException {
        String sql = "SELECT * FROM users WHERE username = ? AND password = ?";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setString(1, "fakeUser");
            stmt.setString(2, hashPassword("fakePass")); // Hash before checking
            ResultSet rs = stmt.executeQuery();
            assertFalse(rs.next(), "Invalid user login should fail");
        }
    }

    @AfterEach
    void closeConnection() throws SQLException {
        if (connection != null) connection.close();
    }

    // ✅ Hash passwords before storing or checking
    private String hashPassword(String password) throws NoSuchAlgorithmException {
        MessageDigest md = MessageDigest.getInstance("SHA-256");
        byte[] hash = md.digest(password.getBytes());
        StringBuilder hexString = new StringBuilder();
        for (byte b : hash) {
            hexString.append(String.format("%02x", b));
        }
        return hexString.toString();
    }
}

