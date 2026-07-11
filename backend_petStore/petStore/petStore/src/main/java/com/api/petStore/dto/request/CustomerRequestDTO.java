package com.api.petStore.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class CustomerRequestDTO extends UserRequestDTO {
    @NotBlank(message="Shipping address field must be provided")
    private String shippingAddress;
}
