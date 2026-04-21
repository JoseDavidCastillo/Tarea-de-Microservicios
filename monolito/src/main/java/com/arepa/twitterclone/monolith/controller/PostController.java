package com.arepa.twitterclone.monolith.controller;

import com.arepa.twitterclone.monolith.dto.PostRequest;
import com.arepa.twitterclone.monolith.dto.PostResponse;
import com.arepa.twitterclone.monolith.service.PostService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping
    public List<PostResponse> findAll() {
        return postService.findAll();
    }

    @GetMapping("/{id}")
    public PostResponse findById(@PathVariable UUID id) {
        return postService.findById(id);
    }

    @PostMapping
    public ResponseEntity<PostResponse> createPost(@Valid @RequestBody PostRequest request,
                                                   @AuthenticationPrincipal Jwt jwt) {
        return ResponseEntity.status(HttpStatus.CREATED).body(postService.createPost(request, jwt));
    }
}