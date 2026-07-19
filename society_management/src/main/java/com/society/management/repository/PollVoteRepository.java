package com.society.management.repository;

import com.society.management.entity.PollVote;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PollVoteRepository extends JpaRepository<PollVote, Long> {
    List<PollVote> findByPollId(Long pollId);
    List<PollVote> findByPollIdAndUserId(Long pollId, Long userId);
    boolean existsByPollIdAndUserId(Long pollId, Long userId);
}
