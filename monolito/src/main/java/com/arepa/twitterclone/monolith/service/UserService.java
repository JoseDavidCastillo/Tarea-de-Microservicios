package com.arepa.twitterclone.monolith.service;

import com.arepa.twitterclone.monolith.domain.User;
import com.arepa.twitterclone.monolith.dto.UserResponse;
import com.arepa.twitterclone.monolith.repository.UserRepository;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional
    public UserResponse currentUser(Jwt jwt) {
        return UserResponse.fromEntity(ensureUser(jwt));
    }

    @Transactional
    public User ensureUser(Jwt jwt) {
        String auth0Id = jwt.getSubject();
        User user = userRepository.findByAuth0Id(auth0Id).orElseGet(() -> new User(auth0Id));

        String email = fallback(jwt.getClaimAsString("email"), auth0Id + "@users.local");
        String displayName = fallback(
                jwt.getClaimAsString("name"),
                jwt.getClaimAsString("preferred_username"),
                email,
                auth0Id
        );

        user.setEmail(email);
        user.setDisplayName(displayName);
        user.setAvatarUrl(jwt.getClaimAsString("picture"));
        return userRepository.save(user);
    }

    private String fallback(String... values) {
        for (String value : values) {
            if (value != null && !value.isBlank()) {
                return value;
            }
        }
        return "Unknown user";
    }
}