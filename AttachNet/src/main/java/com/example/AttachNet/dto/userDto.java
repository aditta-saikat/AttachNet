package com.example.AttachNet.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class userDto {
    private Long id;
    private String username;
    private String email;
    private String password;
}
