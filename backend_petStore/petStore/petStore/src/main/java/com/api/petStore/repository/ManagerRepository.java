package com.api.petStore.repository;

import com.api.petStore.entity.Manager;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ManagerRepository extends JpaRepository<Manager, Long> {
    Manager findById (String id);
}
