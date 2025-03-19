package com.genpact.capstone_hms.model;

import java.sql.Date;
import java.sql.Time;
import java.sql.Timestamp;

public class Appointment {
    private int appointmentID;
    private int patientID;
    private int doctorID;
    private Date appointmentDate;
    private Time appointmentTime;
    private String reason;
    private String appointmentType;
    private Timestamp registrationTime;
    
    public Appointment() {}

    // Parameterized Constructor
    public Appointment(int appointmentID, int patientID, int doctorID, Date appointmentDate, Time appointmentTime, String reason, String appointmentType, Timestamp registrationTime) {
        this.appointmentID = appointmentID;
        this.patientID = patientID;
        this.doctorID = doctorID;
        this.appointmentDate = appointmentDate;
        this.appointmentTime = appointmentTime;
        this.reason = reason;
        this.appointmentType = appointmentType;
        this.registrationTime = registrationTime;
    }

    // Extra Parameterized Constructor without ID and Registration Time
    public Appointment(int patientID, int doctorID, Date appointmentDate, Time appointmentTime, String appointmentType, String reason) {
        this.patientID = patientID;
        this.doctorID = doctorID;
        this.appointmentDate = appointmentDate;
        this.appointmentTime = appointmentTime;
        this.reason = reason;
        this.appointmentType = appointmentType;
    }

    // Getters and Setters
    public int getAppointmentID() {
        return appointmentID;
    }

    public void setAppointmentID(int appointmentID) {
        this.appointmentID = appointmentID;
    }

    public int getPatientID() {
        return patientID;
    }

    public void setPatientID(int patientID) {
        this.patientID = patientID;
    }

    public int getDoctorID() {
        return doctorID;
    }

    public void setDoctorID(int doctorID) {
        this.doctorID = doctorID;
    }

    public Date getAppointmentDate() {
        return appointmentDate;
    }

    public void setAppointmentDate(Date appointmentDate) {
        this.appointmentDate = appointmentDate;
    }

    public Time getAppointmentTime() {
        return appointmentTime;
    }

    public void setAppointmentTime(Time appointmentTime) {
        this.appointmentTime = appointmentTime;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public Timestamp getRegistrationTime() {
        return registrationTime;
    }

    public void setRegistrationTime(Timestamp registrationTime) {
        this.registrationTime = registrationTime;
    }

    
    public String getAppointmentType() {
		return appointmentType;
	}

	public void setAppointmentType(String appointmentType) {
		this.appointmentType = appointmentType;
	}

	@Override
	public String toString() {
		return "Appointment [appointmentID=" + appointmentID + ", patientID=" + patientID + ", doctorID=" + doctorID
				+ ", appointmentDate=" + appointmentDate + ", appointmentTime=" + appointmentTime + ", reason=" + reason
				+ ", appointmentType=" + appointmentType + ", registrationTime=" + registrationTime + "]";
	}

	
}
