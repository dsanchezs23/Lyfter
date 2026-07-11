package com.api.petStore.mapper;

import com.api.petStore.dto.response.OrderResponseDTO;
import com.api.petStore.entity.Order;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface OrderResponseMapper {
    OrderResponseDTO toOrderResponseDTO(Order order);
}
