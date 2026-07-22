package edu.cit.cardoso.basuratrack.controller;

import edu.cit.cardoso.basuratrack.entity.Schedule;
import edu.cit.cardoso.basuratrack.repository.ScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/schedules")
public class ScheduleController {

    @Autowired
    private ScheduleRepository scheduleRepository;

    // GET all schedules - used by both Web and Mobile
    @GetMapping
    public List<Schedule> getAllSchedules() {
        return scheduleRepository.findAll();
    }

    // GET one schedule by id
    @GetMapping("/{id}")
    public ResponseEntity<?> getScheduleById(@PathVariable Long id) {
        Optional<Schedule> schedule = scheduleRepository.findById(id);
        if (schedule.isEmpty()) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Schedule not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
        }
        return ResponseEntity.ok(schedule.get());
    }

    // CREATE - Web admin only (mobile won't call this)
    @PostMapping
    public ResponseEntity<?> createSchedule(@RequestBody Schedule schedule) {
        if (schedule.getBarangay() == null || schedule.getBarangay().isBlank()) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Barangay is required");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
        if (schedule.getDayOfWeek() == null || schedule.getDayOfWeek().isBlank()) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Day of week is required");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
        if (schedule.getTime() == null || schedule.getTime().isBlank()) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Time is required");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }

        Schedule saved = scheduleRepository.save(schedule);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    // UPDATE - Web admin only
    @PutMapping("/{id}")
    public ResponseEntity<?> updateSchedule(@PathVariable Long id, @RequestBody Schedule updatedSchedule) {
        Optional<Schedule> existing = scheduleRepository.findById(id);
        if (existing.isEmpty()) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Schedule not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
        }

        Schedule schedule = existing.get();
        schedule.setBarangay(updatedSchedule.getBarangay());
        schedule.setDayOfWeek(updatedSchedule.getDayOfWeek());
        schedule.setTime(updatedSchedule.getTime());
        schedule.setWasteType(updatedSchedule.getWasteType());
        schedule.setNotes(updatedSchedule.getNotes());

        return ResponseEntity.ok(scheduleRepository.save(schedule));
    }

    // DELETE - Web admin only
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSchedule(@PathVariable Long id) {
        if (!scheduleRepository.existsById(id)) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Schedule not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
        }
        scheduleRepository.deleteById(id);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Schedule deleted successfully");
        return ResponseEntity.ok(response);
    }
}