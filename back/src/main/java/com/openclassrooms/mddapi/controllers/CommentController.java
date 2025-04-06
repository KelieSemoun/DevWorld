package com.openclassrooms.mddapi.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.openclassrooms.mddapi.payload.request.CommentRequest;
import com.openclassrooms.mddapi.payload.response.MessageResponse;
import com.openclassrooms.mddapi.security.services.UserDetailsImpl;
import com.openclassrooms.mddapi.services.CommentService;

@RestController
@RequestMapping("/api/comments")
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
public class CommentController {

    private final CommentService commentService;
    
    public CommentController(CommentService commentService) {
    	this.commentService = commentService;
    }

    @PostMapping
    public ResponseEntity<?> postComment(
        @AuthenticationPrincipal UserDetailsImpl userDetails,
        @RequestBody CommentRequest request
    ) {
        commentService.addComment(userDetails.getId(), request);
        return ResponseEntity.ok(new MessageResponse("Comment posted successfully"));
    }
}
