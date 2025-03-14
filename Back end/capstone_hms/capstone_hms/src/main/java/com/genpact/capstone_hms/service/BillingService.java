package com.genpact.capstone_hms.service;

import com.genpact.capstone_hms.model.Billing;
import com.genpact.capstone_hms.repository.BillingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BillingService {

    private final BillingRepository billingRepository;

    @Autowired
    public BillingService(BillingRepository billingRepository) {
        this.billingRepository = billingRepository;
    }

    public void createBilling(Billing billing) {
        billingRepository.createBilling(billing);
    }

    public Billing readBilling(int billID) {
        return billingRepository.readBilling(billID);
    }

    public void updateBilling(Billing billing) {
        billingRepository.updateBilling(billing);
    }

    public void deleteBilling(int billID) {
        billingRepository.deleteBilling(billID);
    }

    public List<Billing> getAllBillings() {
        return billingRepository.getAllBillings();
    }
}
