package com.openclassrooms.mddapi.mappers;

import org.mapstruct.Mapper;

import com.openclassrooms.mddapi.dto.UserSessionDTO;
import com.openclassrooms.mddapi.models.User;

@Mapper(componentModel = "spring")
public abstract class UserSessionMapper implements EntityMapper<UserSessionDTO, User>{
	

    public abstract User toEntity(UserSessionDTO userSessionDTO);

    public abstract UserSessionDTO toDto(User user);

}
