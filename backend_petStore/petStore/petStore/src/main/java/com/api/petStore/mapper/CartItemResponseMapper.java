package com.api.petStore.mapper;

import com.api.petStore.dto.response.CartItemResponseDTO;
import com.api.petStore.entity.CartItem;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CartItemResponseMapper {
    CartItemResponseDTO toCartItemResponseDTO(CartItem cartItem);
}
