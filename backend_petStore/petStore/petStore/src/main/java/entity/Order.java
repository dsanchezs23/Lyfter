package entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Entity
@Data
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank
    private String userId;
    @NotBlank
    private Date orderDate;
    @NotBlank
    private String status;
    @NotBlank
    private List<CartItem> cartItems;
    @NotBlank
    private Long totalPrice;
    @NotBlank
    private Date createdAt;
    @NotBlank
    private Date updatedAt;
}
