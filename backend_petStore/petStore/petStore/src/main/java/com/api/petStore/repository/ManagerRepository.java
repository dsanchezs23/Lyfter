package com.api.petStore.repository;

import com.api.petStore.entity.Manager;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ManagerRepository extends JpaRepository<Manager, String> {
    Optional<Manager> findByEmail(String email);
}
