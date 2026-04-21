package com.arepa.twitterclone.monolith.dto;

import com.arepa.twitterclone.monolith.domain.Post;

import java.time.Instant;
import java.util.UUID;

public record PostResponse(
        UUID id,
        String content,
        String authorAuth0Id,
        String authorEmail,
        String authorDisplayName,
        Instant createdAt
) {
    public static PostResponse fromEntity(Post post) {
        return new PostResponse(
                post.getId(),
                post.getContent(),
                post.getAuthorAuth0Id(),
                post.getAuthorEmail(),
                post.getAuthorDisplayName(),
                post.getCreatedAt()
        );
    }
}