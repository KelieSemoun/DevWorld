package com.openclassrooms.mddapi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.openclassrooms.mddapi.models.Article;
import com.openclassrooms.mddapi.models.Topic;

public interface ArticleRepository extends JpaRepository<Article, Integer>{

	List<Article> findByTopicInOrderByDateDesc(List<Topic> topics);

}
