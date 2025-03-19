package com.genpact.capstone_hms.repository;

import com.genpact.capstone_hms.model.PatientLogin;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class PatientLoginRepository {
    // CRUDS - Create, Read, Update, Delete, Search
    private JdbcTemplate patientJdbc;
    private RowMapper<PatientLogin> patientRowMapper = new RowMapper<PatientLogin>() {
        @Override
        public PatientLogin mapRow(ResultSet resultSet, int rowNum) throws SQLException {
            return new PatientLogin(
                resultSet.getInt("LoginID"),
                resultSet.getInt("PatientID"),
                resultSet.getString("Username"),
                resultSet.getString("Password")
            );
        }
    };

    
    public JdbcTemplate getPatientJdbc() {
        return patientJdbc;
    }

    public PatientLoginRepository(JdbcTemplate patientJdbc) {
        super();
        this.patientJdbc = patientJdbc;
    }

    // Create PatientLogin
    public void createPatientLogin(PatientLogin patientLogin) {
        String sql = "INSERT INTO PatientsLogin (PatientID, Username, Password) VALUES (?, ?, ?)";
        try {
            patientJdbc.update(sql, patientLogin.getPatientId(), patientLogin.getUsername(), patientLogin.getPassword());
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
        }
    }

    // Read PatientLogin
    public PatientLogin readPatientLogin(String username) {
        String sql = "SELECT * FROM PatientsLogin WHERE username = ?";
        try {
            return patientJdbc.queryForObject(sql, patientRowMapper, username);
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }

    // Update PatientLogin
    public void updatePatientLogin(PatientLogin patientLogin) {
        String sql = "UPDATE PatientsLogin SET PatientID = ?, Username = ?, Password = ? WHERE LoginID = ?";
        try {
            patientJdbc.update(sql, patientLogin.getPatientId(), patientLogin.getUsername(), patientLogin.getPassword(), patientLogin.getLoginId());
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
        }
    }

    // Delete PatientLogin
    public void deletePatientLogin(int loginID) {
        String sql = "DELETE FROM PatientsLogin WHERE LoginID = ?";
        try {
            patientJdbc.update(sql, loginID);
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
        }
    }

    // Search PatientLogins
    public List<PatientLogin> searchPatientLogins(String keyword) {
        String sql = "SELECT * FROM PatientsLogin WHERE Username LIKE ?";
        try {
            String formattedKeyword = "%" + keyword.trim().replaceAll("\\s+", " ") + "%";
            return patientJdbc.query(sql, patientRowMapper, formattedKeyword);
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }

    // Get All PatientLogins
    public List<PatientLogin> getAllPatientLogins() {
        String sql = "SELECT * FROM PatientsLogin";
        try {
            return patientJdbc.query(sql, patientRowMapper);
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }
}
