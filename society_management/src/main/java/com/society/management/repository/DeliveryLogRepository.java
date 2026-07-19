package com.society.management.repository;

import com.society.management.entity.DeliveryLog;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DeliveryLogRepository extends JpaRepository<DeliveryLog, Long> {
    List<DeliveryLog> findByFlatId(Long flatId);
}
