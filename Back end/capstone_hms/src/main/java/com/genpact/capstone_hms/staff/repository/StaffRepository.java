package com.genpact.capstone_hms.staff.repository;

import com.genpact.capstone_hms.staff.model.Staff;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class StaffRepository {
    // CRUDS - Create, Read, Update, Delete, Search
    private JdbcTemplate staffJdbc;
    private RowMapper<Staff> staffRowMapper = new RowMapper<Staff>() {
        @Override
        public Staff mapRow(ResultSet resultSet, int rowNum) throws SQLException {
            return new Staff(
                resultSet.getInt("StaffID"),
                resultSet.getString("FirstName"),
                resultSet.getString("LastName"),
                resultSet.getString("Role"),
                resultSet.getString("PhoneNumber"),
                resultSet.getString("Email"),
                resultSet.getString("Department"),
                resultSet.getTimestamp("Hire_date")
            );
        }
    };

    public JdbcTemplate getStaffJdbc() {
        return staffJdbc;
    }

    public StaffRepository(JdbcTemplate staffJdbc) {
        super();
        this.staffJdbc = staffJdbc;
    }

    // Create Staff
    public void createStaff(Staff staff) {
        String sql = "INSERT INTO Staff (FirstName, LastName, Role, PhoneNumber, Email, Department) VALUES (?, ?, ?, ?, ?, ?)";
        try {
//        	System.out.println(staff);
            staffJdbc.update(sql, staff.getFirstName(), staff.getLastName(), staff.getRole(), staff.getPhoneNumber(), staff.getEmail(), staff.getDepartment());
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
        }
    }

    // Read Staff
    public Staff readStaff(int staffID) {
        String sql = "SELECT * FROM Staff WHERE StaffID = ?";
        try {
            return staffJdbc.queryForObject(sql, staffRowMapper, staffID);
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }

    // Update Staff
    public void updateStaff(Staff staff) {
        String sql = "UPDATE Staff SET FirstName = ?, LastName = ?, Role = ?, PhoneNumber = ?, Email = ?, Department = ? WHERE StaffID = ?";
        try {
            staffJdbc.update(sql, staff.getFirstName(), staff.getLastName(), staff.getRole(), staff.getPhoneNumber(), staff.getEmail(), staff.getDepartment(), staff.getStaffID());
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
        }
    }

    // Delete Staff
    public void deleteStaff(int staffID) {
        String sql = "DELETE FROM Staff WHERE StaffID = ?";
        try {
            staffJdbc.update(sql, staffID);
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
        }
    }

    // Search Staff
    public List<Staff> searchStaff(String keyword) {
        String sql = "SELECT * FROM Staff WHERE FirstName LIKE ? OR LastName LIKE ? OR Role LIKE ? OR Email LIKE ?";
        try {
            String formattedKeyword = "%" + keyword.trim().replaceAll("\\s+", " ") + "%";
            return staffJdbc.query(sql, staffRowMapper, formattedKeyword, formattedKeyword, formattedKeyword, formattedKeyword);
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }

    // Get All Staff
    public List<Staff> getAllStaff() {
        String sql = "SELECT * FROM Staff";
        try {
            return staffJdbc.query(sql, staffRowMapper);
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }
}