package com.genpact.capstone_hms.repository;

import com.genpact.capstone_hms.model.Billing;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class BillingRepository {
    private JdbcTemplate billingJdbc;
    private RowMapper<Billing> billingRowMapper = new RowMapper<Billing>() {
        @Override
        public Billing mapRow(ResultSet resultSet, int rowNum) throws SQLException {
            return new Billing(
                resultSet.getInt("bill_id"),
                resultSet.getInt("PatientID"),
                resultSet.getDouble("amount"),
                resultSet.getString("payment_status"),
                resultSet.getTimestamp("billing_time"),
                resultSet.getString("payment_method"),
                resultSet.getString("billing_status"),
                resultSet.getInt("created_by")
            );
        }
    };

    public BillingRepository(JdbcTemplate billingJdbc) {
        this.billingJdbc = billingJdbc;
    }

    // Create Billing
    public void createBilling(Billing billing) {
        String sql = "INSERT INTO Billing (PatientID, amount, payment_status, payment_method, billing_status, created_by) VALUES (?, ?, ?, ?, ?, ?)";
        try {
            billingJdbc.update(sql, billing.getPatientID(), billing.getAmount(), billing.getPaymentStatus(), billing.getPaymentMethod(), billing.getBillingStatus(), billing.getCreatedBy());
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
        }
    }

    // Read Billing
    public Billing readBilling(int billID) {
        String sql = "SELECT * FROM Billing WHERE bill_id = ?";
        try {
            return billingJdbc.queryForObject(sql, billingRowMapper, billID);
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }

    // Update Billing
    public void updateBilling(Billing billing) {
        String sql = "UPDATE Billing SET PatientID = ?, amount = ?, payment_status = ?, payment_method = ?, billing_status = ?, created_by = ? WHERE bill_id = ?";
        try {
            billingJdbc.update(sql, billing.getPatientID(), billing.getAmount(), billing.getPaymentStatus(), billing.getPaymentMethod(), billing.getBillingStatus(), billing.getCreatedBy(), billing.getBillID());
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
        }
    }

    // Delete Billing
    public void deleteBilling(int billID) {
        String sql = "DELETE FROM Billing WHERE bill_id = ?";
        try {
            billingJdbc.update(sql, billID);
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
        }
    }

    // Get All Billings
    public List<Billing> getAllBillings() {
        String sql = "SELECT * FROM Billing";
        try {
            return billingJdbc.query(sql, billingRowMapper);
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }
}
