package triply.backend.service;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import triply.backend.model.Trip;
import triply.backend.model.TripDTO;
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
    public Trip createTrip(TripDTO tripDTO) {
        Trip trip = new Trip();

        trip.setTitle(tripDTO.getTitle());
        trip.setDestination(tripDTO.getDestination());
        trip.setStartDate(tripDTO.getStartDate());
        trip.setEndDate(tripDTO.getEndDate());
        trip.setNotes(tripDTO.getNotes());
        trip.setActivities(tripDTO.getActivities());

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        trip.setUserId(username);
        return tripRepo.save(trip);
    }

    @Override
    public Trip updateTrip(String id, TripDTO updatedTripDTO) {
        Trip existingTrip = getTripById(id);

        String currentUsername = SecurityContextHolder.getContext().getAuthentication().getName();

        if (!existingTrip.getUserId().equals(currentUsername)) {
            throw new AccessDeniedException("Not allowed to update this trip!");
        }

        existingTrip.setTitle(updatedTripDTO.getTitle());
        existingTrip.setDestination(updatedTripDTO.getDestination());
        existingTrip.setStartDate(updatedTripDTO.getStartDate());
        existingTrip.setEndDate(updatedTripDTO.getEndDate());
        existingTrip.setNotes(updatedTripDTO.getNotes());
        existingTrip.setActivities(updatedTripDTO.getActivities());

        return tripRepo.save(existingTrip);
    }

    @Override
    public void deleteTrip(String id) {
        tripRepo.deleteById(id);
    }
}

