package com.openclassrooms.mddapi.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TopicDTO {
	private int id;
	private String title;
	private String description;
	private List<Integer> articles;
}
