package com.genpact.capstone_hms.repository;

import com.genpact.capstone_hms.model.StaffLogin;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class StaffLoginRepository {
    // CRUDS - Create, Read, Update, Delete, Search
    private JdbcTemplate staffJdbc;
    private RowMapper<StaffLogin> staffRowMapper = new RowMapper<StaffLogin>() {
        @Override
        public StaffLogin mapRow(ResultSet resultSet, int rowNum) throws SQLException {
            return new StaffLogin(
                resultSet.getInt("LoginID"),
                resultSet.getInt("StaffID"),
                resultSet.getString("Username"),
                resultSet.getString("Password")
            );
        }
    };

    public JdbcTemplate getStaffJdbc() {
        return staffJdbc;
    }

    public StaffLoginRepository(JdbcTemplate staffJdbc) {
        super();
        this.staffJdbc = staffJdbc;
    }

    // Create StaffLogin
    public void createStaffLogin(StaffLogin staffLogin) {
        String sql = "INSERT INTO StaffLogin (StaffID, Username, Password) VALUES (?, ?, ?)";
        try {
            staffJdbc.update(sql, staffLogin.getStaffId(), staffLogin.getUsername(), staffLogin.getPassword());
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
        }
    }

    // Read StaffLogin
    public StaffLogin readStaffLogin(String username) {
        String sql = "SELECT * FROM StaffLogin WHERE username = ?";
        try {
            return staffJdbc.queryForObject(sql, staffRowMapper, username);
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }

    // Update StaffLogin
    public void updateStaffLogin(StaffLogin staffLogin) {
        String sql = "UPDATE StaffLogin SET StaffID = ?, Username = ?, Password = ? WHERE LoginID = ?";
        try {
            staffJdbc.update(sql, staffLogin.getStaffId(), staffLogin.getUsername(), staffLogin.getPassword(), staffLogin.getLoginId());
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
        }
    }

    // Delete StaffLogin
    public void deleteStaffLogin(int loginID) {
        String sql = "DELETE FROM StaffLogin WHERE LoginID = ?";
        try {
            staffJdbc.update(sql, loginID);
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
        }
    }

    // Search StaffLogins
    public List<StaffLogin> searchStaffLogins(String keyword) {
        String sql = "SELECT * FROM StaffLogin WHERE Username LIKE ?";
        try {
            String formattedKeyword = "%" + keyword.trim().replaceAll("\\s+", " ") + "%";
            return staffJdbc.query(sql, staffRowMapper, formattedKeyword);
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }

    // Get All StaffLogins
    public List<StaffLogin> getAllStaffLogins() {
        String sql = "SELECT * FROM StaffLogin";
        try {
            return staffJdbc.query(sql, staffRowMapper);
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }
}
