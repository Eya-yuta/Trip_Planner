package triply.backend.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.assertj.MockMvcTester;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import tools.jackson.databind.ObjectMapper;
import triply.backend.model.TripUser;
import triply.backend.model.TripUserDTO;
import triply.backend.repository.TripUserRepo;
import triply.backend.service.TripUserService;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@AutoConfigureMockMvc
class TripUserControllerTest {
    @Autowired
    MockMvc mvc;
    @Autowired
    private TripUserRepo repo;
    @MockBean
    private TripUserService service;
    private Argon2PasswordEncoder encoder = Argon2PasswordEncoder.defaultsForSpringSecurity_v5_8();
    private final ObjectMapper objectMapper = new ObjectMapper();
    @BeforeEach
    void setup() {
        repo.deleteAll();
    }

    @Test
    @WithMockUser (username = "testuser")//simulate a logged-in user
    void getMe_returnsUsername() throws Exception {
        mvc.perform(MockMvcRequestBuilders.get("/api/user"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().string("testuser"));
    }

    @Test
    @WithMockUser(username = "testuser")
    void login_returnsUsername() throws Exception {
        mvc.perform(MockMvcRequestBuilders.post("/api/user/login"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().string("testuser"));
    }

    @Test
    void register_createsNewUser() throws Exception {
        TripUserDTO newUserDTO = new TripUserDTO("newuser", "password123","user", "newuser@example.com","123");
        TripUser newUser = TripUser.builder()
                .id(UUID.randomUUID().toString())
                .username(newUserDTO.username())
                .password(encoder.encode(newUserDTO.password()))
                .email(newUserDTO.email())
                .firstName(newUserDTO.firstName())
                .lastName(newUserDTO.lastName())
                .build();
        repo.save(newUser);
        mvc.perform(MockMvcRequestBuilders.post("/api/user/register")
                        .contentType("application/json")
                        .content(new ObjectMapper().writeValueAsString(newUser)))
                .andExpect(MockMvcResultMatchers.status().isOk());

        // Optional: Check whether the user exists in the database
        assertNotNull(service.loadUserByUsername("newuser"));
    }

    @Test
    @WithMockUser(username = "testuser")
    void logout_clearsSession() throws Exception{
        mvc.perform(MockMvcRequestBuilders.get("/api/user/logout"))
                .andExpect(MockMvcResultMatchers.status().isOk());

        // Prüfen, dass SecurityContext geleert wurde
        //assertNull(service.loadUserByUsername("testuser")); // nur für Demo, falls testuser noch nicht registriert

    }
}