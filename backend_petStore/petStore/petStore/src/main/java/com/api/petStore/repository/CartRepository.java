package com.api.petStore.repository;

import com.api.petStore.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart,Long> {
    Cart findById (String id);
}
