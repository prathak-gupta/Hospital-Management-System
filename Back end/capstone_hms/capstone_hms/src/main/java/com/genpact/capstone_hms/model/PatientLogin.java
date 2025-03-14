package com.genpact.capstone_hms.model;

public class PatientLogin {
    private int loginId;
    private int patientId;
    private String username;
    private String password;
    
    public PatientLogin() {}

    // Constructor
    public PatientLogin(int loginId, int patientId, String username, String password) {
        this.loginId = loginId;
        this.patientId = patientId;
        this.username = username;
        this.password = password;
    }

    // Getters and Setters
    public int getLoginId() {
        return loginId;
    }

    public void setLoginId(int loginId) {
        this.loginId = loginId;
    }

    public int getPatientId() {
        return patientId;
    }

    public void setPatientId(int patientId) {
        this.patientId = patientId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "PatientLogin{" +
                "loginId=" + loginId +
                ", patientId=" + patientId +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
