package com.api.petStore.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CartItemRequestDTO {
    @NotBlank(message="Cart id field must be provided")
    private String cartId;
    @NotBlank(message="Product id field must be provided")
    private String productId;
    @NotNull(message="Quantity field must be provided")
    private Integer quantity;
    @NotNull(message="Price at time field must be provided")
    private Long priceAtTime;
}
