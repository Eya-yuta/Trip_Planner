package triply.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import triply.backend.model.Trip;

import java.util.List;

@Repository
public interface TripRepo extends MongoRepository<Trip,String> {
    List<Trip> findByUserId(String userId);

}
