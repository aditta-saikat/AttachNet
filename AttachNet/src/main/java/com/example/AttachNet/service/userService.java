package com.example.AttachNet.service;

import com.example.AttachNet.dto.userDto;
import com.example.AttachNet.mapper.userMapper;
import com.example.AttachNet.model.users;
import com.example.AttachNet.repository.userRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
//import java.util.Optional;

@Service
public class userService {

    @Autowired
    private final userRepository userRepository;

    public userService(userRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Get all users
    public List<users> getAllUsers() {
        return userRepository.findAll();
    }

    // Get user by ID
    public userDto getUserById(Long id) {
        users user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        return userMapper.toDTO(user);
    }

    // Create a new user
    public userDto createUser(userDto userDto) {
        users user = userMapper.toEntity(userDto);
        users savedUser = userRepository.save(user);
        return userMapper.toDTO(savedUser);
    }

    // Delete user by ID
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("User not found with id: " + id);
        }
        userRepository.deleteById(id);
    }
}
