package com.genpact.capstone_hms.admin.model;

public class Admin {
    private int adminID;
    private String username;
    private String password;
    private String role;
    private String email;
    
    //Default Constructor
    public Admin() {
    }

    // Parameterized Constructor
    public Admin(int adminID, String username, String password, String role, String email) {
        this.adminID = adminID;
        this.username = username;
        this.password = password;
        this.role = role;
        this.email = email;
    }

    // Extra Parameterized Constructor without ID
    public Admin(String username, String password, String role, String email) {
        this.username = username;
        this.password = password;
        this.role = role;
        this.email = email;
    }

    // Getters and Setters
    public int getAdminId() {
        return adminID;
    }

    public void setAdminID(int adminID) {
        this.adminID = adminID;
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

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    // toString Method
    @Override
    public String toString() {
        return "AdminModel{" +
                "adminID=" + adminID +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", role='" + role + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}
