package triply.backend.service;

import triply.backend.model.Trip;
import triply.backend.model.TripDTO;

import java.util.List;

public interface TripServiceInterface {

    List<Trip> getAllTrips(String userId);

    Trip getTripById(String id);

    Trip createTrip(TripDTO tripDTO);

    Trip updateTrip(String id, TripDTO tripDTO);

    void deleteTrip(String id);
}
