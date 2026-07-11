package com.api.petStore.dto.response;

import com.api.petStore.entity.Order;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
public class CustomerResponseDTO extends UserResponseDTO {
    private String shippingAddress;
    private List<Order> orderHistory;
}
