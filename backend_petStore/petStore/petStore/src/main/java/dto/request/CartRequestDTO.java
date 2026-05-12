package dto.request;

import entity.CartItem;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.util.List;

@Data
public class CartRequestDTO {
    @NotBlank(message="Id field must be provided")
    private String id;
    @NotBlank(message="User id field must be provided")
    private String userId;
    @NotBlank(message="Items field must be provided")
    private List<CartItem> items;
    @NotBlank(message="Total Price field must be provided")
    private Long totalPrice;
}
