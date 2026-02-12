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
        TripUser user = TripUser.builder()
                .id(UUID.randomUUID().toString())
                .firstName(newUser.firstName())
                .lastName(newUser.lastName())
                .username(newUser.username())
                .email(newUser.email())
                .password(encoder.encode(newUser.password()))
                .build();

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
