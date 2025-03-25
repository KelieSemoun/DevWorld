package com.openclassrooms.mddapi.mappers;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import com.openclassrooms.mddapi.dto.TopicDTO;
import com.openclassrooms.mddapi.models.Post;
import com.openclassrooms.mddapi.models.Topic;

@Mapper(componentModel = "spring")
public abstract class TopicMapper implements EntityMapper<TopicDTO, Topic> {

    @Mappings({
        @Mapping(target = "posts", expression = "java(mapIdsToPosts(topicDTO.getPosts()))")
    })
    public abstract Topic toEntity(TopicDTO topicDTO);

    @Mappings({
        @Mapping(target = "posts", expression = "java(mapPostsToIds(topic.getPosts()))")
    })
    public abstract TopicDTO toDto(Topic topic);

    public List<Integer> mapPostsToIds(List<Post> posts) {
        return Optional.ofNullable(posts)
                .orElseGet(Collections::emptyList)
                .stream()
                .map(Post::getPostId)
                .collect(Collectors.toList());
    }

    public List<Post> mapIdsToPosts(List<Integer> ids) {
        return Optional.ofNullable(ids)
                .orElseGet(Collections::emptyList)
                .stream()
                .map(id -> {
                    Post post = new Post();
                    post.setPostId(id);
                    return post;
                })
                .collect(Collectors.toList());
    }
}
