package com.api.petStore.config;

import com.api.petStore.entity.Manager;
import com.api.petStore.enums.Role;
import com.api.petStore.repository.ManagerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private static final String SEED_ADMIN_EMAIL = "admin@petstore.com";
    private static final String SEED_ADMIN_PASSWORD = "Admin123";

    private final ManagerRepository managerRepository;

    @Override
    public void run(String... args) {
        if (managerRepository.findByEmail(SEED_ADMIN_EMAIL).isPresent()) {
            return;
        }
        Manager admin = new Manager();
        admin.setId(UUID.randomUUID().toString());
        admin.setName("Admin");
        admin.setLastName("PawStore");
        admin.setEmail(SEED_ADMIN_EMAIL);
        admin.setPassword(SEED_ADMIN_PASSWORD);
        admin.setPhoneNumber("00000000");
        admin.setRole(Role.MANAGER);
        admin.setBirthday(LocalDateTime.of(1990, 1, 1, 0, 0));
        managerRepository.save(admin);
    }
}
