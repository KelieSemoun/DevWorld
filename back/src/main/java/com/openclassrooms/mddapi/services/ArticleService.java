package com.openclassrooms.mddapi.services;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.dto.ArticleDetailsDTO;
import com.openclassrooms.mddapi.dto.ArticleFeedDTO;
import com.openclassrooms.mddapi.exception.NotFoundException;
import com.openclassrooms.mddapi.models.Article;
import com.openclassrooms.mddapi.models.Topic;
import com.openclassrooms.mddapi.models.User;
import com.openclassrooms.mddapi.payload.request.ArticleRequest;
import com.openclassrooms.mddapi.repository.ArticleRepository;
import com.openclassrooms.mddapi.repository.TopicRepository;
import com.openclassrooms.mddapi.repository.UserRepository;

@Service
public class ArticleService {

    private final ArticleRepository articleRepository;
    private final TopicRepository topicRepository;
    private final UserRepository userRepository;

    public ArticleService(ArticleRepository articleRepository, TopicRepository topicRepository, UserRepository userRepository) {
        this.articleRepository = articleRepository;
        this.topicRepository = topicRepository;
        this.userRepository = userRepository;
    }

    public Article createArticle(String username, ArticleRequest request) {
        Topic topic = topicRepository.findById(request.getTopicId())
            .orElseThrow(() -> new IllegalArgumentException("Topic not found"));
        
        User user = userRepository.findByUsername(username).get();

        Article article = new Article();
        article.setTitle(request.getTitle());
        article.setContent(request.getContent());
        article.setAuthor(user);
        article.setTopic(topic);
        article.setDate(new Date());

        return articleRepository.save(article);
    }
    
    public List<ArticleFeedDTO> getFeed(String username) {
    	Optional<User> userOpt = userRepository.findByUsername(username);
        if (userOpt.isEmpty()) {
            throw new NotFoundException();
        }
        
        User user = userOpt.get();
        List<Topic> subscribedTopics = user.getTopics();
        return articleRepository.findByTopicInOrderByDateDesc(subscribedTopics).stream()
            .map(article -> new ArticleFeedDTO(
                article.getId(),
                article.getTitle(),
                generatePreview(article.getContent()),
                article.getDate(),
                article.getAuthor().getUsername()
            ))
            .collect(Collectors.toList());
    }

    private String generatePreview(String content) {
        int maxLength = 120;
        if (content.length() <= maxLength) return content;
        return content.substring(0, maxLength).trim() + "...";
    }

    public Optional<ArticleDetailsDTO> getArticleDetails(int id) {
        return articleRepository.findById(id)
            .map(article -> new ArticleDetailsDTO(
                article.getId(),
                article.getTitle(),
                article.getContent(),
                article.getDate(),
                article.getAuthor().getUsername(),
                article.getTopic().getTitle()
            ));
    }


}
