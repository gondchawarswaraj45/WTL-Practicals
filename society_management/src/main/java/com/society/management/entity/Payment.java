package com.society.management.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "payments")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "bill_id", nullable = false)
    private MaintenanceBill bill;

    private LocalDate paymentDate;
    private BigDecimal amount;
    private String paymentMethod; // cash, cheque, online, upi, card

    private String transactionId;
    private String chequeNumber;
    private String bankName;

    @ManyToOne
    @JoinColumn(name = "received_by_id")
    private User receivedBy;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @Column(unique = true, nullable = false)
    private String receiptNumber;

    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        if (paymentDate == null) {
            paymentDate = LocalDate.now();
        }
    }
}
