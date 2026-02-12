package triply.backend.service;
import static org.mockito.Mockito.times;

import com.mongodb.DuplicateKeyException;
import lombok.RequiredArgsConstructor;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import triply.backend.model.TripUser;
import triply.backend.model.TripUserDTO;
import triply.backend.repository.TripRepo;
import triply.backend.repository.TripUserRepo;

import java.util.Optional;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.mockito.ArgumentMatchers.any;
import static org.junit.jupiter.api.Assertions.*;

import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class TripUserServiceTest {
    @Mock
    TripUserRepo tripRepo;

    @InjectMocks
    TripUserService tripService;

    @Test
    void loadUserByUsername_success() {
        // Arrange
        TripUser user = TripUser.builder()
                .id("1")
                .username("testuser")
                .password("password123")
                .build();

        when(tripRepo.findByUsername("testuser")).thenReturn(Optional.of(user));

        // Act
        var userDetails = tripService.loadUserByUsername("testuser");

        // Assert
        assertNotNull(userDetails);
        assertEquals("testuser", userDetails.getUsername());
        assertEquals("password123", userDetails.getPassword());
        verify(tripRepo, times(1)).findByUsername("testuser");
    }
    @Test
    void loadUserByUsername_notFound() {
        // Arrange
        when(tripRepo.findByUsername("unknown")).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(UsernameNotFoundException.class,
                () -> tripService.loadUserByUsername("unknown"));
        verify(tripRepo, times(1)).findByUsername("unknown");
    }

    @Test
    void registerNewUser_success() {
        // Arrange
        TripUserDTO dto = new TripUserDTO(
                "John", "Doe", "john", "john@example.com", "secret"
        );

        when(tripRepo.save(any(TripUser.class))).thenAnswer(invocation -> invocation.getArgument(0));

        // Act
        assertDoesNotThrow(() -> tripService.registerNewUser(dto));

        // Assert
        verify(tripRepo, times(1)).save(any(TripUser.class));
    }
    @Test
    void registerNewUser_duplicateKey() {
        // Arrange
        TripUserDTO dto = new TripUserDTO(
                "John", "Doe", "john", "john@example.com", "secret"
        );

        when(tripRepo.save(any(TripUser.class))).thenThrow(DuplicateKeyException.class);

        // Act & Assert
        ResponseStatusException exception = assertThrows(ResponseStatusException.class,
                () -> tripService.registerNewUser(dto));
        assertEquals(409, exception.getStatusCode().value());
        assertTrue(exception.getReason().contains("Username or Email already exists"));

        verify(tripRepo, times(1)).save(any(TripUser.class));
    }

}