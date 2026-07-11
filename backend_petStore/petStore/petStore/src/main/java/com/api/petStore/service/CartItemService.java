package com.api.petStore.service;

import com.api.petStore.dto.request.CartItemRequestDTO;
import com.api.petStore.dto.response.CartItemResponseDTO;
import com.api.petStore.entity.CartItem;
import com.api.petStore.mapper.CartItemResponseMapper;
import com.api.petStore.repository.CartItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CartItemService {

    private final CartItemRepository cartItemRepository;
    private final CartItemResponseMapper cartItemResponseMapper;

    public CartItemResponseDTO createCartItem(CartItemRequestDTO cartItemRequestDTO){
        CartItem cartItem = new CartItem(
                null,
                cartItemRequestDTO.getCartId(),
                cartItemRequestDTO.getProductId(),
                cartItemRequestDTO.getQuantity(),
                cartItemRequestDTO.getPriceAtTime(),
                LocalDateTime.now(),
                LocalDateTime.now()
        );
        return cartItemResponseMapper.toCartItemResponseDTO(cartItemRepository.save(cartItem));
    }

    public CartItemResponseDTO getCartItemById(Long id){
        CartItem cartItem = cartItemRepository.findById(id).orElseThrow(() ->
                new RuntimeException("CartItem not found")
        );
        return cartItemResponseMapper.toCartItemResponseDTO(cartItem);
    }

    public List<CartItemResponseDTO> getAllCartItems() {
        return cartItemRepository.findAll().stream()
                .map(cartItemResponseMapper::toCartItemResponseDTO)
                .collect(Collectors.toList());
    }
}
