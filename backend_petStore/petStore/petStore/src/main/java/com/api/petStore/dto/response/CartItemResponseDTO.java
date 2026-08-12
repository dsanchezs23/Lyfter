package com.api.petStore.dto.response;

import lombok.Data;

@Data
public class CartItemResponseDTO {
    private Long id;
    private String cartId;
    private String productId;
    private Integer quantity;
    private Long priceAtTime;
}
