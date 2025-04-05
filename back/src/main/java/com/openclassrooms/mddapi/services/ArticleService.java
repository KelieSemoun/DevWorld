package com.openclassrooms.mddapi.services;

import java.util.Date;

import org.springframework.stereotype.Service;

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
}
