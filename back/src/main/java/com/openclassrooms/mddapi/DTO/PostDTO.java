package com.openclassrooms.mddapi.DTO;

import java.time.LocalDateTime;

public class PostDTO {

  private Long id;
  private String title;
  private String content;
  private Long userId;
  private String authorName;
  private Long topicId;
  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;

  public PostDTO(Long id, String title, String content, Long userId, String authorName, Long topicId, LocalDateTime createdAt, LocalDateTime updatedAt) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.userId = userId;
    this.authorName = authorName;
    this.topicId = topicId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public Long getId() {
    return this.id;
  }

  public String getTitle() {
    return this.title;
  }

  public String getContent() {
    return this.content;
  }

  public Long getUserId() {
    return this.userId;
  }

  public String getAuthorName() {
    return this.authorName;
  }

  public Long getTopicId() {
    return this.topicId;
  }

  public LocalDateTime getCreatedAt() {
    return this.createdAt;
  }

  public LocalDateTime getUpdatedAt() {
    return this.updatedAt;
  }

}
