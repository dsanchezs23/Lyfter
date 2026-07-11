package com.api.petStore.dto.response;

import com.api.petStore.entity.CartItem;
import lombok.Data;

import java.util.List;

@Data
public class CartResponseDTO {
    private String id;
    private String userId;
    private List<CartItem> items;
    private Long totalPrice;
}
