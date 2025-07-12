package com.openclassrooms.mddapi.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.openclassrooms.mddapi.models.User;


public interface UserRepository extends JpaRepository<User, Integer>{

	Optional<User> findByUsername(String username);

	Optional<User> findByEmail(String email);
	
	@Query("SELECT u FROM User u WHERE u.username = :input OR u.email = :input")
	Optional<User> findByUsernameOrEmail(@Param("input") String input);

	boolean existsByEmail(String email);

	boolean existsByUsername(String username);

}
