package com.arepa.twitterclone.monolith.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "auth0")
public record Auth0Properties(String issuerUri, String audience) {
}