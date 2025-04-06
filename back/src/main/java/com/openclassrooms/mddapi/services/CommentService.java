package com.openclassrooms.mddapi.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.dto.CommentDTO;
import com.openclassrooms.mddapi.repository.CommentRepository;

@Service
public class CommentService {
	
	private final CommentRepository commentRepository;
	
	public CommentService(CommentRepository commentRepository) {
		this.commentRepository = commentRepository;
	}
	
	public List<CommentDTO> getCommentsByArticleId(int articleId) {
	    return commentRepository.findByArticleId(articleId).stream()
	        .map(comment -> new CommentDTO(
	            comment.getId(),
	            comment.getContent(),
	            comment.getCreatedAt(),
	            comment.getAuthor().getUsername()
	        ))
	        .collect(Collectors.toList());
	}


}
