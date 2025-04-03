package com.openclassrooms.mddapi.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.openclassrooms.mddapi.dto.TopicDTO;
import com.openclassrooms.mddapi.services.UserService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/user")
public class UserController {
	
	private final UserService userService;
	
	public UserController(UserService userService) {
		this.userService = userService;
	}
	
	@GetMapping("/{userId}/topics")
	public ResponseEntity<List<TopicDTO>> getSubscribedTopics(@PathVariable Integer userId) {
		return ResponseEntity.ok(userService.getSubscribedTopics(userId));
	}

	@PostMapping("{userId}/subscribe/{topicId}")
	public ResponseEntity<?> subscribeToTopic(@PathVariable Integer userId, @PathVariable Integer topicId){
		try {
			this.userService.subscribeToTopic(userId, topicId);
			
			return ResponseEntity.ok().build();
		} catch (NumberFormatException e) {
			return ResponseEntity.badRequest().build();
		}
		
	}
	
	@PostMapping("/{userId}/unsubscribe/{topicId}")
	public ResponseEntity<Void> unsubscribe(@PathVariable Integer userId, @PathVariable Integer topicId) {
	    userService.unsubscribe(userId, topicId);
	    return ResponseEntity.ok().build();
	}
}
