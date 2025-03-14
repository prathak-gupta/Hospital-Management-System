package com.genpact.capstone_hms.model;

public class AdminLogin {
    private int loginId;
    private int adminId;
    private String username;
    private String password;

    // Default constructor
    public AdminLogin() {}

    // Parameterized constructor
    public AdminLogin(int loginId, int adminId, String username, String password) {
        this.loginId = loginId;
        this.adminId = adminId;
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

    public int getAdminId() {
        return adminId;
    }

    public void setAdminId(int adminId) {
        this.adminId = adminId;
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
        return "AdminLogin{" +
                "loginId=" + loginId +
                ", adminId=" + adminId +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
