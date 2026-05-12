package dto.response;

import entity.CartItem;
import lombok.Data;
import java.util.Date;
import java.util.List;

@Data
public class OrderResponseDTO {
    private Long id;
    private String userId;
    private Date orderDate;
    private String status;
    private List<CartItem> cartItems;
    private Long totalPrice;
}
