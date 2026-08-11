package com.api.petStore.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginRequestDTO {
    @NotBlank(message = "Email field must be provided")
    private String email;
    @NotBlank(message = "Password field must be provided")
    private String password;
}
