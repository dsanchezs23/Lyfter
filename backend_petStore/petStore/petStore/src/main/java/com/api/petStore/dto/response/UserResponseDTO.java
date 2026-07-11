package com.api.petStore.dto.response;

import lombok.Data;

@Data
public class UserResponseDTO {
    private String id;
    private String name;
    private String lastName;
    private String email;
}
