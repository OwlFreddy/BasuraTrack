package edu.cit.cardoso.basuratrack.repository;

import edu.cit.cardoso.basuratrack.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
}