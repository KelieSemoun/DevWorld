package com.openclassrooms.mddapi.mappers;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import com.openclassrooms.mddapi.dto.TopicDTO;
import com.openclassrooms.mddapi.models.Article;
import com.openclassrooms.mddapi.models.Topic;

@Mapper(componentModel = "spring")
public abstract class TopicMapper implements EntityMapper<TopicDTO, Topic> {

    @Mappings({
    	@Mapping(source = "id", target = "topicId"),
        @Mapping(target = "articles", expression = "java(mapIdsToArticles(topicDTO.getArticles()))")
    })
    public abstract Topic toEntity(TopicDTO topicDTO);

    @Mappings({
    	@Mapping(source = "topicId", target = "id"),
        @Mapping(target = "articles", expression = "java(mapArticlesToIds(topic.getArticles()))")
    })
    public abstract TopicDTO toDto(Topic topic);

    public List<Integer> mapArticlesToIds(List<Article> posts) {
        return Optional.ofNullable(posts)
                .orElseGet(Collections::emptyList)
                .stream()
                .map(Article::getId)
                .collect(Collectors.toList());
    }

    public List<Article> mapIdsToArticles(List<Integer> ids) {
        return Optional.ofNullable(ids)
                .orElseGet(Collections::emptyList)
                .stream()
                .map(id -> {
                    Article post = new Article();
                    post.setId(id);
                    return post;
                })
                .collect(Collectors.toList());
    }
}
