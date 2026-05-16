package entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Data
@EntityListeners(AuditingEntityListener.class)
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;
    @NotBlank
    private String cartId;
    @NotBlank
    private String ProductId;
    private Integer quantity;
    private Long priceAtTime;
    @CreatedDate
    private LocalDateTime  createdAt;
    @LastModifiedDate
    private LocalDateTime updatedAt;
}
