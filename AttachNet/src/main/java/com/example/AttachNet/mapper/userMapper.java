package com.example.AttachNet.mapper;

import com.example.AttachNet.dto.userDto;
import com.example.AttachNet.model.users;

public class userMapper {

    // Convert entity to DTO
    public static userDto toDTO(users user) {
        userDto userDto = new userDto();
        userDto.setId(user.getId());
        userDto.setUsername(user.getUsername());
        userDto.setEmail(user.getEmail());
        userDto.setPassword(user.getPassword());
        return userDto;
    }

    // Convert DTO to entity
    public static users toEntity(userDto userDto) {
        users user = new users();
        user.setId(userDto.getId());
        user.setUsername(userDto.getUsername());
        user.setEmail(userDto.getEmail());
        user.setPassword(userDto.getPassword());
        return user;
    }
}
