package com.society.management.repository;

import com.society.management.entity.EventRegistration;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface EventRegistrationRepository extends JpaRepository<EventRegistration, Long> {
    List<EventRegistration> findByEventId(Long eventId);
    List<EventRegistration> findByResidentId(Long residentId);
    Optional<EventRegistration> findByEventIdAndResidentId(Long eventId, Long residentId);
}
