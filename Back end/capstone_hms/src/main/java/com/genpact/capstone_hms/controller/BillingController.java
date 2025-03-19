package com.genpact.capstone_hms.controller;

import com.genpact.capstone_hms.model.Billing;
import com.genpact.capstone_hms.service.BillingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/billings")
@CrossOrigin(origins = "*")
public class BillingController {

    private final BillingService billingService;

    @Autowired
    public BillingController(BillingService billingService) {
        this.billingService = billingService;
    }

    @PostMapping("/add")
    public void createBilling(@RequestBody Billing billing) {
        billingService.createBilling(billing);
    }

    @GetMapping("/{billID}")
    public Billing readBilling(@PathVariable int billID) {
        return billingService.readBilling(billID);
    }
// Bill can not be updated..
//    @PutMapping("/update/{billID}")
//    public void updateBilling(@PathVariable int billID, @RequestBody Billing billing) {
//        billing.setBillID(billID);
//        billingService.updateBilling(billing);
//    }

    @DeleteMapping("/delete/{billID}")
    public void deleteBilling(@PathVariable int billID) {
        billingService.deleteBilling(billID);
    }

    @GetMapping("/all")
    public List<Billing> getAllBillings() {
        return billingService.getAllBillings();
    }
}