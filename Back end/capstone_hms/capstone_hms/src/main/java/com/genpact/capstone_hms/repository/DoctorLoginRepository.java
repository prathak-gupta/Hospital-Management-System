package com.genpact.capstone_hms.repository;

import com.genpact.capstone_hms.model.DoctorLogin;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class DoctorLoginRepository {
    // CRUDS - Create, Read, Update, Delete, Search
    private JdbcTemplate doctorJdbc;
    private RowMapper<DoctorLogin> doctorRowMapper = new RowMapper<DoctorLogin>() {
        @Override
        public DoctorLogin mapRow(ResultSet resultSet, int rowNum) throws SQLException {
            return new DoctorLogin(
                resultSet.getInt("LoginID"),
                resultSet.getInt("DoctorID"),
                resultSet.getString("Username"),
                resultSet.getString("Password")
            );
        }
    };

    public JdbcTemplate getDoctorJdbc() {
        return doctorJdbc;
    }

    public DoctorLoginRepository(JdbcTemplate doctorJdbc) {
        super();
        this.doctorJdbc = doctorJdbc;
    }

    // Create DoctorLogin
    public void createDoctorLogin(DoctorLogin doctorLogin) {
        String sql = "INSERT INTO DoctorsLogin (DoctorID, Username, Password) VALUES (?, ?, ?)";
        try {
            doctorJdbc.update(sql, doctorLogin.getDoctorId(), doctorLogin.getUsername(), doctorLogin.getPassword());
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
        }
    }

    // Read DoctorLogin
    public DoctorLogin readDoctorLogin(String username) {
        String sql = "SELECT * FROM DoctorsLogin WHERE username = ?";
        try {
            return doctorJdbc.queryForObject(sql, doctorRowMapper, username);
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }

    // Update DoctorLogin
    public void updateDoctorLogin(DoctorLogin doctorLogin) {
        String sql = "UPDATE DoctorsLogin SET DoctorID = ?, Username = ?, Password = ? WHERE LoginID = ?";
        try {
            doctorJdbc.update(sql, doctorLogin.getDoctorId(), doctorLogin.getUsername(), doctorLogin.getPassword(), doctorLogin.getLoginId());
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
        }
    }

    // Delete DoctorLogin
    public void deleteDoctorLogin(int loginID) {
        String sql = "DELETE FROM DoctorsLogin WHERE LoginID = ?";
        try {
            doctorJdbc.update(sql, loginID);
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
        }
    }

    // Search DoctorLogins
    public List<DoctorLogin> searchDoctorLogins(String keyword) {
        String sql = "SELECT * FROM DoctorsLogin WHERE Username LIKE ?";
        try {
            String formattedKeyword = "%" + keyword.trim().replaceAll("\\s+", " ") + "%";
            return doctorJdbc.query(sql, doctorRowMapper, formattedKeyword);
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }

    // Get All DoctorLogins
    public List<DoctorLogin> getAllDoctorLogins() {
        String sql = "SELECT * FROM DoctorsLogin";
        try {
            return doctorJdbc.query(sql, doctorRowMapper);
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }
}
