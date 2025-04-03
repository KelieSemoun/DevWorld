package com.openclassrooms.mddapi.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.dto.TopicDTO;
import com.openclassrooms.mddapi.exception.NotFoundException;
import com.openclassrooms.mddapi.mappers.TopicMapper;
import com.openclassrooms.mddapi.models.Topic;
import com.openclassrooms.mddapi.models.User;
import com.openclassrooms.mddapi.repository.TopicRepository;
import com.openclassrooms.mddapi.repository.UserRepository;

@Service
public class UserService {
	
	private final UserRepository userRepository;

	private final TopicRepository topicRepository;
	
	private final TopicMapper topicMapper;
	
	public UserService(UserRepository userRepository, TopicRepository topicRepository, TopicMapper topicMapper) {
		this.userRepository = userRepository;
		this.topicRepository = topicRepository;
		this.topicMapper = topicMapper;
	}
	
	public List<TopicDTO> getSubscribedTopics(Integer userId) {
	    User user = userRepository.findById(userId)
	        .orElseThrow(() -> new NotFoundException());
	    
	    return user.getTopics().stream()
	        .map(topicMapper::toDto)
	        .collect(Collectors.toList());
	}

	public void unsubscribe(Integer userId, Integer topicId) {
	    User user = userRepository.findById(userId)
	        .orElseThrow(() -> new NotFoundException());
	    Topic topic = topicRepository.findById(topicId)
	        .orElseThrow(() -> new NotFoundException());

	    user.getTopics().remove(topic);
	    userRepository.save(user);
	}

	public void subscribeToTopic(int id, int topicId) {
		Optional<User> user = this.userRepository.findById(id);
		Optional<Topic> topic = this.topicRepository.findById(topicId);
		if(user.isEmpty() || topic.isEmpty()) {
			throw new NotFoundException();
		}
		
		User foundUser = user.get();
		foundUser.getTopics().add(topic.get());
		
		this.userRepository.save(foundUser);
	}

}
