package com.genpact.capstone_hms.model;

public class DoctorLogin {
    private int loginId;
    private int doctorId;
    private String username;
    private String password;

    // Default constructor
    public DoctorLogin() {}

    // Parameterized constructor
    public DoctorLogin(int loginId, int doctorId, String username, String password) {
        this.loginId = loginId;
        this.doctorId = doctorId;
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

    public int getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(int doctorId) {
        this.doctorId = doctorId;
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
        return "DoctorLogin{" +
                "loginId=" + loginId +
                ", doctorId=" + doctorId +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
