-- Patients Table
CREATE TABLE if not exists Patients (
    PatientID INT AUTO_INCREMENT PRIMARY KEY,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    DateOfBirth DATE NOT NULL,
    Gender VARCHAR(10),
    Address VARCHAR(255),
    PhoneNumber VARCHAR(15),
    Email VARCHAR(100),
    EmergencyContactName VARCHAR(100),
    EmergencyContactPhone VARCHAR(15),
    Registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Doctors Table
CREATE TABLE if not exists Doctors (
    DoctorID INT AUTO_INCREMENT PRIMARY KEY,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    Specialization VARCHAR(100),
    PhoneNumber VARCHAR(15),
    Email VARCHAR(100),
    Department VARCHAR(100),
    Qualification VARCHAR(100),
    YearsOfExperience INT,
    Charges DECIMAL(10, 2),
    Registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Prescription Table
CREATE TABLE IF NOT EXISTS prescriptions (
    prescriptionId INT AUTO_INCREMENT PRIMARY KEY,
    PatientID INT NOT NULL,
    DoctorID INT NOT NULL,
    medication_name VARCHAR(255) NOT NULL,
    dosage VARCHAR(50) NOT NULL,
    frequency VARCHAR(50) NOT NULL,
    duration VARCHAR(50) NOT NULL,
    issue_date DATE NOT NULL,
    notes TEXT,
    FOREIGN KEY (PatientID) REFERENCES patients(PatientID),
    FOREIGN KEY (DoctorID) REFERENCES doctors(DoctorID)
);


-- Admins Table
CREATE TABLE if not exists Admins (
    AdminID INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(50) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    Role VARCHAR(50),
    Email VARCHAR(100)
);

-- Appointments Table
CREATE TABLE if not exists Appointments (
    AppointmentID INT AUTO_INCREMENT PRIMARY KEY,
    PatientID INT,
    DoctorID INT,
    AppointmentDate DATE,
    AppointmentTime TIME,
    appointmentType VARCHAR(60),
    Reason VARCHAR(255),
    FOREIGN KEY (PatientID) REFERENCES Patients(PatientID) ON DELETE CASCADE,
    FOREIGN KEY (DoctorID) REFERENCES Doctors(DoctorID) ON DELETE CASCADE,
    registration_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Billing Table
CREATE TABLE if not exists Billing (
    bill_id INT AUTO_INCREMENT PRIMARY KEY,
    PatientID INT,
    amount DECIMAL(10, 2),
    payment_status VARCHAR(50),
    billing_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    payment_method VARCHAR(50),
    billing_status VARCHAR(50),
    created_by INT,
    FOREIGN KEY (PatientID) REFERENCES Patients(PatientID) ON DELETE CASCADE
);

-- Doctors Login Table
CREATE TABLE if not exists DoctorsLogin (
    LoginID INT AUTO_INCREMENT PRIMARY KEY,
    DoctorID INT,
    Username VARCHAR(50) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    FOREIGN KEY (DoctorID) REFERENCES Doctors(DoctorID) ON DELETE CASCADE
);

-- Admins Login Table
CREATE TABLE if not exists AdminsLogin (
    LoginID INT AUTO_INCREMENT PRIMARY KEY,
    AdminID INT,
    Username VARCHAR(50) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    FOREIGN KEY (AdminID) REFERENCES Admins(AdminID) ON DELETE CASCADE
);

-- Patients Login Table
CREATE TABLE if not exists PatientsLogin (
    LoginID INT AUTO_INCREMENT PRIMARY KEY,
    PatientID INT,
    Username VARCHAR(50) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    FOREIGN KEY (PatientID) REFERENCES Patients(PatientID) ON DELETE CASCADE
);

