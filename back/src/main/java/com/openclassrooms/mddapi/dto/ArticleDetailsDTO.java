package com.openclassrooms.mddapi.dto;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ArticleDetailsDTO {
    private int id;
    private String title;
    private String content;
    private Date createdAt;
    private String author;
    private String topic;
}
