package com.openclassrooms.mddapi.service.topic;

import java.security.Principal;
import java.util.List;

import com.openclassrooms.mddapi.dto.TopicDTO;

public interface ITopicService {
	/**
	 * Retrieves all topics.
	 *
	 * @return A list of TopicDTOs representing all topics.
	 */
	List<TopicDTO> findAll();
	/**
	 * Retrieves all topics not followed by user
	 *
	 * @return A list of TopicDTOs representing all topics not foollowed by user.
	 */
	List<TopicDTO> getTopicsNotFollowedByUser(Principal user) throws Exception;
	/**
	 * Subscribes a user to a topic.
	 *
	 * @param currentUser The current user attempting to subscribe to a topic, represented as a DBUserDTO.
	 * @param topicId The ID of the topic to subscribe to.
	 * @throws Exception if the user or topic cannot be found.
	 */
	List<TopicDTO> subscribe(final Principal currentUser, final Long topicId) throws Exception;
	/**
	 * Unsubscribes a user from a topic.
	 *
	 * @param currentUser The current user attempting to unsubscribe from a topic, represented as a DBUserDTO.
	 * @param topicId The ID of the topic to unsubscribe from.
	 * @throws Exception if the user or topic cannot be found.
	 */
	List<TopicDTO> unsubscribe(final Principal currentUser, final Long topicId);
	/**
	 * Retrieves topics subscribed by a user.
	 *
	 * @param currentUser The current user whose subscribed topics are to be retrieved, represented as a DBUserDTO.
	 * @return A set of TopicDTOs representing topics subscribed by the user.
	 * @throws Exception if the user cannot be found.
	 */
	List<TopicDTO> getTopicsByUser(final Principal currentUser);
}
