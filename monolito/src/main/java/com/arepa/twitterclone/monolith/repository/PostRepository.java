package com.arepa.twitterclone.monolith.repository;

import com.arepa.twitterclone.monolith.domain.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface PostRepository extends JpaRepository<Post, UUID> {

    List<Post> findAllByOrderByCreatedAtDesc();
}