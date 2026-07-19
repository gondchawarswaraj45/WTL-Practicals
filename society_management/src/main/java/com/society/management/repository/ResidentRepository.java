package com.society.management.repository;

import com.society.management.entity.Resident;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ResidentRepository extends JpaRepository<Resident, Long> {
    Optional<Resident> findByUserUsername(String username);
    Optional<Resident> findByUserId(Long userId);
}
