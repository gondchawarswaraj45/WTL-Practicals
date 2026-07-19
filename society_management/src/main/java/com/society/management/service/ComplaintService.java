package com.society.management.service;

import com.society.management.entity.Complaint;
import com.society.management.entity.User;
import com.society.management.repository.ComplaintRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

@Service
@Transactional
public class ComplaintService {

    @Autowired
    private ComplaintRepository complaintRepository;

    public Complaint fileComplaint(Complaint complaint) {
        if (complaint.getComplaintNumber() == null) {
            String dateStr = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMM"));
            long count = complaintRepository.count();
            String complaintNumber = String.format("CMP%s%04d", dateStr, (count + 1) % 10000);
            complaint.setComplaintNumber(complaintNumber);
        }
        complaint.setStatus("pending");
        complaint.setFiledDate(LocalDateTime.now());
        return complaintRepository.save(complaint);
    }

    public Complaint updateComplaintStatus(Long id, String status, String resolutionNotes, User assignedTo) {
        Complaint complaint = complaintRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Complaint not found: " + id));

        complaint.setStatus(status);
        if (assignedTo != null) {
            complaint.setAssignedTo(assignedTo);
        }

        if ("resolved".equals(status)) {
            complaint.setResolvedDate(LocalDateTime.now());
            if (resolutionNotes != null) {
                complaint.setResolutionNotes(resolutionNotes);
            }
        } else if ("closed".equals(status)) {
            complaint.setClosedDate(LocalDateTime.now());
        }

        return complaintRepository.save(complaint);
    }
}
