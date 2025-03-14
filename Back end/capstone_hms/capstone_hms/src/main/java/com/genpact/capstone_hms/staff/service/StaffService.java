package com.genpact.capstone_hms.staff.service;

import com.genpact.capstone_hms.staff.model.Staff;
import com.genpact.capstone_hms.staff.repository.StaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StaffService {

    private final StaffRepository staffRepository;

    @Autowired
    public StaffService(StaffRepository staffRepository) {
        this.staffRepository = staffRepository;
    }

    // Create Staff
    public void createStaff(Staff staff) {
        staffRepository.createStaff(staff);
    }

    // Read Staff
    public Staff readStaff(int staffID) {
        return staffRepository.readStaff(staffID);
    }

    // Update Staff
    public void updateStaff(Staff staff) {
        staffRepository.updateStaff(staff);
    }

    // Delete Staff
    public void deleteStaff(int staffID) {
        staffRepository.deleteStaff(staffID);
    }

    // Search Staff
    public List<Staff> searchStaff(String keyword) {
        return staffRepository.searchStaff(keyword);
    }

    // Get All Staff
    public List<Staff> getAllStaff() {
        return staffRepository.getAllStaff();
    }
}