package com.society.management.repository;

import com.society.management.entity.ParkingAllocation;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ParkingAllocationRepository extends JpaRepository<ParkingAllocation, Long> {
    List<ParkingAllocation> findByResidentId(Long residentId);
    List<ParkingAllocation> findByIsActiveTrue();
}
