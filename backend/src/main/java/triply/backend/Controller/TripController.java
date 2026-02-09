package triply.backend.Controller;

import org.springframework.web.bind.annotation.*;
import triply.backend.Model.Trip;
import triply.backend.Service.TripService;

import java.util.List;

@RestController
@RequestMapping("/api/trips")
public class TripController {
    private final TripService tripService;

    public TripController(TripService tripService) {
        this.tripService = tripService;
    }

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
    public Trip createTrip(@RequestBody Trip trip) {
        return tripService.createTrip(trip);
    }

    // UPDATE trip
    @PutMapping("/{id}")
    public Trip updateTrip(@PathVariable String id,
                           @RequestBody Trip trip) {
        return tripService.updateTrip(id, trip);
    }

    // DELETE trip
    @DeleteMapping("/{id}")
    public void deleteTrip(@PathVariable String id) {
        tripService.deleteTrip(id);
    }

}
