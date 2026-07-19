package com.society.management.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "events")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    private String eventType; // festival, meeting, sports, cultural, workshop, social, maintenance, other

    @Column(columnDefinition = "TEXT", nullable = false)
    private String description;

    private LocalDateTime startDatetime;
    private LocalDateTime endDatetime;

    private String venue;

    @Column(columnDefinition = "TEXT")
    private String venueDetails;

    @ManyToOne
    @JoinColumn(name = "organized_by_id")
    private User organizedBy;

    private String contactPerson;
    private String contactPhone;

    private Boolean requiresRegistration = false;
    private Integer maxParticipants;
    private LocalDateTime registrationDeadline;

    private Boolean isPaidEvent = false;
    private BigDecimal entryFee = BigDecimal.ZERO;

    private String posterPath;
    private String attachmentsPath;

    private String status = "draft"; // draft, published, ongoing, completed, cancelled

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
