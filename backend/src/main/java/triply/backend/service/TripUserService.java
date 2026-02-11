package triply.backend.service;

import com.mongodb.DuplicateKeyException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import triply.backend.model.TripUser;
import triply.backend.model.TripUserDTO;
import triply.backend.repository.TripUserRepo;

import java.util.Collections;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TripUserService implements UserDetailsService {
    private final TripUserRepo repo;

    private Argon2PasswordEncoder encoder = Argon2PasswordEncoder.defaultsForSpringSecurity_v5_8();

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        TripUser user = repo.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User: " + username + " not Found!"));
        return new User(user.username(), user.password(), Collections.emptyList());
    }

    public void registerNewUser(TripUserDTO newUser) {
        /*if (repo.findByUsername(newUser.username()).isPresent()) {
            throw new RuntimeException("Username already exists!");
        }
        if (repo.findByEmail(newUser.email()).isPresent()) {
            throw new RuntimeException("Email already exists!");
        }*/
        TripUser user = TripUser.builder()
                .id(UUID.randomUUID().toString())
                .username(newUser.username())
                .password(encoder.encode(newUser.password()))
                .email(newUser.email())
                .firstName(newUser.firstName())
                .lastName(newUser.lastName())
                .build();
        //repo.save(user);
        try {
            repo.save(user);
        } catch (DuplicateKeyException e) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Username or Email already exists!"
            );
        }
    }


}
