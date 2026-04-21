package com.arepa.twitterclone.monolith.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record PostRequest(
        @NotBlank(message = "Content is required")
        @Size(max = 140, message = "Posts cannot exceed 140 characters")
        String content
) {
}