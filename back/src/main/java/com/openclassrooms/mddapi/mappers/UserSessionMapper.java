package com.openclassrooms.mddapi.mappers;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import com.openclassrooms.mddapi.dto.UserSessionDTO;
import com.openclassrooms.mddapi.models.Topic;
import com.openclassrooms.mddapi.models.User;

@Mapper(componentModel = "spring")
public abstract class UserSessionMapper implements EntityMapper<UserSessionDTO, User>{
	
	@Mappings({
        @Mapping(target = "topics", expression = "java(mapIdsToTopics(userSessionDTO.getTopics()))")
    })
    public abstract User toEntity(UserSessionDTO userSessionDTO);

    @Mappings({
        @Mapping(target = "subscribedTopicIds", expression = "java(mapTopicsToIds(user.getTopics()))")
    })
    public abstract UserSessionDTO toDto(User user);

    public List<Integer> mapTopicsToIds(List<Topic> topics) {
        return Optional.ofNullable(topics)
                .orElseGet(Collections::emptyList)
                .stream()
                .map(Topic::getTopicId)
                .collect(Collectors.toList());
    }

    public List<Topic> mapIdsToTopics(List<Integer> ids) {
        return Optional.ofNullable(ids)
                .orElseGet(Collections::emptyList)
                .stream()
                .map(id -> {
                    Topic topic = new Topic();
                    topic.setTopicId(id);
                    return topic;
                })
                .collect(Collectors.toList());
    }

}
