package com.society.management.repository;

import com.society.management.entity.PreApprovedVisitor;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PreApprovedVisitorRepository extends JpaRepository<PreApprovedVisitor, Long> {
    List<PreApprovedVisitor> findByResidentId(Long residentId);
}
