package com.openclassrooms.mddapi.models;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "comment")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Comment {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="comment_id")
	private int id;
	    
	@ManyToOne()
	@JoinColumn(name = "user_id")
	private User author;
	
	@Column(name="content")
	private String content;     
	
	@Column(name="created_at")
	private Date createdAt;
	    
	@ManyToOne()
	@JoinColumn(name="article_id")
	private Article article;	    
}
