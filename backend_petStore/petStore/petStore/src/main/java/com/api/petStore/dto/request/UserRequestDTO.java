package com.api.petStore.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UserRequestDTO {
    @NotBlank(message = "Name field must be provided")
    private String name;
    @NotBlank(message = "LastName field must be provided")
    private String lastName;
    @NotBlank(message = "Email field must be provided")
    private String email;
    @NotBlank(message = "Password field must be provided")
    private String password;
    @NotBlank(message = "Phone field must be provided")
    private String phoneNumber;
    @NotNull(message = "Birthday field must be provided")
    private LocalDateTime birthday;
}