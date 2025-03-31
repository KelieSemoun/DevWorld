package com.openclassrooms.mddapi.payload.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JwtResponse {
	  private String token;
	  private String type = "Bearer";
	  private int id;
	  private String username;
	  private String email;
	
	  public JwtResponse(String accessToken, int id, String username,String email) {
		  this.token = accessToken;
		  this.id = id;
		  this.email = email;
		  this.username = username;
	  }
}