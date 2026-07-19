package com.society.management.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "visitors")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Visitor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String visitorName;

    @Column(nullable = false)
    private String phoneNumber;

    private String idProofType;
    private String idProofNumber;
    private String vehicleNumber;
    private String photoPath;

    @ManyToOne
    @JoinColumn(name = "flat_id")
    private Flat flat;

    private String purpose; // personal, delivery, service, official, guest, other
    
    @Column(columnDefinition = "TEXT")
    private String purposeDetails;

    private LocalDateTime entryTime;
    private LocalDateTime exitTime;

    private String approvalStatus = "pending"; // pending, approved, rejected, auto_approved

    @ManyToOne
    @JoinColumn(name = "approved_by_id")
    private User approvedBy;

    @ManyToOne
    @JoinColumn(name = "checked_in_by_id")
    private User checkedInBy;

    @ManyToOne
    @JoinColumn(name = "checked_out_by_id")
    private User checkedOutBy;

    @Column(columnDefinition = "TEXT")
    private String notes;

    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        if (entryTime == null) {
            entryTime = LocalDateTime.now();
        }
    }
}
