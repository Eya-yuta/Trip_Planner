package triply.backend.Service;

import triply.backend.Model.Trip;

import java.util.List;

public interface TripServiceInterface {

    List<Trip> getAllTrips(String userId);

    Trip getTripById(String id);

    Trip createTrip(Trip trip);

    Trip updateTrip(String id, Trip trip);

    void deleteTrip(String id);
}
