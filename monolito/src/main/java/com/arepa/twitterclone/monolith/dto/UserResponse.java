package com.arepa.twitterclone.monolith.dto;

import com.arepa.twitterclone.monolith.domain.User;

import java.time.Instant;
import java.util.UUID;

public record UserResponse(
        UUID id,
        String auth0Id,
        String email,
        String displayName,
        String avatarUrl,
        Instant createdAt,
        Instant updatedAt
) {
    public static UserResponse fromEntity(User user) {
        return new UserResponse(
                user.getId(),
                user.getAuth0Id(),
                user.getEmail(),
                user.getDisplayName(),
                user.getAvatarUrl(),
                user.getCreatedAt(),
                user.getUpdatedAt()
        );
    }
}