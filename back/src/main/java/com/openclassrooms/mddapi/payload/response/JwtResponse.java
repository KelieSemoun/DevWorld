package com.openclassrooms.mddapi.payload.response;

import com.openclassrooms.mddapi.dto.UserSessionDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JwtResponse {
	  private String token;
	  private String type = "Bearer";
	  private UserSessionDTO user;
	
	  public JwtResponse(String accessToken, UserSessionDTO user) {
		  this.token = accessToken;
		  this.user = user;
	  }
}