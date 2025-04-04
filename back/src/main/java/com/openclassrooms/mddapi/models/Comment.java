package com.openclassrooms.mddapi.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "comment")
public class Comment {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="comment_id")
	private int commentId;
	    
	@ManyToOne()
	@JoinColumn(name = "user_id")
	private User author;
	
	@Column(name="content")
	private String content;     
	    
	@ManyToOne()
	@JoinColumn(name="post_id")
	private Article post;	    
}
