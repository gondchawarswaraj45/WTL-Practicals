package com.society.management.service;

import com.society.management.entity.*;
import com.society.management.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class BillingService {

    @Autowired
    private MaintenanceBillRepository billRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private ResidentRepository residentRepository;

    @Autowired
    private FlatRepository flatRepository;

    public void generateBillsForMonth(LocalDate billingMonth) {
        List<Resident> activeResidents = residentRepository.findAll();
        String monthStr = billingMonth.format(DateTimeFormatter.ofPattern("yyyyMM"));
        
        int count = 1;
        for (Resident resident : activeResidents) {
            if (resident.getFlat() == null || !resident.getIsActive()) {
                continue;
            }
            
            // Check if bill already exists for this resident and month
            // To simplify, check by billingMonth and resident
            boolean exists = billRepository.findByResidentId(resident.getId()).stream()
                .anyMatch(b -> b.getBillingMonth().getYear() == billingMonth.getYear() && 
                               b.getBillingMonth().getMonthValue() == billingMonth.getMonthValue());
            
            if (exists) {
                continue;
            }

            Flat flat = resident.getFlat();
            MaintenanceBill bill = new MaintenanceBill();
            bill.setResident(resident);
            bill.setFlat(flat);
            bill.setBillingMonth(billingMonth.withDayOfMonth(1));
            
            // Calculate components
            bill.setBaseMaintenance(flat.getMonthlyMaintenance());
            bill.setWaterCharges(new BigDecimal("500.00"));
            bill.setElectricityCharges(new BigDecimal("1200.00"));
            bill.setParkingCharges(new BigDecimal("300.00")); // default parking charge
            bill.setOtherCharges(new BigDecimal("200.00"));
            bill.setLateFee(BigDecimal.ZERO);
            bill.setDueDate(billingMonth.withDayOfMonth(15));
            
            // Generate Bill Number: BILLYYYYMMXXXX
            String billNumber = String.format("BILL%s%04d", monthStr, count++);
            bill.setBillNumber(billNumber);
            
            bill.calculateTotals();
            billRepository.save(bill);
        }
    }

    public Payment payBill(Long billId, BigDecimal amount, String paymentMethod, String transactionId, String notes, User receivedBy) {
        MaintenanceBill bill = billRepository.findById(billId)
            .orElseThrow(() -> new IllegalArgumentException("Bill not found: " + billId));
            
        Payment payment = new Payment();
        payment.setBill(bill);
        payment.setAmount(amount);
        payment.setPaymentMethod(paymentMethod);
        payment.setTransactionId(transactionId != null ? transactionId : UUID.randomUUID().toString().substring(0, 10));
        payment.setNotes(notes);
        payment.setReceivedBy(receivedBy);
        payment.setPaymentDate(LocalDate.now());

        // Generate Receipt Number: RCPYYYYMMDDXXXX
        String dateStr = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        long lastReceiptCount = paymentRepository.count(); // fallback simple count
        String receiptNumber = String.format("RCP%s%04d", dateStr, (lastReceiptCount + 1) % 10000);
        payment.setReceiptNumber(receiptNumber);

        Payment savedPayment = paymentRepository.save(payment);

        // Re-aggregate and update bill
        List<Payment> payments = paymentRepository.findByBillId(billId);
        BigDecimal totalPaid = BigDecimal.ZERO;
        for (Payment p : payments) {
            totalPaid = totalPaid.add(p.getAmount());
        }

        bill.setPaidAmount(totalPaid);
        bill.calculateTotals();
        billRepository.save(bill);

        return savedPayment;
    }
}
