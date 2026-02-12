package triply.backend;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfTokenRequestAttributeHandler;

@EnableWebSecurity
@Configuration
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder(){
        return Argon2PasswordEncoder.defaultsForSpringSecurity_v5_8(); // Hashing Bcrypt, Argon2, Scrypt
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
        //Von HIER
        CsrfTokenRequestAttributeHandler requestAttributeHandler = new CsrfTokenRequestAttributeHandler();
        requestAttributeHandler.setCsrfRequestAttributeName(null);
        //Bis HIER optional, wenn du csrf aktivieren willst.
        //Wenn nicht, dann einfach, wie bei oauth auch csrf disablen :-)
        return httpSecurity
                //Hier csrf disablen, genau wie in der SecurityConfig von oauth
                //.csrf(csrf -> csrf
                        //.csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
                        //.csrfTokenRequestHandler(requestAttributeHandler))
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(c -> {
                    c.requestMatchers("/api/hello").authenticated();
                    c.anyRequest().permitAll();
                })
                .sessionManagement(c -> c.sessionCreationPolicy(SessionCreationPolicy.ALWAYS))
                .httpBasic(Customizer.withDefaults())
                .build();
    }
}
