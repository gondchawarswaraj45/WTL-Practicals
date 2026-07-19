package com.society.management.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "maintenance_bills")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MaintenanceBill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "resident_id", nullable = false)
    private Resident resident;

    @ManyToOne
    @JoinColumn(name = "flat_id", nullable = false)
    private Flat flat;

    @Column(unique = true, nullable = false)
    private String billNumber;

    private LocalDate billingMonth;

    private BigDecimal baseMaintenance = BigDecimal.ZERO;
    private BigDecimal waterCharges = BigDecimal.ZERO;
    private BigDecimal electricityCharges = BigDecimal.ZERO;
    private BigDecimal parkingCharges = BigDecimal.ZERO;
    private BigDecimal otherCharges = BigDecimal.ZERO;
    private BigDecimal lateFee = BigDecimal.ZERO;

    private BigDecimal totalAmount = BigDecimal.ZERO;
    private BigDecimal paidAmount = BigDecimal.ZERO;
    private BigDecimal balanceAmount = BigDecimal.ZERO;

    private LocalDate dueDate;
    private String status = "pending"; // pending, paid, overdue, partially_paid

    @Column(columnDefinition = "TEXT")
    private String notes;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        calculateTotals();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
        calculateTotals();
    }

    public void calculateTotals() {
        totalAmount = baseMaintenance
            .add(waterCharges)
            .add(electricityCharges)
            .add(parkingCharges)
            .add(otherCharges)
            .add(lateFee);
        
        balanceAmount = totalAmount.subtract(paidAmount);
        
        if (balanceAmount.compareTo(BigDecimal.ZERO) <= 0) {
            status = "paid";
        } else if (paidAmount.compareTo(BigDecimal.ZERO) > 0) {
            status = "partially_paid";
        } else if (LocalDate.now().isAfter(dueDate)) {
            status = "overdue";
        } else {
            status = "pending";
        }
    }
}
