package com.api.petStore.service;

import com.api.petStore.dto.request.OrderRequestDTO;
import com.api.petStore.dto.response.OrderResponseDTO;
import com.api.petStore.entity.Order;
import lombok.RequiredArgsConstructor;
import com.api.petStore.mapper.OrderResponseMapper;
import org.springframework.stereotype.Service;
import com.api.petStore.repository.OrderRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderResponseMapper orderResponseMapper;

    public OrderResponseDTO createOrder(OrderRequestDTO orderRequestDTO){
        Order order = new Order(
                null,
                orderRequestDTO.getUserId(),
                orderRequestDTO.getStatus(),
                orderRequestDTO.getCartItems(),
                orderRequestDTO.getTotalPrice(),
                LocalDateTime.now(),
                LocalDateTime.now()
        );
        return orderResponseMapper.toOrderResponseDTO(orderRepository.save(order));
    }

    public OrderResponseDTO getOrderById(Long id){
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Order not found: " + id));
        return orderResponseMapper.toOrderResponseDTO(order);
    }

    public List<OrderResponseDTO> getAllOrders() {
        return orderRepository.findAll().stream()
                .map(orderResponseMapper::toOrderResponseDTO)
                .collect(Collectors.toList());
    }
}
