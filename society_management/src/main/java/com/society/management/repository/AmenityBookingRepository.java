package com.society.management.repository;

import com.society.management.entity.AmenityBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AmenityBookingRepository extends JpaRepository<AmenityBooking, Long> {
    List<AmenityBooking> findByResidentId(Long residentId);
    List<AmenityBooking> findByAmenityId(Long amenityId);
}
