package com.genpact.capstone_hms.model;

import java.sql.Timestamp;

public class Billing {
    private int billID;
    private int patientID;
    private double amount;
    private String paymentStatus;
    private Timestamp billingTime;
    private String paymentMethod;
    private String billingStatus;
    private int createdBy;

    public Billing() {}
    
    // Parameterized Constructor
    public Billing(int billID, int patientID, double amount, String paymentStatus, Timestamp billingTime, String paymentMethod, String billingStatus, int createdBy) {
        this.billID = billID;
        this.patientID = patientID;
        this.amount = amount;
        this.paymentStatus = paymentStatus;
        this.billingTime = billingTime;
        this.paymentMethod = paymentMethod;
        this.billingStatus = billingStatus;
        this.createdBy = createdBy;
    }

    // Extra Parameterized Constructor without ID and Billing Time
    public Billing(int patientID, double amount, String paymentStatus, String paymentMethod, String billingStatus, int createdBy) {
        this.patientID = patientID;
        this.amount = amount;
        this.paymentStatus = paymentStatus;
        this.billingTime = new Timestamp(System.currentTimeMillis()); // sets current time
        this.paymentMethod = paymentMethod;
        this.billingStatus = billingStatus;
        this.createdBy = createdBy;
    }

    // Getters and Setters
    public int getBillID() {
        return billID;
    }

    public void setBillID(int billID) {
        this.billID = billID;
    }

    public int getPatientID() {
        return patientID;
    }

    public void setPatientID(int patientID) {
        this.patientID = patientID;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public Timestamp getBillingTime() {
        return billingTime;
    }

    public void setBillingTime(Timestamp billingTime) {
        this.billingTime = billingTime;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public String getBillingStatus() {
        return billingStatus;
    }

    public void setBillingStatus(String billingStatus) {
        this.billingStatus = billingStatus;
    }

    public int getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(int createdBy) {
        this.createdBy = createdBy;
    }

    // toString Method
    @Override
    public String toString() {
        return "BillingModel{" +
                "billID=" + billID +
                ", patientID=" + patientID +
                ", amount=" + amount +
                ", paymentStatus='" + paymentStatus + '\'' +
                ", billingTime=" + billingTime +
                ", paymentMethod='" + paymentMethod + '\'' +
                ", billingStatus='" + billingStatus + '\'' +
                ", createdBy=" + createdBy +
                '}';
    }
}
