package com.genpact.capstone_hms.model;

import java.sql.Date;

public class Prescription {
    private int prescriptionId;
    private int patientId;
    private int doctorId;
    private String medicationName;
    private String dosage;
    private String frequency;
    private String duration;
    private Date issueDate;
    private String notes;

    public Prescription() {}

    // Parameterized Constructor
    public Prescription(int prescriptionId, int patientId, int doctorId, String medicationName, String dosage, String frequency, String duration, Date issueDate, String notes) {
        this.prescriptionId = prescriptionId;
        this.patientId = patientId;
        this.doctorId = doctorId;
        this.medicationName = medicationName;
        this.dosage = dosage;
        this.frequency = frequency;
        this.duration = duration;
        this.issueDate = issueDate;
        this.notes = notes;
    }

    // Extra Parameterized Constructor without ID and Issue Date
    public Prescription(int patientId, int doctorId, String medicationName, String dosage, String frequency, String duration, String notes) {
        this.patientId = patientId;
        this.doctorId = doctorId;
        this.medicationName = medicationName;
        this.dosage = dosage;
        this.frequency = frequency;
        this.duration = duration;
        this.notes = notes;
    }

    // Getters and Setters
    public int getPrescriptionId() {
        return prescriptionId;
    }

    public void setPrescriptionId(int prescriptionId) {
        this.prescriptionId = prescriptionId;
    }

    public int getPatientId() {
        return patientId;
    }

    public void setPatientId(int patientId) {
        this.patientId = patientId;
    }

    public int getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(int doctorId) {
        this.doctorId = doctorId;
    }

    public String getMedicationName() {
        return medicationName;
    }

    public void setMedicationName(String medicationName) {
        this.medicationName = medicationName;
    }

    public String getDosage() {
        return dosage;
    }

    public void setDosage(String dosage) {
        this.dosage = dosage;
    }

    public String getFrequency() {
        return frequency;
    }

    public void setFrequency(String frequency) {
        this.frequency = frequency;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public Date getIssueDate() {
        return issueDate;
    }

    public void setIssueDate(Date issueDate) {
        this.issueDate = issueDate;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    @Override
    public String toString() {
        return "Prescription [prescriptionId=" + prescriptionId + ", patientId=" + patientId + ", doctorId=" + doctorId
                + ", medicationName=" + medicationName + ", dosage=" + dosage + ", frequency=" + frequency
                + ", duration=" + duration + ", issueDate=" + issueDate + ", notes=" + notes + "]";
    }
}
