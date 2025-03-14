package com.genpact.capstone_hms.doctors.repository;

import com.genpact.capstone_hms.doctors.model.Doctor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;


@Repository
public class DoctorRepository {
    // CRUDS - Create, Read, Update, Delete, Search
    private JdbcTemplate doctorJdbc;
    private RowMapper<Doctor> doctorRowMapper = new RowMapper<Doctor>() {
        @Override
        public Doctor mapRow(ResultSet resultSet, int rowNum) throws SQLException {
            return new Doctor(
                resultSet.getInt("DoctorID"),
                resultSet.getString("FirstName"),
                resultSet.getString("LastName"),
                resultSet.getString("Specialization"),
                resultSet.getString("PhoneNumber"),
                resultSet.getString("Email"),
                resultSet.getString("Department"),
                resultSet.getString("Qualification"),
                resultSet.getInt("YearsOfExperience"),
                resultSet.getDouble("charges"),
                resultSet.getTimestamp("Registration_date")
            );
        }
    };

    public JdbcTemplate getDoctorJdbc() {
        return doctorJdbc;
    }

    public DoctorRepository(JdbcTemplate doctorJdbc) {
        super();
        this.doctorJdbc = doctorJdbc;
    }

    // Create Doctor
    public void createDoctor(Doctor doctor) {
//    	String doctorLoginEntry = "INSERT INTO doctorslogin (username, password) VALUES (?,?)";
        String sql = "INSERT INTO Doctors (FirstName, LastName, Specialization, PhoneNumber, Email, Department, Qualification, YearsOfExperience, Charges) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        try {
            doctorJdbc.update(sql, doctor.getFirstName(), doctor.getLastName(), doctor.getSpecialization(), doctor.getPhoneNumber(), doctor.getEmail(), doctor.getDepartment(), doctor.getQualification(), doctor.getYearsOfExperience());
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
        }
    }

    // Read Doctor
    public Doctor readDoctor(int doctorID) {
        String sql = "SELECT * FROM Doctors WHERE DoctorID = ?";
        try {
            return doctorJdbc.queryForObject(sql, doctorRowMapper, doctorID);
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }

    // Update Doctor
    public void updateDoctor(Doctor doctor) {
        String sql = "UPDATE Doctors SET FirstName = ?, LastName = ?, Specialization = ?, PhoneNumber = ?, Email = ?, Department = ?, Qualification = ?, YearsOfExperience = ?, Charges = ? WHERE DoctorID = ?";
        try {
            doctorJdbc.update(sql, doctor.getFirstName(), doctor.getLastName(), doctor.getSpecialization(), doctor.getPhoneNumber(), doctor.getEmail(), doctor.getDepartment(), doctor.getQualification(), doctor.getYearsOfExperience(), doctor.getCharges(), doctor.getDoctorID());
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
        }
    }

    // Delete Doctor
    public void deleteDoctor(int doctorID) {
        String sql = "DELETE FROM Doctors WHERE DoctorID = ?";
        try {
            doctorJdbc.update(sql, doctorID);
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
        }
    }

    // Search Doctors
    public List<Doctor> searchDoctors(String keyword) {
        String sql = "SELECT * FROM Doctors WHERE FirstName LIKE ? OR LastName LIKE ? OR Specialization LIKE ? OR Email LIKE ?";
        try {
            String formattedKeyword = "%" + keyword.trim().replaceAll("\\s+", " ") + "%";
            return doctorJdbc.query(sql, doctorRowMapper, formattedKeyword, formattedKeyword, formattedKeyword, formattedKeyword);
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }

    // Get All Doctors
    public List<Doctor> getAllDoctors() {
        String sql = "SELECT * FROM Doctors";
        try {
            return doctorJdbc.query(sql, doctorRowMapper);
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }
}
