package com.society.management.repository;

import com.society.management.entity.ComplaintComment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ComplaintCommentRepository extends JpaRepository<ComplaintComment, Long> {
    List<ComplaintComment> findByComplaintId(Long complaintId);
}
