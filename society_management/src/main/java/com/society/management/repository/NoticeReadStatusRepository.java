package com.society.management.repository;

import com.society.management.entity.NoticeReadStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface NoticeReadStatusRepository extends JpaRepository<NoticeReadStatus, Long> {
    Optional<NoticeReadStatus> findByNoticeIdAndUserId(Long noticeId, Long userId);
    List<NoticeReadStatus> findByUserId(Long userId);
}
