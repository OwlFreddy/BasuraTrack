package edu.cit.cardoso.basuratrack.repository;

import edu.cit.cardoso.basuratrack.entity.Report;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReportRepository extends JpaRepository<Report, Long> {
}