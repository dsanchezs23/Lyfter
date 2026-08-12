package com.api.petStore.service;

import com.api.petStore.dto.request.ProductRequestDTO;
import com.api.petStore.dto.response.ProductResponseDTO;
import com.api.petStore.entity.Product;
import lombok.RequiredArgsConstructor;
import com.api.petStore.mapper.ProductResponseMapper;
import org.springframework.stereotype.Service;
import com.api.petStore.repository.ProductRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final ProductResponseMapper productResponseMapper;

    public ProductResponseDTO createProduct(ProductRequestDTO productRequestDTO){
        Product product = new Product(
                UUID.randomUUID().toString(),
                productRequestDTO.getName(),
                productRequestDTO.getDescription(),
                productRequestDTO.getCategory(),
                productRequestDTO.getImage(),
                productRequestDTO.getPrice(),
                productRequestDTO.getDiscount(),
                productRequestDTO.getStockQuantity(),
                LocalDateTime.now(),
                LocalDateTime.now()
        );
        return productResponseMapper.toProductResponseDTO(productRepository.save(product));
    }

    public ProductResponseDTO getProductById(String id){
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Product not found: " + id));
        return productResponseMapper.toProductResponseDTO(product);
    }

    public List<ProductResponseDTO> getAllProducts() {
       return productRepository.findAll().stream()
               .map(productResponseMapper::toProductResponseDTO)
               .collect(Collectors.toList());
    }

    public ProductResponseDTO updateProduct(String id, ProductRequestDTO productRequestDTO) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Product not found: " + id));
        product.setName(productRequestDTO.getName());
        product.setDescription(productRequestDTO.getDescription());
        product.setCategory(productRequestDTO.getCategory());
        product.setImage(productRequestDTO.getImage());
        product.setPrice(productRequestDTO.getPrice());
        product.setDiscount(productRequestDTO.getDiscount());
        product.setStockQuantity(productRequestDTO.getStockQuantity());
        return productResponseMapper.toProductResponseDTO(productRepository.save(product));
    }
}
