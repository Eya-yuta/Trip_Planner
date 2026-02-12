package triply.backend.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import triply.backend.model.Activity;
import triply.backend.model.Trip;
import triply.backend.repository.TripRepo;

import java.util.List;
import java.util.Optional;
import static org.mockito.ArgumentMatchers.any;


import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class TripServiceTest {
    @Mock
    TripRepo tripRepo;

    @InjectMocks
    TripService tripService;
    private Trip trip;

    @BeforeEach
    void setUp() {
        trip = new Trip(
                "1",
                "user1",
                "Paris Trip",
                "Paris",
                "2026-04-10",
                "2026-04-15",
                "Visit Eiffel Tower",
                List.of(new Activity(1, "Louvre Museum"))
        );
    }
    @Test
    void getAllTrips_shouldReturnTripsForUser() {
        when(tripRepo.findByUserId("user1"))
                .thenReturn(List.of(trip));

        List<Trip> result = tripService.getAllTrips("user1");

        assertEquals(1, result.size());
        assertEquals("Paris Trip", result.get(0).getTitle());
        verify(tripRepo).findByUserId("user1");
    }

    @Test
    void getTripById_shouldReturnTrip_whenExists() {
        when(tripRepo.findById("1"))
                .thenReturn(Optional.of(trip));

        Trip result = tripService.getTripById("1");

        assertEquals("Paris Trip", result.getTitle());
        verify(tripRepo).findById("1");
    }

    @Test
    void getTripById_shouldThrowException_whenNotFound() {
        when(tripRepo.findById("1"))
                .thenReturn(Optional.empty());

        RuntimeException ex = assertThrows(
                RuntimeException.class,
                () -> tripService.getTripById("1")
        );

        assertEquals("Trip not found", ex.getMessage());
    }

    @Test
    void createTrip_shouldSaveTrip() {
        when(tripRepo.save(trip)).thenReturn(trip);

        Trip result = tripService.createTrip(trip);

        assertEquals("Paris Trip", result.getTitle());
        verify(tripRepo).save(trip);
    }

    @Test
    void updateTrip_shouldUpdateExistingTrip() {
        Trip updatedTrip = new Trip(
                null,
                null,
                "Updated Title",
                "Rome",
                "2026-05-01",
                "2026-05-05",
                "Updated notes",
                List.of(new Activity(1, "Colosseum"))
        );

        when(tripRepo.findById("1"))
                .thenReturn(Optional.of(trip));
        when(tripRepo.save(any(Trip.class)))
                .thenReturn(trip);

        Trip result = tripService.updateTrip("1", updatedTrip);

        assertEquals("Updated Title", result.getTitle());
        assertEquals("Rome", result.getDestination());
        assertEquals("Updated notes", result.getNotes());
        verify(tripRepo).save(trip);
    }

    @Test
    void deleteTrip_shouldCallRepoDelete() {
        tripService.deleteTrip("1");

        verify(tripRepo).deleteById("1");
    }

}
