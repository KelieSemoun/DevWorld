package com.openclassrooms.mddapi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@AllArgsConstructor @NoArgsConstructor
public class ArticleDto {
    private Long id;
    private String title;
    private String authorName;
    private String content;
    private List<CommentDto> comments;
}
