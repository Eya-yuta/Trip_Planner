package triply.backend.controller;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import triply.backend.model.TripUserDTO;
import triply.backend.service.TripUserService;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class TripUserController {
    private final TripUserService service;

    @GetMapping
    public String getMe(){
        return SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();
    }

    @PostMapping("/login")
    public String login(){
        return SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();
    }

    @PostMapping("/register")
    public void register(@RequestBody TripUserDTO newUser){
        service.registerNewUser(newUser);
    }

    @GetMapping("/logout")
    public void logout(HttpSession session){
        // End Session
        session.invalidate();
        // Delete SecurityContext
        SecurityContextHolder.clearContext();
    }

}
