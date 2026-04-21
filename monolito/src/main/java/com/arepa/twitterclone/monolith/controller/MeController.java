package com.arepa.twitterclone.monolith.controller;

import com.arepa.twitterclone.monolith.dto.UserResponse;
import com.arepa.twitterclone.monolith.service.UserService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/me")
public class MeController {

    private final UserService userService;

    public MeController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public UserResponse me(@AuthenticationPrincipal Jwt jwt) {
        return userService.currentUser(jwt);
    }
}