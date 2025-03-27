package com.openclassrooms.mddapi.services;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.exception.NotFoundException;
import com.openclassrooms.mddapi.models.Topic;
import com.openclassrooms.mddapi.models.User;
import com.openclassrooms.mddapi.repository.TopicRepository;
import com.openclassrooms.mddapi.repository.UserRepository;

@Service
public class UserService {
	
	private final UserRepository userRepository;

	private final TopicRepository topicRepository;
	
	public UserService(UserRepository userRepository, TopicRepository topicRepository) {
		this.userRepository = userRepository;
		this.topicRepository = topicRepository;
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
