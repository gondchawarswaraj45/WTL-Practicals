package com.society.management.repository;

import com.society.management.entity.MaintenanceBill;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface MaintenanceBillRepository extends JpaRepository<MaintenanceBill, Long> {
    List<MaintenanceBill> findByResidentId(Long residentId);
    Optional<MaintenanceBill> findByBillNumber(String billNumber);
    List<MaintenanceBill> findByFlatId(Long flatId);
}
