package com.api.petStore.controller;

import com.api.petStore.dto.request.CustomerRequestDTO;
import com.api.petStore.dto.request.LoginRequestDTO;
import com.api.petStore.dto.response.UserResponseDTO;
import com.api.petStore.enums.Role;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.api.petStore.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<UserResponseDTO> login(@Valid @RequestBody LoginRequestDTO loginRequestDTO) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.login(loginRequestDTO.getEmail(), loginRequestDTO.getPassword()));
    }

    @PostMapping("/{role}")
    public ResponseEntity<UserResponseDTO> create(@PathVariable Role role, @Valid @RequestBody CustomerRequestDTO userRequestDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.createUser(userRequestDTO, role));
    }

    @GetMapping("/{role}/{id}")
    public ResponseEntity<UserResponseDTO> getUser(@PathVariable Role role, @PathVariable String id) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.getUserById(id, role));
    }

    @GetMapping("/{role}")
    public ResponseEntity<List<UserResponseDTO>> getAllUsers(@PathVariable Role role) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.getAllUsers(role));
    }
}
