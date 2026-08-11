package com.api.petStore.dto.request;

import com.api.petStore.entity.CartItem;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class CartRequestDTO {
    @NotBlank(message="User id field must be provided")
    private String userId;
    @NotEmpty(message="Items field must be provided")
    private List<CartItem> items;
    @NotNull(message="Total Price field must be provided")
    private Long totalPrice;
}
