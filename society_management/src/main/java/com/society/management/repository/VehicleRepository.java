package com.society.management.repository;

import com.society.management.entity.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface VehicleRepository extends JpaRepository<Vehicle, Long> {
    List<Vehicle> findByResidentId(Long residentId);
    Optional<Vehicle> findByVehicleNumber(String vehicleNumber);
}
