package com.api.petStore.controller;

import com.api.petStore.dto.request.CartRequestDTO;
import com.api.petStore.dto.response.CartResponseDTO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.api.petStore.service.CartService;

import java.util.List;

@RestController
@RequestMapping("/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @PostMapping
    public ResponseEntity<CartResponseDTO> create(@Valid @RequestBody CartRequestDTO cartRequestDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(cartService.createCart(cartRequestDTO));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CartResponseDTO> getCart(@PathVariable String id) {
        return ResponseEntity.status(HttpStatus.OK).body(cartService.getCartById(id));
    }

    @GetMapping
    public ResponseEntity<List<CartResponseDTO>> getAllCarts() {
        return ResponseEntity.status(HttpStatus.OK).body(cartService.getAllCarts());
    }
}
