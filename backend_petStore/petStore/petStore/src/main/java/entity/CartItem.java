package entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.util.Date;

@Entity
@Data
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
    @NotBlank
    private Date createdAt;
    @NotBlank
    private Date updatedAt;
}
