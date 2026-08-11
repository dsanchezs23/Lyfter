package com.api.petStore.service;

import com.api.petStore.dto.request.OrderRequestDTO;
import com.api.petStore.dto.response.OrderResponseDTO;
import com.api.petStore.entity.CartItem;
import com.api.petStore.entity.Order;
import com.api.petStore.entity.Product;
import com.api.petStore.exception.InsufficientStockException;
import lombok.RequiredArgsConstructor;
import com.api.petStore.mapper.OrderResponseMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.api.petStore.repository.OrderRepository;
import com.api.petStore.repository.ProductRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderResponseMapper orderResponseMapper;
    private final ProductRepository productRepository;

    @Transactional
    public OrderResponseDTO createOrder(OrderRequestDTO orderRequestDTO){
        for (CartItem item : orderRequestDTO.getCartItems()) {
            Product product = productRepository.findById(item.getProductId())
                    .orElseThrow(() -> new NoSuchElementException("Product not found: " + item.getProductId()));
            int available = Integer.parseInt(product.getStockQuantity());
            if (available < item.getQuantity()) {
                throw new InsufficientStockException(
                        "Not enough stock for \"" + product.getName() + "\" (available: " + available + ", requested: " + item.getQuantity() + ")"
                );
            }
            product.setStockQuantity(String.valueOf(available - item.getQuantity()));
            productRepository.save(product);
        }

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
