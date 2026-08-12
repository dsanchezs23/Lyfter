package com.api.petStore.mapper;

import com.api.petStore.dto.response.OrderResponseDTO;
import com.api.petStore.entity.Order;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface OrderResponseMapper {
    @Mapping(source = "createdAt", target = "orderDate")
    OrderResponseDTO toOrderResponseDTO(Order order);
}
