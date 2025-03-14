package com.genpact.capstone_hms.admin.repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.genpact.capstone_hms.admin.model.Admin;

@Repository
public class AdminRepository {
    // CRUDS - Create, Read, Update, Delete, Search
    private JdbcTemplate adminJdbc;
    private RowMapper<Admin> adminRowMapper = new RowMapper<Admin>() {
        @Override
        public Admin mapRow(ResultSet resultSet, int rowNum) throws SQLException {
            return new Admin(
                resultSet.getInt("AdminID"),
                resultSet.getString("Username"),
                resultSet.getString("Password"),
                resultSet.getString("Role"),
                resultSet.getString("Email")
            );
        }
    };

    public JdbcTemplate getAdminJdbc() {
        return adminJdbc;
    }

    public AdminRepository(JdbcTemplate adminJdbc) {
        super();
        this.adminJdbc = adminJdbc;
    }

    // Create Admin
    public void createAdmin(Admin admin) {
        String sql = "INSERT INTO Admins (Username, Password, Role, Email) VALUES (?, ?, ?, ?)";
        try {
            adminJdbc.update(sql, admin.getUsername(), admin.getPassword(), admin.getRole(), admin.getEmail());
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
        }
    }

    // Read Admin
    public Admin readAdmin(int adminId) {
        String sql = "SELECT * FROM Admins WHERE AdminID = ?";
        try {
            return adminJdbc.queryForObject(sql, adminRowMapper, adminId);
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }

    // Update Admin
    public void updateAdmin(Admin admin) {
        String sql = "UPDATE Admins SET Username = ?, Password = ?, Role = ?, Email = ? WHERE AdminID = ?";
        try {
            adminJdbc.update(sql, admin.getUsername(), admin.getPassword(), admin.getRole(), admin.getEmail(), admin.getAdminId());
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
        }
    }

    // Delete Admin
    public void deleteAdmin(int adminId) {
        String sql = "DELETE FROM Admins WHERE AdminID = ?";
        try {
            adminJdbc.update(sql, adminId);
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
        }
    }

    // Search Admin
    public List<Admin> searchAdmins(String keyword) {
        String sql = "SELECT * FROM Admins WHERE Username LIKE ? OR Email LIKE ?";
        try {
            String formattedKeyword = "%" + keyword.trim().replaceAll("\\s+", " ") + "%";
            return adminJdbc.query(sql, adminRowMapper, formattedKeyword, formattedKeyword);
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }

    // Get All Admins
    public List<Admin> getAllAdmins() {
        String sql = "SELECT * FROM Admins";
        try {
            return adminJdbc.query(sql, adminRowMapper);
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }
}
