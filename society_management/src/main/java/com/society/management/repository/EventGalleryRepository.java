package com.society.management.repository;

import com.society.management.entity.EventGallery;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface EventGalleryRepository extends JpaRepository<EventGallery, Long> {
    List<EventGallery> findByEventId(Long eventId);
}
