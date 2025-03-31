package com.openclassrooms.mddapi.models;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "post")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Post {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "post_id")
	private int postId;
	
	@Column(name = "title")
	private String title;
	
	@ManyToOne()
	@JoinColumn(name = "user_id")
	private User author;
	
	@ManyToOne()
	@JoinColumn(name = "topic_id")
	private Topic topic;
	
	@Column(name = "date")
	private Date date;
	
	@Column(name = "content")
	private String content;
	
	@OneToMany(mappedBy = "post")
	private List<Comment> comments = new ArrayList<>();
}
