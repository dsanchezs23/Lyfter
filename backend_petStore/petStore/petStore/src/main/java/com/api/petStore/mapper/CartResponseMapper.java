package com.api.petStore.mapper;

import com.api.petStore.dto.response.CartResponseDTO;
import com.api.petStore.entity.Cart;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CartResponseMapper {
    CartResponseDTO toCartResponseDTO(Cart cart);
}
