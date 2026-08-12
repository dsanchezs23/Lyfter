package com.api.petStore.dto.response;

import lombok.Data;

@Data
public class ProductResponseDTO {
    private String id;
    private String name;
    private String description;
    private String category;
    private String image;
    private String price;
    private String discount;
    private String stockQuantity;
}
