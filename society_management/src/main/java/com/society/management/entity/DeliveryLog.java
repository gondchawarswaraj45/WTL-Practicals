package com.society.management.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "delivery_logs")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DeliveryLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "flat_id")
    private Flat flat;

    private String deliveryType; // package, food, grocery, other
    private String deliveryPersonName;
    private String deliveryPersonPhone;
    private String companyName;
    private String trackingNumber;

    private LocalDateTime receivedTime;
    private LocalDateTime collectedTime;
    private String collectedBy;

    @ManyToOne
    @JoinColumn(name = "received_by_security_id")
    private User receivedBySecurity;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @PrePersist
    protected void onCreate() {
        if (receivedTime == null) {
            receivedTime = LocalDateTime.now();
        }
    }
}
