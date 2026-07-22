package edu.cit.cardoso.basuratrack.controller;

import edu.cit.cardoso.basuratrack.entity.Report;
import edu.cit.cardoso.basuratrack.repository.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/reports")
public class ReportController {

    @Autowired
    private ReportRepository reportRepository;

    @GetMapping
    public List<Report> getAllReports() {
        return reportRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getReportById(@PathVariable Long id) {
        Optional<Report> report = reportRepository.findById(id);
        if (report.isEmpty()) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Report not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
        }
        return ResponseEntity.ok(report.get());
    }

    @PostMapping
    public ResponseEntity<?> createReport(@RequestBody Report report) {
        if (report.getReporterName() == null || report.getReporterName().isBlank()) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Reporter name is required");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
        if (report.getBarangay() == null || report.getBarangay().isBlank()) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Barangay is required");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
        if (report.getDescription() == null || report.getDescription().isBlank()) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Description is required");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }

        report.setStatus("PENDING");
        Report saved = reportRepository.save(report);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateReport(@PathVariable Long id, @RequestBody Report updatedReport) {
        Optional<Report> existing = reportRepository.findById(id);
        if (existing.isEmpty()) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Report not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
        }

        Report report = existing.get();
        report.setStatus(updatedReport.getStatus());
        return ResponseEntity.ok(reportRepository.save(report));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteReport(@PathVariable Long id) {
        if (!reportRepository.existsById(id)) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Report not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
        }
        reportRepository.deleteById(id);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Report deleted successfully");
        return ResponseEntity.ok(response);
    }
}