package com.arepa.twitterclone.monolith.service;

import com.arepa.twitterclone.monolith.domain.Post;
import com.arepa.twitterclone.monolith.dto.PostRequest;
import com.arepa.twitterclone.monolith.dto.PostResponse;
import com.arepa.twitterclone.monolith.exception.NotFoundException;
import com.arepa.twitterclone.monolith.repository.PostRepository;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class PostService {

    private final PostRepository postRepository;
    private final UserService userService;

    public PostService(PostRepository postRepository, UserService userService) {
        this.postRepository = postRepository;
        this.userService = userService;
    }

    @Transactional
    public PostResponse createPost(PostRequest request, Jwt jwt) {
        var user = userService.ensureUser(jwt);

        Post post = new Post();
        post.setContent(request.content());
        post.setAuthorAuth0Id(user.getAuth0Id());
        post.setAuthorEmail(user.getEmail());
        post.setAuthorDisplayName(user.getDisplayName());

        return PostResponse.fromEntity(postRepository.save(post));
    }

    @Transactional(readOnly = true)
    public List<PostResponse> findAll() {
        return postRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(PostResponse::fromEntity)
                .toList();
    }

    @Transactional(readOnly = true)
    public PostResponse findById(UUID id) {
        return postRepository.findById(id)
                .map(PostResponse::fromEntity)
                .orElseThrow(() -> new NotFoundException("Post " + id + " not found"));
    }
}