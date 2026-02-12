package triply.backend.service;

import triply.backend.model.Trip;

import java.util.List;

public interface TripServiceInterface {

    List<Trip> getAllTrips(String userId);

    Trip getTripById(String id);

    Trip createTrip(Trip trip);

    Trip updateTrip(String id, Trip trip);

    void deleteTrip(String id);
}
