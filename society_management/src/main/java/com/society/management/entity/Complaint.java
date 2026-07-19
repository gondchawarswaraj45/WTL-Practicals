package com.society.management.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "complaints")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Complaint {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String complaintNumber;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private ComplaintCategory category;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String description;

    private String priority = "medium"; // low, medium, high, urgent

    @ManyToOne
    @JoinColumn(name = "resident_id", nullable = false)
    private Resident resident;

    @ManyToOne
    @JoinColumn(name = "flat_id")
    private Flat flat;

    private String status = "pending"; // pending, in_progress, resolved, closed, rejected

    @ManyToOne
    @JoinColumn(name = "assigned_to_id")
    private User assignedTo;

    private String attachment1;
    private String attachment2;

    private LocalDateTime filedDate;
    private LocalDateTime resolvedDate;
    private LocalDateTime closedDate;

    @Column(columnDefinition = "TEXT")
    private String resolutionNotes;

    @Column(columnDefinition = "TEXT")
    private String residentFeedback;

    private Integer rating; // 1-5 rating by resident

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (filedDate == null) {
            filedDate = LocalDateTime.now();
        }
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
        if ("resolved".equals(status) && resolvedDate == null) {
            resolvedDate = LocalDateTime.now();
        }
        if ("closed".equals(status) && closedDate == null) {
            closedDate = LocalDateTime.now();
        }
    }
}
