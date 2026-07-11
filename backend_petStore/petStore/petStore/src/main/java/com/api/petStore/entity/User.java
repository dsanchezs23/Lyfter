package com.api.petStore.entity;

import com.api.petStore.enums.Role;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "app_user")
@Inheritance(strategy = InheritanceType.JOINED)
@EntityListeners(AuditingEntityListener.class)
public abstract class User {
    @Id
    @Column(unique = true)
    private String id;
    @NotBlank
    private String name;
    @NotBlank
    private String lastName;
    @Column(unique = true)
    @Email
    @NotBlank
    private String email;
    @NotBlank
    private String password;
    @NotBlank
    private String phoneNumber;
    @NotNull
    @Enumerated(EnumType.STRING)
    private Role role;
    @NotNull
    private LocalDateTime birthday;
    @CreatedDate
    private LocalDateTime  createdAt;
    @LastModifiedDate
    private LocalDateTime  updatedAt;
}
