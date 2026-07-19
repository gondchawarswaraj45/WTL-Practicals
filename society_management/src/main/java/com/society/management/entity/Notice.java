package com.society.management.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "notices")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Notice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    private String noticeType; // general, meeting, event, maintenance, emergency, financial, rule, other
    private String priority = "medium"; // low, medium, high, urgent

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    private String attachmentPath;

    @ManyToOne
    @JoinColumn(name = "published_by_id")
    private User publishedBy;

    private LocalDateTime publishedDate;
    private LocalDate validUntil;

    private Boolean isActive = true;
    private Boolean isPinned = false;
    private Boolean showOnHomepage = false;
    private Integer viewCount = 0;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (publishedDate == null) {
            publishedDate = LocalDateTime.now();
        }
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
