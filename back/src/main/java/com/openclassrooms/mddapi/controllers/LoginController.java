package com.openclassrooms.mddapi.controllers;

import java.util.Collections;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.openclassrooms.mddapi.DTO.LoginRequest;
import com.openclassrooms.mddapi.DTO.LoginResponse;
import com.openclassrooms.mddapi.DTO.RegisterRequest;
import com.openclassrooms.mddapi.models.DBUser;
import com.openclassrooms.mddapi.repository.DBUserRepository;
import com.openclassrooms.mddapi.services.AuthService;
import com.openclassrooms.mddapi.services.DBUserService;
import com.openclassrooms.mddapi.services.JWTService;

@RestController
public class LoginController {

  @Autowired
  private DBUserRepository dbUserRepository;
  @Autowired
  private DBUserService dbUserService;
  @Autowired
  private BCryptPasswordEncoder bCryptPasswordEncoder;
  @Autowired
  public JWTService jwtService;
  @Autowired
  public AuthService authService;

  private final AuthenticationManager authenticationManager;
  public Logger logger = LoggerFactory.getLogger(LoginController.class);

  public LoginController(JWTService jwtService, AuthenticationManager authenticationManager) {
    this.jwtService = jwtService;
    this.authenticationManager = authenticationManager;
  }

  @PostMapping("/api/auth/login")
  public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {

    logger.info("Login request email : " + loginRequest.getIdentifier());
    logger.info("Login request password : " + loginRequest.getPassword());
    logger.info("encrypted password : " + bCryptPasswordEncoder.encode(loginRequest.getPassword()));

    try {

      logger.info("Trying to authenticate user");
      // Appeler le service d'authentification pour obtenir le token
      LoginResponse loginResponse = authService.login(loginRequest.getIdentifier(), loginRequest.getPassword());

      logger.info("Login Response : " + loginResponse);

      return ResponseEntity.ok(loginResponse);

    } catch (BadCredentialsException ex) {

      throw new BadCredentialsException("Invalid credentials provided.");

    }
  }

  @PostMapping("/api/auth/register")
  public ResponseEntity<LoginResponse> registerUser(@RequestBody RegisterRequest newUser) {

      logger.info("New user email : " + newUser.getEmail());
      logger.info("New user password : " + newUser.getPassword());

      // Encoder le mot de passe avant de sauvegarder l'utilisateur pour s'assurer de la sécurité de la BDD
      newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));

      logger.info("encrypted password : " + bCryptPasswordEncoder.encode(newUser.getPassword()));

      // Sauvegarder le nouvel utilisateur :
      // appelle le service et construit un nouvel user sur la base de register request
      dbUserService.createUserFromRegisterRequest(newUser);

      try {
        DBUser dbUser = dbUserService.findByEmail(newUser.getEmail());

        // Convertir DBUser en User générer le token à renvoyer
        User userDetails = new User(dbUser.getEmail(), dbUser.getPassword(), Collections.emptyList());

        // Générer le token (cela permet de le renvoyer afin de connecter l'utilisateur directement après son inscription)
        String token = jwtService.generateToken(userDetails);

        // Envoi du token JWT
        LoginResponse loginResponse = new LoginResponse(token);

        return ResponseEntity.ok(loginResponse);
    } catch (Exception ex) {
        logger.error("Error :", ex);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  // @GetMapping("/auth/me")
  //   public ResponseEntity<DBUserDTO> getAuthenticatedUser(@AuthenticationPrincipal UserDetails userDetails) {
  //       if (userDetails == null) {
  //           return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
  //       }

  //       Long id = ((DBUser) userDetails).getId();
  //       String username = ((DBUser) userDetails).getUsername();
  //       String email = ((DBUser) userDetails).getEmail();
  //       String password = ((DBUser) userDetails).getPassword();

  //       DBUserDTO dbUserDto = new DBUserDTO(id, username, email, password);
  //       return ResponseEntity.ok(dbUserDto);
  //   }

  // @GetMapping("/auth/me")
  // public ResponseEntity<DBUserDTO> getCurrentUser() {

  //   // Récupération de l'utilisateur actuellement connecté
  //   Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

  //   if (authentication == null || !authentication.isAuthenticated()) {
  //     return ResponseEntity.status(401).build();
  //   }

  //   String email = authentication.getName();

  //   Optional<DBUserDTO> optionalUser = dbUserService.getUserByEmail(email);

  //   if (optionalUser == null) {
  //     return ResponseEntity.notFound().build();
  //   }

  //   return ResponseEntity.ok(optionalUser.get());
  // }
}
