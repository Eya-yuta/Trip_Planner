package triply.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import triply.backend.model.Trip;
import triply.backend.model.TripDTO;
import triply.backend.service.TripService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/trips")
public class TripController {
    private final TripService tripService;

    @GetMapping
    // GET all trips for user
    public List<Trip> getAllTrips(@RequestParam String userId) {
        return tripService.getAllTrips(userId);
    }

    // GET single trip
    @GetMapping("/{id}")
    public Trip getTripById(@PathVariable String id) {
        return tripService.getTripById(id);
    }

    // CREATE trip
    @PostMapping
    public Trip createTrip(@RequestBody TripDTO tripDTO) {
        return tripService.createTrip(tripDTO);
    }

    // UPDATE trip
    @PutMapping("/{id}")
    public Trip updateTrip(@PathVariable String id,
                           @RequestBody TripDTO tripDTO) {
        return tripService.updateTrip(id, tripDTO);
    }

    // DELETE trip
    @DeleteMapping("/{id}")
    public void deleteTrip(@PathVariable String id) {
        tripService.deleteTrip(id);
    }

}
