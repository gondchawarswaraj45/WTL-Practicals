package com.society.management.repository;

import com.society.management.entity.Visitor;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface VisitorRepository extends JpaRepository<Visitor, Long> {
    List<Visitor> findByFlatId(Long flatId);
}
