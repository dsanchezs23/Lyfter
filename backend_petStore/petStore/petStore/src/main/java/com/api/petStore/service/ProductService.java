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
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final ProductResponseMapper productResponseMapper;

    public ProductResponseDTO createProduct(ProductRequestDTO productRequestDTO){
        Product product = new Product(
                productRequestDTO.getId(),
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
        return productResponseMapper.toProductResponseDTO((productRepository.findById(id)));
    }

    public List<ProductResponseDTO> getAllProducts() {
       return productRepository.findAll().stream()
               .map(productResponseMapper::toProductResponseDTO)
               .collect(Collectors.toList());
    }
}
