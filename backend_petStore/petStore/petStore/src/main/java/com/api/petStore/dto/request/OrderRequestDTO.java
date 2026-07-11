package com.api.petStore.dto.request;

import com.api.petStore.entity.CartItem;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class OrderRequestDTO {
    @NotBlank(message = "User Id field must be provided")
    private String userId;
    @NotBlank(message = "Status field must be provided")
    private String status;
    @NotEmpty(message = "Cart Items field must be provided")
    private List<CartItem> cartItems;
    @NotNull(message = "Total Price field must be provided")
    private Long totalPrice;
}
