package com.openclassrooms.mddapi.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.openclassrooms.mddapi.dto.ArticleDetailsDTO;
import com.openclassrooms.mddapi.dto.ArticleFeedDTO;
import com.openclassrooms.mddapi.dto.CommentDTO;
import com.openclassrooms.mddapi.payload.request.ArticleRequest;
import com.openclassrooms.mddapi.payload.response.MessageResponse;
import com.openclassrooms.mddapi.security.services.UserDetailsImpl;
import com.openclassrooms.mddapi.services.ArticleService;
import com.openclassrooms.mddapi.services.CommentService;

@RestController
@RequestMapping("/api/article")
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
public class ArticleController {

    private final ArticleService articleService;
	private final CommentService commentService;
    
    public ArticleController(ArticleService articleService, CommentService commentService) {
        this.articleService = articleService;
        this.commentService = commentService;
    }

    @PostMapping
    public ResponseEntity<?> createArticle(
        @AuthenticationPrincipal UserDetailsImpl userDetails,
        @RequestBody ArticleRequest request
    ) {
        articleService.createArticle(userDetails.getUsername(), request);
        return ResponseEntity.ok(new MessageResponse("Article created successfully!"));
    }
    
    @GetMapping("/feed")
    public ResponseEntity<List<ArticleFeedDTO>> getFeed(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        List<ArticleFeedDTO> feed = articleService.getFeed(userDetails.getUsername());
        return ResponseEntity.ok(feed);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ArticleDetailsDTO> getArticleById(@PathVariable int id) {
        return articleService.getArticleDetails(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/{id}/comments")
    public ResponseEntity<List<CommentDTO>> getComments(@PathVariable int id) {
        return ResponseEntity.ok(commentService.getCommentsByArticleId(id));
    }

}
