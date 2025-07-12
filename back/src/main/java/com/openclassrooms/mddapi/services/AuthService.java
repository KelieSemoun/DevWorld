package com.openclassrooms.mddapi.services;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.dto.UserSessionDTO;
import com.openclassrooms.mddapi.mappers.UserSessionMapper;
import com.openclassrooms.mddapi.models.User;
import com.openclassrooms.mddapi.payload.request.LoginRequest;
import com.openclassrooms.mddapi.payload.request.SignupRequest;
import com.openclassrooms.mddapi.payload.request.UpdateUserRequest;
import com.openclassrooms.mddapi.payload.response.JwtResponse;
import com.openclassrooms.mddapi.payload.response.MessageResponse;
import com.openclassrooms.mddapi.repository.UserRepository;
import com.openclassrooms.mddapi.security.jwt.JwtUtils;
import com.openclassrooms.mddapi.security.services.UserDetailsImpl;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final UserSessionMapper userSessionMapper;

    public ResponseEntity<?> login(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                loginRequest.getIdentifier(),
                loginRequest.getPassword()
            )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        Optional<User> userOpt = userRepository.findByEmail(userDetails.getEmail());
        if (!userOpt.isPresent()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }

        User user = userOpt.get();
        return ResponseEntity.ok(new JwtResponse(jwt, userSessionMapper.toDto(user)));
    }

    public ResponseEntity<?> register(SignupRequest signUpRequest) {
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity.badRequest()
                .body(new MessageResponse("Error: Email is already taken!"));
        }

        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity.badRequest()
                .body(new MessageResponse("Error: Username is already taken!"));
        }

        User user = new User();
        user.setUsername(signUpRequest.getUsername());
        user.setEmail(signUpRequest.getEmail());
        user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }

    public ResponseEntity<?> updateProfile(UserDetailsImpl userDetails, UpdateUserRequest request) {
        Optional<User> userOpt = userRepository.findByUsername(userDetails.getUsername());
        if (!userOpt.isPresent()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        if (userRepository.existsByEmail(request.getEmail()) &&
            !userDetails.getEmail().equals(request.getEmail())) {
            return ResponseEntity.badRequest()
                .body(new MessageResponse("Error: Email is already taken!"));
        }

        if (userRepository.existsByUsername(request.getUsername()) &&
            !userDetails.getUsername().equals(request.getUsername())) {
            return ResponseEntity.badRequest()
                .body(new MessageResponse("Error: Username is already taken!"));
        }

        User user = userOpt.get();
        user.setEmail(request.getEmail());
        user.setUsername(request.getUsername());

        if (request.getPassword() != null && !request.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(request.getPassword()));
        }

        userRepository.save(user);
        UserSessionDTO session = userSessionMapper.toDto(user);
        String jwt = jwtUtils.generateJwtTokenFromEmail(user.getEmail());
        return ResponseEntity.ok(new JwtResponse(jwt, session));

    }
}
