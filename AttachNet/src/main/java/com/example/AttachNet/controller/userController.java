package com.example.AttachNet.controller;

import com.example.AttachNet.dto.userDto;
import com.example.AttachNet.service.userService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors; 

@RestController
@RequestMapping("/api/users")
public class userController {

    private final userService userService;

    public userController(userService userService) {
        this.userService = userService;
    }

    // Get all users
    @GetMapping
    public List<userDto> getAllUsers() {
        return userService.getAllUsers().stream()
                .map(user -> userService.getUserById(user.getId())) 
                .collect(Collectors.toList()); 
    }

    // Get a user by ID
    @GetMapping("/{id}")
    public userDto getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    // Create a new user
    @PostMapping
    public userDto createUser(@RequestBody userDto userDto) {
        return userService.createUser(userDto);
    }

    // Delete a user by ID
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }
}
