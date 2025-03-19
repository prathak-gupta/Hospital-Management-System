package com.genpact.capstone_hms.model;

public class StaffLogin {
    private int loginId;
    private int staffId;
    private String username;
    private String password;
    
    public StaffLogin() {}

    // Constructor
    public StaffLogin(int loginId, int staffId, String username, String password) {
        this.loginId = loginId;
        this.staffId = staffId;
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

    public int getStaffId() {
        return staffId;
    }

    public void setStaffId(int staffId) {
        this.staffId = staffId;
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
        return "StaffLogin{" +
                "loginId=" + loginId +
                ", staffId=" + staffId +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
