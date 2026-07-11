package com.api.petStore.mapper;

import com.api.petStore.dto.response.ProductResponseDTO;
import com.api.petStore.entity.Product;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ProductResponseMapper {
    ProductResponseDTO toProductResponseDTO(Product product);
}
