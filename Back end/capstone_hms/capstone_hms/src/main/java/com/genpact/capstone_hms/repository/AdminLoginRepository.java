package com.genpact.capstone_hms.repository;

import com.genpact.capstone_hms.model.AdminLogin;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class AdminLoginRepository {
    // CRUDS - Create, Read, Update, Delete, Search
    private JdbcTemplate adminJdbc;
    private RowMapper<AdminLogin> adminRowMapper = new RowMapper<AdminLogin>() {
        @Override
        public AdminLogin mapRow(ResultSet resultSet, int rowNum) throws SQLException {
            return new AdminLogin(
                resultSet.getInt("LoginID"),
                resultSet.getInt("AdminID"),
                resultSet.getString("Username"),
                resultSet.getString("Password")
            );
        }
    };

    public JdbcTemplate getAdminJdbc() {
        return adminJdbc;
    }

    public AdminLoginRepository(JdbcTemplate adminJdbc) {
        super();
        this.adminJdbc = adminJdbc;
    }

    // Create AdminLogin
    public void createAdminLogin(AdminLogin adminLogin) {
        String sql = "INSERT INTO AdminsLogin (AdminID, Username, Password) VALUES (?, ?, ?)";
        try {
            adminJdbc.update(sql, adminLogin.getAdminId(), adminLogin.getUsername(), adminLogin.getPassword());
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
        }
    }

    // Read AdminLogin
    public AdminLogin readAdminLogin(String username) {
        String sql = "SELECT * FROM AdminsLogin WHERE username = ?";
        try {
            return adminJdbc.queryForObject(sql, adminRowMapper, username);
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }

    // Update AdminLogin
    public void updateAdminLogin(AdminLogin adminLogin) {
        String sql = "UPDATE AdminsLogin SET AdminID = ?, Username = ?, Password = ? WHERE LoginID = ?";
        try {
            adminJdbc.update(sql, adminLogin.getAdminId(), adminLogin.getUsername(), adminLogin.getPassword(), adminLogin.getLoginId());
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
        }
    }

    // Delete AdminLogin
    public void deleteAdminLogin(int loginID) {
        String sql = "DELETE FROM AdminsLogin WHERE LoginID = ?";
        try {
            adminJdbc.update(sql, loginID);
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
        }
    }

    // Search AdminLogins
    public List<AdminLogin> searchAdminLogins(String keyword) {
        String sql = "SELECT * FROM AdminsLogin WHERE Username LIKE ?";
        try {
            String formattedKeyword = "%" + keyword.trim().replaceAll("\\s+", " ") + "%";
            return adminJdbc.query(sql, adminRowMapper, formattedKeyword);
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }

    // Get All AdminLogins
    public List<AdminLogin> getAllAdminLogins() {
        String sql = "SELECT * FROM AdminsLogin";
        try {
            return adminJdbc.query(sql, adminRowMapper);
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }
}
