package triply.backend.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import triply.backend.Model.Trip;

import java.util.List;

@Repository
public interface TripRepo extends MongoRepository<Trip,String> {
    List<Trip> findByUserId(String userId);

}
