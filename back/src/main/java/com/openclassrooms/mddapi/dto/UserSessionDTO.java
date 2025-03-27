package com.openclassrooms.mddapi.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserSessionDTO {
	private int id;
	private String username;
	private List<Integer> subscribedTopicIds;
}
