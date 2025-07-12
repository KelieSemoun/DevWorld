package com.openclassrooms.mddapi.services;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.dto.CommentDTO;
import com.openclassrooms.mddapi.models.Article;
import com.openclassrooms.mddapi.models.Comment;
import com.openclassrooms.mddapi.models.User;
import com.openclassrooms.mddapi.payload.request.CommentRequest;
import com.openclassrooms.mddapi.repository.ArticleRepository;
import com.openclassrooms.mddapi.repository.CommentRepository;
import com.openclassrooms.mddapi.repository.UserRepository;

@Service
public class CommentService {
	
	private final CommentRepository commentRepository;
	private final ArticleRepository articleRepository;
    private final UserRepository userRepository;
	
	public CommentService(CommentRepository commentRepository, ArticleRepository articleRepository, UserRepository userRepository) {
		this.commentRepository = commentRepository;
		this.articleRepository = articleRepository;
		this.userRepository = userRepository;
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

	public void addComment(int userId, CommentRequest request) throws Exception {
        User user = userRepository.findById(userId).orElseThrow(() -> new Exception());
        Article article = articleRepository.findById(request.getArticleId()).orElseThrow(() -> new Exception());

        Comment comment = new Comment();
        comment.setContent(request.getContent());
        comment.setArticle(article);
        comment.setAuthor(user);
        comment.setCreatedAt(new Date());

        commentRepository.save(comment);
    }
}
