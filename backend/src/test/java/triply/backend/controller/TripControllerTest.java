package triply.backend.controller;

import org.junit.jupiter.api.BeforeEach;
import org.springframework.http.MediaType;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.test.web.servlet.MockMvc;

import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import tools.jackson.databind.ObjectMapper;
import triply.backend.model.Activity;
import triply.backend.model.Trip;
import triply.backend.repository.TripRepo;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@AutoConfigureMockMvc
class TripControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private TripRepo repo;
    @Autowired
    private ObjectMapper objectMapper;
    // Before each Test clean the test database
    @BeforeEach
    void cleanTestDb() {
        repo.deleteAll();
    }

    @Test
    void getAllTripsTest() throws Exception {
        // Insert a test trip
        Trip trip = new Trip(null, "user1", "Rome Trip", "Rome", "2026-05-01", "2026-05-05", "Colosseum visit", List.of(new Activity(1, "Vatican")));
        repo.save(trip);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/trips").param("userId", "user1"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].title").value("Rome Trip"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].destination").value("Rome"));

    }

    @Test
    void getTripByIdTest() throws Exception {
        Trip trip = new Trip(null, "user1", "Berlin Trip", "Berlin", "2026-06-01", "2026-06-05", "Brandenburg Gate", List.of(new Activity(1, "Museum Island")));
        Trip savedTrip = repo.save(trip);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/trips/" + savedTrip.getId()))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.title").value("Berlin Trip"));
    }

    @Test
    void createTripTest() throws Exception {
        Trip trip = new Trip();
        trip.setUserId("user1");
        trip.setTitle("Paris Trip");
        trip.setDestination("Paris");
        trip.setStartDate("2026-04-10");
        trip.setEndDate("2026-04-15");
        trip.setNotes("Visit Eiffel Tower");
        trip.setActivities(List.of(new Activity(1, "Louvre Museum")));

        mockMvc.perform(MockMvcRequestBuilders.post("/api/trips")
                        .contentType(MediaType.APPLICATION_JSON)//Content ist JSON
                        .content(objectMapper.writeValueAsString(trip))) // Convert Object in JSON Body
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.title").value("Paris Trip"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.destination").value("Paris"));
    }

    @Test
    void updateTripTest() throws Exception {
        Trip trip = new Trip(null, "user1", "London Trip", "London", "2026-07-01", "2026-07-05", "London Eye", List.of(new Activity(1, "British Museum")));
        Trip savedTrip = repo.save(trip);

        savedTrip.setTitle("London Updated");
        savedTrip.setNotes("Big Ben visit");

        mockMvc.perform(MockMvcRequestBuilders.put("/api/trips/" + savedTrip.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(savedTrip)))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.title").value("London Updated"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.notes").value("Big Ben visit"));
    }

    @Test
    void deleteTripTest() throws Exception {
        Trip trip = new Trip(null, "user1", "Tokyo Trip", "Tokyo", "2026-08-01", "2026-08-05", "Shibuya", List.of(new Activity(1, "Akihabara")));
        Trip savedTrip = repo.save(trip);

        mockMvc.perform(MockMvcRequestBuilders.delete("/api/trips/" + savedTrip.getId()))
                .andExpect(MockMvcResultMatchers.status().isOk());

        assert(repo.findById(savedTrip.getId()).isEmpty());
    }

}