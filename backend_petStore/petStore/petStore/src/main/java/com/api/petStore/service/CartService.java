package com.api.petStore.service;

import com.api.petStore.dto.request.CartRequestDTO;
import com.api.petStore.dto.response.CartResponseDTO;
import com.api.petStore.entity.Cart;
import lombok.RequiredArgsConstructor;
import com.api.petStore.mapper.CartResponseMapper;
import org.springframework.stereotype.Service;
import com.api.petStore.repository.CartRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final CartResponseMapper cartResponseMapper;

    public CartResponseDTO createCart(CartRequestDTO cartRequestDTO){
        Cart cart = new Cart(
                cartRequestDTO.getId(),
                cartRequestDTO.getUserId(),
                cartRequestDTO.getItems(),
                cartRequestDTO.getTotalPrice(),
                LocalDateTime.now(),
                LocalDateTime.now()
        );
        return cartResponseMapper.toCartResponseDTO(cartRepository.save(cart));
    }

    public CartResponseDTO getCartById(String id){
        return cartResponseMapper.toCartResponseDTO((cartRepository.findById(id)));
    }

    public List<CartResponseDTO> getAllCarts() {
        return cartRepository.findAll().stream()
                .map(cartResponseMapper::toCartResponseDTO)
                .collect(Collectors.toList());
    }
}
