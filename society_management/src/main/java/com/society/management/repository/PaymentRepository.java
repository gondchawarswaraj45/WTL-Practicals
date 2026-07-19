package com.society.management.repository;

import com.society.management.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
    List<Payment> findByBillId(Long billId);
    Optional<Payment> findByReceiptNumber(String receiptNumber);
}
