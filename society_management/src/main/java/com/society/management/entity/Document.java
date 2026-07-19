package com.society.management.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "documents")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Document {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    private String documentType; // rules, minutes, policy, notice, financial, other

    @Column(columnDefinition = "TEXT")
    private String description;

    private String filePath;

    @ManyToOne
    @JoinColumn(name = "uploaded_by_id")
    private User uploadedBy;

    private LocalDateTime uploadDate;
    private Boolean isPublic = true;

    @PrePersist
    protected void onCreate() {
        uploadDate = LocalDateTime.now();
    }
}
