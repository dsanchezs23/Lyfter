package com.api.petStore.dto.response;

import com.api.petStore.enums.Role;
import lombok.Data;

@Data
public class UserResponseDTO {
    private String id;
    private String name;
    private String lastName;
    private String email;
    private Role role;
}
