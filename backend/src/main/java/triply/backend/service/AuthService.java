package triply.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import triply.backend.model.User;
import triply.backend.repository.UserRepo;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthService extends DefaultOAuth2UserService {
    private final UserRepo userRepo;

    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);
        User user = userRepo.findById(oAuth2User.getName())
                .orElseGet(() -> createUser(oAuth2User));
        return new DefaultOAuth2User(List.of(new SimpleGrantedAuthority(user.getRole())), oAuth2User.getAttributes(), "id");
    }

    private User createUser(OAuth2User oAuth2User) {
        User user = User.builder()
                .id(oAuth2User.getName())//UserId of Github
                .username(oAuth2User.getAttribute("login"))
                .role("USER")
                .build();
        return userRepo.save(user);
    }

}
