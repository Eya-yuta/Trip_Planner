package triply.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import triply.backend.model.TripUser;

import java.util.Optional;

@Repository
public interface TripUserRepo extends MongoRepository<TripUser, String> {
    Optional<TripUser> findByUsername(String username);
    Optional<TripUser> findByEmail(String email);
}
