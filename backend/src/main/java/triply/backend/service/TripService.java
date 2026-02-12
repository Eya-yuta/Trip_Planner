package triply.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import triply.backend.model.Trip;
import triply.backend.repository.TripRepo;

import java.util.List;

@Service
public class TripService implements TripServiceInterface  {
    private final TripRepo tripRepo;

    public TripService(TripRepo tripRepo) {
        this.tripRepo = tripRepo;
    }

    @Override
    public List<Trip> getAllTrips(String userId) {
        return tripRepo.findByUserId(userId);
    }

    @Override
    public Trip getTripById(String id) {
        return tripRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Trip not found"));
    }

    @Override
    public Trip createTrip(Trip trip) {
        return tripRepo.save(trip);
    }

    @Override
    public Trip updateTrip(String id, Trip updatedTrip) {
        Trip existingTrip = getTripById(id);

        existingTrip.setTitle(updatedTrip.getTitle());
        existingTrip.setDestination(updatedTrip.getDestination());
        existingTrip.setStartDate(updatedTrip.getStartDate());
        existingTrip.setEndDate(updatedTrip.getEndDate());
        existingTrip.setNotes(updatedTrip.getNotes());
        existingTrip.setActivities(updatedTrip.getActivities());

        return tripRepo.save(existingTrip);
    }

    @Override
    public void deleteTrip(String id) {
        tripRepo.deleteById(id);
    }
}

