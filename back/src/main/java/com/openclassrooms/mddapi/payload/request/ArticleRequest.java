package com.openclassrooms.mddapi.payload.request;

import lombok.Data;

@Data
public class ArticleRequest {
	private String title;
    private String content;
    private int topicId;
}
