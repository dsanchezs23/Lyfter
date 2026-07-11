package com.api.petStore.dto.response;

import lombok.Data;

@Data
public class CartItemResponseDTO {
    private String id;
    private String cartId;
    private String ProductId;
    private Integer quantity;
    private Long priceAtTime;
}
