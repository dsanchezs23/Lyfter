package dto.response;

import entity.CartItem;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class OrderResponseDTO {
    private Long id;
    private String userId;
    private LocalDateTime orderDate;
    private String status;
    private List<CartItem> cartItems;
    private Long totalPrice;
}
