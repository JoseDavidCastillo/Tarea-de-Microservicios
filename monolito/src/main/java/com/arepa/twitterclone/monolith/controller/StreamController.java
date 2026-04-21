package com.arepa.twitterclone.monolith.controller;

import com.arepa.twitterclone.monolith.dto.PostResponse;
import com.arepa.twitterclone.monolith.service.PostService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/stream")
public class StreamController {

    private final PostService postService;

    public StreamController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping
    public List<PostResponse> stream() {
        return postService.findAll();
    }
}