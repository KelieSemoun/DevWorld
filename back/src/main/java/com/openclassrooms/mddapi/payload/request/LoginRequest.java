package com.openclassrooms.mddapi.payload.request;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
public class LoginRequest {
    private String username;
    // No password for now
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
}