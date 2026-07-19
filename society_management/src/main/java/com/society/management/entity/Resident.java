package com.society.management.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "residents")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Resident {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "flat_id")
    private Flat flat;

    private String residentType = "owner"; // owner, tenant
    private String alternativePhone;
    private String emailSecondary;
    private String occupation;
    private String companyName;

    private LocalDate moveInDate;
    private LocalDate moveOutDate;
    private LocalDate leaseStartDate;
    private LocalDate leaseEndDate;

    private String emergencyContactName;
    private String emergencyContactPhone;
    private String emergencyContactRelation;

    private Boolean isActive = true;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
