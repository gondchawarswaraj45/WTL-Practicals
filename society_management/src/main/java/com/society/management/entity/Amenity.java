package com.society.management.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalTime;
import java.time.LocalDateTime;

@Entity
@Table(name = "amenities")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Amenity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String amenityType; // clubhouse, gym, pool, hall, sports, garden, other

    @Column(columnDefinition = "TEXT")
    private String description;

    private Integer capacity;
    private String imagePath;

    private Boolean bookingAllowed = true;
    private BigDecimal bookingCharge = BigDecimal.ZERO;

    private LocalTime availableFrom;
    private LocalTime availableTo;

    private Boolean isActive = true;
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
