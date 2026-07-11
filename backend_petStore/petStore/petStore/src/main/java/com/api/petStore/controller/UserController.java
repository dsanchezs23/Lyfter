package com.api.petStore.controller;

import com.api.petStore.dto.request.UserRequestDTO;
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

    @PostMapping
    public ResponseEntity<UserResponseDTO> create(@Valid @RequestBody UserRequestDTO userRequestDTO, @Valid @PathVariable Role role) throws Exception {
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.createUser(userRequestDTO, role));
    }

    @GetMapping
    public ResponseEntity<UserResponseDTO> getUser(@Valid @RequestBody UserRequestDTO userRequestDTO, @Valid @PathVariable Role role) throws Exception {
        return ResponseEntity.status(HttpStatus.FOUND).body(userService.getUserById(userRequestDTO.getId(), role));
    }

    @GetMapping
    public ResponseEntity<List<UserResponseDTO>> getAllUsers(@PathVariable Role role) throws Exception {
        return ResponseEntity.status(HttpStatus.FOUND).body(userService.getAllUsers(role));
    }
}
