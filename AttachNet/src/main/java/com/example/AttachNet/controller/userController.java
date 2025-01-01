package com.example.AttachNet.controller;

import com.example.AttachNet.dto.userDto;
import com.example.AttachNet.service.userService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3001", allowedHeaders = "*", allowCredentials = "true")  
public class userController {

    private final userService userService;

    // Constructor-based dependency injection
    public userController(userService userService) {
        this.userService = userService;
    }

    // Get all users
    @GetMapping
    public List<userDto> getAllUsers() {
        // Fetch all users and return them
        return userService.getAllUsers().stream()
                .map(user -> userService.getUserById(user.getId())) // Ensure you're mapping to the correct userDto
                .collect(Collectors.toList());
    }

    // Get a user by ID
    @GetMapping("/{id}")
    public userDto getUserById(@PathVariable Long id) {
        return userService.getUserById(id); // Fetch the user by ID and return
    }

    // Create a new user
    @PostMapping
    public userDto createUser(@RequestBody userDto userDto) {
        return userService.createUser(userDto); // Create a new user and return the created user
    }

    // Delete a user by ID
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id); // Delete user by ID
    }
}
