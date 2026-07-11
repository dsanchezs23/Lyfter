package com.api.petStore.controller;

import com.api.petStore.dto.request.CartItemRequestDTO;
import com.api.petStore.dto.response.CartItemResponseDTO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.api.petStore.service.CartItemService;

import java.util.List;

@RestController
@RequestMapping("/cartItem")
@RequiredArgsConstructor
public class CartItemController {

    private final CartItemService cartItemService;

    @PostMapping
    public ResponseEntity<CartItemResponseDTO> create(@Valid @RequestBody CartItemRequestDTO cartItemRequestDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(cartItemService.createCartItem(cartItemRequestDTO));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CartItemResponseDTO> getCartItem(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(cartItemService.getCartItemById(id));
    }

    @GetMapping
    public ResponseEntity<List<CartItemResponseDTO>> getAllCartItems() {
        return ResponseEntity.status(HttpStatus.OK).body(cartItemService.getAllCartItems());
    }
}
