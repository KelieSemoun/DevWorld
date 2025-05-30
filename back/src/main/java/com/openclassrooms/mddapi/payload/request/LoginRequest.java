package com.openclassrooms.mddapi.payload.request;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
public class LoginRequest {
	  private String identifier;

	  private String password;

	  public String getIdentifier() {
		  return identifier;
	  }

	  public void setIdentifier(String identifier) {
		  this.identifier = identifier;
	  }

	  public String getPassword() {
		  return password;
	  }

	  public void setPassword(String password) {
		  this.password = password;
	  }
}