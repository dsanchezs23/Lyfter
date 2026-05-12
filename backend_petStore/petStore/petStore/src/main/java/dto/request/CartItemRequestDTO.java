package dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CartItemRequestDTO {
    @NotBlank(message="Id field must be provided")
    private String id;
    @NotBlank(message="Cart id field must be provided")
    private String cartId;
    @NotBlank(message="Product id field must be provided")
    private String ProductId;
    @NotBlank(message="Quantity field must be provided")
    private Integer quantity;
    @NotBlank(message="Price at time field must be provided")
    private Long priceAtTime;
}
