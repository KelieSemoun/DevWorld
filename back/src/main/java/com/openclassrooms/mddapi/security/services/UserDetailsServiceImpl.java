package com.openclassrooms.mddapi.security.services;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.models.User;
import com.openclassrooms.mddapi.repository.UserRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
  UserRepository userRepository;

  UserDetailsServiceImpl(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @Override
  @Transactional
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
	  Optional<User> userOpt = userRepository.findByUsernameOrEmail(username);
    if(!userOpt.isPresent()) {
    	throw new UsernameNotFoundException("User Not Found with identifier: " + username);
    }

    User user = userOpt.get();
    return UserDetailsImpl
            .builder()
            .id(user.getId())
            .email(user.getEmail())
            .username(user.getUsername())
            .password(user.getPassword())
            .build();
  }

}