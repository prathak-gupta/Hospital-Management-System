package com.genpact.capstone_hms.doctors.model;

import java.sql.Timestamp;

public class Doctor {
    private int doctorID;
    private String firstName;
    private String lastName;
    private String specialization;
    private String phoneNumber;
    private String email;
    private String department;
    private String qualification;
    private int yearsOfExperience;
    private double charges;
    private Timestamp registrationDate;

    // Default constructor
    public Doctor() {}

    // Parameterized constructor
    public Doctor(int doctorID, String firstName, String lastName, String specialization, String phoneNumber, String email, String department, String qualification, int yearsOfExperience, double charges, Timestamp registrationDate) {
        this.doctorID = doctorID;
        this.firstName = firstName;
        this.lastName = lastName;
        this.specialization = specialization;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.department = department;
        this.qualification = qualification;
        this.yearsOfExperience = yearsOfExperience;
        this.charges = charges;
        this.registrationDate = registrationDate;
    }

    // Parameterized constructor without ID and registration date
    public Doctor(String firstName, String lastName, String specialization, String phoneNumber, String email, String department, String qualification, double charges, int yearsOfExperience) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.specialization = specialization;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.department = department;
        this.qualification = qualification;
        this.charges = charges;
        this.yearsOfExperience = yearsOfExperience;
    }

    // Getters and setters
    public int getDoctorID() {
        return doctorID;
    }

    public void setDoctorID(int doctorID) {
        this.doctorID = doctorID;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getSpecialization() {
        return specialization;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getQualification() {
        return qualification;
    }

    public void setQualification(String qualification) {
        this.qualification = qualification;
    }

    public int getYearsOfExperience() {
        return yearsOfExperience;
    }

    public void setYearsOfExperience(int yearsOfExperience) {
        this.yearsOfExperience = yearsOfExperience;
    }

    public double getCharges() {
        return charges;
    }

    public void setCharges(double charges) {
        this.charges = charges;
    }

    public Timestamp getRegistrationDate() {
        return registrationDate;
    }

    public void setRegistrationDate(Timestamp registrationDate) {
        this.registrationDate = registrationDate;
    }

    @Override
    public String toString() {
        return "Doctor [doctorID=" + doctorID + ", firstName=" + firstName + ", lastName=" + lastName
                + ", specialization=" + specialization + ", phoneNumber=" + phoneNumber + ", email=" + email
                + ", department=" + department + ", qualification=" + qualification + ", yearsOfExperience="
                + yearsOfExperience + ", charges=" + charges + ", registrationDate=" + registrationDate + "]";
    }
}
