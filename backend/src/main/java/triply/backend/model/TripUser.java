package triply.backend.model;

import lombok.Builder;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
@Builder
public record TripUser(@Id String id, String firstName, String lastName, @Indexed(unique = true) String username, @Indexed(unique = true) String email, String password ){

}
