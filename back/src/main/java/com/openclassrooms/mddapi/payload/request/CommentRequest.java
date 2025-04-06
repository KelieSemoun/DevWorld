package com.openclassrooms.mddapi.payload.request;

import lombok.Data;

@Data
public class CommentRequest {
    private int articleId;
    private String content;
}
