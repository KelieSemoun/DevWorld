package com.openclassrooms.mddapi.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.openclassrooms.mddapi.payload.request.ArticleRequest;
import com.openclassrooms.mddapi.payload.response.MessageResponse;
import com.openclassrooms.mddapi.security.services.UserDetailsImpl;
import com.openclassrooms.mddapi.services.ArticleService;

@RestController
@RequestMapping("/api/article")
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
public class ArticleController {

    private final ArticleService articleService;

    public ArticleController(ArticleService articleService) {
        this.articleService = articleService;
    }

    @PostMapping
    public ResponseEntity<?> createArticle(
        @AuthenticationPrincipal UserDetailsImpl userDetails,
        @RequestBody ArticleRequest request
    ) {
        articleService.createArticle(userDetails.getUsername(), request);
        return ResponseEntity.ok(new MessageResponse("Article created successfully!"));
    }
}
