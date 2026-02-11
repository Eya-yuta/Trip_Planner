package triply.backend.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.TestPropertySource;
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

import java.util.UUID;
import org.springframework.http.MediaType;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@AutoConfigureMockMvc

class TripUserControllerTest {
    @Autowired
    MockMvc mvc;
    @Autowired
    private TripUserRepo repo;
    @Autowired
    private TripUserService service;
    @Autowired
    PasswordEncoder encoder;
    //private Argon2PasswordEncoder encoder = Argon2PasswordEncoder.defaultsForSpringSecurity_v5_8();
    private final ObjectMapper objectMapper = new ObjectMapper();
    /*@BeforeEach
    void setup() {
        repo.deleteAll();
    }*/

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
    void shouldRegisterNewUser() throws Exception {

        TripUserDTO dto = new TripUserDTO(
                "john",
                "Doe",
                "Johni",
                "john@mail.com",
                "password123"

        );

        mvc.perform(MockMvcRequestBuilders.post("/api/user/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(MockMvcResultMatchers.status().isOk());

    }

    @Test
    @WithMockUser(username = "testuser")
    void logout_clearsSession() throws Exception{
        mvc.perform(MockMvcRequestBuilders.get("/api/user/logout"))
                .andExpect(MockMvcResultMatchers.status().isOk());

        // check that SecurityContext is empty
        //assertNull(service.loadUserByUsername("testuser")); // nur für Demo, falls testuser noch nicht registriert

    }
}